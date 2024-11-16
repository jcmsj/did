import { Address, beginCell, Cell, Contract, contractAddress, ContractProvider, Sender, SendMode } from '@ton/core';

export type NFTItemConfig = {
    index: number;
    collectionAddress: Address;
    ownerAddress: Address;
    content: Cell;
};

export class NFTItem implements Contract {
    constructor(readonly address: Address, readonly init?: { code: Cell; data: Cell }) {}

    static createFromAddress(address: Address) {
        return new NFTItem(address);
    }

    static createFromConfig(config: NFTItemConfig, code: Cell, workchain = 0) {
        const data = beginCell()
            .storeUint(config.index, 64)
            .storeAddress(config.collectionAddress)
            .storeAddress(config.ownerAddress)
            .storeRef(config.content)
            .endCell();
        const init = { code, data };
        return new NFTItem(contractAddress(workchain, init), init);
    }
    async sendDeploy(provider: ContractProvider, via: Sender, value: bigint) {
        await provider.internal(via, {
            value,
            sendMode: SendMode.PAY_GAS_SEPARATELY,
            body: beginCell().endCell(),
        });
    }

    async sendTransfer(
        provider: ContractProvider,
        via: Sender,
        opts: {
            newOwner: Address;
            responseTo: Address;
            forwardAmount: bigint;
            value: bigint;
            queryID?: number;
        }
    ) {
        await provider.internal(via, {
            value: opts.value,
            sendMode: SendMode.PAY_GAS_SEPARATELY,
            body: beginCell()
                .storeUint(0x5fcc3d14, 32) // transfer op
                .storeUint(opts.queryID ?? 0, 64)
                .storeAddress(opts.newOwner)
                .storeAddress(opts.responseTo)
                .storeBit(false) // null custom_payload
                .storeCoins(opts.forwardAmount)
                .storeBit(false) // empty forward_payload
                .endCell(),
        });
    }

    async getItemData(provider: ContractProvider) {
        const result = await provider.get('get_nft_data', []);
        return {
            initialized: result.stack.readBoolean(),
            index: result.stack.readNumber(),
            collectionAddress: result.stack.readAddress(),
            ownerAddress: result.stack.readAddress(),
            content: result.stack.readCell(),
        };
    }
}
