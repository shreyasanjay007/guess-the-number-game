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
    },100 )

    setTimeout( ()=>{
        document.getElementById('line2').classList.add('fade-in');
    },100 )

    setTimeout( ()=>{
        document.getElementById('line3').classList.add('fade-in');
    },100 )

    setTimeout( ()=>{
        document.getElementById('play-btn').classList.add('bounce')
    },100 )
}

const shout = new Audio('hey.mp3')
const play = document.getElementById('play-btn')
const gameBody = document.getElementById('game-body')
const endBar = document.getElementById('end-bar')
const storyline = document.getElementById('storyline')
const tagline = document.getElementById('tagline')


play.addEventListener('click',()=>{
    // shout.play();
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

    gameScreen.innerHTML = `<div id="ship" ><img src="ship.png" width="300px" /></div>
                            <div id="game" >
                                <div id="attempts"  >Attempts Left :  <span id="last-result" >&nbsp;10</span> </div>
                                <input id="guess-field" type="text" placeholder="Enter the Secret Number" ></input>
                                <input id="subt" type="submit" placeholder="Cash Your Guess, Captain!" ></input>
                                <div id="hint" ></div>
                                <div id="prev-array">Previous Guesses:<span id="guesses" ></span></div>
                            </div>
                            <div id="treasure" ><img src="chest-locked.png" width="250px"/> </div>`

    const remaining = document.getElementById('last-result');
    const userInput = document.getElementById('guess-field');
    const submit = document.getElementById('subt')
    const hint = document.getElementById('hint')
    const guessSlot = document.getElementById('guesses')
    const attempts = document.getElementById('attempts')
    
    let randomNumber = parseInt(Math.random()*100+1);
    let numGuess = 1;
    let prevGuess = [];
    let playGame = true;

    if(playGame){
        submit.addEventListener('click',(e)=>{
            e.preventDefault();
            const guess = parseInt(userInput.value);
            // console.log(guess);
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
            userInput
            attempts.innerHTML = `You guessed the secret number in ${numGuess-1} attempts!`
        } else if(guess < randomNumber){
            displayMessage(`Sail Higher, Captain!`)
        } else if(guess > randomNumber){
            displayMessage(`Sail Lower, Mate!`)
        }
    }

    function displayGuess(guess){
        userInput.value = '';
        guessSlot.innerHTML += `${guess}, `
        numGuess++;
        remaining.innerHTML = `${11 - numGuess}`;
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
            randomNumber = parseInt(Math.random()*100+1)
            prevGuess = [];
            numGuess = 2;
            guessSlot.innerHTML = '';
            remaining.innerHTML = `${12 - numGuess}`;
            userInput.removeAttribute('disabled');
            endBar.removeChild(startOver);
            hint.innerHTML = '';
            playGame = true;
        })
    }
   

})
