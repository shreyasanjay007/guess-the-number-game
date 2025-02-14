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

    gameScreen.innerHTML = `<div id="ship" ><img src="ship.png" width="300px" /></div>
                            <div id="game" >
                                <div id="last-result" >Attempts Left :  <span>&nbsp;10</span> </div>
                                <input id="guess-slot" placeholder="Enter the Secret Number" ></input>
                                <input id="subt" placeholder="Cash Your Guess, Captain!" ></input>
                                <div id="hint" >LowOrHI</div>
                            </div>
                            <div id="treasure" ><img src="chest-locked.png" width="250px"/> </div>`
   

})
