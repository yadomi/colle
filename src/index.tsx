import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'

const entries = [
  { value: 'Entry', metadata: { copiedAt: new Date(), type: 'text' } },
  {
    value: 'activitiesCount',
    metadata: { copiedAt: new Date(), type: 'text' }
  },
  { value: 'onShortcut', metadata: { copiedAt: new Date(), type: 'text' } },
  { value: '</div>', metadata: { copiedAt: new Date(), type: 'text' } },
  {
    value: '  display: flex;',
    metadata: { copiedAt: new Date(), type: 'text' }
  },
  { value: '/bin/bash -c', metadata: { copiedAt: new Date(), type: 'text' } },
  { value: '--no-orgs-data', metadata: { copiedAt: new Date(), type: 'text' } },
  {
    value: '5440fe0c6d8c4059826979d9730c05e6',
    metadata: { copiedAt: new Date(), type: 'text' }
  }
]

ReactDOM.render(
  <React.StrictMode>
    <App entries={entries} />
  </React.StrictMode>,
  document.getElementById('root')
)
