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
    black: null,
    white: null
}

// variables
let isOn
let currentColor
let timerInterval

// function to initialize
const init = () => {
    time.black = 600
    time.white = 600
    isOn = false
    currentColor = 'white'
    timerInterval = null
    setCurrentTimer('white')
    setCurrentTimer('black')
    playPause.classList.remove('fa-pause')
    playPause.classList.add('fa-play')
}

const setCurrentTimer = color => {
    const min = Math.floor(time[color] / 60)
    const sec = String(time[color] % 60).padStart(2, 0)
    timer[color].innerText = `${min}:${sec}`
}

// function to start timer
const startTimer = () => {
    timerInterval = setInterval(() => {
        --time[currentColor]
        setCurrentTimer(currentColor)
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

// function to switch timer
const handleSwitch = (color) => {
    if (!isOn || currentColor !== color) return
    currentColor = currentColor === 'white' ? 'black' : 'white'
}

// function to reset timer
const handleReset = () => {
    clearInterval(timerInterval)
    init()
}

// assigning event listeners
playPause.addEventListener('click', handlePlayPause)
reset.addEventListener('click', handleReset)

init()