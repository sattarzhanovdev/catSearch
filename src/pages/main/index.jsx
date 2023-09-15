import React from 'react'
import c from './main.module.scss'
import { useForm } from 'react-hook-form'
import { BiSearch } from 'react-icons/bi'
import axios from 'axios'

const Main = () => {
  const [ currencies, setCurrencies ] = React.useState([])
  const [ expensive, setExpensive ] = React.useState(null)
  const [ cheap, setCheap ] = React.useState(null)

  const { 
    register,
    handleSubmit
  } = useForm()

  const binance_url = 'https://api.binance.com/api/v3'

  const bybit_url = 'https://api.bybit.com'
  const bybit_keys = {
    api_key: 'EST8OLsmRtuFqHfPhD',
    api_secret: 'FTr9IwXqQMgRJ1GYYOF16DXWdpyn8Gqf2t4m'
  }

  const bitget = 'https://api.bitget.com/api/v1'

  const GetPrices = (currency) => {
    let res1 = []
    const text = currency.split('/')
    const textForAll = `${text[0]}${text[1]}`
    const textForSomeStocks = `${text[0]}${text[1].toLowerCase() === 'usdt' ? 'USD' : text[1]}`

    axios.get(`${binance_url}/ticker/price?symbol=${textForAll.toUpperCase()}`)
      .then(res => {
        const price = parseFloat(res.data?.price).toFixed(2)          
        res1.push({stock: 'Binance', symbol: res.data.symbol, price: price})
      })
      
    axios.get(`${bybit_url}/v2/public/tickers?symbol=${textForAll.toUpperCase()}`)
      .then(res => {
        res1.push({stock: 'BYBIT', symbol: res.data.result[0].symbol, price: res.data.result[0].index_price})
      })


    axios.get(`https://api.bitget.com/api/mix/v1/market/tickers?productType=umcbl`)
      .then(res => {
        const result = res.data.data?.filter(item => item.symbol.toLowerCase().includes(textForAll.toLowerCase()))
        const price = parseFloat(result[0].indexPrice).toFixed(2)

        res1.push({stock: 'BITGET', symbol: textForAll.toUpperCase(), price: price})
      })
    

    axios.get(`https://www.bitstamp.net/api/v2/ticker/${textForAll.toLowerCase()}/`)
      .then(res => {
        res1.push({stock: 'Bitstamp', symbol: textForAll.toUpperCase(), price: res.data.bid})
      })

    // axios.get('https://api-pub.bitfinex.com/v2/tickers?symbols=ALL', {
    //   headers: {
    //     'Accept': 'application/json'
    //   }
    // })
    //   .then(res => {
    //     const result = res.data.filter(item => item[0].toLowerCase().includes(textForAll.toLowerCase()))
    //     console.log(result);
    //     // res1.push({stock: 'Bitfinex', symbol: textForAll.toUpperCase(), price: res.data[0]})
    //   })



    setTimeout(() => {
      setCurrencies(res1)
      const exp = res1?.reduce((max, obj) => obj.price > max.price ? obj : max)
      setExpensive(exp);

      const cheaper = res1?.reduce((max, obj) => obj.price < max.price ? obj : max)
      setCheap(cheaper);

    }, 800);

    
  }


  return (
    <div className={c.main}>
      <form 
        className={c.search}
        onSubmit={handleSubmit(data => GetPrices(data.currency))}
      >
        <input 
          type="text"
          placeholder='Поиск'
          {...register('currency')}
        />

        <button type='submit'>
          <BiSearch />
        </button>
      </form>

      <div className={c.result}>
        {
          currencies?.map((item, i) => (
            <div key={i}>
              <h2>{item.stock} - {item.symbol}</h2>
              <h1>{item.price}$</h1>
            </div>
          ))
        }
      </div>

      {
        cheap && expensive ?
        <div className={c.result2}>
          <div>
            <h2><span>Дешевый</span> - {cheap.stock}</h2>
            <h1>{cheap.price}$</h1>
          </div>
          <div>
            <h2><span className={c.exp}>Дорогой</span> - {expensive.stock}</h2>
            <h1>{expensive.price}$</h1>
          </div>
        </div>
        :
        null
      }
    </div>
  )
}

export default Main