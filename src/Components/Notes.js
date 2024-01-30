import React, { useContext, useEffect, useRef, useState } from 'react'
import NoteContext from '../Context/Notes/noteContext'
import Noteitem from './Noteitem';
import Addnote from './Addnote'
import { useNavigate } from 'react-router-dom';

function Notes(props) {
  let context = useContext(NoteContext);
  const { notes, getNotes , editNotes} = context;
  const [note, setNote] = useState({ etitle: "", edescription: "", etag: "", id:"" });
  const ref = useRef(null);
  const refClose = useRef(null);
  let navigate = useNavigate();

  useEffect(() => {
    if(localStorage.getItem("token")){
      getNotes();

    }else{
      navigate("/LognIn")
    }
   
  },[])

  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({ etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag , id:currentNote._id});

  }


  const handleClick = (e) => {               //after click on Update Note
    e.preventDefault();
    //console.log("updating the note", note);
    editNotes(note.id,note.etag,note.edescription,note.etitle);        // this function edit UI as well db
    refClose.current.click();
    props.changeAlert("Note Updated", "success");
    

  }

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value })

  }

  return (
    <>
      <Addnote changeAlert={props.changeAlert}/>


      <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>


      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="etitle" className="form-label">Title</label>
                  <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle} aria-describedby="emailHelp" onChange={onChange} minLength={5} required/>
                </div>
                <div className="mb-3">
                  <label htmlFor="edescription" className="form-label">Description</label>
                  <input type="text" className="form-control" id="edescription" name='edescription' value={note.edescription} onChange={onChange} minLength={5} required/>
                </div>
                <div className="mb-3">
                  <label htmlFor="etag" className="form-label">Tag</label>
                  <input type="text" className="form-control" id="etag" name='etag' value={note.etag} onChange={onChange} />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button disabled={(note.etitle.length<5) || (note.edescription.length<5)} onClick={handleClick} type="button" className="btn btn-primary">Update Note</button>
            </div>
          </div>
        </div>
      </div>

      <div className="row my-3">
        <h1>Yours notes</h1>
        <div className="container mx-2">                         
        {notes.length===0 && "No note to show"}
        </div>
        {notes.map(note => <Noteitem key={note._id} updateNote={updateNote} note={note} changeAlert={props.changeAlert}/>)}
      </div>
    </>
  )
}

export default Notes
