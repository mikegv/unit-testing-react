import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [showText, setShowText] = useState(false)
  const [items, setItems] = useState([])
  useEffect(()=>{
    fetch('https://jsonplaceholder.typicode.com/posts')
    .then(res => res.json())
    .then(data => setItems(data))
  },[])
  const getItems = arr => {
   const temp = []
   for(let i = 0; i < 10; i++){
    temp.push(items[i])
   }
   return temp
  }
  const itemsArray = items.length > 0 ? getItems(items) : [];
  
  return (
    <div className="App">
      <h1>Learn React!</h1>
      <div>
        {!showText && <p>Original Text</p>}
        {showText && <p>Changed Text</p>}
        <button onClick={()=>setShowText(true)}>Click</button>
        {
          itemsArray.length > 0 ? 
          <div>
            <p>fetched</p>
            <ul>
              {itemsArray.map(item => <li key={item.id}>{item.title}</li>)}
            </ul>
          </div> 
          :
          <p>No Items</p>
        }
      </div>
    </div>
  );
}

export default App;
