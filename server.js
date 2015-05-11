var express = require('express'),
	app = express(),
	port = 5000;
	
/**
 * Jup I know it's bad
 */
app.use(express.static(__dirname));


app.listen(port, function () {
	console.log('Server listening on port', port);
});