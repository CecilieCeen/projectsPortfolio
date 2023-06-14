
export default class CountDown {
    constructor(countDownDate, days, hours, minutes, seconds ){
        this.countDownDate = new Date(countDownDate).getTime();
        this.days = days;
        this.hours = hours;
        this.minutes = minutes;
        this.seconds = seconds;
        this.interval = 1000;
        this.difference = this.countDownDate - new Date().getTime();
        this.startTimer();
    }
    calculateDiffence(){
        this.difference = this.countDownDate - new Date().getTime();
        if(this.difference < 0){
            clearInterval(this.timer);
            this.days.parentNode.parentNode.parentNode.innerHTML = "<h2 class='centerText'>KOLD Festival er igang!</h2>"
        }else{
            this.update();
        }
    }
    update(){
        this.days.innerHTML = Math.floor(this.difference / (1000 * 60 * 60 * 24));
        this.hours.innerText = Math.floor((this.difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        this.minutes.innerText = Math.floor((this.difference % (1000 * 60 * 60)) / (1000 * 60));
        this.seconds.innerText = Math.floor((this.difference % (1000 * 60)) / (1000));
    }
    startTimer(){
        let t = this;
        this.timer = setInterval(function(){t.calculateDiffence();}, t.interval);
    }
}