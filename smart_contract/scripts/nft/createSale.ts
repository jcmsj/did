// createSale.ts
import { toNano } from '@ton/core';
import { NFTItem } from '../../wrappers/NFTItem';
import { NFTSale } from '../../wrappers/NFTSale';
import { compile, NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const nftAddress = await provider.ui().inputAddress('NFT Address');
    const nftItem = provider.open(NFTItem.createFromAddress(nftAddress));
    
    const itemData = await nftItem.getItemData();
    
    const sale = provider.open(
        NFTSale.createFromConfig({
            marketplaceAddress: await provider.ui().inputAddress('Marketplace Address'),
            nftAddress: nftAddress,
            nftOwnerAddress: itemData.ownerAddress,
            fullPrice: toNano(await provider.ui().input('Sale Price in TON')),
            feesCell: await provider.ui().input('Fees Configuration')
        },
        await compile('NFTSale'))
    );

    await sale.sendDeploy(provider.sender(), toNano('0.05'));
    await provider.waitForDeploy(sale.address);
    
    console.log('Sale created at:', sale.address);
}
