import logo from './logo.svg';
import './App.css';
import NavBar from './Components/NavBar';
import HomePage from './Components/HomePage';
import UserSearchPage from './Components/UserSearchPage';
import RandomTweetPage from './Components/RandomTweetPage';
import { useEffect, useState } from 'react';

//props


function App() {

  let [userPageSelection, setUserPageSelection] = useState('homePage')
  
  if(!['homeButton', 'searchButton', 'randomButton'].includes(userPageSelection)){
    console.log('page selected by default')
    return (
      <div className="App">
        <div className="navbar"> <NavBar userPageSelection={userPageSelection} setUserPageSelection={setUserPageSelection}/></div>
            <HomePage userPageSelection={'homeButton'}/>
        
      </div>
        
        )
  }
  
  return (
    <div className="App">
      <div className="navbar"> <NavBar userPageSelection={userPageSelection} setUserPageSelection={setUserPageSelection}/></div>
          <HomePage userPageSelection={userPageSelection}/>
          <UserSearchPage userPageSelection={userPageSelection}/>
          <RandomTweetPage userPageSelection={userPageSelection}/>
      
    </div>
      
      )
}

export default App;
