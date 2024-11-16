// scripts/deploy-collection-creator.ts
import { toNano } from '@ton/core';
import { NFTCollectionCreator } from '../../wrappers/NFTCollectionCreator';
import { compile, NetworkProvider } from '@ton/blueprint';

export async function run(
    provider: NetworkProvider,
) {
    const collectionCreator = provider.open(
        NFTCollectionCreator.createFromConfig({
            ownerAddress: await provider.ui().inputAddress('Owner Address'),
        }, await compile('NFTCollectionCreator'))
    );

    await collectionCreator.sendDeploy(provider.sender(), toNano('0.05'));
    await provider.waitForDeploy(collectionCreator.address);
    console.log('Collection creator deployed at:', collectionCreator.address);    
}

