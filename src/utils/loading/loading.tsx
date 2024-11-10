import React from 'react';
import { Spin } from "antd-mobile";
import './loading.less'
const Loading: React.FC<{ tip?: string }> = ({ tip = 'loading...' }) => {
  return <Spin tip={tip} size="large" className='request-loading' />;
}

export default Loading;
