entities = require('./entities.js');
packets = require('./packets.js');

/*
e = new entities.Entity(0,0,0,0,0,0,0);

console.log(e);
console.log(entities.entitiesLookup[e.eID]);

console.log("loaded so far...");
*/

function ClientInstance(cID,conn) {
  this.cID = cID;
  this.conn = conn;
  this.isReady = false;
}


serverData = {
  clients: [],
  entities: []
};


function webInit(){

}
