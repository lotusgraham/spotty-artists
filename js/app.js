var thinktube = {
    // url: 'https://api.github.com/users/lotusgraham/repos',
    url: 'https://www.googleapis.com/youtube/v3/search/',
    dataType: 'json',
    data:{
        part: 'snippet',
        key: 'AIzaSyDtULH2PxGsNF3BAQnF8HfFqGQGsl7qv0Y',
        q:  'batman'
    },
    
    success: function(data) {
                console.log(data);
        var items = data.map(function(repo){
            return '<li>' + repo.name + '</li>';
        });
        $('#searchresults').append(items);
    }
};

$.ajax(thinktube);

//  https://www.youtube.com/results?search_query=funniest+youtube+videos&page=&utm_source=opensearch

// $(function(data){
//     $.getJSON('https://www.omdbapi.com/?s=Star%20Wars&r=json', function(){
//     console.log(data);
//   });
// });

//AIzaSyDtULH2PxGsNF3BAQnF8HfFqGQGsl7qv0Y
