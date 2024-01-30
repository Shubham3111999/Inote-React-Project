import { useState } from "react";
import noteContext from "./noteContext";

const NoteState =(props)=>{
  const host= "http://localhost:5000"      //https gives error something SSL certificate
  const noteFisrt=[]

  const [notes, setNotes]= useState(noteFisrt);

  // get all notes for a perticular user
  const getNotes=async ()=>{
    //TODO : API CALL
    const response = await fetch(`${host}/api/notes/fetchAllNotes`, {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token")
      },
    });
    const json= await response.json();
    //console.log(json);
    
    setNotes(json);
   }


  // Add notes
  const addNotes=async ({title,description,tag})=>{
    //TODO : API CALL
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token")
      },
      body: JSON.stringify({title,description,tag}), // body data type must match "Content-Type" header
    });
    const json=await response.json();
    //console.log(json);

    let note=json
    setNotes(notes.concat(note))
   }


  // Delete notes
  const deleteNotes=async(id)=>{
    //TODO : API CALL
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token")
      },
      
    });
    const json= await response.json();
    console.log(json);

    
    //Logic to edit in client

     const newNote= notes.filter(ele=>ele._id!==id)
     setNotes(newNote);
  }



  //edit notes
  const editNotes= async(id,tag,description,title)=>{
    // API Call
    const response = await fetch(`${host}/api/notes/updatenotes/${id}`, {
      method: "PUT", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token")
      },
      body: JSON.stringify({title,description,tag}),     // body data type must match "Content-Type" header
    });

    const json= await response.json();
    //console.log(json);

    //Logic to edit in client
     let newNote= JSON.parse(JSON.stringify(notes))      //this is needed as we cant update state directly
    for (let index = 0; index < newNote.length; index++) {
      const element = newNote[index];
      if (element._id===id){
        newNote[index].title=title;
        newNote[index].description=description;
        newNote[index].tag=tag;
        break;
      }
    }
    setNotes(newNote)

  }

    return(
        <noteContext.Provider value={{notes,addNotes,deleteNotes,editNotes,getNotes}}>
            {props.children}                                   
        </noteContext.Provider>
        
    )
}

export default NoteState;