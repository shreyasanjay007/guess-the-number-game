const bgm = new Audio('theme_bgm.mp3')


const playMusic = document.querySelector('#sound-on')
const pauseMusic = document.querySelector('#sound-off')

playMusic.addEventListener('click',()=>{
    bgm.play();
    playMusic.style.display = 'none'
    pauseMusic.style.display = 'flex'
})

pauseMusic.addEventListener('click',()=>{
    bgm.pause();
    pauseMusic.style.display = 'none'
    playMusic.style.display = 'flex'
})

window.onload = function(){

    setTimeout( ()=>{
        document.getElementById('line1').classList.add('fade-in');
    },2000 )

    setTimeout( ()=>{
        document.getElementById('line2').classList.add('fade-in');
    },5000 )

    setTimeout( ()=>{
        document.getElementById('line3').classList.add('fade-in');
    },8000 )

    setTimeout( ()=>{
        document.getElementById('play-btn').classList.add('bounce')
    },11000 )
}

const shout = new Audio('hey.mp3')
const play = document.getElementById('play-btn')
const gameBody = document.getElementById('game-body')
const endBar = document.getElementById('end-bar')
const storyline = document.getElementById('storyline')
const tagline = document.getElementById('tagline')
const cash = new Audio('coin-dropped.mp3')
const lose = new Audio('lose.mp3')
// const win = new Audio('win.mp3')
const win = new Audio('yay.mp3')
const wrong = new Audio('wrong-buzzer.mp3')
const retry = new Audio('retry.mp3')


play.addEventListener('click',()=>{
    shout.play();
    gameBody.removeChild(storyline)
    gameBody.removeChild(tagline)
    gameBody.removeChild(play)

    const gameScreen = document.createElement('div')
    gameScreen.id = 'game-screen'
    gameBody.appendChild(gameScreen)

    const startOver = document.createElement('button')
    startOver.id = 'start-over'
    startOver.innerText = 'Dare to try again?'
    // endBar.appendChild(startOver)

    gameScreen.innerHTML = `<div id="ship" >
                                <img id="ship-sail" src="ship.png" width="300px" />
                                <img id="ship-sank" src="ship-sink.png" width="300px" />
                            </div>
                            <div id="game" >
                                <div id="attempts"  >Attempts Left :  <span id="last-result" >&nbsp;10</span> </div>
                                <input id="guess-field" type="text" placeholder="Enter the Secret Number" ></input>
                                <input id="subt" type="submit" value="Cash Your Guess, Captain!" ></input>
                                <div id="hint" >HINT</div>
                                <div id="prev-array">Previous Guesses:<span id="guesses" ></span></div>
                            </div>
                            <div id="treasure" >
                            <img id="locked" src="chest-locked.png" width="250px"/> 
                            <img id="opened" src="chest.png" width="250px"/> 

                            </div>`

    const remaining = document.getElementById('last-result');
    const userInput = document.getElementById('guess-field');
    const submit = document.getElementById('subt')
    const hint = document.getElementById('hint')
    const guessSlot = document.getElementById('guesses')
    const attempts = document.getElementById('attempts')
    const locked = document.getElementById('locked')
    const opened = document.getElementById('opened')
    const shipSail = document.getElementById('ship-sail')
    const shipSank = document.getElementById('ship-sank')
    
    let randomNumber = parseInt(Math.random()*100+1);
    console.log(randomNumber);
    
    let numGuess = 2;
    let prevGuess = [];
    let playGame = true;

    if(playGame){
        submit.addEventListener('click',(e)=>{
            e.preventDefault();
            const guess = parseInt(userInput.value);
            // console.log(guess);
            // cash.play();
            validateGuess(guess);
            
        })
    }

    function validateGuess(guess){
        if (isNaN(guess)){
            alert('Please enter a valid number');
        } else if(guess < 1){
            alert('Please enter a number greater than 1')
        } else if(guess > 100){
            alert('Please enter a number smaller than 100')
        } else{
            prevGuess.push(guess)
            if(numGuess === 11){
                displayGuess(guess);
                displayMessage(`Game Over! Secret Number was ${randomNumber}`);
                submit.style.display = 'none'
                hint.style.backgroundColor = 'red'
                shipSail.style.display = 'none'
                shipSank.style.display = 'flex'
                lose.play();
                shipSank.classList.add('shaking')
                shipSank.classList.add('sinking')
                endGame();
            } else{
                displayGuess(guess)
                checkGuess(guess)
            }
        }
    }

    function checkGuess(guess){
        if(guess === randomNumber){
            displayMessage(`You found the treasure`)
            userInput.setAttribute('disabled','');
            attempts.innerHTML = `You guessed the secret number in ${numGuess-2} attempts!`;
            hint.classList.add('pulse')
            hint.style.backgroundColor = '#50C878'
            hint.style.color = 'black'
            userInput.placeholder = 'Gold is yours, Captain!'
            userInput.style.backgroundColor = "#FFD700";  
            submit.style.display = 'none'
            locked.style.display = 'none'
            opened.style.display = 'flex'
            opened.classList.add('bounce')
            opened.classList.add('pulse')
            setTimeout( ()=>{
                win.play();
            },1500 )

        } else if(guess < randomNumber){
            displayMessage(`The treasure lies above, Matey!`)
            hint.style.backgroundColor = '#1E90FF'
            wrong.play();
        } else if(guess > randomNumber){
            displayMessage(`Drop Anchor, You're too high!`)
            hint.style.backgroundColor = "#2F4F4F";
            wrong.play();
        }
    }

    function displayGuess(guess){
        userInput.value = '';
        guessSlot.innerHTML += `${guess}, `
        numGuess++;
        remaining.innerHTML = `${12 - numGuess}`;
    }

    function displayMessage(message){
        hint.innerHTML = `<h2>${message}</h2>`;
    }

    function endGame(){
        userInput.value = '';
        userInput.setAttribute('disabled','');
        endBar.appendChild(startOver)
        playGame = false;
        newGame();

    }

    function newGame(){
        startOver.addEventListener('click',()=>{
            retry.play();
            randomNumber = parseInt(Math.random()*100+1)
            prevGuess = [];
            numGuess = 2;
            guessSlot.innerHTML = '';
            remaining.innerHTML = `${12 - numGuess}`;
            userInput.removeAttribute('disabled');
            endBar.removeChild(startOver);
            hint.innerHTML = 'HINT';
            hint.style.backgroundColor = '#8b5e3cd1'
            submit.style.display = 'flex'
            playGame = true;
        })
    }
   

})



