
var $searchBar = $('#search');
var $yearBar = $('#year');
var $searchForm = $('.search-form');
var $movies = $('#movies');
var $posterWrap = $('.poster-wrap');


//Take search string and year and append to URL
//Run API request with query
//If there's a result, call updateMovieDisplay
//If there's no result, call updateMovieDisplayNone
function runSearch(searchString, searchYear){
  var url = "http://www.omdbapi.com/?"
  url += "s=" + searchString;
  url += "&y=" + searchYear;
  $.getJSON(url, function(results){
    if (results.Response == "True") {
      updateMovieDisplay(results);
    } else {
      updateMovieDisplayNone(searchString, searchYear);
    }
  });
};
 
//Update the display with the results of the search query
//If there is no poster, display default image
//Wrap li contents in link to IMDB detail page
function updateMovieDisplay(results){
  var html = "";
    $.each(results.Search, function(i, result){
    html += '<li><div class="poster-wrap"><a href="http://imdb.com/title/'+result.imdbID+'">';
    if (result.Poster !== 'N/A') {
      html += '<img class="movie-poster" src="' + result.Poster +'""></div>';
    } else {
      html += '<i class="material-icons poster-placeholder">crop_original</i></div>';
    }
    html += '<span class="movie-title">'+ result.Title +'</span>';
    html += '<span class="movie-year">'+ result.Year +'</span></a></li>';
  });
  $movies.html(html);
}

//Update the display with message for no search result.
function updateMovieDisplayNone(searchString, searchYear){
  var html = "<li class='no-movies'>";
  html += "<i class='material-icons icon-help'>help_outline</i>No movies found that match: \""+searchString +"\""
  if (searchYear !== ''){
    html += " in " + searchYear;
  }
  html += ".</li>";
  $movies.html(html);
}

//On search form submission, trigger runSearch function
$searchForm.submit(function(event){
  event.preventDefault();
  runSearch($searchBar.val(), $yearBar.val());
});


