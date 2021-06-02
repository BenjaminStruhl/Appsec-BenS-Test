import logo from './logo.svg';
import './App.css';
import Converter from './components/Converter';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Switch>
      <Route path="/:id">
    <div className="center-screen">
      <Converter/>
    </div>
    </Route>
      <Route>
    <div className="center-screen">
      <Converter/>
    </div>
    </Route>
    </Switch>
    </Router>
  );
}

export default App;
