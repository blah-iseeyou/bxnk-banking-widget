import { useState, useEffect } from 'react'
import { Button } from 'tiny-ui';

import ModalLogin from './Components/ModalLogin'
import { URL_WS } from './Context/Params'


import './Styles/App.scss'


function App(props) {

  const {
    onLogin = () => {}
  } = props

  const [URL, setURL] = useState(props?.URL || import.meta.env.VITE_APP_WEB_SERVICE)
  const [visible, setVisible] = useState(false);

  useEffect(() => {

    if (props?.URL !== URL && props?.URL)
      setURL(props?.URL)

  })

  return (
    <>
      <URL_WS.Provider value={URL}>
        <Button btnType="primary" onClick={() => setVisible(true)} size="sm">Primary</Button>
        <ModalLogin 
          visible={visible}
          onCancel={()=>setVisible(false)}
          onLogin={onLogin}
        />
      </URL_WS.Provider>
    </>
  )
}

export default App
