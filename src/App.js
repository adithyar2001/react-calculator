import React, { useState } from 'react';
import './App.css';
import $ from 'jquery';


function Calculator() {
  const [displayValue, setDisplayValue] = useState('');
  const [previousValue, setPreviousValue] = useState('');
  const [result, setResult] = useState('');

  const handleInput = (value) => {
    if (displayValue === 'Error') {
      setDisplayValue('');
    }
  
    if (!displayValue && value === '-') {
      setDisplayValue('-');
    } else if (!displayValue && value !== '0') {
      setDisplayValue(value);
    } else {
      if (displayValue === '0') {
        setDisplayValue(value);
      } else {
        if (/^0[0-9]+/.test(displayValue) && !/^0\.0/.test(displayValue)) {
          setDisplayValue(value);
        } else {
          setDisplayValue(displayValue + value);
        }
      }
    }
  };
  

  const handleDelete = () => {
    setDisplayValue(displayValue.slice(0, -1));
  };

  const handleCalculate = () => {
    try {
      const newResult = eval(displayValue).toString();
      const roundedResult = Math.round(newResult * 100) / 100;
      setPreviousValue(displayValue + '=' + newResult);
      setResult(newResult);
      setDisplayValue(newResult);
    } catch (error) {
      $('#notification').fadeIn();
      setTimeout(() => {
        $('#notification').fadeOut();
      }, 1000);
    
    }
  };

  const handleClear = () => {
    setDisplayValue('');
    setPreviousValue('');
    setResult('');
  };

  return (
    <div className="calculator d-flex flex-column justify-content-between">
      <div>
      <div className="previous-calculation">{previousValue}</div>
      <div className="current-calculation">{displayValue || '0'}</div>
      </div>
      
      <div className="buttons">
        <button onClick={() => handleInput('7')}>7</button>
        <button onClick={() => handleInput('8')}>8</button>
        <button onClick={() => handleInput('9')}>9</button>
        <button onClick={() => handleInput('+')}>+</button>
        <button onClick={() => handleInput('4')}>4</button>
        <button onClick={() => handleInput('5')}>5</button>
        <button onClick={() => handleInput('6')}>6</button>
        <button onClick={() => handleInput('-')}>-</button>
        <button onClick={() => handleInput('1')}>1</button>
        <button onClick={() => handleInput('2')}>2</button>
        <button onClick={() => handleInput('3')}>3</button>
        <button onClick={() => handleInput('*')}>*</button>
        <button onClick={() => handleInput('0')}>0</button>
        <button onClick={() => handleInput('.')}>.</button>
        <button onClick={() => handleInput('/')}>/</button>
        <button onClick={() => handleInput('%')}>%</button>
        <button onClick={() => handleDelete()}>Del</button>
        <button onClick={() => handleClear()}>Clear</button>
        <button onClick={() => handleCalculate()} className="equalButton">=</button>
      </div>
      <div id="notification" className="notification">
        Error in calculation
      </div>
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <h1>React Calculator</h1>
      <Calculator />
    </div>
  );
}

export default App;
