var  ws = require("nodejs-websocket");
var entities = require('./entities.js');
var packets = require('./packets.js');
var ticksPerSecond = 60
var date = new Date();
/*
e = new entities.Entity(0,0,0,0,0,0,0);

console.log(e);
console.log(entities.entitiesLookup[e.eID]);

console.log("loaded so far...");
*/

function ClientInstance(conn) {
  this.cID = 0;
  this.conn = conn;
  this.isReady = false;
}


var serverData = {
  clients: [],
  entities: [],
  serverObj: null,
  running: true,
  gameLoopTimeoutID: null
};


function serverInit() {
  serverData.serverObj = ws.createServer(clientConnected);
  serverData.serverObj.listen(8001);
  console.log("Server Started!");
  testEntity = new entities.Entity(-1,20,20,0,0,20,20);
  spawnEntity(testEntity);


  serverData.gameLoopTimeoutID = setTimeout(gameLoop,1000/ticksPerSecond);
}


function clientConnected(conn){
  console.log("Client connected!");
  conn.on("text", receiveData);
  cli = new ClientInstance(conn);
  serverData.clients.push(cli);
  // the way it chooses the client id is weird but its to be thread safe
  cli.cID = serverData.clients.indexOf(cli);
  // send the level info to the client
  p = new packets.PacketJoined(cli.cID,serverData.entities);
  data = JSON.stringify(p);
  conn.sendText(data);
}

function receiveData(data){
  console.log("recived data");
  console.log(data);
  p = JSON.parse(data);
  packets.packetLookupOnServer[p.pID](p,serverData);
}

function gameLoop(){
  startTime = date.getTime();
  // do game stuff
  gameLogic();
  // calculate to make sure the server is running at the specifed time interval
  endTime = date.getTime();
  goalMSPerTick = 1000/ticksPerSecond;
  diffTime = endTime - startTime;
  leftOverTime = goalMSPerTick - diffTime;
  if (leftOverTime > 0 ){
    serverData.gameLoopTimeoutID = setTimeout(gameLoop,leftOverTime);
  }else{
    gameLoop();
  }
}

function gameLogic(){
  for (i =0; i < serverData.entities.length; i++){
    ent = serverData.entities[i];
    if(ent.onUpdate()) {
      p = new packets.PacketUpdateEntity(-1, ent);
      broadcastPacket(p);
    }
  }
}

function spawnEntity(entity){
  serverData.entities.push(entity);
  testEntity.eInID = serverData.entities.indexOf(entity);
  // remember to broadcast new entity packet
}

function broadcastPacket(packet){
  for (i = 0;i < serverData.clients.length;i++){
    packet.cID = i;
    data = JSON.stringify(packet);
    cli = serverData.clients[i];
    if (cli.isReady){
      cli.conn.sendText(data);
    }
  }
}

/*
function webInit(){

}
*/

serverInit();
