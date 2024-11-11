import {RouterProvider} from 'react-router-dom'
import {ConfigProvider} from "antd-mobile";
import enUS from 'antd-mobile/es/locales/en-US'
import router from '@/router/index'
// 钱包对接
import {createNetworkConfig, SuiClientProvider, WalletProvider} from '@mysten/dapp-kit';
import {getFullnodeUrl} from '@mysten/sui/client';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';

// Config options for the networks you want to connect to
const {networkConfig} = createNetworkConfig({
  localnet: {url: getFullnodeUrl('localnet')},
  mainnet: {url: getFullnodeUrl('mainnet')},
});
const queryClient = new QueryClient();

function App() {
  return (
    <ConfigProvider locale={enUS}>
      <QueryClientProvider client={queryClient}>
        <SuiClientProvider networks={networkConfig} defaultNetwork="localnet">
          <WalletProvider>
            <RouterProvider router={router}/>
          </WalletProvider>
        </SuiClientProvider>
      </QueryClientProvider>

    </ConfigProvider>
  )
}

export default App
