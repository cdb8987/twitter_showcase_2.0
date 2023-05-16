import logo from './logo.svg';
import './App.css';
import NavBar from './Components/NavBar';
import HomePage from './Components/HomePage';
import UserSearchPage from './Components/UserSearchPage';
import RandomTweetPage from './Components/RandomTweetPage';
import { useEffect, useState } from 'react';

//props


function App() {

  let [userPageSelection, setPageSelection] = useState('homePage')
  


  return (
    <div className="App">
      <div className="navbar"> <NavBar selection={userPageSelection} updateSelection={setPageSelection}/></div>
      {/* <div className="pageContent">  */}
          <HomePage selection={userPageSelection}/>
          <UserSearchPage selection={userPageSelection}/>
          <RandomTweetPage selection={userPageSelection}/>
      {/* </div> */}
    </div>
      
      )
}

export default App;
