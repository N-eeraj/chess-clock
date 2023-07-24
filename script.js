// DOM buttons
const playPause = document.getElementById('play_pause')
const reset = document.getElementById('reset')
const changeTime = document.getElementById('change_time')
const volume = document.getElementById('volume')

// dom timer element
const timer = {
    black: document.getElementById('timer_black'),
    white: document.getElementById('timer_white')
}

// timer left
const time = {
    black: 600,
    white: 600
}

// variables
let isOn = false
let currentColor = 'white'
let timerInterval = null

// function to start timer
const startTimer = () => {
    timerInterval = setInterval(() => {
        const min = Math.floor(--time[currentColor] / 60)
        const sec = time[currentColor] % 60
        timer[currentColor].innerText = `${min}:${sec}`
    }, 1000)
}

// function to toggle play & pause
const handlePlayPause = () => {
    isOn = !isOn
    clearInterval(timerInterval)
    playPause.classList.remove(isOn ? 'fa-play' : 'fa-pause')
    playPause.classList.add(isOn ? 'fa-pause' : 'fa-play')
    if (isOn)
        startTimer()
}

// assigning event listeners
playPause.addEventListener('click', handlePlayPause)