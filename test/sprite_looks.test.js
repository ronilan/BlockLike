/* global describe, it */
import * as blockLike from '../src/lib';

const assert = require('assert');

describe('Sprite Costume', () => {
  const sprite = new blockLike.Sprite();
  const costume = new blockLike.Costume();

  const bareSprite = new blockLike.Sprite(null);

  describe('addCostume()', () => {
    sprite.addCostume(costume);
    bareSprite.addCostume(costume);

    for (let i = 0; i < 5; i += 1) {
      sprite.addCostume(new blockLike.Costume());
    }

    it('should add a costume to the sprite', () => {
      assert(sprite.costumes.length === 7);
    });
    it('should adjust width and height when added to bare sprite', () => {
      assert(bareSprite.height === costume.height);
      assert(bareSprite.width === costume.width);
    });
  });

  describe('switchCostumeTo()', () => {
    it('should switch to the the specified costume', () => {
      assert(sprite.costume !== costume);
      sprite.switchCostumeTo(costume);
      assert(sprite.costume === costume);
    });
  });

  describe('switchCostumeToNum()', () => {
    it('should switch to the the specified costume', () => {
      const workonCostume = sprite.costumes[3];
      assert(sprite.costume !== workonCostume);
      sprite.switchCostumeToNum(3);
      assert(sprite.costume === workonCostume);
    });
  });

  describe('nextCostume()', () => {
    it('should switch to the the specified costume', () => {
      const currentIndex = sprite.costumes.indexOf(sprite.costume);
      sprite.nextCostume(costume);
      assert(sprite.costumes.indexOf(sprite.costume) === currentIndex + 1);
    });
  });

  describe('removeCostume()', () => {
    it('should remove the specified costume', () => {
      assert(sprite.costumes.indexOf(costume) !== -1);
      sprite.removeCostume(costume);
      assert(sprite.costumes.indexOf(costume) === -1);
    });
    it('should change nothing when costume not found', () => {
      const workonCostume = new blockLike.Costume();
      const numOfCostumes = sprite.costumes.length;
      assert(sprite.costumes.indexOf(workonCostume) === -1);
      sprite.removeCostume(workonCostume);
      assert(sprite.costumes.length === numOfCostumes);
    });
  });

  describe('removeCostumeNum()', () => {
    it('should remove the specified costume', () => {
      const workonCostume = sprite.costumes[3];
      assert(sprite.costumes.indexOf(workonCostume) !== -1);
      sprite.removeCostumeNum(3);
      assert(sprite.costumes.indexOf(workonCostume) === -1);
    });
    it('should change nothing when costume not found', () => {
      const numOfCostumes = sprite.costumes.length;
      sprite.removeCostumeNum(100);
      assert(sprite.costumes.length === numOfCostumes);
    });
  });
});

describe('Sprite Size and Visibility', () => {
  function decimalRound(value, points) { // eslint-disable-line require-jsdoc
    return Math.round(value * (10 ** points)) / (10 ** points);
  }

  const sprite = new blockLike.Sprite();

  const options = {
    width: 50,
    height: 150,
    color: '#ff0000',
    image: '../../images/bear_step.png',
  };

  const otherCostume = new blockLike.Costume(options);
  sprite.addCostume(otherCostume);

  describe('hide()', () => {
    it('it should hide the sprite', () => {
      assert(sprite.showing === true);
      sprite.hide();
      assert(sprite.showing === false);
    });
  });

  describe('show()', () => {
    it('it should show the sprite', () => {
      sprite.hide();
      assert(sprite.showing === false);
      sprite.show();
      assert(sprite.showing === true);
    });
  });

  describe('setSize()', () => {
    it('it should set the size of the sprite', () => {
      sprite.setSize(200);
      assert(sprite.magnification === 200);
      assert(sprite.width === 200);
      assert(sprite.height === 200);
      sprite.setSize(100);
      assert(sprite.magnification === 100);
      assert(sprite.width === 100);
      assert(sprite.height === 100);
    });
    it('it should set the size of the current costume', () => {
      sprite.setSize(200);
      assert(sprite.costume.visibleWidth === 200);
      assert(sprite.costume.visibleHeight === 200);
      sprite.setSize(100);
      assert(sprite.costume.visibleWidth === 100);
      assert(sprite.costume.visibleHeight === 100);
    });
    it('it should set the size of all costumes', () => {
      sprite.setSize(200);
      sprite.costumes.forEach((item) => {
        assert(item.visibleWidth === item.width * (sprite.magnification / 100));
        assert(item.visibleHeight === item.height * (sprite.magnification / 100));
      });
      sprite.setSize(100);
      sprite.costumes.forEach((item) => {
        assert(item.visibleWidth === item.width * (sprite.magnification / 100));
        assert(item.visibleHeight === item.height * (sprite.magnification / 100));
      });
    });
  });

  describe('changeSize()', () => {
    it('it should change the size of the sprite', () => {
      sprite.changeSize(-33);
      assert(sprite.magnification === 67);
      assert(sprite.width === 67);
      assert(sprite.height === 67);
      sprite.changeSize(66);
      assert(sprite.magnification === 133);
      assert(sprite.width === 133);
      assert(sprite.height === 133);
      sprite.changeSize(-33);
      assert(sprite.magnification === 100);
      assert(sprite.width === 100);
      assert(sprite.height === 100);
    });
    it('it should set the size of the current costume', () => {
      sprite.changeSize(-33);
      assert(sprite.costume.visibleWidth === 67);
      assert(sprite.costume.visibleHeight === 67);
      sprite.changeSize(66);
      assert(sprite.costume.visibleWidth === 133);
      assert(sprite.costume.visibleHeight === 133);
      sprite.changeSize(-33);
      assert(sprite.costume.visibleWidth === 100);
      assert(sprite.costume.visibleHeight === 100);
    });
    it('it should set the size of all costumes', () => {
      sprite.changeSize(-33);
      sprite.costumes.forEach((item) => {
        assert(item.visibleWidth === decimalRound(item.width * (sprite.magnification / 100), 2));
        assert(item.visibleHeight === decimalRound(item.height * (sprite.magnification / 100), 2));
      });
      sprite.changeSize(66);
      sprite.costumes.forEach((item) => {
        assert(item.visibleWidth === decimalRound(item.width * (sprite.magnification / 100), 2));
        assert(item.visibleHeight === decimalRound(item.height * (sprite.magnification / 100), 2));
      });
      sprite.changeSize(-33);
      sprite.costumes.forEach((item) => {
        assert(item.visibleWidth === decimalRound(item.width * (sprite.magnification / 100), 2));
        assert(item.visibleHeight === decimalRound(item.height * (sprite.magnification / 100), 2));
      });
    });

    describe('refresh()', () => {
      it('it should set the size of the sprite after costume direct manipulation', (done) => {
        sprite.costume.width = 10;
        sprite.costume.height = 20;
        assert(sprite.costume.visibleWidth !== 10);
        assert(sprite.costume.visibleHeight !== 20);
        assert(sprite.width !== 10);
        assert(sprite.height !== 20);
        sprite.refresh();

        setTimeout(() => {
          assert(sprite.costume.visibleWidth === 10);
          assert(sprite.costume.visibleHeight === 20);
          assert(sprite.width === 10);
          assert(sprite.height === 20);
          done();
        }, sprite.pace * 2);
      });
    });
  });
});

