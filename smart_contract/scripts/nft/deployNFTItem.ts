// deployNFTItem.ts
import { toNano } from '@ton/core';
import { NFTItem } from '../../wrappers/NFTItem';
import { compile, NetworkProvider } from '@ton/blueprint';
import { inputStringToCell } from './inputStringToCell';
export async function run(provider: NetworkProvider) {
    const item = provider.open(
        NFTItem.createFromConfig({
            index: parseInt(await provider.ui().input('NFT Index (int)')),
            collectionAddress: await provider.ui().inputAddress('Collection Address'),
            ownerAddress: await provider.ui().inputAddress('Owner Address'),
            content: await inputStringToCell(provider, 'Content Cell URL'),
        },
        await compile('NFTItem'))
    );

    // await item.(provider.sender(), toNano('0.05'));
    await item.sendDeploy(provider.sender(), toNano('0.05'));
    await provider.waitForDeploy(item.address);
    
    console.log('NFT Item deployed at:', item.address);
}
