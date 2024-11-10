import { RouterProvider } from 'react-router-dom'
import { ConfigProvider } from "antd-mobile";
import enUS from 'antd-mobile/es/locales/en-US'
import router from '@/router/index'

function App() {
  return (
      <ConfigProvider locale={enUS}>
          <RouterProvider router={router} />
      </ConfigProvider>
  )
}

export default App
