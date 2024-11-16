import { NetworkProvider } from "@ton/blueprint";
import { beginCell, Cell } from "@ton/core";

export async function inputStringToCell(provider: NetworkProvider, msg: string): Promise<Cell> {
    const result =  await provider.ui().input(msg)
    return beginCell().storeStringTail(result).endCell();
}
