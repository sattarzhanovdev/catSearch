import React from 'react'
import c from './auto.module.scss'
import axios from 'axios'

const AutoSearch = () => {
  const [ high, setHigh ] = React.useState(null)
  const [ low, setLow ] = React.useState(null)

  const currencies = [
    {
      id: 1, 
      currency: 'SOLO'
    },
    {
      id: 2,
      currency: 'EOS'
    },
    {
      id: 3, 
      currency: 'SUI'
    },
    {
      id: 4, 
      currency: 'AAVE'
    }
  ]

  const binance_url = 'https://api.binance.com/api/v3'

  const getBinancePrice = () => {
    currencies.map(item => {
      axios.get(`${binance_url}/ticker/bookTicker?symbol=${item.currency}USDT`)
        .then(res => {
          console.log(res.data);
          const askPrice = parseFloat(res.data?.askPrice).toFixed(2)          
          const bidPrice = parseFloat(res.data?.bidPrice).toFixed(2)          
          const spread = askPrice - bidPrice
          console.log(Number(parseFloat(spread).toFixed(2)));
          // res1.push({
          //   stock: 'Binance', 
          //   symbol: res.data.symbol, 
          //   price: parseFloat(res.data?.askPrice).toFixed(2), 
          //   // spread: parseFloat(spread).toFixed(2)
          // })
        }) 
        .catch(() => {
          return ;
        })
    })
  }

  React.useEffect(() => {
    getBinancePrice()
  }, [])

  return (
    <div className={c.auto}>
      <div className={c.marginal}>
        <div className={c.left}>
          <div>Маржинальные</div>
          <p>Больше 0,5%</p>
        </div>
      </div>
      <div className={c.lessMarginal}>
        <div className={c.left}>
          <div>Менее маржинальные</div>
          <p>Меньше 0,4%</p>
        </div>
      </div>
    </div>
  )
}

export default AutoSearch