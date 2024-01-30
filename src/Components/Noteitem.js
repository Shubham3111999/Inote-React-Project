import React, { useContext } from 'react'
import NoteContext from '../Context/Notes/noteContext'

function Noteitem(props) {
    const { note , updateNote} = props
    let context = useContext(NoteContext);
    const {deleteNotes} = context;
    
    return (
        <div className="col-3">
            <div className="card my-3">
                <div className="card-body">
                    <div className="d-flex align-items-center">                                
                    <h5 className="card-title">{note.title}</h5>
                    <i className="fa-solid fa-pen-to-square mx-2" onClick={()=>{updateNote(note)}}></i>
                    <i className="fa-solid fa-trash mx-2" onClick={()=>{deleteNotes(note._id); props.changeAlert("Note deleted", "success");}}></i>
                    </div>
                   

                    <p className="card-text">{note.description}</p>
                    

                </div>
            </div>
        </div>
    )
}

export default Noteitem
