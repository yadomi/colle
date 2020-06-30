import React, { useEffect, useState } from 'react'
import { formatDistanceToNow } from 'date-fns'

const Entry = ({ id, isSelected, value, metadata }) => {
  return (
    <div className='Entry' data-is-selected={isSelected}>
      <header>
        <h1>{metadata.type}</h1>
        <h2>{formatDistanceToNow(metadata.copiedAt)}</h2>
      </header>
      <div>{value}</div>
    </div>
  )
}

export default function App ({ entries }) {
  const [position, setPosition] = useState(0)

  const onKeyUp = event => {
    event.preventDefault()

    switch (event.key) {
      case 'ArrowLeft':
        return setPosition(current => current - 1)
      case 'ArrowRight':
        return setPosition(current => current + 1)
      default:
        return
    }
  }

  useEffect(() => {
    document.addEventListener('keyup', onKeyUp)

    return () => {
      document.removeEventListener('keyup', onKeyUp)
    }
  })

  return (
    <div className='App'>
      <div className='App-Entries'>
        {entries.map((entry, index) => (
          <Entry isSelected={index === position} key={index} {...entry} />
        ))}
      </div>
    </div>
  )
}
