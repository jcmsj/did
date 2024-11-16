import { Address, beginCell, Cell, Contract, contractAddress, ContractProvider, Sender, SendMode } from '@ton/core';

export type NFTAlbumConfig = {
    ownerAddress: Address;
    content: Cell;
};

export class NFTAlbum implements Contract {
    constructor(readonly address: Address, readonly init?: { code: Cell; data: Cell }) {}

    static createFromAddress(address: Address) {
        return new NFTAlbum(address);
    }

    static createFromConfig(config: NFTAlbumConfig, code: Cell, workchain = 0) {
        const data = beginCell()
            .storeAddress(config.ownerAddress)
            .storeRef(config.content)
            .endCell();
        const init = { code, data };
        return new NFTAlbum(contractAddress(workchain, init), init);
    }

    async sendDeploy(provider: ContractProvider, via: Sender, value: bigint) {
        await provider.internal(via, {
            value,
            sendMode: SendMode.PAY_GAS_SEPARATELY,
            body: beginCell().endCell(),
        });
    }

    async sendAddNFT(
        provider: ContractProvider,
        via: Sender,
        opts: {
            nftAddress: Address;
            value: bigint;
            queryID?: number;
        }
    ) {
        await provider.internal(via, {
            value: opts.value,
            sendMode: SendMode.PAY_GAS_SEPARATELY,
            body: beginCell()
                .storeUint(0x1234abcd, 32) // op::add_nft
                .storeUint(opts.queryID ?? 0, 64)
                .storeAddress(opts.nftAddress)
                .endCell(),
        });
    }

    async sendRemoveNFT(
        provider: ContractProvider,
        via: Sender,
        opts: {
            nftAddress: Address;
            value: bigint;
            queryID?: number;
        }
    ) {
        await provider.internal(via, {
            value: opts.value,
            sendMode: SendMode.PAY_GAS_SEPARATELY,
            body: beginCell()
                .storeUint(0x4321dcba, 32) // op::remove_nft
                .storeUint(opts.queryID ?? 0, 64)
                .storeAddress(opts.nftAddress)
                .endCell(),
        });
    }

    async getAlbumData(provider: ContractProvider) {
        const result = await provider.get('get_album_data', []);
        return {
            ownerAddress: result.stack.readAddress(),
            content: result.stack.readCell(),
            nfts: result.stack.readCell()
        };
    }
}
