var cartoonCharacters = ['Finn the Human', 'Sponge Bob Square Pants', 'Scooby Doo', 'Fred Flinstone', 'Homer Simpson', 'Marceline', 'Jake the Dog', 'Bender', 'Fry', 'Magic Man', 'Beemo', 'Naruto', 'Sasuke']

function run(){
$('#gifbar').empty();
for (var i = 0; i < cartoonCharacters.length; i++) {
  var c = $('<button>');
  c.addClass('btn btn-info character');
  c.attr('data-name', cartoonCharacters[i]);
  c.text(cartoonCharacters[i]);
  $('#gifbar').append(c);
  }
};

$('#addCharacter').on('click', function() {
  var newCharacter = $('#searching').val().trim();
  cartoonCharacters.push(newCharacter)
  gifSearch($('#searching').val().trim());
  $('#searching').val('');
  run();

  return false;

})

$(document).on('click', '.character', function() {
  var term = $(this).data('name');
  gifSearch(term);
})

function gifSearch (search) {
  $('#cartoons').empty();
  var query = search
  var queryURL = 'https://api.giphy.com/v1/gifs/search?q=' + query + '&limit=10&api_key=dc6zaTOxFJmzC'
  $.ajax({url: queryURL, method: 'GET'})
   .done(function (response) {
     for (var i = 0; i < 10; i++) {

       var imageUrl = response.data[i].images.original.url;
       var characterImage = $("<img>");
       characterImage.attr('src', imageUrl);

       var rating = response.data[i].rating;

       var ratingP = $("<p>");

       var ratingUp = rating.toUpperCase();

       ratingP.html("Rating: "+ratingUp);

       $('#cartoons').prepend(characterImage, ratingP);
     }

/*
      if (state == 'still'){
          $(this).attr('src', $(this).data('animate'))
          $(this).attr('data-state', 'animate')
      }else{
          $(this).attr('src', $(this).data('still'))
          $(this).attr('data-state', 'still')
      };
      */
  })
};

run();
