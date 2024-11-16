// deployNFTSale.ts
import { toNano } from '@ton/core';
import { NFTSale } from '../../wrappers/NFTSale';
import { compile, NetworkProvider } from '@ton/blueprint';
import { inputStringToCell } from './inputStringToCell';

export async function run(provider: NetworkProvider) {
    const sale = provider.open(
        NFTSale.createFromConfig({
            marketplaceAddress: await provider.ui().inputAddress('Marketplace Address'),
            nftAddress: await provider.ui().inputAddress('NFT Address'),
            nftOwnerAddress: await provider.ui().inputAddress('NFT Owner Address'),
            fullPrice: toNano(await provider.ui().input('Sale Price in TON')),
            feesCell: await inputStringToCell(provider,'Fees Configuration'),
        },
        await compile('NFTSale'))
    );

    await sale.sendDeploy(provider.sender(), toNano('0.05'));
    await provider.waitForDeploy(sale.address);
    
    console.log('Sale Contract deployed at:', sale.address);
}
