var topics = ["cat", "rat", "dinosaur", "fox", "kangaroo", "dragon", "dog", "squirrel", "rabbit", "snake"];

function topicButtons(animalIndex)
{
  var animalButton = $("<button>");

  animalButton.text(topics[animalIndex]);

  animalButton.attr("data-animalName", topics[animalIndex]);


  $("#buttonZone").append(animalButton);
};

drawButtons();


function drawButtons()
{

  for (i = 0; i < topics.length; i++)
  {
    topicButtons(i);

  };

};


$("button").on("click", buttonClick);



    $("#animalSubmit").on("click", function(event) {

           event.preventDefault();
           var userFormAnimal = $("#userAnimal").val();

           console.log(userFormAnimal);

           topics.push(userFormAnimal);
          $("#buttonZone").empty();
           drawButtons();
           $("button").on("click", buttonClick);
         });

function buttonClick ()
{
  // Grabbing and storing the data-animal property value from the button
  var animal = $(this).attr("data-animalName");

  // Constructing a queryURL using the animal name
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
    animal + "&api_key=dc6zaTOxFJmzC&limit=10";

  // Performing an AJAX request with the queryURL
  $.ajax({
      url: queryURL,
      method: "GET"
    })
    // After data comes back from the request
    .done(function(response) {
      console.log(queryURL);

      console.log(response);

      var results = response.data;

        for (var i = 0; i < results.length; i++)
        {
        var animalDiv = $("<div>");

        var p = $("<p>").text("Rating: " + results[i].rating);

        var animalImage = $("<img>");


        // variables and attributes for still and fixed images for each img
        var stillUrl = results[i].images.fixed_height_still.url;
        var animateUrl = results[i].images.fixed_height.url;
        animalImage.attr("src", stillUrl);
        animalImage.attr("data-still", stillUrl);
        animalImage.attr("data-animate", animateUrl);

        animalImage.attr("data-state", "still");


          animalImage.on("click", function() {
            // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
            var state = $(this).attr("data-state");
            // If the clicked image's state is still, update its src attribute to what its data-animate value is.
            // Then, set the image's data-state to animate
            // Else set src to the data-still value
            if (state === "still") {
              $(this).attr("src", $(this).attr("data-animate"));
              $(this).attr("data-state", "animate");
            } else {
              $(this).attr("src", $(this).attr("data-still"));
              $(this).attr("data-state", "still");
            }
          });


      //  console.log(results[i].images.fixed_height.url);

        animalDiv.append(p);
        animalDiv.append(animalImage);

        $("#gif-area").prepend(animalDiv);

        };

  });
    };
