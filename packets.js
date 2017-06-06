exports.Packet = function Packet(pID, cID) {
  this.pID = pID;
  this.cID = cID;
  return this;
}

exports.PacketJoined = function PacketJoined(cID, entities) {
  exports.Packet.apply(this,["joined",cID]);
  this.entities = entities;
  return this;
}

exports.packetLookupOnServer = {

}

exports.packetLookupOnClient = {
  joined: function(packet,stage){
    stage.removeChildren();
    stage.cID = packet.cID;
    ents = packet.entities;
    for (i = 0; i < ents.size; i++){
      loadEntityToStage(stage,ents[i]);
    }
  }
}


module.exports = exports;
