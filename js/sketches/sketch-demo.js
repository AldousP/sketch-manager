function SketchDemo() {
  this.conf = {
    name: 'Sketch Demo',
    description: 'A basic scene in SM.',
    date: '08.13.2017'
  };

  var BG_COLOR = SColor.colorForHex("#933f5f");

  this.setup = function () {
    this.update(0, sm.gfx);

    this.entities.buildEntity([
      new StateMachineComponent('sample_FSM'),
	    new TransformComponent(0, 0),
      new RenderableComponent(),
      new PolygonComponent(SPoly.polySquare(64), SColor.colorFromColor(sc.color.white))
    ]);

    this.systems.addSystem({
      name: 'Gameplay System',
      setup: function () {

        this.addSequence(
          new Sequence('sample_sequence', 3, [
            new SequenceSegment(0, 1, function (progress) {
              console.log('A', progress);
            }),
            new SequenceSegment(1, 2, function (progress) {
              console.log('B', progress);
            }),
            new SequenceSegment(2, 3, function (progress) {
              console.log('C', progress);
            })
          ], true)
        );

      },
      listeners: {
        action_pressed: {
          type: 'ACTION_PRESSED',
          handle: function (data, target, delta, mapper, fire) {
            sm.gfx.text('Action Pressed')
          }
        }
      }
    });

    this.systems.addSystem(new StateMachineSystem(sample_FSM_config));
    this.systems.addSystem(new RenderingSystem());
  };

  /**
   * Perform frame by frame behavior.
   * @param delta elapsed time since last frame
   * @param g, shorthand reference to sm.gfx.
   */
  this.update = function (delta, g) {
    g.clear(BG_COLOR);
    this.systems.process(this.entities, delta);

    if (sm.input.state.keyboard[sc.keys.space]) {
      this.systems.fireEvent(null, 'ACTION_PRESSED')
    }
  };
}

var sample_FSM_config = {
  sample_FSM: {
    states: {
      IDLE: {
        process: function (target, delta, timeInState, shiftTo) {

        },
        
        exit: function () {
        },

        listeners: {
          'ACTION_PRESSED': function (data, target, shiftTo, timeInState) {
            shiftTo('ACTIVE', target);
          }
        }
      },

      ACTIVE: {
        enter: function () {

        },
        process: function (target, delta, timeInState, shiftTo) {

        },

        listeners: {
          'ACTION_PRESSED': function (data, target, shiftTo, timeInState) {
            shiftTo('IDLE', target);
          }
        }
      }
    }
  }
};