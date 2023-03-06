
import './App.css';
import React, {useState} from 'react';
import useSWR from 'swr'

 const fetcher = (...args) => fetch(...args).then((response)=> response.json());

function App() {
  const [Games, setGames] = new useState([]);
  const [gameTitle, setGameTitle] = new useState("")
  

  function displayGame() {
    fetch(`https://www.cheapshark.com/api/1.0/games?title=${gameTitle}&limit=5`).then((response) => response.json()).then((data) => 
    {
      setGames(data)
      console.log(data);
    });
    
  }

  const {data,error} = useSWR('https://www.cheapshark.com/api/1.0/deals?storeID=1&upperPrice=15&pageSize=3',fetcher)
  return (
    <div className="App">
      <div className='display__section'>
        <h1 style={{color:'white'}}>Search for a Game</h1>
        <input type="text" className='input__field'  placeholder='MineCraft' onChange={(e) => setGameTitle
        (e.target.value)}/>
        <button className='search__button' onClick={displayGame}>Search Game title</button>
        <div className='searched__games'>
          {Games.map((game,key) => {
            return (<div key={key} className='game'>
              {game.external}
              <img src={game.thumb} alt="" />
            </div>)
          })}
        </div>
        
      </div>
      <div className='deals__section'>
          <h1>Latest Deals</h1>
          <div className='displayed__deals'>
          {data && data.map((deal,key) => {
            return (<div key={key} className='deals'>
              <h4>{deal.title}</h4>
              <p>Normal Price: <span style={{textDecorationLine: 'line-through' }}>${deal.normalPrice}</span></p>
              <p>Deal Price: <span style={{fontWeight:'bold' }}>${deal.salePrice}</span></p>
              <h3>YOU SAVE: {deal.savings.substr(0,2)}%</h3>

            </div>)
          })}
          
        </div>
      </div>
    </div>
  );
}

export default App;
