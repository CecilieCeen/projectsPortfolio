import * as me from 'https://esm.run/melonjs@13';
import game from '../game.js';

class PlayScreen extends me.Stage {
    /**
     *  action to perform on state change
     */
    onResetEvent() {
      // load a level
        me.level.load("map1");
        
        // reset the score
        game.data.score = 0;
 


        // play some music
        me.audio.playTrack("dst-gameforest", 0.5);
    }

    /**
     *  action to perform on state change
     */
    onDestroyEvent() {

        // stop some music
        me.audio.stopTrack("dst-gameforest");
    }
};

export default PlayScreen;
