import React from 'react'
import c from './App.scss'
import { Pages } from './pages'

const App = () => {
  return (
    <div className={c.app}>
      <Pages.Main />
    </div>
  )
}

export default App