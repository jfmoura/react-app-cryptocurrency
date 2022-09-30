/*ES6 modules*/
import React, { Component } from "react";
import "./App.css";
import axios from "axios";
import NumberFormat from "react-number-format";

class App extends Component {


  constructor(props) {
    super(props);

    // holds response from API
    this.state = {
      cryptos: [],
      currencies: ["EUR", "USD"],
      fsymsList: "BTC",
      currencyMarket: ""
    };
  }


  /* 
  function will be carried out once app loads.
  Axios is promise-based so 'then' function used.
  Cryptocompare returns price of bitcoins compared to the US $. 
  setState puts changes in the component state in a queue and requests React to re-render using the updated state.
  */


  componentDidMount() {
    axios.get("https://min-api.cryptocompare.com/data/pricemulti?fsyms=" + this.state.fsymsList + "&tsyms=" + this.state.currencies).then((res) => {
      const cryptos = res.data;
      //console.log(cryptos);
      this.setState({ cryptos });
    });
    axios.get(`https://open.er-api.com/v6/latest/${this.state.currencies[0]}`).then((res) => {
      const currencyMarket = res.data.rates[this.state.currencies[1]];
      //console.log(currencyMarket);
      this.setState({ currencyMarket });
    });
  }


  render() {
    return (
      <div className="App">
        <h1>Precio de las Cryptomonedas</h1>
        <h2>Cortesía de <a href="https://github.com/jfmoura" target="parent">Jorge (El Metalero 🤘)</a></h2>

        <div>
        </div>
        {Object.keys(this.state.cryptos).map((key) => (
          this.state.currencies.map((curr) => (
            <div id="crypto-container" key={key + curr} onClick={() => window.location.reload(false)}>
              <span className="left">{key}/{curr}</span>
              <span className="right">
                <NumberFormat
                  value={this.state.cryptos[key][curr]}
                  displayType={"text"}
                  decimalprecision={2}
                  thousandSeparator={"."}
                  decimalSeparator={","}
                  prefix={curr === 'USD' ? "$ " : "€ "}
                />
              </span>
            </div>
          ))
        ))}

        <div id="crypto-container" onClick={() => window.location.reload(false)}>
          <span className="left">{this.state.currencies[0]}/{this.state.currencies[1]}</span>
          <span className="right">
            <NumberFormat
              value={this.state.currencyMarket}
              displayType={"text"}
              thousandSeparator={"."}
              decimalSeparator={","}
              prefix={"$ "}
            />
          </span>
        </div>

      </div>
    );
  }
} //end of class

export default App;
