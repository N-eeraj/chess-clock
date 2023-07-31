// load audio
const audio = new Audio('./assets/tick.mp3')
audio.loop = true

// DOM buttons
const playPauseButton = document.getElementById('play_pause')
const resetButton = document.getElementById('reset')
const changeTime = document.getElementById('change_time')
const volumeButton = document.getElementById('volume')
const setCurrentTimeLimit = {
    modal: document.getElementById('current_set_time_modal'),
    value: document.getElementById('current_set_time_value'),
    actions: {
        update: document.getElementById('update_current_set_time'),
        decrement: document.getElementById('decrement_set_time_value'),
        increment: document.getElementById('increment_set_time_value'),
    },
}

// dom timer element
const timer = {
    black: document.getElementById('timer_black'),
    white: document.getElementById('timer_white')
}

// constants
const DEFAULT_TIME = 5 // default time in minutes
const MIN_TIME = 1 // minimum time in minutes
const MAX_TIME = 15 // maximum time in minutes

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
    checkSetTime()
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

// function to handle toggling of set time button
const checkSetTime = () => changeTime.style.visibility = isOn ? 'hidden' : 'visible'

// function to toggle play & pause
const handlePlayPause = () => {
    isOn = !isOn
    clearInterval(timerInterval)
    playPauseButton.classList.remove(isOn ? 'fa-play' : 'fa-pause')
    playPauseButton.classList.add(isOn ? 'fa-pause' : 'fa-play')
    checkSetTime()
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

// function to show & hide time input modal
const openTimeSelect = () => {
    setCurrentTimeLimit.value.innerText = currentSetTime
    setCurrentTimeLimit.modal.classList.remove('hidden')
}
const closeTimeSelect = () => setCurrentTimeLimit.modal.classList.add('hidden')

// function to change limit time in UI only
const changeCurrentSetTime = value => {
    const updatedValue = Number(setCurrentTimeLimit.value.innerText) + value
    setCurrentTimeLimit.value.innerText = updatedValue
    if (updatedValue === MIN_TIME) {
        setCurrentTimeLimit.actions.decrement.style.visibility = 'hidden'
        setCurrentTimeLimit.actions.increment.style.visibility = 'visible'
    }
    else if (updatedValue === MAX_TIME) {
        setCurrentTimeLimit.actions.decrement.style.visibility = 'visible'
        setCurrentTimeLimit.actions.increment.style.visibility = 'hidden'
    }
}

// function to update current set time
const updateCurrentSetTime = () => {
    currentSetTime = Number(setCurrentTimeLimit.value.innerText)
    closeTimeSelect()
    reset()
}

// assigning event listeners
playPauseButton.addEventListener('click', handlePlayPause)
resetButton.addEventListener('click', handleReset)
volumeButton.addEventListener('click', handleToggleVolume)
changeTime.addEventListener('click', openTimeSelect)
setCurrentTimeLimit.modal.addEventListener('click', closeTimeSelect)
setCurrentTimeLimit.actions.update.addEventListener('click', updateCurrentSetTime)

// initializing
init()
if ('serviceWorker' in navigator)
    navigator.serviceWorker.register('./serviceWorker.js')