const cors = require('cors');
const express = require("express");
const app = express();
const https = require('https');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-credentials", true);
    res.header("Access-Control-Allow-Methods", "GET, POST, PATCH");
    next();
});

app.get("/test", (req, res) => {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.write("Tamam");
    res.end();
})

app.get("/sunucu", (req, res) => {
    https.get('https://livestream.ibb.gov.tr/cam_turistik/b_kapalicarsi.stream/playlist.m3u8', resp => {
        let data = ''       
        resp.on('data', chunk => {
            data += chunk
            res.writeHead(200, {'Content-Type': 'text/javascript'});
            res.write(data);
            res.end();
        })       
        resp.on('end', () => {
            let peopleData = JSON.parse(data)
            console.log(peopleData)
        })
    })  
})

app.listen(5000, () => console.log('Server is running on port 5000'));