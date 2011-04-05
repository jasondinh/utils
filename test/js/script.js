$(document).ready(function() {
  //bind event
  $('#run').click(function() {
    var script = $('#console').val();
    eval(script);
  })
});