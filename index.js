// Button Model
function btn(color, audio) {
    this.color = color;
    this.audio = audio;
}

// Button List
var btnList = []

btnList.push(new btn('green', new Audio('sounds/green.mp3')));
btnList.push(new btn('red', new Audio('sounds/red.mp3')));
btnList.push(new btn('yellow', new Audio('sounds/yellow.mp3')));
btnList.push(new btn('blue', new Audio('sounds/blue.mp3')));

// Button Color KeySet
var colorKeySet = []
btnList.forEach(function (button) {
    colorKeySet.push(button.color);
});

// Control Code

// console.log(colorKeySet);
$('.btn').click(function () {
    pressBtn(this.id);
});

$('body').keypress((event) => {
    playGame(event.which)
});

$('.start').click(function() {
    // console.log('click');
    playGame(undefined, true);
});

// Resource Functions
async function pressBtn(color) {
    playSound(color);
    $('.btn#' + color).addClass('pressed');
    setTimeout(function () {
        $('.btn').removeClass('pressed');
    }, 200);
}

function playGame(key, btnPressed=false) {    
    let gameTrigger = false;
    if (btnPressed || key === 32) {
        gameTrigger = true;
        $('body').removeClass('game-over');
        $('h5').remove('#restart');
        $('h1#title').css('margin', '4%')
        $('.start').css('display', 'none');
        $('body').unbind('keypress');
        startGame(gameTrigger);
    }
}

function playSound(id) {
    btnList.find(function (element) {
        return element.color === id;
    }).audio.play();
}

function randomPatternGenerator(n) {
    let pattern = [];
    for (let i = 0; i < n; i++) {
        pattern.push(colorKeySet[Math.floor(Math.random() * colorKeySet.length)]);
    }
    return pattern;
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function waitForBtnClick() {
    return new Promise(resolve => {
        $('.btn').click((event) => resolve(event.target.id));
    });
}

async function startGame(gameTrigger) {

    $('h1#title').text('Starting...');
    await sleep(1500);

    let i = 1;
    while (gameTrigger) {
        $('h1#title').text(`Level ${i}`);
        let currentPattern = randomPatternGenerator(i);
        await sleep(1500);

        for (let j = 0; j < currentPattern.length; j++) {
            await sleep(1500);
            pressBtn(currentPattern[j]);
        }

        // taking Input

        let correctBtnPressed = false;
        for (let j = 0; j < currentPattern.length; j++) {
            let btnId = await waitForBtnClick();
            pressBtn(btnId);
            correctBtnPressed = btnId == currentPattern[j];
            if (!correctBtnPressed) {
                $('body').addClass('game-over');
                $('h1#title').text('Game Over!!!');
                $('h1#title').css('margin', '2%')
                $('h1#title').after('<h5 id="restart">Press &lt;space&gt; to Start</h5>');
                $('.start').css('display', 'inline-block');
                $('body').keypress((event) => {
                    playGame(event.which)
                });
                new Audio('sounds/wrong.mp3').play();
                gameTrigger = false;
                break;
            }
        }

        if (gameTrigger) {
            $('h1#title').text(`Level ${i} Completed!`);
            await sleep(2000);
        }
        i++;
    }
}