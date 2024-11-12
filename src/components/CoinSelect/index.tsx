import styles from "./index.module.less";
import React, {useEffect, useState} from "react";
import {Image, Popover, Toast} from "antd-mobile";
import {Action} from "antd-mobile/es/components/popover";
import {
  AntOutline,
  CheckOutline,
  DownFill,
  HandPayCircleOutline,
  ScanningOutline,
  TransportQRcodeOutline
} from "antd-mobile-icons";
// icon
import IconSui from '@/assets/image/icon-sui.png'
import IconSuiet from '@/assets/image/icon-suiet.png'
import IconOkx from '@/assets/image/icon-okx.png'
import IconMartian from '@/assets/image/icon-martian.png'
import IconBitget from '@/assets/image/icon-bitget.png'
import IconUsdc from '@/assets/image/icon-usdc.png'
import IconBinance from '@/assets/image/icon-binance.png'
import IconGate from '@/assets/image/icon-gate.png'
import {useWallets} from "@mysten/dapp-kit";


const CoinSelect = ({value, defaultList, onChange}) => {
  const wallets = useWallets();


  const actions: [] = [
    {
      type: 'USDC',
      icon: <Image
        src={IconUsdc}
        width={24}
        height={24}
        fit='cover'
        style={{borderRadius: 24}}
      />,
      text: 'USDC'
    },
    {
      type: 'Sui',
      icon: <Image
        src={IconSui}
        width={24}
        height={24}
        fit='cover'
        style={{borderRadius: 24}}
      />,
      text: 'Sui'
    },
    {
      type: 'Suiet',
      icon: <Image
        src={IconSuiet}
        width={24}
        height={24}
        fit='cover'
        style={{borderRadius: 24}}
      />,
      text: 'Suiet'
    },
    {
      type: 'OKX',
      icon: <Image
        src={IconOkx}
        width={24}
        height={24}
        fit='cover'
        style={{borderRadius: 24}}
      />,
      text: 'OKX'
    },
    {
      type: 'Martian',
      icon: <Image
        src={IconMartian}
        width={24}
        height={24}
        fit='cover'
        style={{borderRadius: 24}}
      />,
      text: 'Martian'
    },
    {
      type: 'Bitget',
      icon: <Image
        src={IconBitget}
        width={24}
        height={24}
        fit='cover'
        style={{borderRadius: 24}}
      />,
      text: 'Bitget'
    },
  ]

  const coinTypes = [
    {
      name: "Sui",
      type: "0x2::sui::SUI"
    },
    {
      name: "USDC",
      type: "0x5d4b302506645c37ff133b98c4b50a5ae14841659738d6d733d59d0d217a93bf::coin::COIN"
    },
    {
      name: "USDT",
      type: "0xc060006111016b8a020ad5b33834984a437aaa7d3c74c18e09a95d48aceab08c::coin::COIN"
    },
    {
      name: "Cetus",
      type: "0x06864a6f921804860930db6ddbe2e16acdf8504495ea7481637a1c8b9a8fe54b::cetus::CETUS"
    }
  ]

  const [selectValue, setSelectValue] = useState(actions[0])
  const handleSelect = (item) => {
    setSelectValue(item)
    // const coinType =
    onChange && onChange('0x2::sui::SUI')
  }

  useEffect(() => {
    console.log({wallets})
  }, [wallets, selectValue])

  return (<>
    <Popover
      mode='dark'
      content={
        <div className={styles.popContainer}>
          <div className={styles.popHeader}>
            Switch Chain
          </div>
          <ul className={styles.popList}>
            {actions.map(item => {
              return (
                <li key={item.type} className={styles.popListItem} onClick={() => handleSelect(item)}>
                  {item.icon}
                  <span>{item.text}</span>
                  {selectValue.type === item.type ? <CheckOutline fontSize={20} color='#ffffff'/> : null}
                </li>
              )
            })}

          </ul>
        </div>
      }
      placement='bottom'
      trigger='click'
    >
      <div className={styles.select}>
        {
          selectValue.icon
            ? selectValue.icon
            : (
              <Image
                src={IconSui}
                width={24}
                height={24}
                fit='cover'
                style={{borderRadius: 24}}
              />
            )
        }
        <span className="ml-12 mr-12">{selectValue.text || ''}</span>
        <DownFill fontSize={12} color='#ffffff'/>
      </div>
    </Popover>
  </>)
}

export default CoinSelect
