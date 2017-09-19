var HTTPS = require('https');
var cool = require('cool-ascii-faces');

var botID = process.env.BOT_ID;


function respond() {
  var request = JSON.parse(this.req.chunks[0]),
      botRegex = /^\Greg/;///^\/cool guy$/;
  var botRegexNick = /^\Nick/;
  var botRegexSpam = /^\Spam/;
  var botRegexWTF = /^\wtf/;
  var botRegexLOL = /^\Lol/;
  var botRegexI = /^\I/;
  var botRegexThanks = /^\Thank/;
  var botRegexTest = /^\Test/;
  
  var whichOne = 0;
  if(request.text && botRegex.test(request.text)) {
    this.res.writeHead(200);
    whichOne = 1;
    postMessage(request,whichOne);
    this.res.end();
  } else if(request.text && botRegexNick.test(request.text)){
    this.res.writeHead(200);
    whichOne = 2;
    postMessage(request,whichOne);
    this.res.end();
  } else if(request.text && botRegexSpam.test(request.text)){
    this.res.writeHead(200);
    whichOne = 3;
    spam(request, whichOne, 10);
    this.res.end();
  } else if(request.text && botRegexWTF.test(request.text)){
    this.res.writeHead(200);
    whichOne = 4;
    postMessage(request,whichOne);
    this.res.end();
  } else if(request.text && botRegexLOL.test(request.text)){
    this.res.writeHead(200);
    whichOne = 5;
    postMessage(request,whichOne);
    this.res.end();
  } else if(request.text && botRegexI.test(request.text)){
    this.res.writeHead(200);
    whichOne = 6;
    postMessage(request,whichOne);
    this.res.end();
  } else if(request.text && botRegexThanks.test(request.text)){
    this.res.writeHead(200);
    whichOne = 7;
    postMessage(request,whichOne);
    this.res.end();
  } else if(request.text && botRegexTest.test(request.text)){
    this.res.writeHead(200);
    whichOne = 8;
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

function spam (request, whichOne, i) {
  setTimeout(function () {
    postMessage(request,whichOne);
    if (--i) {          // If i > 0, keep going
      spam(request, whichOne, i);       // Call the loop again, and pass it the current value of i
    }
  }, 1000);
}

function postMessage(request,whichOne) {
  var botResponse, options, body, botReq;

  botResponse = havoc(whichOne,request);//"meme";//cool();

  options = {
    hostname: 'api.groupme.com',
    path: '/v3/bots/post',
    method: 'POST'
  };
  
if (whichOne == 3){ 
  body = {
    "bot_id" : botID,
    "text" : botResponse,
    "attachments" : [
      {
        "type"  : "image",
        "url"   : "https://i.groupme.com/634x462.gif.c4a21692cde84e77bd0355873d43b36c"
      }
    ]
  }
} else {
    body = {
    "bot_id" : botID,
    "text" : botResponse
    
  }
}
  
  function havoc(whichOne, results){ //Controls what Greg says
    if (whichOne == 1){  //Responce to Greg
    return "You're a cuck";     
    } else if(whichOne == 2){ //response to "Nick"
     return "Yeah, that Nick guy is a real cuck"; 
    } else if(whichOne == 3){ //Spam trigger
     return "GET RICK ROLLED"; 
    } else if(whichOne == 4){ //responce to Wtf
     return "Don't question me, bitch"; 
    }  else if(whichOne == 5){ //response to "LOL"
     return "Who you laughing at you cuck?!"; 
    }  else if(whichOne == 6){ //response to "I"
     var random = Math.floor(Math.random() * 3);
      if (random == 0){
     return "No one gives even the slightest shit what you do, say, or think... I mean, let's be real.  Moron."; 
      } else if(random == 1){
        return "Seriously, you need to cool it with all this talk about you.  Don't you get it?  I DON'T LIKE YOU!";
      } else if(random == 2){
       return "Dude, you're a fucking cuck..."; 
      } else {
       return "I litterally could not care less... dumbass..."; 
      }
    } else if(whichOne == 7){
      return "Yeah, no problem asshole...";
    } else if(whichOne == 8){
      return results;
      console.log("The results are " + results);
    } else{
     return "You idiot, I have no clue what to say";
    }
  };

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
