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

app.get("/sunucu", (req, res) => {
    res.writeHead(200, {'Content-Type': 'text/json'});
    //res.write("Hazır-3");
    res.write(req.url.split("?")[1]);
    res.end();
})

app.listen(5000, () => console.log('Server is running on port 5000'));