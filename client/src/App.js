import './App.css';
import { Route } from 'react-router-dom';
import LandingPage from './Components/LandingPage/LandingPage';
import Navbar from './Components/Navbar/Navbar';
import Home from './Components/Home/Home';
import DogDetail from './Components/DogDetail/DogDetail';
import CreateDog from './Components/CreateDog/CreateDog';


function App() {
  return (
    // LANDING PAGE -> Opcion de hacer login
    <div className="App">
      <Route exact path='/'>
        <LandingPage/>
      </Route>
      <Route path='/:anything'>
        <Navbar/>
      </Route>
      <Route path='/home'>
        <Home/>
      </Route>
      <Route path='/dogs/:id'>
        <DogDetail/>
      </Route>
      <Route path='/createDog'>
        <CreateDog/>
      </Route>
      </div>
  );
}

export default App;
