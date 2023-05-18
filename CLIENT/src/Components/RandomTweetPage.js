import TweetCard from "./TweetCard";
import { useState } from "react"


function RandomTweetPage(props){
  let favoriteUsers;
  if(localStorage.getItem('favoriteUsers')){
    favoriteUsers = JSON.parse(localStorage.getItem('favoriteUsers'))
    
  }
  else{
    favoriteUsers = ['lynaldencontact', 'dylanleclair_', 'saylor', 'saifedean', 'elonmusk'];
    localStorage.setItem('favoriteUsers', JSON.stringify(favoriteUsers));
  }

  let favoriteUsersData=[]
  if(localStorage.getItem('favoriteUsersData')){
    favoriteUsersData = JSON.parse(localStorage.getItem('favoriteUsersData'))
  }
  else{
    favoriteUsersData = [["Michael Saylor⚡️", "https://pbs.twimg.com/profile_images/1485632175932383235/8t0DGo6V_normal.jpg", "saylor"],["Elon Musk", "https://pbs.twimg.com/profile_images/1590968738358079488/IY9Gx6Ok_normal.jpg", "elonmusk"],["Saifedean Ammous", "https://pbs.twimg.com/profile_images/1362635264158552067/CSsOKrBd_normal.jpg", "saifedean"],["Lyn Alden", "https://pbs.twimg.com/profile_images/1521181379677073414/bm4LcJTr_normal.jpg", "lynaldencontact"],["Dylan LeClair 🟠", "https://pbs.twimg.com/profile_images/1635306935078584322/z8C5RB6O_normal.jpg", "dylanleclair_"]];
    localStorage.setItem('favoriteUsersData', JSON.stringify(favoriteUsersData));
  }

  let [addUserInputValue, setAddUserInputValue] = useState('')
  let [favoriteUsersDataSTATE, setFavoriteUsersDataSTATE] = useState(favoriteUsersData)
  let [tweetFeed, setTweetFeed] = useState([])

  
  const handleAddUser = (e) => {
    if (e.keyCode  === 13) {
      favoriteUsers.push(addUserInputValue)
      localStorage.setItem('favoriteUsers', JSON.stringify(favoriteUsers))
      localStorage.setItem('favoriteUsersData', JSON.stringify(favoriteUsersData))
      updatePage()
    }
  };

  const handleRemoveUser = (username) => {
    
    console.log('handleRemoveUser clicked and we will remove', username)
    favoriteUsers = favoriteUsers.filter(function(e){return e !== username})
    localStorage.setItem('favoriteUsers', JSON.stringify(favoriteUsers))
    for(let i=0; i < favoriteUsersData.length; i++){
      console.log(favoriteUsersData[i][2], i)
      if(favoriteUsersData[i][2] === username){
        let toRemove = favoriteUsersData[i]
        console.log('to remove: ', toRemove)
        favoriteUsersData = favoriteUsersData.filter(function(e){return e !== toRemove});
        localStorage.setItem('favoriteUsersData', JSON.stringify(favoriteUsersData));
        setFavoriteUsersDataSTATE(favoriteUsersData);
        updatePage()
      }
    }
  };
  const addUserInputField = (
    <>
    <p>ADD USER</p>
    <input type="text" onChange={e=>setAddUserInputValue(e.target.value)} onKeyDown={handleAddUser}>
    </input>
    </>
  )
  
  

  const randomTweetUserCard = (profilePicURL, UserFullname, username)=>{
    
    return (
    <div className="RandomTweetUserCard">
      <img src={profilePicURL} alt="user" width={'100dw'} style={{'borderRadius': '50%', float: 'left', MarginLeft: '10px', MarginTop: '10px'}}></img>
      <strong>{UserFullname}</strong>
      <button value={username} onClick={()=> handleRemoveUser(username)}>X</button> 
    </div>
    )
  }
    
  

  
  let userDataJSXArray = []
  for(let i=0; i < favoriteUsersData.length; i++){
    console.log('i1 is: ', i[1], 'i0 is: ', i[0])
    
    userDataJSXArray.push(randomTweetUserCard(favoriteUsersDataSTATE[i][1], favoriteUsersDataSTATE[i][0], favoriteUsersDataSTATE[i][2]))
  }
  console.log('favoriteusers.length: ', favoriteUsersData.length)
  
  const userBar = 
  <div className="RandomTweetuserBar">
    {[addUserInputField, userDataJSXArray]}
    {/* {userDataJSXArray} */}
  </div>

  let tweetCards=[];
          for(let i=0; i< tweetFeed.length; i++){
              let tweetJSX = (
                  <div className="rightContainerOneTweet"><TweetCard tweet={tweetFeed[i]}/></div>
              )
              tweetCards.push(tweetJSX)
          }

  const cardTableContainer = (
  <div className="cardTableContainer">
  <div className="cardtableinnercontainer">{tweetCards}</div>
  </div>
  )

  const getJSON = (url, userName)=> {console.log('getJSON ran'); return fetch(url)
      .then(response => {
        console.log("INSIDE getJSON url and username: ", url, userName)
        if (!response.ok) {
          throw new Error('CUSTOM ERROR - JSON/API Request failed')
        };
        return response.json()
      })
      .then(response => {

        let profLinks =[];
        for(let i=0; i < favoriteUsersData.length; i++ ){
          profLinks.push(favoriteUsersData[i][1])
        }

        if(!profLinks.includes(response[0].author_profile_pic)){
          favoriteUsersData.unshift([response[0].author_display_name , response[0].author_profile_pic, userName])
          setFavoriteUsersDataSTATE(favoriteUsersData)

          localStorage.setItem('favoriteUsersData', JSON.stringify(favoriteUsersData))
        }
        let innerArray = []
        for(let i=0;i<response.length; i++){
          innerArray.push(response[i]) 
        }
        console.log('innerarray', innerArray, 'returned')
        return innerArray
        
      })
      .catch(error => { console.log(`ERROR! ${error}`) })
  }

  const retrieveUserTweets = async (userName)=>{ 
    const url = `https://twitter-showcase-app-zuot.onrender.com//usertweets?username=${userName}`
    let data = await getJSON(url, userName)
    console.log('retreiveusertweets data is:' , data)
    
    return data
  }
  
  const updatePage = async ()=> {
    // for(let i=0;i< favoriteUsers.length; i++){
    //   console.log('forloopran for ', favoriteUsers[i])
    //   retrieveUserTweets(favoriteUsers[i])
    // }
    let arr = Array.from({ length: favoriteUsers.length }, (_, index) => index);
    console.log('ARR is: ', arr)
    let updatedTweets = await Promise.all(arr.map(async (index)=> {console.log(favoriteUsers[index]); console.log('inside map function data is: ',await retrieveUserTweets(favoriteUsers[index])); return await retrieveUserTweets(favoriteUsers[index])}))
    setTweetFeed(updatedTweets)
    console.log('updatedTweets is: ', updatedTweets)
    console.log('TWEET FEED IS', tweetFeed )
  }


 
  return props.userPageSelection === 'randomButton'? <div className="randomTweetPage"><div className="randomTweetPageinnercontainer">{[userBar, cardTableContainer]}</div></div> : null
  // cardTableContainer
}

export default RandomTweetPage