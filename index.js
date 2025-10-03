const cors = require('cors');
const express = require("express");
const app = express();

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
    res.writeHead(200, {'Content-Type': 'text/javascript'});
    //res.write(req.url.split("?")[1]);
    res.write("<script>");
    res.write("var url = 'https:\/\/livestream.ibb.gov.tr\/cam_turistik\/b_kapalicarsi.stream\/playlist.m3u8';");
    res.write("var bradmaxPlayerConfig = { 'showErrorDetails':false, 'contextMenuDisabled': true, 'dataProvider':{'source':[{'url':url}]}, 'autoplay':true, 'mute':true };");
    res.write("var element = document.getElementById('bradmaxPlayer');");
    res.write("player = window.bradmax.player.create(element, bradmaxPlayerConfig);");
    res.write("</script>");
    res.end();
})



app.listen(5000, () => console.log('Server is running on port 5000'));