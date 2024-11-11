// import useUser from '@/store/useUser.ts'
import React, {useState} from "react";
import {Badge, Button, Checkbox, Grid, Image, Switch, Tabs} from "antd-mobile"
import styles from './index.module.less'
import {AppOutline, DownFill, InformationCircleOutline, VideoOutline} from "antd-mobile-icons";
import ConnectWallet from "@/components/ConnectWallet";
import IconCopy from '@/assets/image/icon-copy.png'
import IconShare from '@/assets/image/icon-share.png'
import IconP from '@/assets/image/icon-p.png'
import IconUsdc from '@/assets/image/icon-usdc.png'
import IconSui from '@/assets/image/icon-sui.png'

const HomePage = () => {
  const [visibleWallet, setVisibleWallet] = useState(false)
  const closeWalletModal = () => {
    setVisibleWallet(false)
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
        <div className={styles.left}>
          <span className='mr-6'>Aggregator Mode </span>
          <Switch style={{
            '--height': '16px',
            '--width': '30px'
          }}/>
        </div>
        <div className={styles.right}>
          <div className={styles.toolItem}>
            <AppOutline fontSize={16} color='#ffffff'/>
          </div>

          <div className={styles.toolItem}>
            <AppOutline fontSize={16} color='#ffffff'/> <span className='ml-6'>5%</span>
          </div>

          <div className={styles.toolItem}>
            <Checkbox style={{'--icon-size': '14px'}}/>
          </div>
        </div>
      </div>
      {/* 交易区 */}
      <div className={styles.trade}>
        <div className={styles.tradeItem}>
          <div className={styles.tradeNum}>
            <div>Sell</div>
            <div className={styles.tradeTotal}>0.0</div>
          </div>
          <div className={styles.tradeBalance}>
            <div>Balance <span className='ml-6'>0</span></div>
            <div className={styles.tradeExchange}>
              <Image
                src={IconUsdc}
                width={24}
                height={24}
                fit='cover'
                style={{borderRadius: 24}}
              />
              <span className="ml-6 mr-12">USDC</span>
              <DownFill fontSize={12} color='#ffffff'/>
            </div>
          </div>
        </div>

        <div className={styles.tradeItem}>
          <div className={styles.tradeNum}>
            <div>Buy</div>
            <div className={styles.tradeTotal}>0.0</div>
          </div>
          <div className={styles.tradeBalance}>
            <div>Balance <span className='ml-6'>0</span></div>
            <div className={styles.tradeExchange}>
              <Image
                src={IconSui}
                width={24}
                height={24}
                fit='cover'
                style={{borderRadius: 24}}
              />
              <span className="ml-6 mr-12">Sui</span>
              <DownFill fontSize={12} color='#ffffff'/>
            </div>
          </div>
        </div>

        <div className={styles.traderFooter}>
          <Button block color='primary' size='large' onClick={() => setVisibleWallet(true)}>
            Connect Wallet
          </Button>
        </div>
      </div>

      {/* 信息 */}
      <div className={styles.price}>
        <div className={styles.priceHeader}>Price Reference <InformationCircleOutline fontSize={12} /></div>
        <div className={styles.priceItem}>
          <Grid columns={2} gap={8}>
            <Grid.Item>
              <div className={styles.info}>
                <div className={styles.infoMain}>
                  <Image
                    src={IconUsdc}
                    width={28}
                    height={28}
                    fit='cover'
                    style={{borderRadius: 28}}
                  />
                  <div className={styles.infoMainBox}>
                    <h3>USDC</h3>
                    <p>Native USDC</p>
                  </div>
                </div>

                <div className={styles.infoTag}>
                  <span className="text-ellipsis">0xdbUSDC USDCUSDCUSDC</span>
                  <Image
                    src={IconCopy}
                    width={12}
                    height={12}
                    fit='cover'
                  />
                  <Image
                    className="ml-6"
                    src={IconShare}
                    width={12}
                    height={12}
                    fit='cover'
                  />
                </div>
              </div>
            </Grid.Item>

            <Grid.Item>
              <div className={styles.chart}>
                <div className={styles.chartTag}>
                  <Image
                    className="mr-12"
                    src={IconP}
                    width={16}
                    height={16}
                    fit='cover'
                    style={{borderRadius: 16}}
                  />

                  <span className="mr-6">$0.9998</span>
                  <span className="text-red">-0.01%</span>
                </div>
              </div>
            </Grid.Item>
          </Grid>
        </div>

        <div className={styles.priceItem}>
          <Grid columns={2} gap={8}>
            <Grid.Item>
              <div className={styles.info}>
                <div className={styles.infoMain}>
                  <Image
                    src={IconUsdc}
                    width={28}
                    height={28}
                    fit='cover'
                    style={{borderRadius: 28}}
                  />
                  <div className={styles.infoMainBox}>
                    <h3>USDC</h3>
                    <p>Native USDC</p>
                  </div>
                </div>

                <div className={styles.infoTag}>
                  <span className="text-ellipsis">0xdbUSDC USDCUSDCUSDC</span>
                  <Image
                    src={IconCopy}
                    width={12}
                    height={12}
                    fit='cover'
                  />
                  <Image
                    className="ml-6"
                    src={IconShare}
                    width={12}
                    height={12}
                    fit='cover'
                  />
                </div>
              </div>
            </Grid.Item>

            <Grid.Item>
              <div className={styles.chart}>
                <div className={styles.chartTag}>
                  <Image
                    className="mr-12"
                    src={IconP}
                    width={16}
                    height={16}
                    fit='cover'
                    style={{borderRadius: 16}}
                  />

                  <span className="mr-6">$1.73</span>
                  <span className="text-red">-4.56%</span>
                </div>
              </div>
            </Grid.Item>
          </Grid>
        </div>
      </div>

    {/* 链接 wallet 弹窗 */}
      <ConnectWallet visible={visibleWallet} onClose={closeWalletModal} />
    </div>
  </>)
}

export default HomePage
