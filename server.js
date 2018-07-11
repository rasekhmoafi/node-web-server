const express = require('express');
const fs = require('fs');

let app = express();

app.use(express.static(__dirname + '/public'));

app.use((req, res, next) => {
    let now = new Date().toString();
    let log = `${now}: ${req.url}: ${req.method}: ${req.ip}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if(err){
            console.log('Unable to append to server.log')
        }
    });
    next();
});

app.get('/', (req, res) => {
    //res.send("<h1>Hello i'm Express!</h1>");
    res.send({
        name: 'rasekh',
        likes: [
            'bikings',
            'cities',
        ]
    });
});


app.get('/bad', (req, res) => {
   res.send({
       errorMsg: 'bad request',
       errorNum: '403'
   });
});

app.listen(3000, () => {
    console.log('server is up on 3000 port')
});