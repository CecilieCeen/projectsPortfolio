import * as me from 'https://esm.run/melonjs@13';
import game from './../game.js';

class bulletEntity extends me.Entity {
    constructor(x, y, settings) {
        // call the constructor

        super(2, 5, 15, 10);

        // set to projectile object
        this.body.collisionType = me.collision.types.PROJECTILE_OBJECT;

        this.alwaysUpdate = true;

        this.renderable = game.texture.createAnimationFromName([
            "bullet.png"
        ])

        this.renderable.addAnimation ("shoot", ["bullet.png"])

        this.renderable.setCurrentAnimation("shoot");
    }
    update(dt){
            
    }
    onCollision(response, other) {}
}

export default bulletEntity