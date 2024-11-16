import { useTonConnectUI } from '@tonconnect/ui-react';
import { Sender, SenderArguments } from '@ton/core';
import { useEffect, useState } from 'react';

export function useTonConnect(): { sender: Sender; connected: boolean } {
  const [tonConnectUI] = useTonConnectUI();
  const [connected, setConnected] = useState(tonConnectUI.connected);
  useEffect(() => {
    setConnected(tonConnectUI.connected);
  }, [tonConnectUI.connected]);
  return {
    sender: {
      send: async (args: SenderArguments) => {
        tonConnectUI.sendTransaction({
          messages: [
            {
              address: args.to.toString(),
              amount: args.value.toString(),
              payload: args.body?.toBoc().toString('base64'),
            },
          ],
          validUntil: Date.now() + 5 * 60 * 1000, // 5 minutes for user to approve
        });
      },
    },
    connected: connected,
  };
}
