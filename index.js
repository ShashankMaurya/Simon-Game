function btn(color, audio){
    this.color = color;
    this.audio = audio;
}

var btnList = []

btnList.push(new btn('green', new Audio('sounds/green.mp3')));
btnList.push(new btn('red', new Audio('sounds/red.mp3')));
btnList.push(new btn('yellow', new Audio('sounds/yellow.mp3')));
btnList.push(new btn('blue', new Audio('sounds/blue.mp3')));

$('.btn').click(function(){
    playSound(this.id);
    this.classList.add('pressed');
    setTimeout(function(){
        $('.btn').removeClass('pressed');
    }, 100);
});

function playSound(id){
    btnList.find(function(element){
        return element.color === id;
    }).audio.play();
}