describe('Sprite Content', () => {
  const stage = new blockLike.Stage();
  const bareSprite = new blockLike.Sprite(null);
  const costume = new blockLike.Costume();
  costume.addTo(bareSprite);
  bareSprite.addTo(stage);

  describe('inner()', () => {
    it('should set the inner HTML of the current costume to a provided string', () => {
      bareSprite.inner('<p class="big centered rainbow">:)</p>');

      assert(bareSprite.element.el.innerHTML === '<p class="big centered rainbow">:)</p>');
    });
  });

  describe('insert()', () => {
    it('should set the inner HTML of the current costume to a provided element', () => {
      const el = document.createElement('DIV');
      el.innerHTML = ':)';
      bareSprite.insert(el);

      assert(bareSprite.element.el.innerHTML === '<div style="display: block; visibility: inherit;">:)</div>');
    });
  });
});

describe('Sprite CSS', () => {
  const sprite = new blockLike.Sprite();

  function resetCostumes() { // eslint-disable-line require-jsdoc
    sprite.classes = [];
    sprite.addClass('rainbow');
    sprite.addClass('unicorn');
    sprite.addClass('big');
  }

  describe('css()', () => {
    it('it should add a css property to sprite', () => {
      assert(sprite.cssRules.length === 0);
      sprite.css('color', 'red');
      assert(sprite.cssRules.length === 1);
      assert(sprite.cssRules[0].prop === 'color');
      assert(sprite.cssRules[0].value === 'red');
    });
    it('it should accept a css object and add it to sprite', () => {
      sprite.css({ 'font-size': '16px', 'font-weight': 400 });
      assert(sprite.cssRules.length === 3);
      assert(sprite.cssRules[1].prop === 'font-size');
      assert(sprite.cssRules[1].value === '16px');
      assert(sprite.cssRules[2].prop === 'font-weight');
      assert(sprite.cssRules[2].value === 400);
    });
    it('it should adjust camelCase css proips to dash-case', () => {
      sprite.css({ lineHeight: '16px' });
      assert(sprite.cssRules.length === 4);
      assert(sprite.cssRules[3].prop === 'line-height');
      assert(sprite.cssRules[3].value === '16px');
    });
  });
  describe('addClass()', () => {
    it('it should add a css class to sprite', () => {
      resetCostumes();
      sprite.addClass('fluffy');
      assert(sprite.classes.length === 4);
      assert(sprite.classes[0] === 'rainbow');
      assert(sprite.classes[3] === 'fluffy');
    });
  });
  describe('removeClass()', () => {
    it('it should remove css class to sprite', () => {
      resetCostumes();
      sprite.removeClass('rainbow');
      assert(sprite.classes.length === 2);
      assert(sprite.classes[0] === 'unicorn');
    });
    it('should change nothing when class not found', () => {
      resetCostumes();
      const numOfClasses = sprite.classes.length;
      sprite.removeClass('cat-on-wheels');
      assert(sprite.classes.length === numOfClasses);
    });
  });
  describe('hasClass()', () => {
    it('it should return true if class is applied', () => {
      resetCostumes();
      assert(sprite.hasClass('rainbow') === true);
    });
    it('it should return false if class is not applied', () => {
      resetCostumes();
      assert(sprite.hasClass('blue') === false);
    });
  });
});

describe('Settings color and CSS', () => {
  const stage = new blockLike.Stage();

  const sprite = new blockLike.Sprite({ color: '#00ff00' });
  const costume = new blockLike.Costume();

  costume.addTo(sprite);

  sprite.css('background-color', '#ff0000');

  sprite.addTo(stage);

  describe('sprite background color', () => {
    it('should be set to defined color and override CSS', () => {
      assert(sprite.element.el.style.backgroundColor === 'rgb(0, 255, 0)');
    });
    it('should be set to css when no color is defined', () => {
      sprite.nextCostume();
      assert(sprite.element.el.style.backgroundColor === 'rgb(255, 0, 0)');
    });
  });
});
