// Define snowflake object
class Snowflake {
    constructor(effect, image, speed){
        this.image = image;
        this.scale = Math.random() * (0.25 - 0.15) + 0.15;
        this.width = image.width * this.scale;
        this.height = image.height * this.scale;
        this.effect = effect;
        this.x = Math.random() * this.effect.width - this.width * 0.5;
        this.y = Math.random() * this.effect.height - this.width;
        this.speedY = speed * this.scale;
    }
    update(){
        if(this.y > this.effect.height){
            this.x = Math.random() * this.effect.width - this.width;
            this.y = -this.height;
        }
        this.y += this.speedY;
    }
    draw(context){
        context.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
}

// Define Snoweffect object
export default class Snoweffect {
    constructor(ctx, width, height, image, speed){
        this.speed = speed;
        this.context = ctx;
        this.image = image;
        this.width = width;
        this.height = height;
        this.flakes = [];
    }
    init(numberOfFlakes){ 
        this.flakes = [];
        // If number of flakes is not set, set it by the width and height of effect
        numberOfFlakes = Math.floor(this.width * this.height / 50000);
        for(let i = 0; i < numberOfFlakes; i++){
            this.flakes.push(new Snowflake(this, this.image, this.speed))
        }
    }
    update(){
        this.flakes.forEach(flake => flake.update())
    }
    draw(){
        this.flakes.forEach(flake => flake.draw(this.context));
    }
    animate(){
        this.context.clearRect(0, 0, this.width, this.height);
        this.update();
        this.draw(this.context);
        requestAnimationFrame(this.animate.bind(this));
    }
    reset(width, height){
        this.width = width;
        this.height = height;
        this.init()
    }
}