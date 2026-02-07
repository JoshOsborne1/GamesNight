import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import Display from './Display'
import Host from './Host'
import ErrorBoundary from './components/ErrorBoundary'

const path = window.location.pathname
const isHost = path.includes('host')

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary>
      {isHost ? <Host /> : <Display />}
    </ErrorBoundary>
  </React.StrictMode>
)
