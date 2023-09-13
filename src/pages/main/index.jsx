import React from 'react'
import c from './main.module.scss'
import { useForm } from 'react-hook-form'
import { BiSearch } from 'react-icons/bi'
import axios from 'axios'

const Main = () => {
  const [ currencies, setCurrencies ] = React.useState(null)

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

  const GetPrices = (currency) => {
    const result = []

    axios(`${binance_url}/ticker/price`)
      .then(res => {
        const result = res?.data?.filter(item => item.symbol === currency?.toUpperCase())
        const price = parseFloat(result[0]?.price).toFixed(2)          
        result.push({stock: 'Binance', symbol: result[0]?.symbol, price: price})

      })


    axios(`${bybit_url}/v2/public/tickers`)
      .then(res => {
        const result = res?.data.result?.filter(item => item.symbol === currency?.toUpperCase())
        const price = parseFloat(result[0]?.index_price).toFixed(2)
        result.push({stock: 'BYBIT', symbol: result[0]?.symbol, price: price})
      })
      setCurrencies(result)
  
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
          !currencies ? 
          <h2>NO!</h2> :
          currencies?.map(item => (
            <div>
              <h2>{item.stock} - {item.symbol}</h2>
              <h1>{item.price}$</h1>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Main