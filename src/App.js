import React from 'react';
import './App.css';

/*
 * - Subscribe to feed with a ticker symbol (e.g.: 'AMD')
 * - Use data returned from feed to render and update table rows with relevant data
 * - Allow a symbol to be unsubscribed from
 */

const feed = {
  subscribe: function(symbol) {
      // subscribe to a socket
      console.log(`now subscribed to ${symbol}`)
      // symbols.push(symbol)
      // console.log(symbols)
  },
  unsubscribe: function(symbol) {
      // unsubscribe from a socket
      console.log(`now unsubscribed from ${symbol}`)
      // symbols.splice(symbols.findIndex((item) => item === symbol),1)
      // console.log(symbols)

  },
  onChange: function(callback) {
      // socket.on('change', callback)
  }
};

class TickerTable extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      symbols: ['o','pear','moth']
    }
  }
  handleUnSubscribe = (e) => {
    feed.unsubscribe(e.target.dataset.symbol)
  }

  render(){
    return (
      <tbody>
        {
          this.state.symbols.map((symbol, index) => {
            return (
              <tr key={index}>
                <td>{symbol}</td>
                <td>{symbol} start</td>
                <td>{symbol} end</td>
                <td><button data-symbol={symbol} onClick={this.handleUnSubscribe}>Unsubscribe from {symbol}</button></td>
              </tr>
            )
          })
        }
      </tbody>
    )
  }
}

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {ticker: ''}
  }
  
  inputHandleChange = (e) => {
    this.setState({ticker: e.target.value.toUpperCase()})
  }

  handleSubscribe = (e) => {
    e.preventDefault();
    feed.subscribe(this.state.ticker)
  }

  render(){
    return (
      <div>
        <form onSubmit={this.handleSubscribe}>
          <input type="text" onChange={this.inputHandleChange}/>
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
  }
}

export default App;
