var mongoose = require("mongoose");

//Save a reference seet
var Schema = mongoose.Schema;

// use schema constructor, create a new UserSchema object

var ArticleSchema = new Schema({

    // title
    title: {
        type: String,
        required: true
    },

    //link
    link:{
        type: String,
        required: true
    },

    //note stored on Note id
    note: {
        type: Schema.Types.ObjectId,
        ref: "Note"
    }
});

//This create our model from schema
var Article = mongoose.model("Article", ArticleSchema);

//Export the article
module.exports = Article;