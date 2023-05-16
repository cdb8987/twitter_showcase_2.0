import { useState } from "react"

function HomePage(props){
    
    
    const twitter_logo = <img src={require("../Images/twitter_logo.png")} alt={'searchButton'} style={{ width: '120%', paddingLeft: '250px'}}/>


    const page = ( 
    <div className="homePage">
        <h2>
            
            <p>This is my Twitter Showcase App.</p>
            <p>You can search for tweets from your favorite users!</p>
            <p>...Or just check out a random tweet from one of my favorite users.</p>
            
            
        </h2>
        <h1>
            {twitter_logo}
        </h1>
    </div>
    )
    return props.userPageSelection === 'homeButton'? page : null
}

export default HomePage