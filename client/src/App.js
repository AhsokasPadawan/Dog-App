import './App.css';
import {Route} from 'react-router-dom';
import Landing from './Components/Landing';
import Home from './Components/Home';
import CreateDog from './Components/CreateDog';
import FullDogCard from './Components/FullDogCard';

function App() {
  return (
    <div className="App">
      <Route exact path='/' component={Landing} ></Route>
      <Route exact path='/home' component={Home}></Route>
      <Route exact path='/createDog' component={CreateDog}></Route>
      <Route path='/home/:id' render = {({match})=> <FullDogCard dogId={match.params.id} />}></Route>
    </div>
  );
}

export default App;
