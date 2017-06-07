var packets = {};

packets.Packet = function Packet(pID, cID) {
  this.pID = pID;
  this.cID = cID;
  return this;
}

packets.PacketJoined = function PacketJoined(cID, entities) {
  packets.Packet.apply(this,["joined",cID]);
  this.entities = entities;
  return this;
}

packets.PacketClientReady = function(cID){
  packets.Packet.apply(this,["clientReady", cID]);
  return this;
}

packets.packetLookupOnServer = {
  clientReady: function(packet,serverData){
    // send world infor to client


    serverData.clients[packet.cID].isReady = true;
  }
}

packets.packetLookupOnClient = {
  joined: function(packet,stage){
    stage.removeChildren();
    stage.cID = packet.cID;
    ents = packet.entities;
    for (i = 0; i < ents.size; i++){
      entities.loadEntityToStage(stage,ents[i]);
    }
  }
}

// client wont have module defined but the server will
if (typeof module !== 'undefined'){
  module.exports = packets;
}
