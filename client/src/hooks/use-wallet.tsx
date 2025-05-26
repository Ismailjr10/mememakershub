import { useState, useEffect } from "react";
import { WalletService, type WalletConnection } from "@/lib/wallet";
import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";

export function useWallet() {
  const [wallet, setWallet] = useState<WalletConnection | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const { user, updateUser } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    // Load wallet from user profile if available
    if (user?.walletAddress && user?.walletType) {
      setWallet({
        address: user.walletAddress,
        type: user.walletType as 'ethereum' | 'solana',
      });
    }
  }, [user]);

  const connectWallet = async (connection: WalletConnection) => {
    setIsConnecting(true);
    try {
      setWallet(connection);
      
      // Update user profile with wallet info
      if (user) {
        await updateUser({
          walletAddress: connection.address,
          walletType: connection.type,
        });
      }

      toast({
        title: "Wallet Connected",
        description: `Successfully connected ${connection.type} wallet`,
      });
    } catch (error) {
      toast({
        title: "Connection Failed",
        description: "Failed to save wallet information",
        variant: "destructive",
      });
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnectWallet = async () => {
    if (!wallet) return;

    try {
      await WalletService.disconnectWallet(wallet.type);
      setWallet(null);
      
      // Remove wallet info from user profile
      if (user) {
        await updateUser({
          walletAddress: null,
          walletType: null,
        });
      }

      toast({
        title: "Wallet Disconnected",
        description: "Wallet has been disconnected successfully",
      });
    } catch (error) {
      toast({
        title: "Disconnection Failed",
        description: "Failed to disconnect wallet",
        variant: "destructive",
      });
    }
  };

  const getBalance = async () => {
    if (!wallet) return "0.0000";
    
    try {
      return await WalletService.getBalance(wallet.address, wallet.type);
    } catch (error) {
      console.error("Error getting balance:", error);
      return "0.0000";
    }
  };

  return {
    wallet,
    isConnecting,
    connectWallet,
    disconnectWallet,
    getBalance,
  };
}
