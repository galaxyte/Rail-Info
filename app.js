const xpress = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const https = require("https");
const axios = require("axios");
const app = xpress();


let pnr = 1;
let alert = "";
let passengers = [];


let sentPNR;
let From;
let To;
let FromstationName;
let Doj;
let ArrivalTime;
let Duration;
let TostationName;
let DestinationDoj;
let DepartureTime;
let TrainName;
let TrainNo;
let Quota;
let BookingDate;
let BoardingStationName;
let ChartPrepared;
let Class;
let TrainCancelledFlag;
let PassengerCount;
let ExpectedPlatformNo;
let BookingFare;
let TicketFare;
let Rating;
let CoachPosition;
let FoodRating;
let PunctualityRating;
let CleanlinessRating;
let HasPantry;


app.set('view engine', 'ejs');
app.use(xpress.static(__dirname+"/public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Home Page
app.get("/", function(req, res){
  res.render('home');
})

// PNR input Page
app.get("/pnr-status", (req, res)=>{
  res.render('PNR', {alert: alert});
  alert = "";
})


// PNR Output page
app.get("/pnr-check/:pnr", (req, res)=>{
  res.render("Check", {
    FromstationName: FromstationName,
    From: From,
    Doj: Doj,
    DepartureTime: DepartureTime,
    Pnr: sentPNR,
    Duration: Duration,
    TostationName: TostationName,
    To: To,
    DestinationDoj: DestinationDoj,
    ArrivalTime: ArrivalTime,
    TrainName: TrainName,
    TrainNo: TrainNo,
    Quota: Quota,
    BookingDate: BookingDate,
    BoardingStationName: BoardingStationName,
    ChartPrepared: ChartPrepared,
    Class: Class,
    TrainCancelledFlag: TrainCancelledFlag,
    PassengerCount: PassengerCount,
    ExpectedPlatformNo: ExpectedPlatformNo,
    BookingFare: BookingFare,
    TicketFare: TicketFare,
    Rating: Rating,
    CoachPosition: CoachPosition,
    FoodRating: FoodRating,
    PunctualityRating: PunctualityRating,
    CleanlinessRating: CleanlinessRating,
    HasPantry: HasPantry,
    passengers: passengers
  });
})

// Train b/w stations input page

app.get('/TBWS', function(req, res){
  res.render('TBWS');
})

// Train Info page
app.get('/train-info', (req, res)=> {
  res.render('trainInfo');
})

// Running status input page
app.get('/running-status', (req, res)=> {
  res.render('runningStatus');
})

//Station info page
app.get('/station-info', (req, res)=>{
  res.render('stationInfo');
})

//fare calculator input page
app.get('/fare', (req, res)=>{
  res.render('fareCal');
})

// Ticket Availability input page
app.get('/ticket-avail', (req, res)=>{
  res.render('TicketAvailability');
})

// Emergency number page
app.get('/emergency', (req, res)=>{
  res.render('Emergency');
})



// PNR-Status post request
app.post("/pnr-status", (req, res) =>
{
    pnr = req.body.pnrcheck;
    if(pnr.toString().length<10 || pnr.toString().length>10)
    {
        alert = "! Please Enter Correct PNR Number. It should be of 10 digit !";
        res.redirect("/pnr-status");
    }
    else
    {
        const options = {
          method: 'GET',
          url: 'https://irctc1.p.rapidapi.com/api/v3/getPNRStatus',
          params: {pnrNumber: pnr},
          headers: {
            'X-RapidAPI-Key': '9b49b74307msh56cffb60478d327p166bdbjsn64e76d3e5f8d',
            'X-RapidAPI-Host': 'irctc1.p.rapidapi.com'
          }
        };

        axios.request(options).then(function (sentdata) 
        {
          if(sentdata.data.data.TrainNo === null)
          {
            alert = "Not A valid PNR";
            res.redirect("/pnr-status");
          }
          else
          {
            alert = "";
            sentPNR = sentdata.data.data.Pnr;
            From = sentdata.data.data.From;
            To = sentdata.data.data.To;
            FromstationName = sentdata.data.data.FromDetails.stationName;
            Doj = sentdata.data.data.Doj;
            ArrivalTime = sentdata.data.data.ArrivalTime;
            DepartureTime = sentdata.data.data.DepartureTime;
            Duration = sentdata.data.data.Duration;
            TostationName = sentdata.data.data.ToDetails.stationName;
            DestinationDoj = sentdata.data.data.DestinationDoj;
            TrainName = sentdata.data.data.TrainName;
            TrainNo = sentdata.data.data.TrainNo;
            Quota = sentdata.data.data.Quota;
            BookingDate = sentdata.data.data.BookingDate;
            BoardingStationName = sentdata.data.data.BoardingStationName;
            ChartPrepared = sentdata.data.data.ChartPrepared;
            Class = sentdata.data.data.Class;
            TrainCancelledFlag = sentdata.data.data.TrainCancelledFlag;
            PassengerCount = sentdata.data.data.PassengerCount;
            ExpectedPlatformNo = sentdata.data.data.ExpectedPlatformNo;
            BookingFare = sentdata.data.data.BookingFare;
            TicketFare = sentdata.data.data.TicketFare;
            Rating = sentdata.data.data.Rating;
            CoachPosition = sentdata.data.data.CoachPosition;
            FoodRating = sentdata.data.data.FoodRating;
            PunctualityRating = sentdata.data.data.PunctualityRating;
            CleanlinessRating = sentdata.data.data.CleanlinessRating;
            HasPantry = sentdata.data.data.HasPantry;
            for(let i = 0; i< sentdata.data.data.PassengerStatus.length; i++){
                let PassengerObject  = {
                Number: sentdata.data.data.PassengerStatus[i].Number,
                BookingStatus: sentdata.data.data.PassengerStatus[i].BookingStatus,
                CurrentStatus: sentdata.data.data.PassengerStatus[i].CurrentStatus,
                Berth: sentdata.data.data.PassengerStatus[i].Berth,
                Coach: sentdata.data.data.PassengerStatus[i].Coach,
                BookingBerthCode: sentdata.data.data.PassengerStatus[i].BookingBerthCode
              };
              passengers.push(PassengerObject);
            }
            res.redirect(`/pnr-check/${pnr}`);
          }
        }).catch(function (error) 
        {
          console.error(error);
        });
    }
  
})


app.post("/TBWS", function(req, res){
  console.log(req.body.Source);
})
// 6416530261

app.listen(process.env.PORT || 3000, function(){
    console.log("Server is running on port 3000 ");
})














































/* $(".dropdown").hover(function() 
{
  $(this).find('.dropdown-menu').stop(true, true).delay(200).fadeIn(500);
}, function() {
  $(this).find('.dropdown-menu').stop(true, true).delay(200).fadeOut(500);
});

$(document).ready(function () {
  $(window).scroll(function () {
    var top =  $(".goto-top");
        if ( $('body').height() <= (    $(window).height() + $(window).scrollTop() + 200 )) {
  top.animate({"margin-left": "0px"},1500);
        } else {
            top.animate({"margin-left": "-100%"},1500);
        }
    });

    $(".goto-top").on('click', function () {
        $("html, body").animate({scrollTop: 0}, 400);
    });
});
var count = 0;
var button = $(".more-button").on("click", function(){
  count++;
  if(count%2!=0)
  {
    $("#status").css("display", "flex");
    button.text("Less");
  }
  else
  {
    $("#status").css("display", "none");
    button.text("More");
  }
}) */