'use strict';

function AnimationSystem(ID) {
	this.ID = ID;
	this.name = 'animation';

  this.processEntity = function (entity, state, delta, entities) {
    var anim = smx.anim(entity);
    if (anim) {
      anim.progress += delta;
      if (anim.progress > anim.length) {
        anim.progress = .1;
      }
    }
  };

  var that = this;
  this.listeners = {
    setFlip: function (payload) {
      that.act('setAnimationFlip', payload.entityID, payload);
    }
  };

  this.actions = {
    setAnimationFlip : {
      components: [ComponentType.animation],
      method: function ( components, payload ) {
        components[ComponentType.animation].flipped = payload.flipped;
      }
    }
  };
}