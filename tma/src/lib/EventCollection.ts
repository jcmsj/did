// EventCollection.ts
import { Contract, ContractProvider, Sender, Address, Cell, beginCell } from "ton-core";

export class EventCollection implements Contract {
    constructor(readonly address: Address, readonly init?: { code: Cell, data: Cell }) {}

    static createForDeploy(code: Cell, initialOwnerAddress: Address): EventCollection {
        const data = beginCell()
            .storeAddress(initialOwnerAddress)
            .storeUint(0, 64) // next_item_index
            .storeDict() // content
            .storeDict() // nft_items
            .endCell();
        return new EventCollection(null, {code, data});
    }

    async createEvent(provider: ContractProvider, sender: Sender, 
                     eventName: string, totalSupply: number) {
        // Creates new event (collection)
        await provider.internal(sender, {
            value: "0.1", // deployment fee
            body: beginCell()
                .storeUint(1, 32) // op code for create
                .storeString(eventName)
                .storeUint(totalSupply, 32)
                .endCell()
        });
    }
}
