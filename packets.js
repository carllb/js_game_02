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

packets.PacketUpdateEntity = function(cID, entity_data){
  packets.Packet.apply(this,["updateEntity", cID]);
  this.entity_data = entity_data;
}

packets.packetLookupOnServer = {
  clientReady: function(packet,serverData){
    serverData.clients[packet.cID].isReady = true;
  }
}

packets.packetLookupOnClient = {
  joined: function(packet,client){
    client.stage.removeChildren();
    client.stage.cID = packet.cID;
    ents = packet.entities;
    for (i = 0; i < ents.size; i++){
      entities.loadEntityToStage(stage,ents[i]);
    }
    p = new packets.PacketClientReady(client.stage.cID);
    data = JSON.stringify(p);
    client.sendData(data);
    client.render();
  },

  updateEntity: function(packet,client){
    eInID = packet.entity_data.eInID
    // checks to make sure the client has the specified entity
    if(client.stage.children.length > eInID){
      entities.applyToSprite(pacjet.entity_data,client.stage.getChildAt(eInID));
    }
  }
}

// client wont have module defined but the server will
if (typeof module !== 'undefined'){
  module.exports = packets;
}
