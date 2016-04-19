var thinktube = {
    // url: 'https://api.github.com/users/lotusgraham/repos',
    url: 'https://www.googleapis.com/youtube/v3/search/',
    dataType: 'json',
    data:{
        part: 'snippet',
        key: 'AIzaSyDtULH2PxGsNF3BAQnF8HfFqGQGsl7qv0Y',
        q:  $('#query').val() //search input
    },

    //build function where upon click of submit button, input value from user is logged into a variable
    //take said variable which containts the input value and stick it in our data object

    success: function(data) {
                console.log(data.items);
         var items = data.items.map(function(video){
             console.log(video.snippet.title);
             $('#searchresults').append("<li>" + video.snippet.title + "</li>");
         });
    }
};

$('#btn').click(function(){
    $.ajax(thinktube);
});

//  https://www.youtube.com/results?search_query=funniest+youtube+videos&page=&utm_source=opensearch

// $(function(data){
//     $.getJSON('https://www.omdbapi.com/?s=Star%20Wars&r=json', function(){
//     console.log(data);
//   });
// });

//AIzaSyDtULH2PxGsNF3BAQnF8HfFqGQGsl7qv0Y
