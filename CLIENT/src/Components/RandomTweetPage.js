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
    favoriteUsersData = [["Michael Saylor⚡️", "https://pbs.twimg.com/profile_images/1485632175932383235/8t0DGo6V_normal.jpg"],["Elon Musk", "https://pbs.twimg.com/profile_images/1590968738358079488/IY9Gx6Ok_normal.jpg"],["Saifedean Ammous", "https://pbs.twimg.com/profile_images/1362635264158552067/CSsOKrBd_normal.jpg"],["Lyn Alden", "https://pbs.twimg.com/profile_images/1521181379677073414/bm4LcJTr_normal.jpg"],["Dylan LeClair 🟠", "https://pbs.twimg.com/profile_images/1635306935078584322/z8C5RB6O_normal.jpg"]];
    localStorage.setItem('favoriteUsersData', JSON.stringify(favoriteUsersData));
  }

  
  


  let [addUserInputValue, setAddUserInputValue] = useState('')
  let [removeUserInputValue, setRemoveUserInputValue] = useState('')
  let [favoriteUsersDataSTATE, setFavoriteUsersDataSTATE] = useState(favoriteUsersData)
  
 
  const handleAddUser = (e) => {
    if (e.keyCode  === 13) {
      favoriteUsers.push(addUserInputValue)
      localStorage.setItem('favoriteUsers', JSON.stringify(favoriteUsers))
      localStorage.setItem('favoriteUsersData', JSON.stringify(favoriteUsersData))
      getRandomTweet()
    }
  };

 
  const handleRemoveUser = (e) => {
    if (e.keyCode  === 13) {
      favoriteUsers = favoriteUsers.filter(function(e){return e !== removeUserInputValue})
      
      localStorage.setItem('favoriteUsers', JSON.stringify(favoriteUsers))
      getRandomTweet()
    }
  };

  const addUserInputField = (
    <>
    <p>ADD USER</p>
    <input type="text" onChange={e=>setAddUserInputValue(e.target.value)} onKeyDown={handleAddUser}>
    </input>
    </>
  )
  const removeUserInputField = (
    
    <>
    <p>REMOVE USER</p>
    <input type="text" onChange={e=>setRemoveUserInputValue(e.target.value)} onKeyDown={handleRemoveUser}>
    </input>
    </>
  )



  
  const dummyData = [{author_display_name: "Elon Musk", author_id:"44196397", author_profile_pic: "https://pbs.twimg.com/profile_images/1590968738358079488/IY9Gx6Ok_normal.jpg", author_user_name: "elonmusk", created_at: "2023-03-24T09:38:38.000Z", like_count: 305478, media_key: "3_1639200032409747457", media_url: "https://pbs.twimg.com/media/Fr-bvp-XgAE20K3.jpg", quote_count: 2556, reply_count: 17259, retweet_count: 30327, tweet_id: "1639200036578885632", tweet_text: "I’m sure it will be fine https://t.co/JWsq62Qkru"}]
  
  let [selectedTweet, setSelectedTweet] = useState(dummyData[0])

  let tweetArray = dummyData
  
  
  const getJSON = (url, userName)=> {console.log('getJSON ran'); return fetch(url)
      .then(response => {
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
          favoriteUsersData.unshift([response[0].author_display_name , response[0].author_profile_pic])
          setFavoriteUsersDataSTATE(favoriteUsersData)
          
          localStorage.setItem('favoriteUsersData', JSON.stringify(favoriteUsersData))
        }

         
        for(let i=0;i<response.length; i++){
          tweetArray.push(response[i])
          
        }
       
        
      })
      .catch(error => { console.log(`ERROR! ${error}`) })
  }

  const retrieveUserTweets = (userName)=>{ 
    const url = `https://twitter-showcase-app-zuot.onrender.com//usertweets?username=${userName}`
    // favoriteUsersData = []
    return getJSON(url, userName)
  }
  

  
  const updatePage = ()=> {
    for(let i=0;i< favoriteUsers.length; i++){
      console.log('forloopran for ', favoriteUsers[i])
      retrieveUserTweets(favoriteUsers[i])
    }
  }
  
  
  const getRandomTweet = ()=> {
    const tweetIndex = Math.floor(Math.random() * tweetArray.length)
    setSelectedTweet(tweetArray[tweetIndex]);
    updatePage()
    return tweetArray[tweetIndex]
  }
  

  
  const randomTweetUserCard = (profilePicURL, Username)=>{
    
    return (
    <div className="RandomTweetUserCard">
      <img src={profilePicURL} alt="user" width={'100dw'} style={{'borderRadius': '50%', float: 'left', MarginLeft: '10px', MarginTop: '10px'}}></img>
      <strong>{Username}</strong> 
    </div>
    )
  }
    
  

  
  let userDataJSXArray = []
  for(let i=0; i < favoriteUsersData.length; i++){
    console.log('i1 is: ', i[1], 'i0 is: ', i[0])
    
    userDataJSXArray.push(randomTweetUserCard(favoriteUsersDataSTATE[i][1], favoriteUsersDataSTATE[i][0]))
  }
  console.log('favoriteusers.length: ', favoriteUsersData.length)
  
  const userBar = 
  <div className="RandomTweetuserBar">
    {[addUserInputField, removeUserInputField, userDataJSXArray]}
    {/* {userDataJSXArray} */}
  </div>

  




  // const cardTableContainer = null
  const cardTableContainer = 
  <div className="cardTableContainer">
  <button onClick={()=>{getRandomTweet();console.log('updated random tweet')}}>UPDATE FEED</button>
  <div className="cardtableinnercontainer"><TweetCard tweet={selectedTweet}/></div>
  </div>



 
  return props.userPageSelection === 'randomButton'? <div className="randomTweetPage"><div className="randomTweetPageinnercontainer">{[userBar, cardTableContainer]}</div></div> : null

}

export default RandomTweetPage