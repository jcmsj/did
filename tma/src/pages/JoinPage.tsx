import { useState } from "react"
import { Input } from "@/components/ui/input"
export default function JoinPage() {
    const [address, setAddress] = useState('')
    const [info, setInfo] = useState('')
    const handleJoin = async () => {
        if (!address) return
        try {
            // TODO: Implement Event join logic with TON address by calling the op code, provide user's wallet address
            console.log('Joining team with address:', address)
            // Update info
        } catch (error) {
            console.error('Error joining Event:', error)
        }
    }
    
    return <>
        {/* Use shadcdn to create a simple input boox for chaning address*/}
        <Input
            label='Enter Event Address'
            value={address}
            onChange={e => setAddress(e.target.value)}
            placeholder='Enter Event address'
        />
    </>
}
