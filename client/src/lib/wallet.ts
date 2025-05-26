declare global {
  interface Window {
    ethereum?: any;
    solana?: any;
  }
}

export type WalletType = 'ethereum' | 'solana';

export interface WalletConnection {
  address: string;
  type: WalletType;
}

export class WalletService {
  static async connectEthereum(): Promise<WalletConnection | null> {
    if (!window.ethereum) {
      throw new Error('MetaMask is not installed');
    }

    try {
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });

      if (accounts.length === 0) {
        throw new Error('No accounts found');
      }

      return {
        address: accounts[0],
        type: 'ethereum',
      };
    } catch (error) {
      console.error('Error connecting to Ethereum wallet:', error);
      throw error;
    }
  }

  static async connectSolana(): Promise<WalletConnection | null> {
    if (!window.solana || !window.solana.isPhantom) {
      throw new Error('Phantom wallet is not installed');
    }

    try {
      const response = await window.solana.connect();
      
      return {
        address: response.publicKey.toString(),
        type: 'solana',
      };
    } catch (error) {
      console.error('Error connecting to Solana wallet:', error);
      throw error;
    }
  }

  static async disconnectWallet(type: WalletType): Promise<void> {
    try {
      if (type === 'ethereum' && window.ethereum) {
        // MetaMask doesn't have a disconnect method, but we can clear the connection
        await window.ethereum.request({
          method: 'wallet_requestPermissions',
          params: [{ eth_accounts: {} }],
        });
      } else if (type === 'solana' && window.solana) {
        await window.solana.disconnect();
      }
    } catch (error) {
      console.error('Error disconnecting wallet:', error);
      throw error;
    }
  }

  static async getBalance(address: string, type: WalletType): Promise<string> {
    try {
      if (type === 'ethereum' && window.ethereum) {
        const balance = await window.ethereum.request({
          method: 'eth_getBalance',
          params: [address, 'latest'],
        });
        
        // Convert from wei to ETH
        const ethBalance = parseInt(balance, 16) / Math.pow(10, 18);
        return ethBalance.toFixed(4);
      } else if (type === 'solana' && window.solana) {
        // For Solana, you'd typically use @solana/web3.js
        // This is a simplified version
        return '0.0000';
      }
      
      return '0.0000';
    } catch (error) {
      console.error('Error getting wallet balance:', error);
      return '0.0000';
    }
  }
}
