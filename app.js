const bodyParser = require("body-parser");
const express = require("express");
const request = require("request");
const https = require("https");

const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.listen(process.env.PORT || 3000, function(){
    console.log("The server port 3000 is running");
})

app.get("/", function(req, res){
    res.sendFile(__dirname+ "/signup.html")
})

app.post("/", function(req, res){
    const fName = req.body.firstName
    const lName = req.body.lastName
    const gmail = req.body.email

    const data = {
        members:[
            {
                email_address: gmail,
                status:"subscribed",
                merge_fields:{
                    FNAME: fName,
                    LNAME: lName
                }

            }
        ]
    };
    const jsonData = JSON.stringify(data);

    const url = "https://us18.api.mailchimp.com/3.0/lists/**********";

    const options = {
        method: "POST",
        auth: "Abdullah7:***************************-us18"
    }


    const request = https.request(url, options, function(response){
        if(response.statusCode === 200){
            res.sendFile(__dirname + "/success.html");
        }
        else{
            res.sendFile(__dirname + "/failure.html");
        }
        response.on("data", function(data){
            console.log(JSON.parse(data));
            
        })
    })
    request.write(jsonData);
    request.end();
})


app.post("/failure", function(req, res){
    res.redirect("/");
});
