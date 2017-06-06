var exports;

function genBlankTexture(){
  p.beginFill(0x000000);
  p.lineStyle(0);
  p.drawRect(0,0,1,1);
  p.endFill();
  return p.generateCanvasTexture();
}

exports.Entity = function Entity(eInID,x,y,vx,vy,w,h) {
  this.eID = "entity";
  this.eInID = eInID;
  this.x = x;
  this.y = y;
  this.vx = vx;
  this.vy = vy;
  this.w = w;
  this.h = h;
  return this;
}

exports.Entity.prototype.onUpdate = function() {
  if(this.vx !=0 || this.vy != 0){
    this.x += this.vx;
    this.y += this.vy;
    return true;
  }else {
    return false;
  }
}

function loadEntityToStage(stage,entity_data){
  s = exports.entitiesLookup[entity_data.eID](entity_data);

  // need to make sure that an index out of bounds will not be thrown
  si = stage.children.length;
  if (entity_data.eInID <= si){
    stage.addChildAt(s,entity_data.eInID);
  }else{
    blankSprite = new Sprite(genBlankTexture());
    // fills in blanks sprites that should get replaced later
    while(si < entity_data.eInID){
      stage.addChild(blankSprite);
      si++;
    }
  }
}


function applyToSprite(entity_data,sprite){
  sprite.x = entity_data.x;
  sprite.y = entity_data.y;
  sprite.vx = entity_data.vx;
  sprite.vy = entity_data.vy;
}

exports.entitiesLookup = {

  entity: function(entity_data) {
    const p = new PIXI.Graphics();
    p.beginFill(0x9bea00);
    p.lineStyle(0);
    p.drawCircle(30,30,10);
    p.endFill();
    s = new Sprite(p.generateCanvasTexture());
    applyToSprite(entity_data,s);
    return s;
  }
}

module.exports = exports;
