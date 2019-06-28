var mongoose = require("mongoose");

//reference to schema constructor

var Schema = mongoose.Schema;

// use Schema create new NoteSchema, object

var NoteSchema = new Schema({
    //title 
    title: String,
    // body 
    body: String
});

//This creates our model from schema
var Note = mongoose.model("Note", NoteSchema);

//Export the note model
module.exports = Note;