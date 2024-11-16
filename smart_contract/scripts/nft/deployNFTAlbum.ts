import { Address, beginCell, Cell, Contract, contractAddress, ContractProvider, Sender, SendMode } from '@ton/core';

export type NFTShareableAlbumConfig = {
    ownerAddress: Address;
    content: Cell;
    sharedUsers: Cell;
};

export class NFTShareableAlbum implements Contract {
    constructor(readonly address: Address, readonly init?: { code: Cell; data: Cell }) {}

    static createFromAddress(address: Address) {
        return new NFTShareableAlbum(address);
    }

    static createFromConfig(config: NFTShareableAlbumConfig, code: Cell, workchain = 0) {
        const data = beginCell()
            .storeAddress(config.ownerAddress)
            .storeRef(config.content)
            .storeRef(config.sharedUsers)
            .endCell();
        const init = { code, data };
        return new NFTShareableAlbum(contractAddress(workchain, init), init);
    }

    async sendDeploy(provider: ContractProvider, via: Sender, value: bigint) {
        await provider.internal(via, {
            value,
            sendMode: SendMode.PAY_GAS_SEPARATELY,
            body: beginCell().endCell(),
        });
    }

    async sendShareNFT(
        provider: ContractProvider,
        via: Sender,
        opts: {
            userAddress: Address;
            value: bigint;
            queryID?: number;
        }
    ) {
        await provider.internal(via, {
            value: opts.value,
            sendMode: SendMode.PAY_GAS_SEPARATELY,
            body: beginCell()
                .storeUint(0xdcba4321, 32) // op::share_nft
                .storeUint(opts.queryID ?? 0, 64)
                .storeAddress(opts.userAddress)
                .endCell(),
        });
    }

    async sendViewAlbum(
        provider: ContractProvider,
        via: Sender,
        opts: {
            value: bigint;
            queryID?: number;
        }
    ) {
        await provider.internal(via, {
            value: opts.value,
            sendMode: SendMode.PAY_GAS_SEPARATELY,
            body: beginCell()
                .storeUint(0x2345bcde, 32) // op::view_album
                .storeUint(opts.queryID ?? 0, 64)
                .endCell(),
        });
    }

    async getShareableData(provider: ContractProvider) {
        const result = await provider.get('get_shareable_data', []);
        return {
            ownerAddress: result.stack.readAddress(),
            content: result.stack.readCell(),
            nfts: result.stack.readCell(),
            sharedUsers: result.stack.readCell()
        };
    }
}
