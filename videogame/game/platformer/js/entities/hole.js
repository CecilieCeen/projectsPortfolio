import * as me from 'https://esm.run/melonjs@13';
import game from '../game.js';

class HoleEntity extends me.Collectable{
    constructor(x, y, settings) {
        // call the super constructor
        super(x, y,
            Object.assign({
                image: game.texture,
                region : "hole.png",
            })
        );

    }

    // add a onResetEvent to enable object recycling
    onResetEvent(x, y, settings) {
        this.shift(x, y);
        // only check for collision against player
        this.body.setCollisionMask(me.collision.types.PLAYER_OBJECT);
        
    }

    /**
     * collision handling
     */
    onCollision(/*response*/) {
        me.state.change(me.state.GAME_END)

        return false;
    }
}
export default HoleEntity;