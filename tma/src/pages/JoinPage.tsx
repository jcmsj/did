import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { toast } from "@/hooks/use-toast"
import { Toaster } from "@/components/ui/toaster"

export default function JoinPage() {
    const [address, setAddress] = useState('')
    const [info, setInfo] = useState('')

    const handleJoin = async () => {
        if (!address) {
            toast({
                title: "Error",
                description: "Please enter an Event address",
                variant: "destructive",
            })
            return
        }

        try {
            // TODO: Implement Event join logic
            console.log('Joining team with address:', address)
            toast({
                title: "Success",
                description: "Successfully joined the Event!",
            })
        } catch (error) {
            console.error('Error joining Event:', error)
            toast({
                title: "Error",
                description: "Failed to join the Event",
                variant: "destructive",
            })
        }
    }
    
    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50">
            <Card className="w-full max-w-md p-6 space-y-6">
                <div className="space-y-2 text-center">
                    <h1 className="text-3xl font-bold">Join Event</h1>
                    <p className="text-gray-500">Enter the Event address to join</p>
                </div>
                
                <div className="space-y-4">
                    <Input
                        value={address}
                        onChange={e => setAddress(e.target.value)}
                        placeholder="Enter Event address"
                        className="w-full"
                    />
                    
                    <Button 
                        onClick={handleJoin} 
                        className="w-full"
                        variant="default"
                    >
                        Join Event
                    </Button>
                </div>

                {info && (
                    <p className="text-sm text-gray-500 text-center">{info}</p>
                )}
                <Toaster />
            </Card>
        </div>
    )
}
