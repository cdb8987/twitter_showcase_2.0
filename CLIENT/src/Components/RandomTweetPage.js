import TweetCard from "./TweetCard";
import { useEffect, useState } from "react"


function RandomTweetPage(props){
  let favoriteUsers;
  if(localStorage.getItem('favoriteUsers')){
    favoriteUsers = JSON.parse(localStorage.getItem('favoriteUsers'))
    
  }
  else{
    favoriteUsers = ['lexfridman', 'saylor', 'cristiano', 'taylorswift13', 'elonmusk'];
    localStorage.setItem('favoriteUsers', JSON.stringify(favoriteUsers));
  }

  let favoriteUsersData=[]
  if(localStorage.getItem('favoriteUsersData')){
    favoriteUsersData = JSON.parse(localStorage.getItem('favoriteUsersData'))
  }
  else{
    favoriteUsersData = [["Lex Fridman","https://pbs.twimg.com/profile_images/956331551435960322/OaqR8pAB_normal.jpg","lexfridman"],["Michael Saylor⚡️","https://pbs.twimg.com/profile_images/1485632175932383235/8t0DGo6V_normal.jpg","saylor"],["Cristiano Ronaldo","https://pbs.twimg.com/profile_images/1594446880498401282/o4L2z8Ay_normal.jpg","cristiano"],["Taylor Swift","https://pbs.twimg.com/profile_images/1564101520043479043/eJpWqka2_normal.jpg","taylorswift13"],["Elon Musk","https://pbs.twimg.com/profile_images/1590968738358079488/IY9Gx6Ok_normal.jpg","elonmusk"]];
    localStorage.setItem('favoriteUsersData', JSON.stringify(favoriteUsersData));
  }
  
  




  let [addUserInputValue, setAddUserInputValue] = useState('')
  let [favoriteUsersDataSTATE, setFavoriteUsersDataSTATE] = useState(favoriteUsersData)
  let [tweetFeed, setTweetFeed] = useState([])



  const handleAddUser = (e) => {
    if (e.keyCode  === 13) {
      retrieveUserTweets(addUserInputValue.replace('@', ''))
      .then(
        (response)=>{
          try { 
            
            if(response.length){
              favoriteUsers.push(addUserInputValue.replace('@', ''))
              setAddUserInputValue('')
            localStorage.setItem('favoriteUsers', JSON.stringify(favoriteUsers))
            localStorage.setItem('favoriteUsersData', JSON.stringify(favoriteUsersData))
            updatePage()
            }
          }
          catch (error) {alert('That user does not exist.'); console.log(error)}
          
          
          
          // if(!response.length > 0){
          //   alert('user not found');
          //   return
          // }
          // else{
          //   favoriteUsers.push(addUserInputValue)
          //   localStorage.setItem('favoriteUsers', JSON.stringify(favoriteUsers))
          //   localStorage.setItem('favoriteUsersData', JSON.stringify(favoriteUsersData))
          //   updatePage()
          // }
        }
      )
    }
  };

  const handleRemoveUser = (username) => {
    
    favoriteUsers = favoriteUsers.filter(function(e){return e !== username})
    localStorage.setItem('favoriteUsers', JSON.stringify(favoriteUsers))
    for(let i=0; i < favoriteUsersData.length; i++){
      // console.log(favoriteUsersData[i][2], i)
      if(favoriteUsersData[i][2] === username){
        let toRemove = favoriteUsersData[i]
        // console.log('to remove: ', toRemove)
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
    <input className="form-control" type="text" placeholder="ex. @elonmusk"onChange={e=>setAddUserInputValue(e.target.value)} onKeyDown={handleAddUser}>
    </input>
    
    </>
  )
  
  
  


  const randomTweetUserCard = (profilePicURL, UserFullname, username)=>{
    
    return (
    <div className="RandomTweetUserCard">
      <img src={profilePicURL} alt="user" width={'50px'} style={{'borderRadius': '50%', float: 'left', MarginLeft: '10px', MarginTop: '10px', marginBottom: '10px'}}></img>
      <div>
        
          <strong>{UserFullname}</strong>
        
        
          <button type="button" class="close" aria-label="Close" value={username} style={{ alignItems:'end' }} onClick={()=> handleRemoveUser(username.replace('@', ''))
            }><span aria-hidden="true">&times;</span></button> 
        
      </div>
    </div>
    )
  }
    
  

  
  let userDataJSXArray = []
  for(let i=0; i < favoriteUsersData.length; i++){
    console.log('i1 is: ', i[1], 'i0 is: ', i[0])
    
    userDataJSXArray.push(randomTweetUserCard(favoriteUsersDataSTATE[i][1], favoriteUsersDataSTATE[i][0], favoriteUsersDataSTATE[i][2]))
  }
  // console.log('favoriteusers.length: ', favoriteUsersData.length)
  
  const userBar = 
  <div className="RandomTweetuserBar">
    {[addUserInputField, userDataJSXArray]}
    {/* {userDataJSXArray} */}
  </div>

  let tweetCards=[];
          for(let i=0; i< tweetFeed.length; i++){
              try{
              console.log('tweet number: ', i, tweetFeed[i])
              let tweetJSX = (
                  <div className="rightContainerOneTweet"><TweetCard tweet={tweetFeed[i]}/></div>
              )
              tweetCards.push(tweetJSX)
              }
              catch(error){console.log(error)}
          }

  const cardTableContainer = (
  <div className="cardTableContainer">
  <div className="cardtableinnercontainer">{tweetCards}</div>
  </div>
  )

  const getJSON = (url, userName)=> {console.log('getJSON ran'); return fetch(url)
      .then(response => {
        // console.log("INSIDE getJSON url and username: ", url, userName)
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
        // console.log('innerarray', innerArray, 'returned')
        return innerArray
        
      })
      .catch(error => { console.log(`ERROR! ${error}`) })
  }

  const retrieveUserTweets = async (userName)=>{ 
    const url = `https://twitter-showcase-app-zuot.onrender.com//usertweets?username=${userName}`
    let data = await getJSON(url, userName)

    
    return data
  }
  
  const updatePage = async ()=> {
    // for(let i=0;i< favoriteUsers.length; i++){
    //   console.log('forloopran for ', favoriteUsers[i])
    //   retrieveUserTweets(favoriteUsers[i])
    // }
    let arr = Array.from({ length: favoriteUsers.length }, (_, index) => index);
    let updatedTweets = await Promise.all(arr.map(async (index)=> {console.log(favoriteUsers[index]); console.log('inside map function data is: ',await retrieveUserTweets(favoriteUsers[index])); return await retrieveUserTweets(favoriteUsers[index])}));
    const mergedArray = updatedTweets.reduce((acc, curr) => acc.concat(curr), []);
    const sortedArray = mergedArray.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

    setTweetFeed(sortedArray)
    
  }


  useEffect(()=> {updatePage()}, [])

 
  return props.userPageSelection === 'randomButton'? <div className="randomTweetPage"><div className="randomTweetPageinnercontainer">{[userBar, cardTableContainer]}</div></div> : null
  // cardTableContainer
}

export default RandomTweetPage