import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Address } from '@ton/core'
import { NFTAlbum } from '@hacktivators/contracts/wrappers/NFTAlbum'
import { useTonConnect } from '@/hooks/useTonConnect'
import { useTonClient } from '@/hooks/useTonClient'
import { useTonAddress, TonConnectUIProvider, useTonConnectUI, TonConnectButton } from "@tonconnect/ui-react"
export default function CertificatesPage({ albumAddress }: { albumAddress: string }) {
    const { sender, connected } = useTonConnect()
    const client = useTonClient()
    const senderAddress = useTonAddress()
    const [nftAddress, setNftAddress] = useState('')
    const [albumData, setAlbumData] = useState<{
        ownerAddress: Address,
        content: any,
        nfts: any
    } | null>(null)
    const [provider] = useTonConnectUI()
    //   async function handleAddNFT() {
    //     if (!client || !sender) return

    //     try {
    //       await album.sendAddNFT(client.provider(album.address), sender, {
    //         nftAddress: Address.parse(nftAddress),
    //         value: BigInt(10000000), // 0.01 TON
    //       })
    //     } catch (e) {
    //       console.error('Error adding NFT:', e)
    //     }
    //   }

    //   async function handleRemoveNFT() {
    //     if (!client || !sender) return

    //     try {
    //       await album.sendRemoveNFT(client.provider(album.address), sender, {
    //         nftAddress: Address.parse(nftAddress),
    //         value: BigInt(10000000), // 0.01 TON
    //       })
    //     } catch (e) {
    //       console.error('Error removing NFT:', e) 
    //     }
    //   }

    async function fetchAlbumData() {
        if (!client) return


        if (provider.account.address == undefined) {
            console.error('No sender address')
            return
        }
        const sender = Address.parse(provider.account.address)
        try {

            const album = await NFTAlbum.getAlbumByOwner(client.provider(sender), sender)
            console.log('Album:', album)
            const data = await album.getAlbumData(client.provider(album.address))
            setAlbumData(data)
        } catch (e) {
            console.error('Error fetching album data:', e)
        }
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>NFT Album</CardTitle>
                <CardDescription>Manage your NFT Album collection</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid w-full items-center gap-4">
                    <Separator />
                    <div className="flex flex-col gap-2">
                        <Button variant="outline" onClick={fetchAlbumData}>
                            Fetch Album Data
                        </Button>

                        {albumData && (
                            <div className="mt-4">
                                <p>Owner: {albumData.ownerAddress.toString()}</p>
                                <p>NFTs: {albumData.nfts.toString()}</p>
                            </div>
                        )}
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
