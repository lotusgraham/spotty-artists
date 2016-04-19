
$('#btn').click(function(){
    $('#searchresults').empty();
    getYoutube($('#query').val());
});

function getYoutube(userInput){
    var thinktube = {
        url: 'https://www.googleapis.com/youtube/v3/search/',
        dataType: 'json',
        data:{
            part: 'snippet',
            key: 'AIzaSyDtULH2PxGsNF3BAQnF8HfFqGQGsl7qv0Y',
            q:  userInput //search input
        },

            success: function(data) {
                    console.log(data);
                for (var i = 0; i < data.items.length; i++){
                    var video = data.items[i];
                    console.log("https://www.youtube.com/watch?v=" + video.id.videoId);
                    $('#searchresults').append("<li> <b>" + video.snippet.title + "</b> </li>");
                    $('#searchresults').append("<a href='https://www.youtube.com/watch?v='" + video.id.videoId + "'><img src='" + video.snippet.thumbnails.default.url + "'></a>");
                }
        }
    };
    $.ajax(thinktube);
}
