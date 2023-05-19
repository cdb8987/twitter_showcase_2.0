

function NavBar(props){  /// takes current selection as prop
    console.log(props)
    console.log(props.userPageSelection)
    const imgStyle = {
        width: 65
    }
    const homeButton = (<button  onClick={()=> props.setUserPageSelection('homeButton')} style={{fontSize:'large'}}><img src={require('../Images/home_icon.png')} alt={'homeButton'} style={imgStyle} /></button>)
    
    const searchButton = (<button  onClick={()=> props.setUserPageSelection('searchButton')} style={{fontSize:'large'}} ><img src={require("../Images/search_icon.png")} alt={'searchButton'} style={imgStyle}/></button>)
    const randomButton = (<button  onClick={()=> props.setUserPageSelection('randomButton')} style={{fontSize:'large'}}><img src={require("../Images/message_feed_icon.png")} alt={'randomButton'} style={imgStyle}/></button>)
    
    
    const navigationBar = (<nav>{[homeButton, searchButton, randomButton]}</nav>)




    return navigationBar
}

export default NavBar