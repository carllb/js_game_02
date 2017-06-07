function Client(){
  this.init();
}

//sets up a basic client
Client.prototype.init = function() {
  //pixi aliases
  this.stage = new PIXI.container();
  this.renderer = PIXI.autoDetectRenderer(512, 512);
  document.body.appendChild(renderer.view);

  //setting up connection to server
  this.webSock = new WebSocket("ws://localhost:8001");
  this.webSock.onopen = connectionOpened();
  this.webSock.onmessage = receiveData();
}

//renders the entities onto the stage
Client.prototype.render = fucntion() {
  this.renderer.render(this.stage);
}

//sends data to the server
Client.prototype.sendData = function(data) {
  webSock.send(data);
}

//wrapper for onopen function
Client.prototype.connectionOpened = function(event) {
    console.log("connected");
}

//wrapper for onmessage function
Client.prototype.receiveData = function(data) {
  p = JSON.parse(data);
  packets.packetLookupOnClient[p.pID](p, this);
}
