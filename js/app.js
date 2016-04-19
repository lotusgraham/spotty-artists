
 // var userInput = $('#query').val();


$('#btn').click(function(){
    // thinktube.data.q = $('#query').val();
    $('#searchresults').empty();
    getYoutube($('#query').val());
});
function getYoutube(userInput){
    var thinktube = {
        // url: 'https://api.github.com/users/lotusgraham/repos',
        url: 'https://www.googleapis.com/youtube/v3/search/',
        dataType: 'json',
        data:{
            part: 'snippet',
            key: 'AIzaSyDtULH2PxGsNF3BAQnF8HfFqGQGsl7qv0Y',
            q:  userInput //search input
        },

        //build function where upon click of submit button, input value from user is logged into a variable
        //take said variable which containts the input value and stick it in our data object

        success: function(data) {
                    console.log(data.items);
             var items = data.items.map(function(video){
                //  console.log(video.snippet.title);
                 console.log(video.snippet.thumbnails.medium.url);
                 $('#searchresults').append("<li> <b>" + video.snippet.title + "</b> </li>");
                 $('#searchresults').append("<img src=" + video.snippet.thumbnails.medium.url + "</img>");
             });
        }
    };
    $.ajax(thinktube);
}
// "<img src="+items[0].snipppet.thumbnails.medium.url+">;"

//  https://www.youtube.com/results?search_query=funniest+youtube+videos&page=&utm_source=opensearch

// $(function(data){
//     $.getJSON('https://www.omdbapi.com/?s=Star%20Wars&r=json', function(){
//     console.log(data);
//   });
// });

//AIzaSyDtULH2PxGsNF3BAQnF8HfFqGQGsl7qv0Y
