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
       console.log(response)
       var imageUrl = response.data[i].images.fixed_height_still.url;
       var still = response.data[i].images.fixed_height_still.url;
       var animate = response.data[i].images.fixed_height.url;
       var rating = response.data[i].rating;
       var ratingUp = rating.toUpperCase();
       var characterImage = $("<div class='col-xs-4 gif'><img class='gipper' src="+imageUrl+" data-still="+still+" data-animate="+animate+" data-state='still'><p>"+'Rating: '+ratingUp+"</p>");
       $('#cartoons').prepend(characterImage);
     }

     $(document).on('click', '.gipper', function() {
       var state = $(this).attr('data-state');
         if (state == 'still'){
             $(this).attr('src', $(this).data('animate'))
             $(this).attr('data-state', 'animate')
         }else{
             $(this).attr('src', $(this).data('still'))
             $(this).attr('data-state', 'still')
         };
     })
  })
};

run();
