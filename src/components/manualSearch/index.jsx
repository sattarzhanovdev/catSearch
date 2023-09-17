import React from 'react'
import c from './main.module.scss'
import { useForm } from 'react-hook-form'
import { BiSearch } from 'react-icons/bi'
import axios from 'axios'

const ManualSearch = () => {
  const [ currencies, setCurrencies ] = React.useState([])
  const [ expensive, setExpensive ] = React.useState(null)
  const [ cheap, setCheap ] = React.useState(null)
  const [ spread, setSpread ] = React.useState(0)
  const [ currency, setCurrency ] = React.useState(null)

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

  const timestamp = Date.now()

  const apiKey = 'puid5QQXurBB1HxA9WhMTgvfepRjDk0t5fT74oiHOnOcBLqWYmWEMmj5r2D70znl2XCt5alZkeVHGMDaMyYq6Q'

  const headers = {
    'X-API-KEY': apiKey,
    'X-TIMESTAMP': timestamp,
  };


  const GetPrices = (currency) => {
    let res1 = []
    const text = currency.split('/')
    const textForAll = `${text[0]}${text[1]}`
    const textForSomeStocks = `${text[0]}${text[1].toLowerCase() === 'usdt' ? 'USD' : text[1]}`
    setCurrency(`${text[0].toUpperCase()}/${text[1].toUpperCase()}`)

    axios.get(`${binance_url}/ticker/bookTicker?symbol=${textForAll.toUpperCase()}`)
      .then(res => {
        const askPrice = parseFloat(res.data?.askPrice).toFixed(2)          
        const bidPrice = parseFloat(res.data?.bidPrice).toFixed(2)          
        const spread = bidPrice - askPrice
        res1.push({
          stock: 'Binance', 
          symbol: res.data.symbol, 
          price: parseFloat(res.data?.askPrice).toFixed(2), 
          // spread: parseFloat(spread).toFixed(2)
        })
      })
      
    axios.get(`${bybit_url}/v2/public/tickers?symbol=${textForAll.toUpperCase()}`)
      .then(res => {
        res1.push({
          stock: 'BYBIT', 
          symbol: res.data.result[0].symbol,
          price: res.data.result[0].index_price, 
          // spread: parseFloat(Number(res.data.result[0].bid_price) - Number(res.data.result[0].ask_price)).toFixed(2)
        })
      })


    axios.get(`https://api.bitget.com/api/mix/v1/market/tickers?productType=umcbl`)
      .then(res => {
        const result = res.data.data?.filter(item => item.symbol.toLowerCase().includes(textForAll.toLowerCase()))
        const price = parseFloat(result[0].indexPrice).toFixed(2)

        res1.push({
          stock: 'BITGET', 
          symbol: textForAll.toUpperCase(), 
          price: price,
          // spread: parseFloat(Number(result[0].bestBid) - Number(result[0].bestAsk)).toFixed(2)
        })
      })
    

    axios.get(`https://www.bitstamp.net/api/v2/ticker/${textForAll.toLowerCase()}/`)
      .then(res => {
        res1.push({
          stock: 'Bitstamp', 
          symbol: textForAll.toUpperCase(), 
          price: res.data.bid,
          // spread: parseFloat(Number(res.data.bid) - Number(res.data.ask)).toFixed(2)
        })
      })
      .catch(() => {
        axios.get(`https://www.bitstamp.net/api/v2/ticker/${textForSomeStocks.toLowerCase()}/`)
          .then(res => {
            res1.push({
              stock: 'Bitstamp', 
              symbol: textForAll.toUpperCase(), 
              price: res.data.bid,
              // spread: parseFloat(Number(res.data.bid) - Number(res.data.ask)).toFixed(2)
            })
          })
      })

    // fetch(`https://open-api.bingx.com/openApi/spot/v1/common/symbols`, {
    // })
    //   .then(res => res.json())
    //   .then(res => {
    //     console.log(res);
    //     // res1.push({stock: 'Bitstamp', symbol: textForAll.toUpperCase(), price: res.data.bid})
    //   })

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


      const spread = parseFloat(Number(exp.price) - Number(cheaper.price)).toFixed(2)
      const midPrice = (Number(exp.price) + Number(cheaper.price)) / 2;
      setSpread(parseFloat((spread / midPrice) * 100).toFixed(5));



      // const spread = res1?.reduce((max, obj) => obj.price - max.price ? console.log(obj) : max)     
    }, 2000);

    
  }


  return (
    <div className={c.main}>
      <form 
        className={c.search}
        onSubmit={handleSubmit(data => GetPrices(data.currency))}
      >
        <input 
          type="text"
          placeholder='Введите с окончанием /usdt'
          {...register('currency')}
        />

        <button type='submit'>
          Поиск
        </button>
      </form>

      {
        currency ?
        <div className={c.result}>
          <div className={c.currency}>
            <h1>{currency}</h1>
          </div>
          <div className={c.expensive}>
            <div className={c.up}>
              <h3>Long</h3>
            </div>
            <div className={c.down}>
              <h3>{expensive?.stock}</h3>
              <h2>{expensive?.price}</h2>
            </div>
          </div>
          <div className={c.cheap}>
            <div className={c.up}>
              <h3>Short</h3>
            </div>
            <div className={c.down}>
              <h3>{cheap?.stock}</h3>
              <h2>{cheap?.price}</h2>
            </div>
          </div>
          {
            currencies?.map(item => (
              <div className={c.stock}>
                <div className={c.up}>
                  <h3>{item.stock}</h3>
                </div>
                <div className={c.down}>
                  <h3>ㅤ</h3>
                  <h2>{item?.price}</h2>
                </div>
              </div>
            ))
          }
        </div> :
        null
      }

    </div>
  )
}

export default ManualSearch

{/* <div className={c.result}>
{
  currencies?.map((item, i) => (
    <div key={i}>
      <h2>{item.stock} - {item.symbol}</h2>
      <h1>{item.price}$</h1>
      {/* <h2 className={c.spread}>Спред: {item.spread}</h2> */}
    // </div>
  // ))
// }
// </div>
// 
// {
// cheap && expensive ?
{/* <div className={c.result2}> */}
  {/* <div> */}
    {/* <h2><span>Дешевый</span> - {cheap.stock}</h2> */}
    {/* <h1>{cheap.price}$</h1> */}
  {/* </div> */}
  {/* <div> */}
    {/* <h2><span className={c.exp}>Дорогой</span> - {expensive.stock}</h2> */}
    {/* <h1>{expensive.price}$</h1> */}
  {/* </div> */}
{/* </div> */}
// :
// null
// }
// 
// {
// spread ?
{/* <div className={c.spread}> */}
  {/* <h1>Спред: <span>{spread}%</span></h1> */}
{/* </div> : */}
// null
// } */}