entities = require('./entities.js');
packets = require('./packets.js');

e = new entities.Entity(0,0,0,0,0,0,0);

console.log(e);
console.log(entities.entitiesLookup[e.eID]);

console.log("loaded so far...");
