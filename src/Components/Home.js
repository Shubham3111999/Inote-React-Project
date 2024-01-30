import React from 'react'
import Notes from './Notes'



function Home(props) {
 
  return (
    <div>
      
       
        <Notes changeAlert={props.changeAlert}/>
      
      
    </div>
  )
}

export default Home
