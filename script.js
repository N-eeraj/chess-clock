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

// constants
const DEFAULT_TIME = 5 // default time in minutes

// timer left
const time = {
    black: null,
    white: null
}

// variables
let currentSetTime
let isOn
let currentColor
let timerInterval
let volume


// function to convert minutes to seconds
const convertToSeconds = minutes => minutes * 60

// function to return the 'other' color
const getInvertColor = () => currentColor === 'white' ? 'black' : 'white'

// function to initialize
const init = () => {
    currentSetTime = DEFAULT_TIME
    reset()
    volume = true
    volumeButton.classList.remove('fa-volume-up')
    volumeButton.classList.remove('fa-volume-off')
    volumeButton.classList.add(volume ? 'fa-volume-up' : 'fa-volume-off')
}

// function to reset
const reset = () => {
    time.black = convertToSeconds(currentSetTime)
    time.white = convertToSeconds(currentSetTime)
    isOn = false
    currentColor = 'white'
    timerInterval = null
    setCurrentTimer('white')
    setCurrentTimer('black')
    playPauseButton.classList.remove('fa-pause')
    playPauseButton.classList.add('fa-play')
}

// function to set timer value of given color
const setCurrentTimer = color => {
    const min = Math.floor(time[color] / 60)
    const sec = String(time[color] % 60).padStart(2, 0)
    timer[color].innerText = `${min}:${sec}`
}

// function to handle time up
const handleTimeUp = () => {
    alert(`${getInvertColor()} win`)
    reset()
}

// function to start timer
const startTimer = () => {
    timerInterval = setInterval(() => {
        --time[currentColor]
        setCurrentTimer(currentColor)
        if (!time[currentColor]) {
            clearInterval(timerInterval)
            handleTimeUp()
        }
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
    currentColor = getInvertColor()
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
if ('serviceWorker' in navigator)
    navigator.serviceWorker.register('./serviceWorker.js')