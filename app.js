const express=require("express");
const bodyparser=require("body-parser");
const request=require("request");

const app=express();
app.set('view engine', 'ejs');
const arr=["none",0,0,0,0];

app.use(bodyparser.urlencoded({extended:true}));
app.use(express.static("public"));


app.listen(process.env.PORT || 3000, function() {
  console.log("listening to port 3000");

});


app.get("/",function(req,res) {
     res.render("index");

});

app.get("/state_data",function(req,res) {
 res.render("state_data",{arr:arr})

})

app.post("/",function(req,res) {

     let query=req.body.select


     let options={
    url:   "https://covid19india.p.rapidapi.com/getStateData/"+query,
    method: "GET",

    // visit "https://covid19india.p.rapidapi.com" for API key
    headers:
    {
      "x-rapidapi-host":
  	"x-rapidapi-key":
    },
    //qs: {
 //"url":"https://google.com/"
//}
    }

     request(options, function (error, response, body) {
       const data=JSON.parse(body);
        for(var i=0;i<5;i++)
        {
          arr.pop();
        }
        //console.log("state",data.response.name);
        //console.log("confirmed",data.response.confirmed);
        //console.log("active",data.response.active);
        //console.log("recovered",data.response.recovered);
        //console.log("deaths",data.response.deaths);
        arr.push(data.response.name)
        arr.push(data.response.confirmed)
        arr.push(data.response.active)
        arr.push(data.response.recovered)
        arr.push(data.response.deaths)
        res.redirect("/state_data");
   });

});
