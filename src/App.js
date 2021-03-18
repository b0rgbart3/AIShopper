// import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';
import Nav from './components/Nav';

function App() {
  return (
    <Router>
        <div className="App">
        {/* Switch statement makes sure that only one route is chosen. */}
        <Nav/>
          <Switch>
            <Route path='/' component={HomePage} exact/>
            <Route component={NotFoundPage} />
          </Switch>
        </div>
    </Router>
   
  );
}

export default App;
