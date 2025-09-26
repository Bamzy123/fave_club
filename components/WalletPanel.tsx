import React, { useEffect, useState, useCallback } from 'react';
import { useCurrentAccount, useSuiClient } from '@mysten/dapp-kit';

type Props = {
  // optional: override explorer base (e.g. for devnet/mainnet)
  explorerBase?: string;
};

const truncate = (addr: string, start = 6, end = 4) => {
  if (!addr) return '';
  if (addr.length <= start + end) return addr;
  return `${addr.slice(0, start)}...${addr.slice(-end)}`;
};

const WalletPanel: React.FC<Props> = ({ explorerBase = 'https://explorer.sui.io/address/' }) => {
  const account = useCurrentAccount();
  const suiClient = useSuiClient();

  const [balance, setBalance] = useState<string | null>(null);
  const [isFetching, setIsFetching] = useState(false);

  const address = account?.address ?? '';

  const fetchBalance = useCallback(async (addr: string) => {
    if (!addr) {
      setBalance(null);
      return;
    }

    try {
      setIsFetching(true);
      // useSuiClient returns a client instance; call the common Sui SDK method to fetch SUI balance.
      // Different versions of the client may expose different methods; try common shapes with fallbacks.
      // Prefer client.getBalance(owner) or client.getCoins({ owner }) then sum SUI balance.

      // 1) try client.getBalance
      if (typeof (suiClient as any)?.getBalance === 'function') {
        const resp = await (suiClient as any).getBalance(addr);
        // resp may be a bigint or object with totalBalance field
        const value = resp?.totalBalance ?? resp ?? null;
        if (value != null) {
          // value might be in MIST (1 SUI = 1e9 MIST) or already in SUI depending on client.
          // We'll attempt to normalize if value is a number > 1e6 we assume it's mist — convert to SUI
          let suiVal = Number(value);
          if (suiVal > 1e6) suiVal = suiVal / 1e9;
          setBalance(suiVal.toFixed(2) + ' SUI');
          return;
        }
      }

      // 2) try client.getCoins({ owner }) and sum sui coin amounts
      if (typeof (suiClient as any)?.getCoins === 'function') {
        const coins = await (suiClient as any).getCoins({ owner: addr });
        // coins.data items may have balance in 'balance' or 'amount'
        const coinList = coins?.data ?? coins?.result ?? coins ?? [];
        let total = 0;
        for (const c of coinList) {
          const bal = Number(c?.balance ?? c?.amount ?? 0);
          total += bal;
        }
        // if totals look large, interpret as MIST
        if (total > 1e6) total = total / 1e9;
        setBalance(total.toFixed(2) + ' SUI');
        return;
      }

      // 3) if client has request to provider
      if ((suiClient as any)?.provider && typeof (suiClient as any).provider.getBalance === 'function') {
        const resp = await (suiClient as any).provider.getBalance({ owner: addr });
        const val = resp?.totalBalance ?? resp;
        let suiVal = Number(val ?? 0);
        if (suiVal > 1e6) suiVal = suiVal / 1e9;
        setBalance(suiVal.toFixed(2) + ' SUI');
        return;
      }

      // fallback: couldn't fetch — clear or show unknown
      setBalance('—');
    } catch (e) {
      console.warn('Could not fetch SUI balance', e);
      setBalance('—');
    } finally {
      setIsFetching(false);
    }
  }, [suiClient]);

  useEffect(() => {
    if (address) fetchBalance(address);
  }, [address, fetchBalance]);

  const copyAddress = async () => {
    if (!address) return;
    try {
      await navigator.clipboard.writeText(address);
      // small visual feedback — we could integrate toast but keep minimal
      const el = document.getElementById('wallet-copy-btn');
      if (el) {
        const prev = el.textContent;
        el.textContent = 'Copied';
        setTimeout(() => { if (el) el.textContent = 'Copy'; }, 1500);
      }
    } catch (e) {
      console.warn('Copy failed', e);
    }
  };

  const openExplorer = () => {
    if (!address) return;
    // open in new tab
    const url = `${explorerBase}${address}`;
    window.open(url, '_blank', 'noopener');
  };

  const connected = Boolean(address);

  return (
    <div className="max-w-sm w-full bg-gray-800/60 border border-gray-700 rounded-xl p-4">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-sm text-gray-300">{connected ? 'Wallet Connected' : 'Not Connected'}</div>
          <div className="mt-1 text-lg font-mono text-white">{connected ? truncate(address) : '—'}</div>
        </div>
        <div className="text-right">
          <div className="text-xs text-gray-400">Balance</div>
          <div className="text-sm text-white">{isFetching ? 'Loading...' : (balance ?? '—')}</div>
        </div>
      </div>

      <div className="mt-4 flex gap-3">
        <button
          id="wallet-copy-btn"
          onClick={copyAddress}
          disabled={!connected}
          className="flex-1 inline-flex items-center justify-center px-3 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 text-white text-sm disabled:opacity-50"
        >
          Copy
        </button>
        <button
          onClick={openExplorer}
          disabled={!connected}
          className="flex-1 inline-flex items-center justify-center px-3 py-2 rounded-lg bg-gradient-to-r from-pink-500 to-indigo-600 text-white text-sm hover:scale-105 transform transition disabled:opacity-50"
        >
          Explorer
        </button>
      </div>
    </div>
  );
};

export default WalletPanel;