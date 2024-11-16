import { Address, beginCell, Cell } from "@ton/core";
import { NetworkProvider } from "@ton/blueprint";
// helper function to create royalty params cell
export function makeRoyaltyParams(factor: number, base: number, address: Address): Cell {
    return beginCell()
        .storeUint(factor, 16) // e.g. 5 for 5%
        .storeUint(base, 16)   // e.g. 100 for percentages
        .storeAddress(address) // address to receive royalties
        .endCell();
}

export async function askRoyaltyParams(p:NetworkProvider): Promise<Cell> {
    const factor: string = await p.ui().input("Factor(int, e.g. 5 for 5%)")
    const base: string = await p.ui().input("base (e.g. 100 for percentages)")
    const addr = await p.ui().inputAddress('Royalty receiver Address')
    return makeRoyaltyParams(
        parseInt(factor),
        parseInt(base),
        addr,
    )
}

// // Usage example:
// const royaltyParams = createRoyaltyParams(
//     5,      // 5% royalty
//     100,    // percentage base
//     ownerAddress // address to receive royalties
// );
