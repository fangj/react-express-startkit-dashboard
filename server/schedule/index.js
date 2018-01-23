var schedule = require('node-schedule');

var j = schedule.scheduleJob('42 * * * * *', function(){
  console.log((new Date()).toLocaleString()+' The answer to life, the universe, and everything!');
});