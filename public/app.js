//Grab the articles as a json 
$.getJSON("/articles", function(data){

//For eache one
for(var i =0; i < data.length; i++){
    //Dislay the apropos information on the page
    $("#articles").append("<p data-id='"+ data[i]._id+"'>"+data[i].title+"<br />'"+data[i].link+"</p>")
}
});

//Click p tag
$(document).on("click", "p", function() {

    //Empty note
    $("#notes").empty();
    //Save the id
    var thisId = $(this).attr("data-id");

    //ajax call
    $.ajax({
        method: "GET",
        url: "/articles/"+ thisId
    })

    //Add the note
    .then(function(data) {
        console.log(data);
    //The title
    $("#notes").append("<h2>"+ data.title + "</h2>");
    //input new title
    $("#notes").append("<input id='titleinput' name='title' >");
    //a textarea
    $("#notes").append("<textarea id='bodyinput' name='body'></textarea>");
    //button to submit note with id of article
    $("#notes").append("<button data-id="+data._id+" id='savenote'>Save Note</button>");

    //if note exists
    if(data.note){
        //Title in input
        $("titleinput").val(data.note.title);
        //body in textarea
        $("#bodyinput").val(data.note.body);
    }

    });
});

//When you click
$(document).on("click", "#savenote", function(){
    //Grab the id associated with article
    var thisId= $(this).attr("data-id");

    //POST request to change note
    $.ajax({
        method: "POST",
        url: "/articles/"+ thisId,
        data: {
            //value taken from title input
            title: $("#titleinput").val(),
            //Value 
            body: $("#bodyinput").val()
        }
    })
    //With that done
    .then(function(data){
        //Log the response
        console.log(data);
        //Empty the notes section
        $("#notes").empty(); 
    });

    $("#titleinput").val("");
    $("#bodyinput").val("");

});