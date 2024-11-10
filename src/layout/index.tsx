import React from 'react'
import {Outlet} from 'react-router-dom'
import {SafeArea} from 'antd-mobile'
import NavHeader from "./NavHeader";
import styles from './index.module.less'


const AppLayout: React.FC = () => {

    return (
        <div className={styles.layout}>
            <SafeArea position='top'/>
            <NavHeader />
            <div className={styles.content}>
                <Outlet/>
            </div>
            <SafeArea position='bottom'/>
        </div>
    )
}


export default AppLayout
