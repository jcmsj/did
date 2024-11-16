import { Address, beginCell, Cell, Contract, contractAddress, ContractProvider, Sender, SendMode } from '@ton/core';

export type NFTCollectionConfig = {
    ownerAddress: Address;
    nextItemIndex: number;
    content: Cell;
    nftItemCode: Cell;
    royaltyParams: Cell;
};

export class NFTCollection implements Contract {
    constructor(readonly address: Address, readonly init?: { code: Cell; data: Cell }) {}

    static createFromAddress(address: Address) {
        return new NFTCollection(address);
    }

    static createFromConfig(config: NFTCollectionConfig, code: Cell, workchain = 0) {
        const data = beginCell()
            .storeAddress(config.ownerAddress)
            .storeUint(config.nextItemIndex, 64)
            .storeRef(config.content)
            .storeRef(config.nftItemCode)
            .storeRef(config.royaltyParams)
            .endCell();
        const init = { code, data };
        return new NFTCollection(contractAddress(workchain, init), init);
    }

    async sendDeploy(provider: ContractProvider, via: Sender, value: bigint) {
        await provider.internal(via, {
            value,
            sendMode: SendMode.PAY_GAS_SEPARATELY,
            body: beginCell().endCell(),
        });
    }

    async sendMintNFT(
        provider: ContractProvider,
        via: Sender,
        opts: {
            itemIndex: number;
            amount: bigint;
            content: Cell;
            queryID?: number;
        }
    ) {
        await provider.internal(via, {
            value: opts.amount,
            sendMode: SendMode.PAY_GAS_SEPARATELY,
            body: beginCell()
                .storeUint(1, 32)
                .storeUint(opts.queryID ?? 0, 64)
                .storeUint(opts.itemIndex, 64)
                .storeCoins(opts.amount)
                .storeRef(opts.content)
                .endCell(),
        });
    }

    async getCollectionData(provider: ContractProvider) {
        const result = await provider.get('get_collection_data', []);
        return {
            nextItemIndex: result.stack.readNumber(),
            content: result.stack.readCell(),
            ownerAddress: result.stack.readAddress(),
        };
    }

    async getNFTAddressByIndex(provider: ContractProvider, index: number) {
        const result = await provider.get('get_nft_address_by_index', [{
            type: 'int',
            value: BigInt(index)
        }]);
        return result.stack.readAddress();
    }

    async getRoyaltyParams(provider: ContractProvider) {
        const result = await provider.get('royalty_params', []);
        return {
            factor: result.stack.readNumber(),
            base: result.stack.readNumber(),
            address: result.stack.readAddress(),
        };
    }
}
