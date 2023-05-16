import { useState } from "react"
import TweetCard from "./TweetCard";

function UserSearchPage(props){
    const dummyData = [{author_display_name: "Elon Musk", author_id:"44196397", author_profile_pic: "https://pbs.twimg.com/profile_images/1590968738358079488/IY9Gx6Ok_normal.jpg", author_user_name: "elonmusk", created_at: "2023-03-24T09:38:38.000Z", like_count: 305478, media_key: "3_1639200032409747457", media_url: "https://pbs.twimg.com/media/Fr-bvp-XgAE20K3.jpg", quote_count: 2556, reply_count: 17259, retweet_count: 30327, tweet_id: "1639200036578885632", tweet_text: "I’m sure it will be fine https://t.co/JWsq62Qkru"}]
    let [tweetArray, setTweetArray] = useState(dummyData)
    let [missingUserErrorMessage, setMissingUserErrorMessage] = useState('')

    const getJSON = (url)=> {console.log('getJSON ran'); return fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error('CUSTOM ERROR - JSON/API Request failed')
        };
        
        return response.json()
      })
      .then(response => {
        console.log(typeof(response), response)
        setTweetArray(response)
        setMissingUserErrorMessage('')
        // return response
      })
      .catch(error => { setMissingUserErrorMessage('That User Does Not Exist.  Please check your spelling and try again.'); console.log(`ERROR! ${error}`) })
  }

    const retrieveUserTweets = ()=>{ 
        const userName = document.getElementById('inputfield').value
        const url = `https://twitter-showcase-app-zuot.onrender.com/usertweets?username=${userName}`
      
        getJSON(url)
    }
    const retrieveTopicTweets = ()=>{
        const topic = document.getElementById('inputfield').value
        const url = `https://twitter-showcase-app-zuot.onrender.com//topictweets?searchstring=${topic}`
        
        getJSON(url)
    }

    const leftContainer = 
    <div className="usersearchleftcontainer">
        <div className="searchtype">
            <button type="button" className="btn btn-secondary" onClick={retrieveUserTweets}>USER</button>
            <button type="button" className="btn btn-secondary" onClick={retrieveTopicTweets}>TOPIC</button>
            <div className="searchInput">
                <div className="inputdiv">
                    {/* <img src={require('../Images/at_image.png')} width="40px" alt='# or @ sign'></img> */}
                    <input type="text" id="inputfield"/>
                </div>
                <p style={{color: 'red'}}>{missingUserErrorMessage}</p>
            </div>
        </div>
        <div className="leftContainerOneTweet"></div>
        
    </div>
    
    let rightContainer;

    if(tweetArray.length === 1){
        rightContainer = (
        <div className="usersearchrightcontainer">
        <div className="rightContainerOneTweet"><TweetCard tweet={tweetArray[0]}/></div>
        </div>
        )
    }
    else{
        let tweetCards=[];
        for(let i=0; i< tweetArray.length; i++){
            let tweetJSX = (
                <div className="rightContainerOneTweet"><TweetCard tweet={tweetArray[i]}/></div>
            )
            tweetCards.push(tweetJSX)
        }

        rightContainer = <div className="usersearchrightcontainer">
            {tweetCards}
            
        </div>
    }
    
    const userSearchBody = (
        <div className="userSearchPage">
        {[leftContainer, rightContainer]}
        </div>
   
    )
    
    return props.selection === 'searchButton'? userSearchBody : null
}

export default UserSearchPage