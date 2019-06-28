//Grab the articles as a json
$(document).on("click","#scraper", function(){
    location.reload();
});

    $.getJSON("/articles", function(data) {
        //For eache one
        for (var i = 0; i < data.length; i++) {
            //Dislay the apropos information on the page
            $("#articles").append(
                "<p class= 'card' data-id='" +
                data[i]._id +
                "'>" +
                data[i].title +
                "<br />" +
                data[i].summary +
                "<a href=" +
                data[i].link +
                ">" +
                data[i].link +
                "</a>" +
                "<button id='create' type='button' class='btn btn-primary btn-sm'>Create Note</button></p>"
                );
            }
        });
//Click p tag
$(document).on("click", "#create", function() {
  //Empty note
  $("#notes").empty();
  //Save the id
  var thisId = $(this).attr("data-id");

  //ajax call
  $.ajax({
    method: "GET",
    url: "/articles/" + thisId
  })

    //Add the note
    .then(function(data) {
      console.log(data);
      //The title
      $("#notes").append("<h2>" + data.title + "</h2>");
      //input new title
      $("#notes").append("<input id='titleinput' name='title' >");
      //a textarea
      $("#notes").append("<textarea id='bodyinput' name='body'></textarea>");
      //button to submit note with id of article
      $("#notes").append(
        "<button data-id=" + data._id + " class='btn btn-primary btn-sm' id='savenote'>Save Note</button>"
      );

      //if note exists
      if (data.note) {
        //Title in input
        $("titleinput").val(data.note.title);
        //body in textarea
        $("#bodyinput").val(data.note.body);
      }
    });
});

//When you click
$(document).on("click", "#savenote", function() {
  //Grab the id associated with article
  var thisId = $(this).attr("data-id");

  //POST request to change note
  $.ajax({
    method: "POST",
    url: "/articles/" + thisId,
    data: {
      //value taken from title input
      title: $("#titleinput").val(),
      //Value
      body: $("#bodyinput").val()
    }
  })
    //With that done
    .then(function(data) {
      //Log the response
      console.log(data);
      //Empty the notes section
      $("#notes").empty();
    });

  $("#titleinput").val("");
  $("#bodyinput").val("");
});
