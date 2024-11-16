// scripts/deploy-shareable-album.ts
import { Address, beginCell, toNano } from '@ton/core';
import { NFTShareableAlbum } from '../../wrappers/NFTShareableAlbum';
import { compile, NetworkProvider } from '@ton/blueprint';

export async function deployShareableAlbum(provider: NetworkProvider, owner: Address) {
    const shareableAlbum = provider.open(
        NFTShareableAlbum.createFromConfig({
            ownerAddress: owner,
            content: beginCell().storeStringTail("Shareable Album metadata").endCell(),
            sharedUsers: beginCell().endCell() // Empty dict initially
        }, await compile('NFTShareableAlbum'))
    );

    await shareableAlbum.sendDeploy(provider.sender(), toNano('0.05'));
    
    return shareableAlbum;
}
