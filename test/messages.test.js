/* global describe, it */
import * as blockLike from '../src/lib';

const assert = require('assert');

describe('Messages', () => {
  describe('broadcastMessage()', () => {
    const stage = new blockLike.Stage();
    const sprite = new blockLike.Sprite();

    stage.addSprite(sprite);

    let gotEvent = false;
    let msgId = '';

    document.addEventListener('do', (e) => {
      gotEvent = true;
      msgId = e.detail.msgId;
    });
    stage.broadcastMessage('do');

    it('it should broadcast a message', () => {
      assert(gotEvent === true);
    });
    it('message should have id string that is of the following format: xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx', () => {
      assert(typeof msgId === 'string');
      assert(msgId.length === 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.length);
    });
  });

  describe('whenReceiveMessage()', () => {
    const stage = new blockLike.Stage();
    const sprite = new blockLike.Sprite();

    stage.addSprite(sprite);

    it('should allow the stage to capture a message', () => {
      window.gotEvent = false;
      stage.whenReceiveMessage('do', () => {
        window.gotEvent = true;
      });

      stage.broadcastMessage('do');
      assert(window.gotEvent === true);
    });
    it('should allow a sprite to capture a message', () => {
      window.gotEvent = false;
      sprite.whenReceiveMessage('do', () => {
        window.gotEvent = true;
      });

      stage.broadcastMessage('do');
      assert(window.gotEvent === true);
    });
    it('should create a global list of all active listeners', () => {
      sprite.whenReceiveMessage('another', () => {});
      stage.whenReceiveMessage('another', () => {});

      assert(blockLike.Stage.messageListeners.length === 4);
      assert(blockLike.Sprite.messageListeners.length === 4);
    });
    it('should create an identical global list for all entities', () => {
      sprite.whenReceiveMessage('another', () => {});
      stage.whenReceiveMessage('another', () => {});

      blockLike.Stage.messageListeners.forEach((item, index) => {
        assert(item === blockLike.Sprite.messageListeners[index]);
      });
    });
  });

  describe('broadcastMessageWait()', () => {
    const stage = new blockLike.Stage();
    const sprite = new blockLike.Sprite();

    stage.addSprite(sprite);

    let gotEvent = false;
    let msgId = '';

    document.addEventListener('do', (e) => {
      gotEvent = true;
      msgId = e.detail.msgId;
    });
    stage.broadcastMessageWait('do');

    it('it should broadcast a message', () => {
      assert(gotEvent === true);
    });
    it('message should have id string that is of the following format: xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx', () => {
      assert(typeof msgId === 'string');
      assert(msgId.length === 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.length);
    });

    it('should wait for all listeners to complete', () => {
      // TODO: this needs to be timed...
      window.gotEventStage = false;
      window.gotEventSprite = false;

      stage.whenReceiveMessage('wait', () => {
        window.gotEventStage = true;
      });
      sprite.whenReceiveMessage('wait', () => {
        window.gotEventSprite = true;
      });
      stage.broadcastMessageWait('wait');

      assert(window.gotEventStage === true);
      assert(window.gotEventSprite === true);
    });
  });
});
