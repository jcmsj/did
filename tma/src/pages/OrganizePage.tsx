import { useState } from 'react'
import { Page } from '@/components/Page'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { Address, beginCell, Cell, toNano } from '@ton/core'
import { NFTCollectionCreator } from '@hacktivators/contracts/wrappers/NFTCollectionCreator'
import { TonConnectButton } from '@tonconnect/ui-react'
import { useTonClient } from '@/hooks/useTonClient'
import { useTonConnect } from '@/hooks/useTonConnect'

const COLLECTION_CREATOR_ADDRESS = "EQALda7sO7TbhKRrhnQuVDkmJ1SR9iw5RVsI_woPHVW6bjnK"

export default function OrganizePage() {
  const [eventName, setEventName] = useState('')
  const [eventDate, setEventDate] = useState('')
  const [eventTime, setEventTime] = useState('')
  const [eventLocation, setEventLocation] = useState('')
  const [eventDescription, setEventDescription] = useState('')
  const [maxAttendees, setMaxAttendees] = useState('')
  const [eventImageUrl, setEventImageUrl] = useState('')
  const [isDeploying, setIsDeploying] = useState(false)
  
  const client = useTonClient();
  const { sender, connected } = useTonConnect();

  const handleCreateCollection = async () => {
    try {
      if (!client || !sender) return

      const eventMetadata = {
        name: eventName,
        description: eventDescription,
        date: eventDate,
        time: eventTime,
        location: eventLocation,
        maxAttendees: parseInt(maxAttendees),
        image: eventImageUrl
      }

      const creator = NFTCollectionCreator.createFromAddress(Address.parse(COLLECTION_CREATOR_ADDRESS))
      const response = await creator.sendCreateCollection(client.provider(sender.address), sender, {
        collectionCode: beginCell().endCell(),
        content: beginCell().storeUint(0, 8).storeString(JSON.stringify(eventMetadata)).endCell(),
        nftItemCode: beginCell().endCell(),
        value: toNano('0.05'),
      })
      
      setIsDeploying(true)
    } catch (error) {
      console.error('Error creating event:', error)
    } finally {
      setIsDeploying(false)
    }
  }

  return (
    <Page>
      <Card>
        <CardHeader>
          <CardTitle>Create an Event</CardTitle>
          <CardDescription>
            Create a new event and mint attendance NFTs
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="eventName">Event Name</Label>
            <Input
              id="eventName"
              placeholder="Enter event name"
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="eventDate">Date</Label>
              <Input
                id="eventDate"
                type="date"
                value={eventDate}
                onChange={(e) => setEventDate(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="eventTime">Time</Label>
              <Input
                id="eventTime"
                type="time"
                value={eventTime}
                onChange={(e) => setEventTime(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="eventLocation">Location</Label>
            <Input
              id="eventLocation"
              placeholder="Enter event location"
              value={eventLocation}
              onChange={(e) => setEventLocation(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="eventDescription">Description</Label>
            <Textarea
              id="eventDescription"
              placeholder="Enter event description"
              value={eventDescription}
              onChange={(e) => setEventDescription(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="maxAttendees">Maximum Attendees</Label>
            <Input
              id="maxAttendees"
              type="number"
              placeholder="Enter maximum number of attendees"
              value={maxAttendees}
              onChange={(e) => setMaxAttendees(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="eventImageUrl">Event Image URL</Label>
            <Input
              id="eventImageUrl"
              placeholder="Enter event image URL"
              value={eventImageUrl}
              onChange={(e) => setEventImageUrl(e.target.value)}
            />
          </div>

          <Button
            className="w-full"
            onClick={handleCreateCollection}
            disabled={isDeploying}
          >
            {isDeploying ? 'Creating Event...' : 'Create Event'}
          </Button>
        </CardContent>
      </Card>
    </Page>
  )
}
