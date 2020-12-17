import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'
import randomWord from 'random-words'
import { UsernameProvider } from './context/username'
import { MidiProvider } from './context/midi'


ReactDOM.render(
  <React.StrictMode>
    <MidiProvider>
      <UsernameProvider>
        <Router>
          <Switch>
            <Route exact path="/" children={<Redirect to={{pathname: `/${randomWord({exactly: 2, join:'-'})}`}}/>}/>
            <Route path="/:sessionId" children={<App />}/>
          </Switch>
        </Router>
      </UsernameProvider>
    </MidiProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
