const express = require('express')
const router = express.Router()
var fetchuser = require('../middleware/fetchuser')
const Notes = require("../models/Notes")
const { body, validationResult } = require('express-validator');

//Rout 1: to fetch notes for particular user  "/api/notes/fetchAllNotes"
router.get('/fetchAllNotes', fetchuser, async (req, res) => {

  try {
    const note = await Notes.find({ user: req.user });           //req.user = userID
    res.json(note);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("internal server side error");

  }
})


//Rout 2: Create notes  "/api/notes/addnote"   login required
router.post('/addnote', fetchuser, [body('title').isLength({ min: 3 }), body('description').isLength({ min: 5 })],
  async (req, res) => {
    const { title, description, tag } = req.body;         // destructuring of req.body to get these value

    //if there is an error in body json
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(422).send({ errors: result.array() });
    }


    try {
      const note = new Notes({
        title, description, tag, user: req.user                // this value saved to notes in DB
      })

      const saveData = await note.save();
      res.json(saveData);

    } catch (error) {
      console.error(error.message);
      res.status(500).send("internal server side error");
    }

  })

  //Rout 3: Update existing note  "/api/notes/updatenotes"   login required
  router.put('/updatenotes/:noteId', fetchuser, async (req, res) => {
    const { title, description, tag } = req.body;
    
    //create New object
    const newNote={};
    if(title){newNote.title=title};
    if(description){newNote.description=description};
    if(tag){newNote.tag=tag};

    try {
      // Find the note to be updated using noteId
    let note= await Notes.findById(req.params.noteId);     //take noteID from URL

    if (!note){                                           // if noteId is not available
      return res.status(404).send("not found")
    } 

    console.log(note.user);
    
    //check the user id is valid 
    if (note.user.toString() !== req.user){           //toString is required to convert id type to string
      return res.status(401).send("not allowed")
    }
     
    note=await Notes.findByIdAndUpdate(req.params.noteId, {$set:newNote}, {new:true});

    res.json(note)

      
    } catch (error) {
      console.error(error.message);
      res.status(500).send("internal server side error");
    }

    


  })


   //Rout 4: Update existing note  "/api/notes/deletenote"   login required
   router.delete('/deletenote/:noteId', fetchuser, async (req, res) => {

    try {
      // Find the note to be updated using noteId
    let note= await Notes.findById(req.params.noteId);    //req.param used to get url param

    if (!note){                                           // if noteId is not available
      return res.status(404).send("not found")
    } 

    console.log(note.user);
    
    //check the user id is valid 
    if (note.user.toString() !== req.user){           //toString is required to convert id type to string
      return res.status(401).send("not allowed")
    }
     
    note=await Notes.findByIdAndDelete(req.params.noteId)

    res.json({"suscess": "note Deleted", note})


      
    } catch (error) {
      console.error(error.message);
      res.status(500).send("internal server side error");
      
    }
    
    

  })





module.exports = router