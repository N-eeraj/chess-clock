// load audio
const audio = new Audio('./assets/tick.mp3')
audio.loop = true

// DOM buttons
const playPauseButton = document.getElementById('play_pause')
const resetButton = document.getElementById('reset')
const changeTime = document.getElementById('change_time')
const volumeButton = document.getElementById('volume')

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
let volume

// function to initialize
const init = () => {
    reset()
    volume = true
    volumeButton.classList.remove('fa-volume-up')
    volumeButton.classList.remove('fa-volume-off')
    volumeButton.classList.add(volume ? 'fa-volume-up' : 'fa-volume-off')
}

// function to reset
const reset = () => {
    time.black = 600
    time.white = 600
    isOn = false
    currentColor = 'white'
    timerInterval = null
    setCurrentTimer('white')
    setCurrentTimer('black')
    playPauseButton.classList.remove('fa-pause')
    playPauseButton.classList.add('fa-play')
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
    playPauseButton.classList.remove(isOn ? 'fa-play' : 'fa-pause')
    playPauseButton.classList.add(isOn ? 'fa-pause' : 'fa-play')
    if (isOn)
        startTimer()
    if (volume && isOn)
        audio.play()
    else
        audio.pause()
}

// function to switch timer
const handleSwitch = (color) => {
    if (!isOn || currentColor !== color) return
    currentColor = currentColor === 'white' ? 'black' : 'white'
}

// function to reset timer
const handleReset = () => {
    audio.pause()
    clearInterval(timerInterval)
    reset()
}

// function to toggle volume
const handleToggleVolume = () => {
    volume = !volume
    volumeButton.classList.remove(volume ? 'fa-volume-off' : 'fa-volume-up')
    volumeButton.classList.add(volume ? 'fa-volume-up' : 'fa-volume-off')
    if (isOn)
        volume ? audio.play() : audio.pause()
}

// assigning event listeners
playPauseButton.addEventListener('click', handlePlayPause)
resetButton.addEventListener('click', handleReset)
volumeButton.addEventListener('click', handleToggleVolume)

// initializing
init()