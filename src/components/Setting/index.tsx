import React, {useEffect, useState} from "react";
import {Grid, Image, Input, Mask} from "antd-mobile";
import styles from './index.module.less'
import {CloseOutline} from "antd-mobile-icons";

const Setting = ({value, visible, onClose}) => {
  const [setting, setSetting] = useState(0.5)
  useEffect(() => {
    if (visible) {
      setSetting(value)
    }
  }, [visible])
  return (
    <Mask visible={visible} onMaskClick={() => console.log(false)}>
      <div className={styles.wallet}>
        <div className={styles.header}>
          <div className={styles.title}>
            <h3>Settings</h3>
            <p>Slippage Tolerance</p>
          </div>
          <CloseOutline onClick={() => onClose && onClose(setting)} fontSize={22} color="#fff"/>
        </div>
        <div className={styles.container}>
          <Grid columns={4} gap={0}>
            <Grid.Item>
              <div className={`${styles.walletItem} ${setting === 0.1 ? styles.active : ''}`} onClick={() => setSetting(0.1)}>
                <div className={styles.walletName}>0.1%</div>
              </div>
            </Grid.Item>
            <Grid.Item>
              <div className={`${styles.walletItem} ${setting === 0.5 ? styles.active : ''}`} onClick={() => setSetting(0.5)}>
                <div className={styles.walletName}>0.5%</div>
              </div>
            </Grid.Item>
            <Grid.Item>
              <div className={`${styles.walletItem} ${setting === 1 ? styles.active : ''}`} onClick={() => setSetting(1)}>
                <div className={styles.walletName}>1%</div>
              </div>
            </Grid.Item>
            <Grid.Item>
              <div className={styles.walletInput}>
                <Input
                  type="number"
                  value={setting}
                  onChange={val => {
                    setSetting(val)
                  }}
                />
              </div>
            </Grid.Item>
          </Grid>
        </div>
        <div className={styles.footer}>
          <div className={styles.cancel}>
            Cancel
          </div>
          <div className={styles.confirm}>
            Confirm
          </div>
        </div>
      </div>
    </Mask>
  )
}

export default Setting
