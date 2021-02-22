const express = require('express');
const stylus = require('stylus');
const nib = require('nib');
const app = express();
const http = require('http').Server(app);

app.get('/', function(req, res) {
    res.render('index.ejs');
});

function compile(str, path) {
    return stylus(str)
        .set('filename', path)
        .use(nib())
}

// tell node to compile.styl-files to normal css-files
app.use(stylus.middleware({
    src: __dirname + '/public',
    compile: compile
}))

app.use(express.static(__dirname + '/public'));

const server = http.listen(8080, function() {
    console.log('listening on *:8080');
});
