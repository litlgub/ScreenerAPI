const API_KEY="341478-Screener-Y5M8N0X5";


function genericFetch(url, callBack, movieID){
    

   fetch(url)
   .then(function(response){
     if (response.ok){
     return response.json();
     }
     throw Error(response.statusText);
     
          
     })
     .then(function(responseJSON){
       
     callBack(responseJSON, movieID);
     })
     
     
}

function displayMovies(responseJSON){

  if (responseJSON.Similar.Results.length===0){
    $('.results').append(`<h2 class="error">Sorry. We couldnt find that title in our database.</h2>`)
  }else{
  for (i=0; i<responseJSON.Similar.Results.length; i++){
    $('.results').append(`<section class="container"><h2 class="title">${responseJSON.Similar.Results[i].Name}</h2> <a class="trailer" target="_blank" href="${responseJSON.Similar.Results[i].yUrl}">Watch Trailer</a> <div id="${responseJSON.Similar.Results[i].yID}"></div>`);
    

    let movieID= `${responseJSON.Similar.Results[i].yID}`;

    let ratingUrl= `https://www.omdbapi.com/?i=tt3896198&apikey=903ce084&t=${responseJSON.Similar.Results[i].Name}`;
    

    genericFetch(ratingUrl, displayRatings, movieID);
    
  }
  }
}

function displayRatings(responseJSON, movieID){

  if (responseJSON.Plot=='N/A'){
    $(`#${movieID}`).append(`<h3 class="error">No other info available</h3>`);
  }else{

      $(`#${movieID}`).append(`<img src="${responseJSON.Poster}"><p class="ratings">${responseJSON.Plot}<br /><br /><span class="important">IMDB:</span> ${responseJSON.Ratings[0].Value}<br /><span class="important">${responseJSON.Ratings[1].Source}:</span> ${responseJSON.Ratings[1].Value}<br /><span class="important">Year:</span> ${responseJSON.Year} <span class="important">Length:</span>${responseJSON.Runtime}<br /><span class="important">Starring:</span> ${responseJSON.Actors}</p></section>`);
  }
  
  
}


function watchForm(){
  $('form').on('submit', function(event){
    event.preventDefault();

    let search= $('#text-input').val();
    
    let url=`https://cors-anywhere.herokuapp.com/https://tastedive.com/api/similar?q=${search}&k=${API_KEY}&info=1&type=movies&limit=5`;

    genericFetch(url, displayMovies);
    $('.results').empty();
    
  })

}

watchForm();