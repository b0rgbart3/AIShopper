// import logo from './logo.svg';
import './App.scss';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ShopprProvider } from "./utils/GlobalState";
import Nav from './components/Nav';
import Footer from './components/Footer';
import Home from './pages/Home';
import Search from './pages/Search';
import Analyze from './pages/Analyze';
import Results from './pages/Results';
import Login from './pages/Login';
import NotFound from './pages/NotFound';

// import { ToastProvider } from 'react-toast-notifications'

function App() {
  
  return (
    <Router>
    <div>
    
        <div className="App">
        <ShopprProvider>
        {/* Switch statement makes sure that only one route is chosen. */}
          <Nav/>
          <Switch>
            <Route path='/' component={Home} exact/>
            <Route path='/search' component={Search} />
            <Route path='/analyze' component={Analyze} />
            <Route path='/results' component={Results} />
            <Route path='/login' component={Login} />
            <Route component={NotFound} />
          </Switch>
          <Footer />
          </ShopprProvider>
        </div>
     
     </div>
     
    </Router>
   
  );
}

export default App;
