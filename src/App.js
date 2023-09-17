import React from 'react'
import cat from './images/cat.svg'
import { Components } from './components'
import './font/stylesheet.css'
import './App.scss'

const App = () => {
  const [ active, setActive ] = React.useState(1)

  return (
    <div className='app'>
      <div className='types'>
        <div className='up'>
          <img 
            src={cat}
            alt="cat"
          />
          <div className='text'>
            <h1>CatSearch</h1>
            <p>Разработка самого Даниеля Ажиева (02/020/DAN)</p>

          </div>
        </div>
        <div className='down'>
          <button 
            onClick={() => setActive(1)}
            className={active === 1 ? 'active' : ''}
          >
            AutoSearch
          </button>
          <button 
            onClick={() => setActive(2)}
            className={active === 2 ? 'active' : ''}
          >
            ManualSearch
          </button>
        </div>
      </div>
      {
        active === 1 ?
        <Components.AutoSearch /> :
        <Components.ManualSearch /> 
      }
    </div>
  )
}

export default App