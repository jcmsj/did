// deployNFTCollection.ts
import { toNano } from '@ton/core';
import { NFTCollection } from '../../wrappers/NFTCollection';
import { compile, NetworkProvider } from '@ton/blueprint';
import { inputStringToCell } from './inputStringToCell';
import { askRoyaltyParams } from './royalty';


export async function run(provider: NetworkProvider) {
    const collection = provider.open(
        NFTCollection.createFromConfig({
            ownerAddress: await provider.ui().inputAddress('Owner address'),
            nextItemIndex: 0,
            content: await inputStringToCell(provider, 'Content Cell'),
            nftItemCode: await compile('NFTItem'),
            royaltyParams: await askRoyaltyParams(provider),
        },
        await compile('NFTCollection'))
    );

    await collection.sendDeploy(provider.sender(), toNano('0.05'));
    await provider.waitForDeploy(collection.address);
    
    console.log('Collection deployed at:', collection.address);
}
