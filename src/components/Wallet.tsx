import {
  ConnectionProvider,
  WalletProvider,
} from "wallet-adapter-react-xnft";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-phantom";
import { BackpackWalletAdapter } from "@solana/wallet-adapter-backpack";
import React, { useMemo } from "react";
import { SOLANA_URL } from "../constants";
import { useEndpoint } from "strata-foundation-react-xnft";

export const DEFAULT_ENDPOINT = SOLANA_URL;

const config: any = {
  commitment: "confirmed",
};

export const Wallet = ({
  children,
  cluster,
}: {
  children: React.ReactNode;
  cluster?: string;
}) => {
  const { endpoint, cluster: clusterFromUseEndpoint } = useEndpoint();

  // @solana/wallet-adapter-wallets includes all the adapters but supports tree shaking and lazy loading --
  // Only the wallets you configure here will be compiled into your application, and only the dependencies
  // of wallets that your users connect to will be loaded
  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
      new BackpackWalletAdapter()
    ],
    [clusterFromUseEndpoint]
  );

  return (
    <ConnectionProvider endpoint={cluster || endpoint} config={config}>
      <WalletProvider wallets={wallets} >
        {/* @ts-ignore */}
        {children}
      </WalletProvider>
    </ConnectionProvider>
  );
};
