// mintNFT.ts
import { Cell, toNano } from '@ton/core';
import { NFTCollection } from '../../wrappers/NFTCollection';
import { NetworkProvider } from '@ton/blueprint';
import { inputStringToCell } from './inputStringToCell';

export async function run(provider: NetworkProvider) {
    const collectionAddress = await provider.ui().inputAddress('Collection Address');
    const collection = provider.open(NFTCollection.createFromAddress(collectionAddress));
    // wait for collection to be deployed
    await provider.waitForDeploy(collection.address);
    const collectionData = await collection.getCollectionData();
    await collection.sendMintNFT(provider.sender(), {
        itemIndex: collectionData.nextItemIndex,
        amount: toNano('0.05'),
        content: await inputStringToCell(provider, 'Content Cell URL'),
    });

    console.log('NFT Minted with index:', collectionData.nextItemIndex);
}
