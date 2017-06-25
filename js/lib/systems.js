"use strict";

function PhysicsSystem(ID) {
  this.ID = ID;
  this.name = "Physics";
  this.componentFilter = [
	ComponentType.position,
	ComponentType.velocity
  ];

  this.pre = function () {

  };

  this.processEntity = function (entity, delta) {
    var vel = entity.components[ComponentType.velocity].velocity;
    addVecVec(entity.components[ComponentType.position].position, sclVec(cpyVec(vel), delta));
    if (entity.components[ComponentType.acceleration]) {
      var accl = entity.components[ComponentType.acceleration].acceleration;
      addVecVec(vel, sclVec(cpyVec(accl), delta));
    }
  };

  this.post = function () {

  }
}

function RenderingSystem(ID) {
  this.ID = ID;
  this.name = "Rendering";
  this.componentFilter = [
	ComponentType.polygon,
	ComponentType.position
  ];

  this.pre = function () {
	// ctx.save();
	// ctx.strokeStyle = "#FFFFFF";
	// ctx.lineWidth = ".025";
	// ctx.beginPath();
	// ctx.rect(
	// 	view.canvPos.x - view.canvWidth / 2,
	// 	view.canvPos.y - view.canvHeight / 2,
	// 	view.canvWidth,
	// 	view.canvHeight);
	// ctx.setStrokeColor();
	// ctx.fillStyle = backgroundColor;
	// ctx.setFillColor();
	// ctx.clip();

    sm.gfx.clear();
    sm.gfx.drawRect(0, 0, 100, 100, true);
  };

  this.processEntity = function (entity) {
	// ctx.strokeStyle = "#FFFFFF";
	// view.renderPoly(
	// 	entity.components[ComponentType.polygon].polygon,
	// 	entity.components[ComponentType.position].position,
	// 	worldCam
	// );
	// ctx.setStrokeColor();
  };

  this.post = function () {
	// ctx.restore();
  };
}