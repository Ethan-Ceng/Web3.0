import React, {useState} from 'react'
import styles from './index.module.less'
import {Image, List, Popup} from 'antd-mobile'
import {AppstoreOutline, BellOutline, DownFill} from "antd-mobile-icons";
import LogoImg from '@/assets/image/logo.png'
import IconSui from '@/assets/image/icon-sui.png'
// 菜单icon
import IconExchange from '@/assets/image/icon-exchange.png'
import IconChart from '@/assets/image/icon-chart.png'
import IconDCA from '@/assets/image/icon-dca.png'

import IconNode from '@/assets/image/icon-node.png'
import IconExp from '@/assets/image/icon-exp.png'
import IconLang from '@/assets/image/icon-lang.png'
// 底部快捷
import IconX from '@/assets/image/icon-x.png'
import IconTele from '@/assets/image/icon-tele.png'
import IconM from '@/assets/image/icon-m.png'


const NavHeader = () => {
  const [visibleMenu, setVisibleMenu] = useState(false)


  return (<>
    <div className={styles.navHeader}>
      <div className={styles.logo}>
        <img className={styles.logoImg} src={LogoImg} alt=''/>
      </div>

      <div className={styles.flexItem}></div>

      <div className={styles.navItem}>
        <Image
          className="mr-12"
          src={IconSui}
          width={24}
          height={24}
          fit='cover'
          style={{borderRadius: 24}}
        />

        <DownFill fontSize={12} color='#ffffff'/>
      </div>
      <div className={styles.navItem}>
        Connect
      </div>
      <div className={styles.navItem}>
        <BellOutline fontSize={22} color='#ffffff'/>
      </div>
      <div className={styles.menuItem} onClick={() => setVisibleMenu(true)}>
        <AppstoreOutline fontSize={22} color='#ffffff'/>
      </div>

    </div>

    {/* 侧边弹出层 */}
    <Popup
      visible={visibleMenu}
      position='left'
      onMaskClick={() => {
        setVisibleMenu(false)
      }}
      onClose={() => {
        setVisibleMenu(false)
      }}
      bodyStyle={{
        width: '80vw',
        background: '#121212BF',
        opacity: 1
      }}
    >
      <div className={styles.navSide}>

        {/* 菜单 */}
        <div className={styles.sideMenu}>
          <div className={styles.sideMenuSub}>
            <div className={styles.sideMenuSubTitle}>
              <span className="mr-12">Trade</span><DownFill fontSize={12} color='#ffffff'/>
            </div>
            <ul className={styles.sideMenuSubList}>
              <li className={styles.sideMenuSubListItem}>
                <Image
                  src={IconExchange}
                  width={18}
                  height={18}
                  fit='cover'
                  style={{marginRight: 4}}
                />
                <span>Swap</span>
              </li>
              <li className={styles.sideMenuSubListItem}>
                <Image
                  src={IconChart}
                  width={18}
                  height={18}
                  fit='cover'
                  style={{marginRight: 4}}
                />
                <span>Limit Order</span>
              </li>
              <li className={styles.sideMenuSubListItem}>
                <Image
                  src={IconDCA}
                  width={18}
                  height={18}
                  fit='cover'
                  style={{marginRight: 4}}
                />
                <span>DCA</span>
              </li>
            </ul>
          </div>

          <div className={styles.sideMenuItem}>
            <span>xCETUS</span>
          </div>
          <div className={styles.sideMenuItem}>
            <span>Launchpad</span>
          </div>
        </div>
        {/*列表*/}
        <ul className={styles.sideList}>
          <li className={styles.sideListItem}>
            <Image
              src={IconNode}
              width={18}
              height={18}
              fit='cover'
              style={{marginRight: 6}}
            />
            <span>RPC Node</span>
          </li>
          <li className={styles.sideListItem}>
            <Image
              src={IconExp}
              width={18}
              height={18}
              fit='cover'
              style={{marginRight: 6}}
            />
            <span>Preferred Explorer</span>
          </li>
          <li className={styles.sideListItem}>
            <Image
              src={IconLang}
              width={18}
              height={18}
              fit='cover'
              style={{marginRight: 6}}
            />
            <span>English</span>
            <DownFill fontSize={12} color='#ffffff'/>
          </li>
        </ul>
        {/* 快捷方式 */}
        <div className={styles.sideFooter}>
          <Image
            className="mr-12"
            src={IconX}
            width={24}
            height={24}
            fit='cover'
            style={{marginLeft: 12}}
          />

          <Image
            className="mr-12"
            src={IconTele}
            width={32}
            height={32}
            fit='cover'
            style={{marginLeft: 12}}
          />

          <Image
            className="mr-12"
            src={IconM}
            width={32}
            height={32}
            fit='cover'
            style={{marginLeft: 12}}
          />
        </div>
      </div>
    </Popup>
  </>)
}

export default NavHeader