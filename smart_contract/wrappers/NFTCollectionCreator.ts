// wrappers/NFTCollectionCreator.ts
import { Address, beginCell, Cell, Contract, contractAddress, ContractProvider, Sender, SendMode } from '@ton/core';

export type NFTCollectionCreatorConfig = {
    ownerAddress: Address;
};

export class NFTCollectionCreator implements Contract {
    constructor(readonly address: Address, readonly init?: { code: Cell; data: Cell }) {}

    static createFromConfig(config: NFTCollectionCreatorConfig, code: Cell, workchain = 0) {
        const data = beginCell()
            .storeAddress(config.ownerAddress)
            .endCell();
        const init = { code, data };
        return new NFTCollectionCreator(contractAddress(workchain, init), init);
    }

    static createFromAddress(address: Address) {
        return new NFTCollectionCreator(address);
    }

    async sendDeploy(provider: ContractProvider, via: Sender, value: bigint) {
        await provider.internal(via, {
            value,
            sendMode: SendMode.PAY_GAS_SEPARATELY,
            body: beginCell().endCell(),
        });
    }

    async sendCreateCollection(
        provider: ContractProvider,
        via: Sender,
        opts: {
            collectionCode: Cell;
            content: Cell;
            nftItemCode: Cell;
            // royaltyFactor: number;
            // royaltyBase: number;
            // royaltyAddress: Address;
            value: bigint;
            queryID?: number;
        }
    ) {
        return await provider.internal(via, {
            value: opts.value,
            sendMode: SendMode.PAY_GAS_SEPARATELY,
            body: beginCell()
                .storeUint(1, 32)
                .storeUint(opts.queryID ?? 0, 64)
                .storeRef(opts.collectionCode)
                .storeRef(opts.content)
                .storeRef(opts.nftItemCode)
                // .storeUint(opts.royaltyFactor, 16)
                // .storeUint(opts.royaltyBase, 16)
                // .storeAddress(opts.royaltyAddress)
                .endCell(),
        });
    }
}
