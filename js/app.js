//Adds submit functionality to text input


var clickedArtistId = '';
var relatedArtistCounter = 0;
console.log(clickedArtistId);






//Displays main artist on page
var displayTopArtist = function (artistName, imgUrl) {
    $('.mainArtist').append("<h2 class='main-artist'>" + artistName + "</h2>");
    $('.mainArtist').append("<img class='main-image' src='" + imgUrl + "'/>");
};

var displayMoreRelatedArtists = function (artist1, artist2, artist3) {
    console.log(relatedArtistCounter);
    var row = '<div class="row">',
        col1 = '<div class="col-sm-4 relatedArtist1 text-center">',
        col2 = '<div class="col-sm-4 col-sm-offset-4 relatedArtist2 text-center">',
        col3 = '<div class="col-sm-4 col-sm-offset-8 relatedArtist3 text-center">',
        closingDivs = '</div></div>',
        music1 = "https://www.google.com/search?q="+ artist1.name +"+site:youtube.com&btnI",
        music2 = "https://www.google.com/search?q="+ artist2.name +"+site:youtube.com&btnI",
        music3 = "https://www.google.com/search?q="+ artist3.name +"+site:youtube.com&btnI";

    if (relatedArtistCounter % 2 === 0) {
        $('#resultsSection').append(row + col3 + '<img class="first-rel" src="' + artist1.image + ' "><a target="_blank" href="' + music1 + '"><p>' + artist1.name + '</p></a>' + closingDivs);
        $('#resultsSection').append(row + col2 + '<img class="second-rel" src="' + artist2.image + ' "><a target="_blank" href="' + music2 + '"><p>' + artist2.name + '</p></a>' + closingDivs);
        $('#resultsSection').append(row + col1 + '<img onclick="findRelatedArtists(clickedArtistId)" class="third-rel" src="' + artist3.image + ' "><a target="_blank" href="' + music3 + '"><p>' + artist3.name + '</p></a>' + closingDivs);

    } else {
        $('#resultsSection').append(row + col1 + '<img class="first-rel" src="' + artist1.image + ' "><a target="_blank" href="' + music1 + '"><p>' + artist1.name + '</p></a>' + closingDivs);
        $('#resultsSection').append(row + col2 + '<img class="second-rel" src="' + artist2.image + ' "><a target="_blank" href="' + music2 + '"><p>' + artist2.name + '</p></a>' + closingDivs);
        $('#resultsSection').append(row + col3 + '<img onclick="findRelatedArtists(clickedArtistId)" class="third-rel" src="' + artist3.image + ' "><a target="_blank" href="' + music3 + '"><p>' + artist3.name + '</p></a>' + closingDivs);
    }
    $("html, body").animate({ scrollTop: 10000 }, 500);
};




//Displays 3 related artists on page
var displayRelatedArtist = function (artist1, artist2, artist3) {
    console.log('xxxxxxxx');
    var music1 = "https://www.google.com/search?q="+ artist1.name +"+site:youtube.com&btnI";
    var music2 = "https://www.google.com/search?q="+ artist2.name +"+site:youtube.com&btnI";
    var music3 = "https://www.google.com/search?q="+ artist3.name +"+site:youtube.com&btnI";
    $('.relatedArtist1').append("<img class='first-rel' src='" + artist1.image + "'/><a target='_blank' href='" + music1 + "'><p>" + artist1.name + "</p></a>");
    $('.relatedArtist2').append("<img class='second-rel' src='" + artist2.image + "'/><a target='_blank' href='" + music2 + "'><p>" + artist2.name + "</p></a>");
    $('.relatedArtist3').append("<img onclick='findRelatedArtists(clickedArtistId)' class='third-rel' src='" + artist3.image + "'/><a target='_blank' href='" + music3 + "'><p>" + artist3.name + "</p></a>");
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
        .done(function (result) {
            findRelatedArtists(result.artists.items[0].id);  //makes second API call for related artists
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
                    image: result.artists[0].images[0].url,
                    name: result.artists[0].name,
                    id: result.artists[0].id
                },
                relatedArtist2 = {
                    image: result.artists[3].images[0].url,
                    name: result.artists[3].name,
                    id: result.artists[3].id
                },
                relatedArtist3 = {
                    image: result.artists[5].images[0].url,
                    name: result.artists[5].name,
                    id: result.artists[5].id
                };

            clickedArtistId = relatedArtist3.id;

            if (relatedArtistCounter == 0) {

                displayRelatedArtist(relatedArtist1, relatedArtist2, relatedArtist3);


            }
            else {
                displayMoreRelatedArtists(relatedArtist1, relatedArtist2, relatedArtist3);
            }
            relatedArtistCounter += 1;

        })
        .fail(function (jqXHR, error) {
            console.log(error);
        });
};

$(document).ready(function() {
    $('#artistSearchForm').on('submit', function (e) {
        e.preventDefault();
        $('.instructions').fadeOut('fast', function(){

        });
        $('.mainArtist, .relatedArtist1, .relatedArtist2, .relatedArtist3').empty();
        searchByArtist($('#query').val());
    });

    $('img .third-rel').click(function () {
        console.log('click working');
        findRelatedArtists(clickedArtistId);
    });
});
