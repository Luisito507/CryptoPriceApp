import './App.css';
import React, {useEffect, useState} from 'react';
import Axios from 'axios';
import Coin from './coin';

function App() {

  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    Axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=15&page=1&sparkline=false').then(response => {
      setCoins(response.data);
    }).catch(error => console.log(error));
  }, []);

  const handleChange = e => {
    setSearch(e.target.value)
  }

  const filteredCoins = coins.filter(coin =>
    coin.name.toLowerCase().includes(search.toLocaleLowerCase())  
  )

  return(
    <div className='App'>
      <div className='coin-search'>
        <h1 className='acronym'>Crypto
          <span className='acronym-color'>View</span>
        </h1>
        <form>
          <input type={'search'} placeholder='search a currency' className='coin-input' onChange={handleChange}/>
        </form>
      </div>
      {filteredCoins.map(coin => {
        return <Coin key={coin.id}
          name={coin.name} 
          image={coin.image} 
          symbol={coin.symbol}
          marketcap={coin.market_cap}
          price={coin.current_price}
          priceChange={coin.price_change_percentage_24h}
          volume={coin.total_volume}
        />
      })}
    </div>
  )
}

export default App;