import { Contract, Cell, ContractProvider, Sender, beginCell, Address } from "ton-core";

// CertificateItem.ts
export class CertificateItem implements Contract {
    constructor(readonly address: Address, readonly init?: { code: Cell, data: Cell }) {}

    async mint(provider: ContractProvider, sender: Sender, 
               receiverAddress: Address) {
        await provider.internal(sender, {
            value: "0.05",
            body: beginCell()
                .storeUint(1, 32) // mint op
                .storeAddress(receiverAddress)
                .endCell()
        });
    }
}
