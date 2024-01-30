const mongoose = require('mongoose');
const { Schema } = mongoose;

const NotesSchema = new Schema({
user :{ type:mongoose.Schema.Types.ObjectId},    // connect user id of schema Users
title:{type: String , required: true},
description:{type: String , required: true},
tag:{type:String, default:"general"},
});

module.exports= mongoose.model('Notes', NotesSchema);