// import useUser from '@/store/useUser.ts'
import React, {useEffect, useState} from "react";
import {Badge, Button, Checkbox, Grid, Image, Input, Switch, Tabs, Toast} from "antd-mobile"
import styles from './index.module.less'
import {AppOutline, DownFill, InformationCircleOutline, LeftOutline, VideoOutline} from "antd-mobile-icons";
import ConnectWallet from "@/components/ConnectWallet";
import IconMining from '@/assets/image/icon-mining.png'
import IconUSDC from '@/assets/image/icon-usdc.png'
import IconWUSDC from '@/assets/image/icon-wusdc.png'
import IconSui from '@/assets/image/icon-sui.png'
import CoinSelect from "../../components/CoinSelect";
import Setting from "../../components/Setting";
// 钱包相关
import {
  useAccounts,
  useCurrentAccount,
  useSuiClient,
  ConnectButton,
  ConnectModal,
  useSignAndExecuteTransaction
} from "@mysten/dapp-kit";
import {coinWithBalance, Transaction} from "@mysten/sui/transactions";
import Decimal from 'decimal.js'

const HomePage = () => {
  const [visibleWallet, setVisibleWallet] = useState(false)
  // 设置
  const [visibleSetting, setVisibleSetting] = useState(false)
  const [settingValue, setSettingValue] = useState(0.5)
  const closeWalletModal = () => {
    setVisibleWallet(false)
  }

  // 钱包账号
  const client = useSuiClient();
  const account = useCurrentAccount();
  const {mutate: signAndExecuteTransaction} = useSignAndExecuteTransaction();

  // 查询代币单位
  async function getCoinMetadata(coinType) {
    const metadata = await client.getCoinMetadata({
      "coinType": coinType
    })
    return metadata;
  }

  // 代币余额
  async function getCoinBalanceWithParam(address, coin) {
    const balance = await client.getBalance({
      owner: address,
      coinType: coin
    });
    const coinMeta = await getCoinMetadata(coin)
    // console.log('BigInt', balance, BigInt(balance.totalBalance), coinMeta)
    const divisor = new Decimal(10).pow(coinMeta.decimals);
    const readableBalance = new Decimal(balance.totalBalance).div(divisor);
    // console.log('Decimal', divisor, readableBalance)
    return readableBalance.toNumber();
  }

  const [sellTotal, setSellTotal] = useState(0.0)
  const [sellWallet, setSellWallet] = useState({
    coinType: '',
    balance: 0
  })
  const sellCoinChange = async (coinType) => {
    /**
     * {
     *   name: "Sui",
     *   type: "0x2::sui::SUI"
     * }
     */
    if (account?.address && coinType) {
      const balance = await getCoinBalanceWithParam(account.address, coinType)
      setSellWallet({
        coinType,
        balance
      })
    }
  }

  const [buyTotal, setBuyTotal] = useState(0.0)
  const [buyWallet, setBuyWallet] = useState({
    coinType: '',
    balance: 0
  })
  const buyCoinChange = async (coinType) => {
    /**
     * {
     *   name: "Sui",
     *   type: "0x2::sui::SUI"
     * }
     */
    if (account?.address && coinType) {
      const balance = await getCoinBalanceWithParam(account.address, coinType)
      setBuyWallet({
        coinType,
        balance
      })
    }
  }

  // 交易swap
  const swapPackageId = '0x717a550de67b621fa67c58e9d04c8dca623569ebdbb763a563f15c0891e914a6';
  const swapShareObject = '0x575a3425baad05f8991639fbf6a58b87a475db423b0f1d95b2c9bf9d14f99441';
  const handleSwap = async (coinSell, coinBuy, amount, slippage) => {
    console.log({coinSell, coinBuy, amount, slippage})
    if (!coinSell || !coinBuy || !amount || !slippage) {
      Toast.show('please input!')
      return
    }
    const tx = new Transaction();
    tx.setSender(account?.address)
    const coinAMetadata = await getCoinMetadata(coinSell);
    const divisor = new Decimal(10).pow(coinAMetadata.decimals);
    const coinAout = new Decimal(amount).mul(divisor);
    console.log({tx, coinAMetadata, divisor, coinAout})
    tx.moveCall({
      target: `${swapPackageId}::interface::swap`,
      arguments: [
        tx.object(`${swapShareObject}`),
        tx.object(coinWithBalance({balance: coinAout, type: coinSell})),
        tx.pure.u64(0),
      ],
      typeArguments: [
        coinSell,
        coinBuy,
      ],
    });
    console.log({tx})
    signAndExecuteTransaction(
      {
        transaction: tx
      },
      {
        onSuccess: (result) => {
          console.log('Executed transaction:', result);
          Toast.show('Transaction executed successfully!');
        },
        onError: (error) => {
          console.error('Transaction error:', error);
          Toast.show('Transaction failed!');
        },
      },
    );
  }

  return (<>
    <div className={styles.headerBack}>
      <LeftOutline fontSize={16} /> <span className="ml-6">Pools</span>
    </div>

    <div className={styles.container}>
      {/* 工具条 */}
      <div className={styles.toolBar}>
        <div className={styles.left}>
          <div className="mr-12">
            <CoinSelect onChange={type => sellCoinChange(type)}/>
          </div>

          <CoinSelect onChange={type => sellCoinChange(type)}/>
        </div>

        <div className={styles.right}>

        </div>
      </div>
      {/* 交易区 */}
      <div className={styles.liquidity}>
        <div className={styles.liquidityItem}>
          <div className={styles.liquidityItemHeader}>
            <Image
              src={IconSui}
              width={34}
              height={34}
              fit='cover'
              style={{borderRadius: 34}}
            />
            <Image
              src={IconWUSDC}
              width={34}
              height={34}
              fit='cover'
              style={{borderRadius: 34}}
            />
            <span className="ml-6 mr-6">Sui - wUSDC</span>
            <span className={styles.liquidityTag}>0.25%</span>
            <Image
              src={IconMining}
              width={20}
              height={20}
              fit='cover'
              style={{borderRadius: 20}}
            />
          </div>
          <ul className={styles.mainList}>
            <li className={styles.mainListItem}>
              <span>APR(24H)</span>
              <span>189.87%</span>
            </li>

            <li className={styles.mainListItem}>
              <span>Liquidity</span>
              <span>$11,831,478.68</span>
            </li>

            <li className={styles.mainListItem}>
              <span>Volume (24H)</span>
              <span>$22,386,260.58</span>
            </li>

            <li className={styles.mainListItem}>
              <span>Fees (24H)</span>
              <span>$55,965.65</span>
            </li>
            <li className={styles.mainListItem}>
              <span>Mining Rewards</span>
              <span className={styles.flexRow}>
                <Image
                  src={IconSui}
                  width={20}
                  height={20}
                  fit='cover'
                  style={{borderRadius: 20}}
                />
                <Image
                  src={IconWUSDC}
                  width={20}
                  height={20}
                  fit='cover'
                  style={{borderRadius: 20}}
                />
              </span>
            </li>
          </ul>
          <div className={styles.liquidityAdd}>+ Add Liquidity</div>
        </div>

        <div className={styles.liquidityItem}>
          <div className={styles.liquidityItemHeader}>
            <Image
              src={IconSui}
              width={34}
              height={34}
              fit='cover'
              style={{borderRadius: 34}}
            />
            <Image
              src={IconWUSDC}
              width={34}
              height={34}
              fit='cover'
              style={{borderRadius: 34}}
            />
            <span className="ml-6 mr-6">Sui - wUSDC</span>
            <span className={styles.liquidityTag}>0.25%</span>
            <Image
              src={IconMining}
              width={20}
              height={20}
              fit='cover'
              style={{borderRadius: 20}}
            />
          </div>
          <ul className={styles.mainList}>
            <li className={styles.mainListItem}>
              <span>APR(24H)</span>
              <span>189.87%</span>
            </li>

            <li className={styles.mainListItem}>
              <span>Liquidity</span>
              <span>$11,831,478.68</span>
            </li>

            <li className={styles.mainListItem}>
              <span>Volume (24H)</span>
              <span>$22,386,260.58</span>
            </li>

            <li className={styles.mainListItem}>
              <span>Fees (24H)</span>
              <span>$55,965.65</span>
            </li>
            <li className={styles.mainListItem}>
              <span>Mining Rewards</span>
              <span className={styles.flexRow}>
                <Image
                  src={IconSui}
                  width={20}
                  height={20}
                  fit='cover'
                  style={{borderRadius: 20}}
                />
                <Image
                  src={IconWUSDC}
                  width={20}
                  height={20}
                  fit='cover'
                  style={{borderRadius: 20}}
                />
              </span>
            </li>
          </ul>
          <div className={styles.liquidityAdd}>+ Add Liquidity</div>
        </div>
      </div>


      {/* 链接 wallet 弹窗 */}
      <ConnectWallet visible={visibleWallet} onClose={closeWalletModal}/>
      {/* 设置弹窗 */}
      <Setting value={settingValue} visible={visibleSetting} onClose={() => setVisibleSetting(false)}
               onOk={(val) => setSettingValue(val)}/>
    </div>
  </>)
}

export default HomePage
