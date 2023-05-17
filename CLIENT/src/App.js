import logo from './logo.svg';
import './App.css';
import NavBar from './Components/NavBar';
import HomePage from './Components/HomePage';
import UserSearchPage from './Components/UserSearchPage';
import RandomTweetPage from './Components/RandomTweetPage';
import { useEffect, useState } from 'react';

//props


function App() {
  let server_URL = 'http://127.0.0.1:5000'
  // let server_URL = 'https://twitter-showcase-app-zuot.onrender.com'

  let [userPageSelection, setUserPageSelection] = useState('homePage')
  // let [requestType, setRequestType] = useState('user')
  
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
          <UserSearchPage userPageSelection={userPageSelection} server_URL={server_URL}/>
          <RandomTweetPage userPageSelection={userPageSelection} server_URL={server_URL}/>
      
    </div>
      
      )
}

export default App;
