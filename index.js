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
console.log(colorKeySet);
$('.btn').click(function () {
    pressBtn(this.id);
});

$('body').keypress(function (event) {
    // startGame(event.which);
    let gameTrigger = false;
    if (event.which === 32) {
        gameTrigger = true;
        $('body').removeClass('game-over');
        startGame(gameTrigger);
    }
});

// Resource Functions
async function pressBtn(color) {
    // console.log(color);
    playSound(color);
    $('.btn#' + color).addClass('pressed');
    setTimeout(function () {
        $('.btn').removeClass('pressed');
    }, 200);
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

// var btnPressed = false;
// async function waitForIt() {
//     if (!btnPressed) {
//         console.log('wait for it called.');
//         setTimeout(waitForIt, 100);
//     }
// }

function waitForBtnClick() {
    return new Promise(resolve => {
        $('.btn').click((event) => resolve(event.target.id));
    });
}

async function startGame(gameTrigger) {
    // let gameTrigger = false;
    // if (key === 32) {
    //     gameTrigger = true;
    // }

    $('h1#title').text('Starting...');
    await sleep(1500);

    let i = 1;
    while (gameTrigger) {
        $('h1#title').text(`Level ${i}`);
        let currentPattern = randomPatternGenerator(i);
        console.log(currentPattern);
        // console.log(i);
        await sleep(1500);
        // currentPattern.forEach(async function (element) {
        //     await pressBtn(element);
        //     await sleep(1500);
        // });

        for (let j = 0; j < currentPattern.length; j++) {
            await sleep(1500);
            pressBtn(currentPattern[j]);
        }

        // taking Input

        let correctBtnPressed = false;
        // let clicked = false;
        for (let j = 0; j < currentPattern.length; j++) {
            // await waitForIt();
            // await getPromiseFromEvent('.btn', 'click');
            // $('.btn').click(() => {
            let btnId = await waitForBtnClick();
            console.log(btnId);
            // clicked = true;
            pressBtn(btnId);
            // btnPressed = true;
            correctBtnPressed = btnId == currentPattern[j];
            console.log(correctBtnPressed);
            // });
            if (!correctBtnPressed) {
                $('body').addClass('game-over');
                // setTimeout(() => $('body').removeClass('game-over'), 1000);
                $('h1#title').html('Game Over!!!<br><br>Press &lt;space&gt; Key to Start');
                gameTrigger = false;
                break;
            }
            // btnPressed = false;
            // });
            // if(clicked && correctBtnPressed){
            //     console.log('if condn');
            //     j++;
            // }
            // if (!correctBtnPressed) {
            //     break;
            // }
            // else if (clicked){
            //     console.log('else if condn');
            //     break;
            // }

        }

        if (gameTrigger) {
            $('h1#title').text(`Level ${i} Completed!`);
            await sleep(1500);
        }

        // if (i === 5) {
        //     gameTrigger = false;
        // }
        // alert(`iteration ${i++} Completed`);
        i++;
    }
}