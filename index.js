const app = require('express')()
const http = require('http').createServer(app)
const cors = require('cors');
const axios = require('axios');
const bodyParser = require('body-parser');

var customParser = bodyParser.json({type: function(req) {
    if (req.headers['content-type'] === ""){
        return req.headers['content-type'] = 'application/json';
    }
    else if (typeof req.headers['content-type'] === 'undefined'){
        return req.headers['content-type'] = 'application/json';
    }else{
        return req.headers['content-type'] = 'application/json';
    }
}});


app.use(bodyParser.json({
  limit: '50mb',
  extended: true
})); // support encoded bodies

app.use(bodyParser.urlencoded({
  limit: '50mb',
  extended: true
})); 
app.use(cors());


app.listen(3000, () => console.log('Server is up'));
app.get("/", (req, res) => {
    res.status(200).end('TalkJS Event Monitor');
})



app.post("/talkjs", async (req, res) => {
    console.log(req.body);
    var x = req.body;
    console.log(x);
    const postres = await axios.post('https://fcm.googleapis.com/fcm/send', 
    {
        "to": "/topics/" + req.body.data.recipient.id,
        "notification": {
         "title": "Notification",
         "body": req.body.data.sender.name + " sent you a message",
        }
    }
    , 
    {
        headers: {
            'Authorization': 'key=AAAAd7_JwrY:APA91bHR8hwtTP0Mk0zGT8-8mZDfIrh1xtcImOPsC6oTvziK9soYXE_qkHrE8LaVeOcibC15aaB6vKm7_DmANu6qooNF32JzcAl_tEz5JyggoToFmwPM598606g-6Oi6Q1ulZVMFXIei',
            'Content-Type': 'application/json',
        }
    }).then(console.log());
    res.status(200).end();
})