import logo from './logo.svg';
import './App.css';
// import tawkMessengerReactUmd from '@tawk.to/tawk-messenger-react';
import ChatComponent from './components/chat';

function App() {
  return (
    <div className="App">
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

      <ChatComponent />
    </div>
  );
}

export default App;
