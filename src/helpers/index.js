// import axios from "axios";
// import React from "react";

// const binance_url = 'https://api.binance.com/api/v3'

// const bybit_url = 'https://api.bybit.com'
// const bybit_keys = {
//   api_key: 'EST8OLsmRtuFqHfPhD',
//   api_secret: 'FTr9IwXqQMgRJ1GYYOF16DXWdpyn8Gqf2t4m'
// }

// export const GetPrices = (currency) => {
//   const [ result, setResult ] = React.useState([])

//   React.useEffect(() => {
//     axios(`${binance_url}/ticker/price`)
//       .then(res => {
//         const result = res?.data?.filter(item => item.symbol === currency?.toUpperCase())
//         const price = parseFloat(result[0]?.price).toFixed(2)          
//         setResult(...result, {stock: 'Binance', symbol: result[0]?.symbol, price: price})
//       })


//     axios(`${bybit_url}/v2/public/tickers`, {
//       headers: {
//         'api-key': bybit_keys.api_key
//       }
//     })
//       .then(res => {
//         const result = res?.data.result?.filter(item => item.symbol === currency?.toUpperCase())
//         const price = parseFloat(result[0]?.index_price).toFixed(2)
//         setResult(...result, {stock: 'BYBIT', symbol: result[0]?.symbol, price: price})
//       })

//   }, [])
  
//   return {
//     result
//   }  
// }



// // function getPrices(text) {

// //   const results = []

// //   fetch(`${binance_url}/ticker/price`)
// //     .then(res => res.json())
// //     .then(res => {
// //       const result = res.filter(item => item.symbol === text.toUpperCase())
// //       const price = parseFloat(result[0]?.price).toFixed(2)

// //       results.push({stock: 'Binance', symbol: result[0]?.symbol, price: price})
      
// //     })

// //   fetch(`${bybit_url}/v2/public/tickers`, {
// //     headers: {
// //       'api-key': bybit_keys.api_key
// //     }
// //   })
// //     .then(res => res.json())
// //     .then(res => {
// //       const result = res.result.filter(item => item.symbol === text.toUpperCase())
// //       const price = parseFloat(result[0]?.index_price).toFixed(2)
      
// //       results.push({stock: 'BYBIT', symbol: result[0]?.symbol, price: price})
// //     })

// //   // fetch(`${mexc_url}/open/api/v2/market/ticker/`)
// //   //   .then(res => res.json())
// //   //   .then(res => {
// //   //     console.log(res);
// //   //     // const result = res.filter(item => item.symbol === text.toUpperCase())
// //   //     // const price = parseFloat(result[0]?.price).toFixed(2)

// //   //     // results.push({stock: 'Binance', symbol: result[0]?.symbol, price: price})
      
// //   //   })


// //   setTimeout(() => {
// //     const template = results.map(item => {
// //       return `
// //         <div class="currency">
// //           <h2 class="stock">${item.stock} - ${text.toUpperCase()}</h2>
// //           <h1 class="stock-price">
// //             ${item.price} $
// //           </h1>
// //         </div>
// //       `
// //     }).join('')
      
// //     $result.innerHTML = template
// //   }, 1000)
// // }