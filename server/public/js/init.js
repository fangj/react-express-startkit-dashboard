Parse.initialize("APPLICATION_ID");
var serverHost=location.host.split(':')[0];
Parse.serverURL = 'http://' + serverHost + ':1337/parse';