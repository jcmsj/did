import {
    Address,
    beginCell,
    Cell,
    Dictionary,
    toNano,
} from "@ton/core";
import { NetworkProvider } from "@ton/blueprint";
import { NFTCollection } from "../../wrappers/NFTCollection";

export type NFTBatchItem = {
    index: number;
    amount: bigint;
    content: string;
};

export async function batchDeployNFTs(
    provider: NetworkProvider,
    collection: NFTCollection,
    items: NFTBatchItem[]
) {
    // Validate batch size
    if (items.length === 0 || items.length > 250) {
        throw new Error("Batch size must be between 1 and 250");
    }

    // Create batch content dictionary
    const dict = Dictionary.empty(Dictionary.Keys.Uint(64), Dictionary.Values.Cell());
    for (const item of items) {
        const itemContent = beginCell()
            .storeCoins(item.amount)
            .storeRef(
                beginCell()
                    .storeBuffer(Buffer.from(item.content))
                    .endCell()
            )
            .endCell();
        dict.set(item.index, itemContent);
    }

    // Build batch message
    const message = beginCell()
        .storeUint(2, 32) // op::deploy_batch
        .storeUint(0, 64) // query_id
        .storeRef(beginCell().storeDict(dict).endCell())
        .endCell();

    // Deploy batch
    const tracker = await collection.sendDeploy(provider, message);

    // Wait for transaction completion
    const receipt = await tracker.traced();
    if (!receipt.success) {
        throw new Error(`Batch deployment failed: ${receipt.exitCode}`);
    }

    return receipt;
}

// Example usage in a Blueprint script:
export async function run(provider: NetworkProvider) {
    const collection = provider.open(
        NFTCollection.createFromAddress(Address.parse("EQ..."))
    );

    const nftsToMint: NFTBatchItem[] = [
        {
            index: 0,
            amount: toNano("0.05"),
            content: JSON.stringify({
                name: "NFT #1",
                description: "First NFT",
                image: "ipfs://..."
            })
        },
        {
            index: 1,
            amount: toNano("0.05"),
            content: JSON.stringify({
                name: "NFT #2",
                description: "Second NFT", 
                image: "ipfs://..."
            })
        }
    ];

    const receipt = await batchDeployNFTs(provider, collection, nftsToMint);
    console.log(`Batch deployment completed: ${receipt.transactionId}`);
}
