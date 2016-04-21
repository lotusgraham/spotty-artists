$('#btn').click(function() {
    $('#listResults').empty();
    searchByArtist($('#query').val());
});

var displayTopArtist  = function(imgUrl) {
    console.log('xxxxxxxx');
    $('#listResults').append("<img class='main-image' src='" + imgUrl + "'/>");
    
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
            			
        })

    .fail(function(jqXHR, error) { //this waits for the ajax to return with an error promise object
        console.log(error);
    });
};







// $.each(result.artists.items, function(i, item) {
//             				var artists = result.artists.items[i].name;
//             				$('#searchresults').append("<li> <b>" + artists + "</b> </li>");
//             			});
