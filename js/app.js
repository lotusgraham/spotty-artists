$('#artistSearchForm').on('submit', function (e) {
    e.preventDefault();
    //$('#resultsSection').empty();
    searchByArtist($('#query').val());
});

var displayTopArtist = function (artistName, imgUrl) {
    console.log('xxxxxxxx');
    $('.mainArtist').append("<h2>" + artistName + "</h2>");
    $('.mainArtist').append("<img class='main-image' src='" + imgUrl + "'/>");
};

var displayRelatedArtist = function (artist1, artist2, artist3) {
    console.log('xxxxxxxx');
    $('.relatedArtist1').append("<img class='first-rel' src='" + artist1.image + "'/><p>" + artist1.name + "</p>");
    $('.relatedArtist2').append("<img class='second-rel' src='" + artist2.image + "'/><p>" + artist2.name + "</p>");
    $('.relatedArtist3').append("<img class='third-rel' src='" + artist3.image + "'/><p>" + artist3.name + "</p>");
};


//API call to search by artist
var searchByArtist = function (userInput) {

    var request = {
        q: userInput,
        type: 'artist'
    };

    $.ajax({
            url: "https://api.spotify.com/v1/search",
            data: request,
            dataType: "json",
            type: "GET"
        })
        .done(function (result) {
            console.log(result);

            var mainArtistName = result.artists.items[0].name;
            var mainArtistImageUrl = result.artists.items[0].images[1].url;


            displayTopArtist(mainArtistName, mainArtistImageUrl);

        })
        .done(function(result) {
            findRelatedArtists(result.artists.items[0].id);
        })
        .fail(function (jqXHR, error) {
            console.log(error);
            $('#searchresults').text("An error occurred or no results were found");
        });
};

//API call to get related artist info based on searched artist ID
var findRelatedArtists = function (artistId) {

    $.ajax({
            url: "https://api.spotify.com/v1/artists/" + artistId + "/related-artists",
            dataType: "json",
            type: "GET"
        })
        .done(function (result) {
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
        .fail(function (jqXHR, error) {
            console.log(error);
        });
};
