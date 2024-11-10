
// import useUser from '@/store/useUser.ts'
import {Badge, Button, Tabs} from "antd-mobile"
import {useState} from "react";
const Welcome = () => {
  const [bears, setBears] = useState(1)
  const increasePopulation = () => {
    setBears(bears+1)
  }
  return (
    <Tabs className={}>
      <Tabs.Tab title='Swap' key='swap'></Tabs.Tab>
      <Tabs.Tab title='Limit' key='limit'></Tabs.Tab>
      <Tabs.Tab
        title='DCA'
        key='dca'
      >
      </Tabs.Tab>
    </Tabs>
  )
}

export default Welcome
