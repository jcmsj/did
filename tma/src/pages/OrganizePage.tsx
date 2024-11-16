import { useState } from 'react'
import { Page } from '@/components/Page'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { Address, beginCell, Cell, toNano } from '@ton/core'
import { NFTCollection } from '@hacktivators/contracts/wrappers/NFTCollection'
import { NFTCollectionCreator } from '@hacktivators/contracts/wrappers/NFTCollectionCreator'
import { TonConnectUIProvider, useTonConnectUI, TonConnectButton } from '@tonconnect/ui-react'
import { useTonClient } from '@/hooks/useTonClient'
import { useTonConnect } from '@/hooks/useTonConnect'

const COLLECTION_CREATOR_ADDRESS="EQALda7sO7TbhKRrhnQuVDkmJ1SR9iw5RVsI_woPHVW6bjnK"
export default function OrganizePage() {
  const [ownerAddress, setOwnerAddress] = useState('')
  
  const [collectionContent, setCollectionContent] = useState('')
  // const [royaltyPercent, setRoyaltyPercent] = useState('10')
  // const [royaltyAddress, setRoyaltyAddress] = useState('')
  const [isDeploying, setIsDeploying] = useState(false)
  const client = useTonClient();
  const {sender, connected} = useTonConnect();
  const handleCreateCollection = async () => {
    try {
      // Connect to creator:
      const creator = NFTCollectionCreator.createFromAddress(Address.parse(COLLECTION_CREATOR_ADDRESS))
      console.log("Connected to creator")
      const c = client.open(creator)
      const response = await c.sendCreateCollection(sender, {
        collectionCode: beginCell().endCell(),
        content: beginCell().storeStringTail(collectionContent).endCell(),
        nftItemCode: beginCell().endCell(),
        value: toNano('0.05')
      })
      console.log(response)
      setIsDeploying(true)

    } catch (error) {
      console.error('Error creating collection:', error)
    } finally {
      setIsDeploying(false)
    }
  }

  return (
    <Page>
      <Card>
        <CardHeader>
          <CardTitle>Create NFT Collection</CardTitle>
          <CardDescription>
            Deploy a new NFT collection contract with customizable parameters
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="ownerAddress">Owner Address</Label>
            <div className='pl-24'>
            <TonConnectButton />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">Collection Content</Label>
            <Textarea
              id="content"
              placeholder="Enter collection metadata URL or content"
              value={collectionContent}
              onChange={(e) => setCollectionContent(e.target.value)}
            />
          </div>

          <Separator />

          {/* <div className="space-y-2">
            <Label htmlFor="royaltyPercent">Royalty Percentage</Label>
            <Input
              id="royaltyPercent"
              type="number"
              placeholder="Enter royalty percentage"
              value={royaltyPercent}
              onChange={(e) => setRoyaltyPercent(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="royaltyAddress">Royalty Address</Label>
            <Input
              id="royaltyAddress"
              placeholder="Enter royalty recipient address"
              value={royaltyAddress}
              onChange={(e) => setRoyaltyAddress(e.target.value)}
            />
          </div> */}

          <Button 
            className="w-full" 
            onClick={handleCreateCollection}
            disabled={isDeploying}
          >
            {isDeploying ? 'Deploying...' : 'Create Collection'}
          </Button>
        </CardContent>
      </Card>
    </Page>
  )
}
