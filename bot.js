var HTTPS = require('https');
var cool = require('cool-ascii-faces');

var botID = process.env.BOT_ID;


function respond() {
  var request = JSON.parse(this.req.chunks[0]),
      botRegex = /^\Greg/;///^\/cool guy$/;
  var botRegexTest = /^\Nick/;
  var spam = /^\spam/;
  
  var whichOne = 0;
  if(request.text && botRegex.test(request.text)) {
    this.res.writeHead(200);
    whichOne = 1;
    postMessage(request,whichOne);
    this.res.end();
  } else if(request.text && botRegexTest.test(request.text)){
    this.res.writeHead(200);
    whichOne = 2;
    postMessage(request,whichOne);
    this.res.end();
  } else if(request.text && botRegexTest.test(request.text)){
    this.res.writeHead(200);
    whichOne = "spam";
    postMessage(request,whichOne);
    this.res.end();
    
  } else {
    console.log("don't care");
    //this.res.writeHead(200);
    //whichOne = 0;
    //postMessage(request,whichOne);
    this.res.end();
  }
}

function postMessage(request,whichOne) {
  var botResponse, options, body, botReq;

  botResponse = havoc(whichOne);//"meme";//cool();

  options = {
    hostname: 'api.groupme.com',
    path: '/v3/bots/post',
    method: 'POST'
  };

  body = {
    "bot_id" : botID,
    "text" : botResponse
  };
  
  function havoc(whichOne){
    if (whichOne == 1){
   
    return "You're a cuck";
      
    } else if(whichOne == 2){
     return "Yeah, that Nick guy is a real cuck"; 
    } else if(whichOne == "spam"){
     return "GET RICK ROLLED"; 
    }
    else{
     return "You idiot, I have no clue what to say";
    }
  }

  console.log('sending ' + botResponse + ' to ' + botID);

  botReq = HTTPS.request(options, function(res) {
      if(res.statusCode == 202) {
        //neat
      } else {
        console.log('rejecting bad status code ' + res.statusCode);
      }
  });

  botReq.on('error', function(err) {
    console.log('error posting message '  + JSON.stringify(err));
  });
  botReq.on('timeout', function(err) {
    console.log('timeout posting message '  + JSON.stringify(err));
  });
  botReq.end(JSON.stringify(body));
}


exports.respond = respond;
