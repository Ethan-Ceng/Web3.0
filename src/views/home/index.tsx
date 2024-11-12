// import useUser from '@/store/useUser.ts'
import React, {useEffect, useState} from "react";
import {Badge, Button, Checkbox, Grid, Image, Input, Switch, Tabs, Toast} from "antd-mobile"
import styles from './index.module.less'
import {AppOutline, DownFill, InformationCircleOutline, VideoOutline} from "antd-mobile-icons";
import ConnectWallet from "@/components/ConnectWallet";
import IconCopy from '@/assets/image/icon-copy.png'
import IconShare from '@/assets/image/icon-share.png'
import IconP from '@/assets/image/icon-p.png'
import IconUsdc from '@/assets/image/icon-usdc.png'
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
    <Tabs className={styles.tabs} stretch={false}>
      <Tabs.Tab title='Swap' key='swap'></Tabs.Tab>
      <Tabs.Tab title='Limit' key='limit'></Tabs.Tab>
      <Tabs.Tab title='DCA' key='dca'></Tabs.Tab>
    </Tabs>

    <div className={styles.container}>
      {/* 工具条 */}
      <div className={styles.toolBar}>
        <div></div>
        {/*<div className={styles.left}>*/}
        {/*  <span className='mr-6'>Aggregator Mode </span>*/}
        {/*  <Switch style={{*/}
        {/*    '--height': '16px',*/}
        {/*    '--width': '30px'*/}
        {/*  }}/>*/}
        {/*</div>*/}
        <div className={styles.right}>
          {/*<div className={styles.toolItem}>*/}
          {/*  <AppOutline fontSize={16} color='#ffffff'/>*/}
          {/*</div>*/}

          <div className={styles.toolItem}>
            <AppOutline onClick={() => setVisibleSetting(true)} fontSize={16} color='#ffffff'/> <span
            className='ml-6'>{settingValue}%</span>
          </div>

          {/*<div className={styles.toolItem}>*/}
          {/*  <Checkbox style={{'--icon-size': '14px'}}/>*/}
          {/*</div>*/}
        </div>
      </div>
      {/* 交易区 */}
      <div className={styles.trade}>
        <div className={styles.tradeItem}>
          <div className={styles.tradeNum}>
            <div>Sell</div>
            <div className={styles.tradeTotal}>
              <Input
                type="number"
                min={0.1}
                max={100}
                value={sellTotal}
                onChange={val => {
                  setSellTotal(val)
                }}
              />
            </div>
          </div>
          <div className={styles.tradeBalance}>
            <div>Balance <span className='ml-6'>{sellWallet?.balance}</span></div>
            <div className={styles.tradeExchange}>
              <CoinSelect onChange={type => sellCoinChange(type)}/>
            </div>
          </div>
        </div>

        <div className={styles.tradeItem}>
          <div className={styles.tradeNum}>
            <div>Buy</div>
            <div className={styles.tradeTotal}>
              <Input
                type="number"
                min={0.1}
                max={100}
                value={buyTotal}
                onChange={val => {
                  setBuyTotal(val)
                }}
              />
            </div>
          </div>
          <div className={styles.tradeBalance}>
            <div>Balance <span className='ml-6'>{buyWallet?.balance}</span></div>
            <div className={styles.tradeExchange}>
              <CoinSelect onChange={type => buyCoinChange(type)}/>
            </div>
          </div>
        </div>

        <div className={styles.traderFooter}>
          {account ? (
            <Button block color='primary' size='large' onClick={() => handleSwap(sellWallet.coinType, buyWallet.coinType, sellTotal, settingValue)}>
              Swap
            </Button>
          ) : (
            <Button block color='primary' size='large' onClick={() => setVisibleWallet(true)}>
              Connect Wallet
            </Button>
          )}
        </div>
      </div>

      {/* 信息 */}
      {/*<div className={styles.price}>*/}
      {/*  <div className={styles.priceHeader}>Price Reference <InformationCircleOutline fontSize={12}/></div>*/}
      {/*  <div className={styles.priceItem}>*/}
      {/*    <Grid columns={2} gap={8}>*/}
      {/*      <Grid.Item>*/}
      {/*        <div className={styles.info}>*/}
      {/*          <div className={styles.infoMain}>*/}
      {/*            <Image*/}
      {/*              src={IconUsdc}*/}
      {/*              width={28}*/}
      {/*              height={28}*/}
      {/*              fit='cover'*/}
      {/*              style={{borderRadius: 28}}*/}
      {/*            />*/}
      {/*            <div className={styles.infoMainBox}>*/}
      {/*              <h3>USDC</h3>*/}
      {/*              <p>Native USDC</p>*/}
      {/*            </div>*/}
      {/*          </div>*/}

      {/*          <div className={styles.infoTag}>*/}
      {/*            <span className="text-ellipsis">0xdbUSDC USDCUSDCUSDC</span>*/}
      {/*            <Image*/}
      {/*              src={IconCopy}*/}
      {/*              width={12}*/}
      {/*              height={12}*/}
      {/*              fit='cover'*/}
      {/*            />*/}
      {/*            <Image*/}
      {/*              className="ml-6"*/}
      {/*              src={IconShare}*/}
      {/*              width={12}*/}
      {/*              height={12}*/}
      {/*              fit='cover'*/}
      {/*            />*/}
      {/*          </div>*/}
      {/*        </div>*/}
      {/*      </Grid.Item>*/}

      {/*      <Grid.Item>*/}
      {/*        <div className={styles.chart}>*/}
      {/*          <div className={styles.chartTag}>*/}
      {/*            <Image*/}
      {/*              className="mr-12"*/}
      {/*              src={IconP}*/}
      {/*              width={16}*/}
      {/*              height={16}*/}
      {/*              fit='cover'*/}
      {/*              style={{borderRadius: 16}}*/}
      {/*            />*/}

      {/*            <span className="mr-6">$0.9998</span>*/}
      {/*            <span className="text-red">-0.01%</span>*/}
      {/*          </div>*/}
      {/*        </div>*/}
      {/*      </Grid.Item>*/}
      {/*    </Grid>*/}
      {/*  </div>*/}

      {/*  <div className={styles.priceItem}>*/}
      {/*    <Grid columns={2} gap={8}>*/}
      {/*      <Grid.Item>*/}
      {/*        <div className={styles.info}>*/}
      {/*          <div className={styles.infoMain}>*/}
      {/*            <Image*/}
      {/*              src={IconUsdc}*/}
      {/*              width={28}*/}
      {/*              height={28}*/}
      {/*              fit='cover'*/}
      {/*              style={{borderRadius: 28}}*/}
      {/*            />*/}
      {/*            <div className={styles.infoMainBox}>*/}
      {/*              <h3>USDC</h3>*/}
      {/*              <p>Native USDC</p>*/}
      {/*            </div>*/}
      {/*          </div>*/}

      {/*          <div className={styles.infoTag}>*/}
      {/*            <span className="text-ellipsis">0xdbUSDC USDCUSDCUSDC</span>*/}
      {/*            <Image*/}
      {/*              src={IconCopy}*/}
      {/*              width={12}*/}
      {/*              height={12}*/}
      {/*              fit='cover'*/}
      {/*            />*/}
      {/*            <Image*/}
      {/*              className="ml-6"*/}
      {/*              src={IconShare}*/}
      {/*              width={12}*/}
      {/*              height={12}*/}
      {/*              fit='cover'*/}
      {/*            />*/}
      {/*          </div>*/}
      {/*        </div>*/}
      {/*      </Grid.Item>*/}

      {/*      <Grid.Item>*/}
      {/*        <div className={styles.chart}>*/}
      {/*          <div className={styles.chartTag}>*/}
      {/*            <Image*/}
      {/*              className="mr-12"*/}
      {/*              src={IconP}*/}
      {/*              width={16}*/}
      {/*              height={16}*/}
      {/*              fit='cover'*/}
      {/*              style={{borderRadius: 16}}*/}
      {/*            />*/}

      {/*            <span className="mr-6">$1.73</span>*/}
      {/*            <span className="text-red">-4.56%</span>*/}
      {/*          </div>*/}
      {/*        </div>*/}
      {/*      </Grid.Item>*/}
      {/*    </Grid>*/}
      {/*  </div>*/}
      {/*</div>*/}

      {/* 链接 wallet 弹窗 */}
      <ConnectWallet visible={visibleWallet} onClose={closeWalletModal}/>
      {/* 设置弹窗 */}
      <Setting value={settingValue} visible={visibleSetting} onClose={() => setVisibleSetting(false)}
               onOk={(val) => setSettingValue(val)}/>
    </div>
  </>)
}

export default HomePage
