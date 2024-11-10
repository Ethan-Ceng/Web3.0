
// import useUser from '@/store/useUser.ts'
import {Badge, Button, Tabs} from "antd-mobile"
import {useState} from "react";
const Welcome = () => {
  const [bears, setBears] = useState(1)
  const increasePopulation = () => {
    setBears(bears+1)
  }
  return (
    <Tabs>
      <Tabs.Tab title='水果' key='fruits'>
        菠萝
      </Tabs.Tab>
      <Tabs.Tab title='蔬菜' key='vegetables'>
        西红柿
      </Tabs.Tab>
      <Tabs.Tab
        title={
          <Badge content='1' style={{ '--right': '-10px', '--top': '8px' }}>
            动物
          </Badge>
        }
        key='animals'
      >
        蚂蚁
      </Tabs.Tab>
    </Tabs>
  )
}

export default Welcome
