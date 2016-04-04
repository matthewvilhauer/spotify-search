// wait for DOM to load before running JS


$(document).on('ready', function() {

  var source = $('#tracks-template').html();
  var template = Handlebars.compile(source);

  $(".loading").hide();

  $(document).ajaxStart(function() {

    $(".loading").show();
    $("#results").hide();
    console.log("Ajax started");
  }).ajaxStop(function() {
    $(".loading").hide();
    $("#results").show();
    console.log("Ajax stopped");
  });

  // check to make sure JS is loaded
  console.log('JS is loaded!');
  // your code here

  function getTracks() {

    var spotify_endpoint = "https://api.spotify.com/v1/search";
    // var searchQuery = $("#track").val();
    // var typeQuery = "&type=track";
    // var dataString = searchQuery + typeQuery;

    $.ajax({
      method: "GET",
      url: spotify_endpoint,
      data: $("form").serialize(),
      success: onSuccess,
      error: onError
    });
  }

  function onSuccess(data) {

      $("#results").text("");
      var trackResults = data.tracks.items;
      console.log(trackResults);
      var trackHtml = template({
        tracks: trackResults
      });
      // $("#searchResults").append("<h2>Results for: " + $("#track").val() + "</h2>");
      // trackResults.forEach(function(el) {
      //   $("#results").append("<div class='container'><div class='row'><div class='col-sm-3 albumArt'><img src=" + el.album.images[1].url + "></div><div class=col-sm-9><div class='col-sm-3 song'><p>Song: "+el.name+"</p></div><div class='col-sm-3 album'><p>Album: "+el.album.name + "</p></div><div class='col-sm-3 artist'><p>Artist: " + el.artists[0].name + "</p></div><div class='col-sm-3 play'><a href=" + el.preview_url + ">Play</a></div></div></div>");
      // });
      $("#results").append(trackHtml);
    }

  var search = $("form").on("submit", function(e) {
    if($("#results").text() !== "") {
      e.preventDefault();
      getTracks();
    } else {
      alert("No Results");
    }
  });

  function onError(xhr, status, errorThrown) {
    alert("Sorry, there was a problem!");
    console.log("Error: " + errorThrown);
    console.log("Status: " + status);
    console.dir(xhr);
  }

});
