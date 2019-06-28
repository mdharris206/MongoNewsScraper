const mongoose = require("mongoose");

//reference to schema constructor

const Schema = mongoose.Schema;

// use Schema create new NoteSchema, object

const NoteSchema = new Schema({
    //title 
    title: String,
    // body 
    body: String
});

//This creates our model from schema
const Note = mongoose.model("Note", NoteSchema);

//Export the note model
module.exports = Note;