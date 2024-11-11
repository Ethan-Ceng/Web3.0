import React, {useState} from "react";
import {Grid, Image, Mask} from "antd-mobile";
import styles from './index.module.less'
import {CloseOutline} from "antd-mobile-icons";
import {useSuiClientQuery, ConnectButton, ConnectModal, useCurrentAccount} from '@mysten/dapp-kit';

// ICON
import IconSui from '@/assets/image/icon-sui.png'
import IconSuiet from '@/assets/image/icon-suiet.png'
import IconOkx from '@/assets/image/icon-okx.png'
import IconMartian from '@/assets/image/icon-martian.png'
import IconBitget from '@/assets/image/icon-bitget.png'
import IconSnap from '@/assets/image/icon-snap.png'
import IconBinance from '@/assets/image/icon-binance.png'
import IconGate from '@/assets/image/icon-gate.png'

const ConnectWallet = ({visible, onClose}) => {
  const currentAccount = useCurrentAccount();
  const [open, setOpen] = useState(false);

  return (
    <Mask visible={visible} onMaskClick={() => console.log(false)}>
      <div className={styles.wallet}>
        <div className={styles.header}>
          <div className={styles.title}>
            <h3>Connect a Wallet</h3>
            <p>Please select a wallet to connect to this dapp:</p>
          </div>
          <CloseOutline onClick={() => onClose && onClose()} fontSize={22} color="#fff" />
        </div>

        <Grid className="container" columns={2} gap={14}>
          <Grid.Item>
            <div className={styles.walletItem} onClick={() => setOpen(true)}>
              <Image
                src={IconSui}
                width={44}
                height={44}
                fit='cover'
                style={{borderRadius: 6}}
              />
              <div className={styles.walletName}>Sui Wallet</div>
            </div>
          </Grid.Item>

          <Grid.Item>
            <div className={styles.walletItem} onClick={() => setOpen(true)}>
              <Image
                src={IconSuiet}
                width={44}
                height={44}
                fit='cover'
                style={{borderRadius: 6}}
              />
              <div className={styles.walletName}>Suiet</div>
            </div>
          </Grid.Item>

          <Grid.Item>
            <div className={styles.walletItem}>
              <Image
                src={IconOkx}
                width={44}
                height={44}
                fit='cover'
                style={{borderRadius: 6}}
              />
              <div className={styles.walletName}>OKX</div>
            </div>
          </Grid.Item>

          <Grid.Item>
            <div className={styles.walletItem}>
              <Image
                src={IconMartian}
                width={44}
                height={44}
                fit='cover'
                style={{borderRadius: 6}}
              />
              <div className={styles.walletName}>Martian</div>
            </div>
          </Grid.Item>

          <Grid.Item>
            <div className={styles.walletItem}>
              <Image
                src={IconBitget}
                width={44}
                height={44}
                fit='cover'
                style={{borderRadius: 6}}
              />
              <div className={styles.walletName}>Bitget Wallet</div>
            </div>
          </Grid.Item>

          <Grid.Item>
            <div className={styles.walletItem}>
              <Image
                src={IconSnap}
                width={44}
                height={44}
                fit='cover'
                style={{borderRadius: 6}}
              />
              <div className={styles.walletName}>Sui MetaMask Snap</div>
            </div>
          </Grid.Item>

          <Grid.Item>
            <div className={styles.walletItem}>
              <Image
                src={IconBinance}
                width={44}
                height={44}
                fit='cover'
                style={{borderRadius: 6}}
              />
              <div className={styles.walletName}>Binance</div>
            </div>
          </Grid.Item>

          <Grid.Item>
            <div className={styles.walletItem}>
              <Image
                src={IconGate}
                width={44}
                height={44}
                fit='cover'
                style={{borderRadius: 6}}
              />
              <div className={styles.walletName}>Gate</div>
            </div>
          </Grid.Item>
        </Grid>
      </div>

      <ConnectModal
        trigger={
          <button disabled={!!currentAccount}> {currentAccount ? 'Connected' : 'Connect'}</button>
        }
        open={open}
        onOpenChange={(isOpen) => setOpen(isOpen)}
      />
    </Mask>
  )
}

export default ConnectWallet
