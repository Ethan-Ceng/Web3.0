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
  /**
   * 切换代币查询余额并返回
   */
  // const wallets = useWallets();

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
      type: 'USDT',
      icon: <Image
        src={IconUsdc}
        width={24}
        height={24}
        fit='cover'
        style={{borderRadius: 24}}
      />,
      text: 'USDT'
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
    // {
    //   type: 'Suiet',
    //   icon: <Image
    //     src={IconSuiet}
    //     width={24}
    //     height={24}
    //     fit='cover'
    //     style={{borderRadius: 24}}
    //   />,
    //   text: 'Suiet'
    // },
    // {
    //   type: 'OKX',
    //   icon: <Image
    //     src={IconOkx}
    //     width={24}
    //     height={24}
    //     fit='cover'
    //     style={{borderRadius: 24}}
    //   />,
    //   text: 'OKX'
    // },
    // {
    //   type: 'Martian',
    //   icon: <Image
    //     src={IconMartian}
    //     width={24}
    //     height={24}
    //     fit='cover'
    //     style={{borderRadius: 24}}
    //   />,
    //   text: 'Martian'
    // },
    // {
    //   type: 'Bitget',
    //   icon: <Image
    //     src={IconBitget}
    //     width={24}
    //     height={24}
    //     fit='cover'
    //     style={{borderRadius: 24}}
    //   />,
    //   text: 'Bitget'
    // },
  ]

  const coinTypes = [
    {
      name: "Sui",
      type: "0x2::sui::SUI"
    },
    {
      name: "USDC",
      type: "0x8d710cb7cfb0b038e4476818a6ff2637bc6787a7d5ba74bee93026e89b2f909a::zy::ZY"
    },
    {
      name: "USDT",
      type: "0x6e7e3898e3d29376dbed82fae09f51eb01724a234af3f7ee2010bcaa51c59174::usdt::USDT"
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
    const typeItem = coinTypes.find(i => i.name === item.type)
    console.log('setSelectValue', item, typeItem)
    if (typeItem?.type) {
      onChange && onChange(typeItem?.type)
    } else {
      Toast.show('Type not found!')
    }
  }
  //
  // useEffect(() => {
  //   console.log({wallets})
  // }, [wallets, selectValue])

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
