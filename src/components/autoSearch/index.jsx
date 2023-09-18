import React from 'react'
import c from './auto.module.scss'
import axios from 'axios'

const AutoSearch = () => {
  // const [ currencies, setCurrencies ] = React.useState([])
  // const [ expensive, setExpensive ] = React.useState(null)
  // const [ cheap, setCheap ] = React.useState(null)
  // const [ spread, setSpread ] = React.useState(0)
  // const [ currency, setCurrency ] = React.useState(null)

  // const binance_url = 'https://api.binance.com/api/v3'

  // const bybit_url = 'https://api.bybit.com'
  // const bybit_keys = {
  //   api_key: 'EST8OLsmRtuFqHfPhD',
  //   api_secret: 'FTr9IwXqQMgRJ1GYYOF16DXWdpyn8Gqf2t4m'
  // }

  // const bitget = 'https://api.bitget.com/api/v1'

  // const timestamp = Date.now()

  // const apiKey = 'puid5QQXurBB1HxA9WhMTgvfepRjDk0t5fT74oiHOnOcBLqWYmWEMmj5r2D70znl2XCt5alZkeVHGMDaMyYq6Q'

  // const headers = {
  //   'X-API-KEY': apiKey,
  //   'X-TIMESTAMP': timestamp,
  // };

  // const currencyPairs = ['EOS/USDT', 'SOLO/USDT', 'SUI/USDT', 'SUI/USDT'];


  // const GetPrices = (currency) => {
  //   let res1 = []
  //   // const text = currency.split('/')
  //   // const textForAll = `${text[0]}${text[1]}`
  //   // const textForSomeStocks = `${text[0]}${text[1].toLowerCase() === 'usdt' ? 'USD' : text[1]}`
  //   // setCurrency(`${text[0].toUpperCase()}/${text[1].toUpperCase()}`)

  //   axios.get(`${binance_url}/ticker/bookTicker?symbol=${textForAll.toUpperCase()}`)
  //     .then(res => {
  //       const askPrice = parseFloat(res.data?.askPrice).toFixed(2)          
  //       const bidPrice = parseFloat(res.data?.bidPrice).toFixed(2)          
  //       const spread = bidPrice - askPrice
  //       res1.push({
  //         stock: 'Binance', 
  //         symbol: res.data.symbol, 
  //         price: parseFloat(res.data?.askPrice).toFixed(2), 
  //         // spread: parseFloat(spread).toFixed(2)
  //     })
  //   })
  //   .catch(() => {
  //     return ;
  //   })
      
  //   axios.get(`${bybit_url}/v2/public/tickers?symbol=${textForAll.toUpperCase()}`)
  //     .then(res => {
  //       res1.push({
  //         stock: 'BYBIT', 
  //         symbol: res.data.result[0].symbol,
  //         price: res.data.result[0].index_price, 
  //         // spread: parseFloat(Number(res.data.result[0].bid_price) - Number(res.data.result[0].ask_price)).toFixed(2)
  //     })
  //   })
  //   .catch(() => {
  //     return ;
  //   })


  //   axios.get(`https://api.bitget.com/api/mix/v1/market/tickers?productType=umcbl`)
  //     .then(res => {
  //       const result = res.data.data?.filter(item => item.symbol.toLowerCase().includes(textForAll.toLowerCase()))
  //       const price = parseFloat(result[0].indexPrice).toFixed(2)

  //       res1.push({
  //         stock: 'BITGET', 
  //         symbol: textForAll.toUpperCase(), 
  //         price: price,
  //         // spread: parseFloat(Number(result[0].bestBid) - Number(result[0].bestAsk)).toFixed(2)
  //     })
  //   })
  //   .catch(() => {
  //     return ;
  //   })
    

  //   axios.get(`https://www.bitstamp.net/api/v2/ticker/${textForAll.toLowerCase()}/`)
  //     .then(res => {
  //       res1.push({
  //         stock: 'Bitstamp', 
  //         symbol: textForAll.toUpperCase(), 
  //         price: res.data.bid,
  //       // spread: parseFloat(Number(res.data.bid) - Number(res.data.ask)).toFixed(2)
  //     })
  //   })
  //   .catch(() => {
  //     return ;
  //   })

  //   setTimeout(() => {
  //     setCurrencies(res1)
  //     const exp = res1?.reduce((max, obj) => obj.price > max.price ? obj : max)
  //     setExpensive(exp);

  //     const cheaper = res1?.reduce((max, obj) => obj.price < max.price ? obj : max)
  //     setCheap(cheaper);


  //     const spread = parseFloat(Number(exp.price) - Number(cheaper.price)).toFixed(2)
  //     const midPrice = (Number(exp.price) + Number(cheaper.price)) / 2;
  //     setSpread(parseFloat((spread / midPrice) * 100).toFixed(3));



  //     // const spread = res1?.reduce((max, obj) => obj.price - max.price ? console.log(obj) : max)     
  //   }, 2000);

    
  // }

  // React.useEffect(() => {
  //   for (const currencyPair of currencyPairs) {
  //     const priceA = getExchangeAPriceA(currencyPair);
  //     const priceB = getExchangeBPrice(currencyPair);
  
  //     if (priceA !== null && priceB !== null) {
  //       const spread = priceA - priceB;
  //       console.log(`Спред для ${currencyPair}: ${spread}`);
  //     } else {
  //       console.log(`Не удалось получить цены для ${currencyPair}`);
  //     }
  //   }
  //   GetPrices()
  // }, [])

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