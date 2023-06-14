import * as me from 'https://esm.run/melonjs@13';

class TitleScreen extends me.Stage {
   

    onResetEvent() {

       /* me.game.world.addChild(
            new me.ImageLayer(0, 0, {
                image : "press_Enter",
                 z: 0 // z-index
                },
            ))*/
        if (this.title == null) {
                this.title = me.loader.getImage("press_Enter");
              }
    
        me.input.bindKey(me.input.KEY.ENTER, "enter", true);

        this.handler = me.event.on(me.event.KEYDOWN, function (action, keyCode, edge) {
			if (action === "enter") {
				me.state.change(me.state.PLAY);
			}
		});
    }

    draw(context){
        context.drawImage(this.title, 0, 0)
    }

    onDestroyEvent(){
        me.input.unbindKey(me.input.KEY.ENTER);
        
    }


}

export default TitleScreen