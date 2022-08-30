import { useState } from 'react';
import './App.css';



const initialData = [
{ name: "Landing Page", time: 7.4 },
{ name: "Configurator", time: 0.2 },
{ name: "Check-out", time: 7.0 },
{ name: "Deal", time: 3.8 }
]




function App() {
  const [state, setState] = useState(initialData)
  const allTIme = state.reduce((prev, cur) => prev + cur.time, 0)
  const partPercent = (all: number, part: number) => {
    return part / (all / 100)
  }



  const sized = state.map((item,) => {
    return {...item, percent: partPercent(allTIme, item.time)}
  })

  const prepeared = sized.map((item, index) => {
    const a = sized.slice(0, index)
    return {
      ...item,
      position: a.reduce((a, b) => a + b.percent, 0),
  }
})

const randomize = () => {
  const random = state.map(item => {
     return {
      ...item,
      time: +(Math.random() * 11).toFixed(2),
    }
  })

    setState(random)
    setInterval(randomize, 5300)
}

  return (
    <div className="App">
      {prepeared.map(item => {
        return (
          <div className='chart__line' key={item.name}>
            <p className='chart__name'>{item.name}</p>
            <div className='chart__percent'>
              <div className='back' style={
                { 
                  height: '100%',
                  width: `${item.percent}%`,
                  background: 'green',
                  marginLeft: `${item.position}%`
                }
              }>
               {item.time}
              </div>
            </div>
          </div>
        )
      })}
      <button
      type='button'
      onClick={randomize}
      >
        Randomize
      </button>
    </div>
  );
}

export default App;
