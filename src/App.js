// import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HomePage from './pages/HomePage';
import SearchPage from './pages/SearchPage';
import NotFoundPage from './pages/NotFoundPage';
import Nav from './components/Nav';
import Footer from './components/Footer';
// import { ToastProvider } from 'react-toast-notifications'

function App() {
  return (
    <Router>
    <div>
    
        <div className="App">
        {/* Switch statement makes sure that only one route is chosen. */}
        <Nav/>
          <Switch>
            <Route path='/' component={HomePage} exact/>
            <Route path='/search' component={SearchPage} />
            <Route component={NotFoundPage} />
          </Switch>
          <Footer />
        </div>
     </div>
    </Router>
   
  );
}

export default App;
