import * as me from 'https://esm.run/melonjs@13';

class EndTitleScreen extends me.Stage {
    onResetEvent() {

        if (this.title == null) {
            this.title = me.loader.getImage("press_Enter_2");
          }

        me.input.bindKey(me.input.KEY.ENTER, "enter", true);

        this.handler = me.event.on(me.event.KEYDOWN, function (action2, keyCode, edge) {
			if (action2 === "enter") {
				me.state.set(me.state.MENU);
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

export default EndTitleScreen