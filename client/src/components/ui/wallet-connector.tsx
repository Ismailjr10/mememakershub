import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { WalletService, type WalletConnection } from "@/lib/wallet";
import { useToast } from "@/hooks/use-toast";

interface WalletConnectorProps {
  onConnect: (wallet: WalletConnection) => void;
  children: React.ReactNode;
}

export function WalletConnector({ onConnect, children }: WalletConnectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const { toast } = useToast();

  const handleConnect = async (type: 'ethereum' | 'solana') => {
    setIsConnecting(true);
    try {
      let connection: WalletConnection | null = null;
      
      if (type === 'ethereum') {
        connection = await WalletService.connectEthereum();
      } else if (type === 'solana') {
        connection = await WalletService.connectSolana();
      }

      if (connection) {
        onConnect(connection);
        setIsOpen(false);
        toast({
          title: "Wallet Connected",
          description: `Successfully connected to ${type} wallet`,
        });
      }
    } catch (error) {
      toast({
        title: "Connection Failed",
        description: error instanceof Error ? error.message : "Failed to connect wallet",
        variant: "destructive",
      });
    } finally {
      setIsConnecting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Connect Your Wallet</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Button
            onClick={() => handleConnect('ethereum')}
            disabled={isConnecting}
            className="w-full flex items-center justify-center space-x-3 h-12"
            variant="outline"
          >
            <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"></div>
            <span>Connect MetaMask (ETH)</span>
          </Button>
          
          <Button
            onClick={() => handleConnect('solana')}
            disabled={isConnecting}
            className="w-full flex items-center justify-center space-x-3 h-12"
            variant="outline"
          >
            <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full"></div>
            <span>Connect Phantom (SOL)</span>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
