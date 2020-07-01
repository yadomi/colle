import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'
import { ipcRenderer } from 'electron'

const Provider = () => {
  const [state, setState] = React.useState([])

  React.useEffect(() => {
    ipcRenderer.on('update', (event, data) => {
      setState(data)
    })
  }, [])

  return <App entries={state} />
}

ReactDOM.render(
  <React.StrictMode>
    <Provider />
  </React.StrictMode>,
  document.getElementById('root')
)
