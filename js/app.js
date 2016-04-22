$('#artistSearchForm').on('submit', function(e) {
    e.preventDefault();
    $('#listResults').empty();
    searchByArtist($('#query').val());
});

var displayTopArtist  = function(imgUrl) {
    console.log('xxxxxxxx');
    $('.mainArtist').append("<img class='main-image' src='" + imgUrl + "'/>");
    
};
var displayRelatedArtist  = function(artist1, artist2, artist3) {
    console.log('xxxxxxxx');
    $('.relatedArtist1').append("<img class='first-rel' src='" + artist1.image + "'/><p>" + artist1.name + "</p>");
    $('.relatedArtist2').append("<img class='second-rel' src='" + artist2.image + "'/><p>" + artist2.name + "</p>");
    $('.relatedArtist3').append("<img class='third-rel' src='" + artist3.image + "'/><p>" + artist3.name + "</p>");

    
};
var searchByArtist = function(userInput) {

    var request = {
        q: userInput,
        type: 'artist'
    };

    $.ajax({
            url: "https://api.spotify.com/v1/search",
            data: request,
            dataType: "json", //use jsonp to avoid cross origin issues
            type: "GET",
        })
        .done(function(result) { //this waits for the ajax to return with a succesful promise object
            console.log(result);
            var searchResults = "We found " + result.artists.items.length + " results for " + request.q;
            var mainArtistImageUrl = result.artists.items[0].images[1].url;
            
            console.log(mainArtistImageUrl);
            
            console.log('tried to displayTopArtist()');
             displayTopArtist(mainArtistImageUrl);
             
             findRelatedArtists(result.artists.items[0].id);
            			
        })
    .fail(function(jqXHR, error) { //this waits for the ajax to return with an error promise object
        console.log(error);
        $('#searchresults').text("An error occurred or no results were found");
    });
};


var findRelatedArtists = function(artistId) {

    $.ajax({
            url: "https://api.spotify.com/v1/artists/" + artistId + "/related-artists",
            // data: request,
            dataType: "json", //use jsonp to avoid cross origin issues
            type: "GET",
        })
        .done(function(result) { //this waits for the ajax to return with a succesful promise object
            console.log(result);
           var relatedArtist1 = {
               image: result.artists[0].images[2].url,
               name: result.artists[0].name
               },
               relatedArtist2 = {
                image: result.artists[1].images[2].url,
                name: result.artists[1].name
               },
               relatedArtist3 = {
                   image: result.artists[2].images[2].url,
                    name: result.artists[2].name
                    };

           displayRelatedArtist(relatedArtist1, relatedArtist2, relatedArtist3);
           })
    .fail(function(jqXHR, error) { //this waits for the ajax to return with an error promise object
        console.log(error);
    });
};







// $.each(result.artists.items, function(i, item) {
//             				var artists = result.artists.items[i].name;
//             				$('#searchresults').append("<li> <b>" + artists + "</b> </li>");
//             			});
