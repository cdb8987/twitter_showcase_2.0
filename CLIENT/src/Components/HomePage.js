import { useState } from "react"

function HomePage(props){
    
    
    const twitter_logo = <img src={require("../Images/twitter_logo.png")} alt={'searchButton'} style={{ width: '120%', paddingLeft: '250px'}}/>


    const page = ( 
    <div className="homePage">
        <h2>
        <h1><u><strong>THE TWEET REPORT</strong></u></h1>
            <p>Stay <strong>in the know</strong> and <strong>above the fray</strong> with read-only Twitter.  </p>
            <p>You can search tweets <strong>OR</strong></p>
            <p>Curate a personal feed with <strong>only your FAVORITE</strong> users.</p>
            
            
        </h2>
        <h1>
            {twitter_logo}
        </h1>
    </div>
    )
    return props.userPageSelection === 'homeButton'? page : null
}

export default HomePage