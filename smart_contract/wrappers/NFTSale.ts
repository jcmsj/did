import { Address, beginCell, Cell, Contract, contractAddress, ContractProvider, Sender, SendMode } from '@ton/core';

export type NFTSaleConfig = {
    marketplaceAddress: Address;
    nftAddress: Address;
    nftOwnerAddress: Address;
    fullPrice: bigint;
    feesCell: Cell;
};

export class NFTSale implements Contract {
    constructor(readonly address: Address, readonly init?: { code: Cell; data: Cell }) {}

    static createFromAddress(address: Address) {
        return new NFTSale(address);
    }

    static createFromConfig(config: NFTSaleConfig, code: Cell, workchain = 0) {
        const data = beginCell()
            .storeAddress(config.marketplaceAddress)
            .storeAddress(config.nftAddress)
            .storeAddress(config.nftOwnerAddress)
            .storeCoins(config.fullPrice)
            .storeRef(config.feesCell)
            .endCell();
        const init = { code, data };
        return new NFTSale(contractAddress(workchain, init), init);
    }

    async sendDeploy(provider: ContractProvider, via: Sender, value: bigint) {
        await provider.internal(via, {
            value,
            sendMode: SendMode.PAY_GAS_SEPARATELY,
            body: beginCell().endCell(),
        });
    }

    async sendBuy(
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
                .storeUint(2, 32)
                .storeUint(opts.queryID ?? 0, 64)
                .endCell(),
        });
    }

    async sendCancelSale(
        provider: ContractProvider,
        via: Sender,
        value: bigint
    ) {
        await provider.internal(via, {
            value,
            sendMode: SendMode.PAY_GAS_SEPARATELY,
            body: beginCell()
                .storeUint(3, 32)
                .storeUint(0, 64)
                .endCell(),
        });
    }

    async getSaleData(provider: ContractProvider) {
        const result = await provider.get('get_sale_data', []);
        return {
            marketplaceAddress: result.stack.readAddress(),
            nftAddress: result.stack.readAddress(),
            nftOwnerAddress: result.stack.readAddress(),
            fullPrice: result.stack.readBigNumber(),
            marketplaceFee: result.stack.readBigNumber(),
            royaltyAddress: result.stack.readAddress(),
            royaltyAmount: result.stack.readBigNumber(),
        };
    }
}
