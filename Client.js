var client;

function load(){
  client = new Client();
}


function Client(){
  this.init();
}

//sets up a basic client
Client.prototype.init = function() {
  //pixi aliases
  this.stage = new PIXI.Container();
  this.renderer = PIXI.autoDetectRenderer(512, 512);
  document.body.appendChild(this.renderer.view);

  //setting up connection to server
  this.webSock = new WebSocket("ws://localhost:8001");
  this.webSock.onopen = connectionOpened;
  this.webSock.onmessage = receiveData;
}

//renders the entities onto the stage
Client.prototype.render = function() {
  this.renderer.render(this.stage);
}

//sends data to the servr
Client.prototype.sendData = function(data) {
  console.log("sending data");
  console.log(data);
  this.webSock.send(data);
}

//wrapper for onopen function
var connectionOpened = function(event) {
    console.log("connected");
}

//wrapper for onmessage function
var receiveData = function(event) {
  console.log("recived data");
  console.log(event.data);
  p = JSON.parse(event.data);
  console.log(client);
  packets.packetLookupOnClient[p.pID](p, client);
}
