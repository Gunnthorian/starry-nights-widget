settings: {

  background: 'bgstar.png',

  intensity: 1,

},

command: 'date',

refreshFrequency: 100000,

render: function() {
  return '<img id="starry-nights-img" src="starry-nights.widget/' + this.settings.background + '">'
},

update: function(output) {
  /*splits are used to find the hour of day, returns the hour of day in 24 hour cycles ex: 4pm -> 26*/
  var datearray = output.split(' ');
  var timearray = datearray[3].split(':');
  /*neutralizes hours in the day so that the dark hours of the day are 0-5 and the day light hours are < 0*/
  var distime = Math.abs(timearray[0] - 12.5) - 6.5
  if (distime >= 0) {
    /*turns the 24 hour and 60 minute time cycles into values for the opacity (0 through 1) incorporates the minutes so its a smoother transition*/
    var smotime = ((distime / 5) + (Math.round(100 * (timearray[1] / 60)) / 1000) * 2) * this.settings.intensity
  } else {
    smotime = 0;
  }
  /*sets the image opacity to the calculated value*/
  $('#starry-nights-img').css('opacity', smotime)
},

style: "                     \n\
    z-index: -100/*edit this value if youre not able to interact with other widgets, this widget is suppose to be behind all of the others*/\n\
    position: absolute       \n\
    left: 0px                \n\
    top: 0px                 \n\
    width: 100vw             \n\
    height: 100vh            \n\
  "
