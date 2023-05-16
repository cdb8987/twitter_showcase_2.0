import TweetCard from "./TweetCard";
import { useState } from "react"


function RandomTweetPage(props){
  const dummyData = [{author_display_name: "Elon Musk", author_id:"44196397", author_profile_pic: "https://pbs.twimg.com/profile_images/1590968738358079488/IY9Gx6Ok_normal.jpg", author_user_name: "elonmusk", created_at: "2023-03-24T09:38:38.000Z", like_count: 305478, media_key: "3_1639200032409747457", media_url: "https://pbs.twimg.com/media/Fr-bvp-XgAE20K3.jpg", quote_count: 2556, reply_count: 17259, retweet_count: 30327, tweet_id: "1639200036578885632", tweet_text: "I’m sure it will be fine https://t.co/JWsq62Qkru"}]
  
  let [selectedTweet, setSelectedTweet] = useState(dummyData[0])

  let tweetArray = dummyData
  const favoriteUsers = ['lynaldencontact', 'dylanleclair_', 'saylor', 'saifedean', 'elonmusk']
  
  const getJSON = (url)=> {console.log('getJSON ran'); return fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error('CUSTOM ERROR - JSON/API Request failed')
        };
        return response.json()
      })
      .then(response => {
        // console.log(typeof(response), response)
        
        for(let i=0;i<response.length; i++){
          tweetArray.push(response[i])
        }
        console.log(tweetArray)
        
      })
      .catch(error => { console.log(`ERROR! ${error}`) })
  }

  const retrieveUserTweets = (userName)=>{ 
    const url = `https://twitter-showcase-app-zuot.onrender.com//usertweets?username=${userName}`
    return getJSON(url)
  }
  
  
  for(let i=0;i< favoriteUsers.length; i++){
    console.log('forloopran')
    retrieveUserTweets(favoriteUsers[i])
  }
  
  const getRandomTweet = ()=> {
    const tweetIndex = Math.floor(Math.random() * tweetArray.length)
    setSelectedTweet(tweetArray[tweetIndex])
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
    


  const userBar = 
  <div className="RandomTweetuserBar">
    {[randomTweetUserCard('https://pbs.twimg.com/profile_images/1362635264158552067/CSsOKrBd_normal.jpg', 'Saifedean Ammous'), randomTweetUserCard('https://pbs.twimg.com/profile_images/1635306935078584322/z8C5RB6O_normal.jpg', 'Dylan LeClair'), randomTweetUserCard('https://pbs.twimg.com/profile_images/1521181379677073414/bm4LcJTr_normal.jpg', 'Lyn Alden'), randomTweetUserCard('https://pbs.twimg.com/profile_images/1485632175932383235/8t0DGo6V_normal.jpg', 'Michael Saylor'), randomTweetUserCard('https://pbs.twimg.com/profile_images/1590968738358079488/IY9Gx6Ok_normal.jpg', 'Elon Musk')]}
  </div>

  

  const cardTableContainer = 
  <div className="cardTableContainer">
  <button onClick={()=>{getRandomTweet();console.log('updated random tweet')}}>GET RANDOM TWEET</button>
  <div className="cardtableinnercontainer"><TweetCard tweet={selectedTweet}/></div>
  </div>



 
  return props.userPageSelection === 'randomButton'? <div className="randomTweetPage"><div className="randomTweetPageinnercontainer">{[userBar, cardTableContainer]}</div></div> : null

}

export default RandomTweetPage