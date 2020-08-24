const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();

app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static("public"));

app.get("/", function(req,res){
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req,res){

  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  const email = req.body.emailid;

  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields:{
          FNAME : firstname,
          LNAME : lastname
        }
      }
    ]
  };
  const jsondata = JSON.stringify(data);

  const url = "https://us17.api.mailchimp.com/3.0/lists/453421c90b";

  const options = {
    method: "POST",
    auth: "akshatj2209:d9ea423d00cbd4a28e04c481f48f2815-us17"
  };

  const request = https.request(url, options, function(response){
    if(response.statusCode === 200){
      res.sendFile(__dirname + "/success.html");
    }
    else{
      res.sendFile(__dirname + "/failure.html");
    }
    response.on("data", function(data){
      console.log(JSON.parse(data));
    });
  });
  request.write(jsondata);
  request.end();

});

app.post("/failure", function(req,res){
  res.redirect("/");
});

app.listen(process.env.PORT || 3000, function(){
  console.log("Server started at port 3000.");
});

//Api key
// d9ea423d00cbd4a28e04c481f48f2815-us17

//Unique id
// 453421c90b
