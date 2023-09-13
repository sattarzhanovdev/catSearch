import React from 'react'
import c from './main.module.scss'
import { set, useForm } from 'react-hook-form'
import { BiSearch } from 'react-icons/bi'
import axios from 'axios'

const Main = () => {
  const [ currencies, setCurrencies ] = React.useState([])

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
    let res1 = []
    const text = currency.split('/')
    const textForAll = `${text[0]}${text[1]}`

    console.log(text);

    axios(`${binance_url}/ticker/price?symbol=${currency.toUpperCase()}`)
      .then(res => {
        const price = parseFloat(res.data?.price).toFixed(2)          
        res1.push({stock: 'Binance', symbol: res.data.symbol, price: price})
      })
      
      axios(`${bybit_url}/v2/public/tickers?symbol=${currency.toUpperCase()}`)
        .then(res => {
          res1.push({stock: 'BYBIT', symbol: res.data.result[0].symbol, price: res.data.result[0].index_price})
        })

    

    // axios.get('https://poloniex.com/public?command=returnTicker')
    //   .then(res => {
    //     // const result = res?.data.result?.filter(item => item.symbol.toUpperCase() === textForAll?.toUpperCase())
    //     // const price = parseFloat(result[0]?.index_price).toFixed(2)
    //     // res1.push({stock: 'BYBIT', symbol: result[0]?.symbol, price: price})

    //     console.log(res.data);
    //   })


    setTimeout(() => {
      setCurrencies(res1)
    }, 400);
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
    </div>
  )
}

export default Main