let score = JSON.parse(localStorage.getItem('score')) || {
    wins: 0,
    losses: 0,
    ties: 0
};

updateScoreElement();

// if (!score){
//     score = {
//         wins: 0,
//         losses: 0,
//         ties: 0
//     };
// }

//localStorage.getItem('name');

let isAutoPlaying = false;
let intervalId;

// const autoPlay = () => {

// }

function autoPlay(){
    if  (!isAutoPlaying){
        intervalId = setInterval(() => {
            const playerMove = pickComputerMove();
            playGame(playerMove);
        }, 1000);
        isAutoPlaying = true;
    } else {
        clearInterval(intervalId);
        isAutoPlaying = false;
    }
}

const rockButton = document.querySelector('.js-rock-button');
const playGameRock = () => {
    playGame('rock');
}
rockButton.addEventListener('click', playGameRock);

const paperButton = document.querySelector('.js-paper-button');
const playGamePaper = () => {
    playGame('paper');
}
paperButton.addEventListener('click', playGamePaper);

const scissorsButton = document.querySelector('.js-scissors-button');
const playGameScissors = () => {
    playGame('scissors');
}
scissorsButton.addEventListener('click', playGameScissors);



document.body.addEventListener('keydown', (event) => {
    if (event.key === 'r'){
        playGame('rock');
    } else if (event.key === 'p'){
        playGame('paper');
    } else if (event.key === 's'){
        playGame('scissors')
    }
});

const resetButton = document.querySelector('.js-reset-score-button')

resetButton.addEventListener('click', () => {
    document.querySelector('.js-confirm-button')
        .innerHTML = '<p>Are you sure to reset score</p><div><button class="confirm-reset-button">Yes</button> <button class="cancel-reset-button">No</button></div>'
        document.querySelector('.confirm-reset-button')
        .addEventListener('click', () => {
            score.wins = 0;
            score.losses = 0;
            score.ties = 0;
            localStorage.removeItem('score');
            updateScoreElement();
            document.querySelector('.js-confirm-button')
                .innerHTML = ''
            document.querySelector('.js-moves').
            innerHTML = '';
            document.querySelector('.js-result').
            innerHTML = '';
            rockButton.addEventListener('click', playGameRock);
            paperButton.addEventListener('click', playGamePaper);
            scissorsButton.addEventListener('click', playGameScissors);
        })
        document.querySelector('.cancel-reset-button')
        .addEventListener('click', () => {
            document.querySelector('.js-confirm-button')
                .innerHTML = '';
            rockButton.addEventListener('click', playGameRock);
            paperButton.addEventListener('click', playGamePaper);
            scissorsButton.addEventListener('click', playGameScissors);    
         });
         scissorsButton.removeEventListener('click',playGameScissors);
         paperButton.removeEventListener('click', playGamePaper);
         rockButton.removeEventListener('click', playGameRock);
});



function playGame(playerMove){
const computerMove = pickComputerMove();

let result = '';
if (playerMove === 'rock'){
    if (computerMove === 'rock'){
    result = 'Tie.';
    } else if (computerMove === 'paper'){
        result = 'You lose.';
    } else if (computerMove === 'scissors'){
        result = 'You win.';
    }

} else if (playerMove === 'paper'){
    if (computerMove === 'rock'){
        result = 'You win.';
    } else if (computerMove === 'paper'){
        result = 'Tie.';
    } else if (computerMove === 'scissors'){
        result = 'You lose.';
    }
    
} else if (playerMove === 'scissors'){
    if (computerMove === 'rock'){
    result = 'You lose.';
    } else if (computerMove === 'paper'){
        result = 'You win.';
    } else if (computerMove === 'scissors'){
        result = 'Tie.';
    }
} 

if (result === 'You win.'){
    score.wins += 1;
} else if (result === 'You lose.'){
    score.losses += 1;
} else if (result === 'Tie.'){
    score.ties += 1;
}

localStorage.setItem('score', JSON.stringify(score) );
//localStorage.setItem('name', 'value');
                   
updateScoreElement();

document.querySelector('.js-result').
innerHTML = result;

document.querySelector('.js-moves').
innerHTML = `<div class="moves">
<div><img src="images/${playerMove}-emoji.png" alt="" 
class="move-icon"></div>
<div>you</div>
</div>
<div class="moves"><div><img src="images/${computerMove}-emoji.png" alt="" class="move-icon"></div>
<div>Computer</div>
</div>`;
}

function updateScoreElement(){
document.querySelector('.js-score')
.innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}

function pickComputerMove(){
const randomNumber = Math.random();
let computerMove = '';

if (randomNumber >= 0 && randomNumber < 1/3){
    computerMove = 'rock';
} else if (randomNumber >= 1/3 && randomNumber < 2/3){
    computerMove = 'paper'
} else if (randomNumber > 2/3 && randomNumber < 1){
    computerMove = 'scissors'
}

return computerMove;
}