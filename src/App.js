import React from 'react';
import './App.css';

/*
 * - Subscribe to feed with a ticker symbol (e.g.: 'AMD')
 * - Use data returned from feed to render and update table rows with relevant data
 * - Allow a symbol to be unsubscribed from
 */
const symbols = ['o','pear','moth']

const feed = {
  subscribe: function(symbol) {
      // subscribe to a socket
      console.log(`now subscribed to ${symbol}`)
      symbols.push(symbol)
      console.log(symbols)
  },
  unsubscribe: function(symbol) {
      // unsubscribe from a socket
      console.log(`now unsubscribed from ${symbol}`)
      symbols.splice(symbols.findIndex((item) => item === symbol),1)
      console.log(symbols)

  },
  onChange: function(callback) {
      // socket.on('change', callback)
  }
};

// my stuff
let ticker
const inputHandleChange = (e) => {
  ticker = e.target.value.toUpperCase()
}

const handleSubscribe = (e) => {
  e.preventDefault();
  feed.subscribe(ticker)
}

const handleUnSubscribe = (e) => {
  feed.unsubscribe(e.target.dataset.symbol)
}

class TickerTable extends React.Component {
  render(){
    return (
      <tbody>
        {
          symbols.map((symbol, index) => {
            return (
              <tr key={index}>
                <td>{symbol}</td>
                <td>{symbol} start</td>
                <td>{symbol} end</td>
                <td><button data-symbol={symbol} onClick={handleUnSubscribe}>Unsubscribe from {symbol}</button></td>
              </tr>
            )
         })
        }
      </tbody>
    )
  }
}


const App = () => (
  <div>
    <form onSubmit={handleSubscribe}>
      <input type="text" onChange={inputHandleChange}/>
      <button type="submit">Subscribe</button>
    </form>
      <table>
          <thead>
              {/* blah blah table header */}
              <tr>
                  <th>Symbol</th>
                  <th>Open</th>
                  <th>Last</th>
                  <th>Unsubscribe</th>
              </tr>
          </thead>
            <TickerTable />
      </table>
  </div>
)

export default App;
