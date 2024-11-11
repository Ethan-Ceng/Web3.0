import styles from "./index.module.less";
import React, {useState} from "react";
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
import IconSnap from '@/assets/image/icon-snap.png'
import IconBinance from '@/assets/image/icon-binance.png'
import IconGate from '@/assets/image/icon-gate.png'

const CoinSelect = ({value, defaultList, onChange}) => {
  const actions: [] = [
    {
      type: 'Sui',
      icon: <Image
        src={IconSui}
        width={26}
        height={26}
        fit='cover'
        style={{borderRadius: 26}}
      />,
      text: 'Sui'
    },
    {
      type: 'Suiet',
      icon: <Image
        src={IconSuiet}
        width={26}
        height={26}
        fit='cover'
        style={{borderRadius: 26}}
      />,
      text: 'Suiet'
    },
    {
      type: 'OKX',
      icon: <Image
        src={IconOkx}
        width={26}
        height={26}
        fit='cover'
        style={{borderRadius: 26}}
      />,
      text: 'OKX'
    },
    {
      type: 'Martian',
      icon: <Image
        src={IconMartian}
        width={26}
        height={26}
        fit='cover'
        style={{borderRadius: 26}}
      />,
      text: 'Martian'
    },
    {
      type: 'Bitget',
      icon: <Image
        src={IconBitget}
        width={26}
        height={26}
        fit='cover'
        style={{borderRadius: 26}}
      />,
      text: 'Bitget'
    },
  ]

  const [selectValue, setSelectValue] = useState(actions[0])
  const handleSelect = (item) => {
    setSelectValue(item)
    onChange && onChange(item.type)
  }
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
                <li className={styles.popListItem} onClick={() => handleSelect(item)}>
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
