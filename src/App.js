import logo from './logo.svg';
import './App.css';
// import tawkMessengerReactUmd from '@tawk.to/tawk-messenger-react';
import TawkMessengerReact from "@tawk.to/tawk-messenger-react"

function App() {
  return (
    <div className="App">
      <TawkMessengerReact propertyId="1h000s9dh" widgetId="1h000s9dh" />
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
