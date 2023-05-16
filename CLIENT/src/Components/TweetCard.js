

function TweetCard(props){ //passing in a tweet object retrieved from flask endpoint
    
    console.log('TweetCard reads', props.tweet)
    const tweet = props.tweet
   const tweetHeader = (
    <>
    <div>
        <span><img src={tweet.author_profile_pic} width="100px" style={{'border-radius': '50%'}} alt="profilepic"></img></span>
        <p><h3>{tweet.author_display_name}</h3></p>  
        <p><h4>@{tweet.author_user_name}</h4></p>
    </div>
    <p></p>
    </>
   )
    let imageJSX = (<></>)
    if(tweet.media_url){imageJSX = (<p><img className="tweetmedia" src={tweet.media_url}  width="250px" alt="tweetmedia" ></img></p>)}
   const tweetBody = (
    <>
    <p>{tweet.tweet_text}
    </p>
    {imageJSX}
    {/* <p><img src={tweet.media_url}  width="250px" alt="tweetmedia" ></img></p> */}
    </>
   )
   let d = new Date(tweet.created_at)
   d = String(d)
   console.log('date is:', d, typeof(d)); 
   const tweetDate = (
    <>{d}</>
    // <p>{tweet.created_at}</p>
   )

   const engagementData = (
    <p><strong>{tweet.retweet_count}</strong> Retweets <strong>{tweet.like_count}</strong> Likes </p>
   )
   const tweetMetaData = (
    <p>
        <span><img src={require('../Images/twitter-reply.png') } width="30px"></img>{tweet.reply_count}</span>
        <span><img src={require('../Images/twitter-retweet.png')}width="40px"></img>{tweet.retweet_count}</span>
        <span><img src={require('../Images/twitter-like.png')}width="40px"></img>{tweet.like_count}</span>
        
    </p>
   )
   
   
   
   return [tweetHeader, tweetBody, tweetDate, engagementData, tweetMetaData]


}
export default TweetCard