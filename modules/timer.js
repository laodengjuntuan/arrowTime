import { formatSeconds } from './date-and-time.js'
const time = document.getElementsByClassName('time')[0]
const circleDom = document.getElementsByClassName('circle')[0]
let intervalTimer = 0

function timerForward() {
    let total = 0
    time.innerHTML = '00:00:00'
    intervalTimer = setInterval(() => {
        total++
        time.innerHTML = formatSeconds(total)
    }, 1000)
}

function timerBackward(total) {
    let current = total
    time.innerHTML = formatSeconds(total)
    intervalTimer = setInterval(() => {
        current--
        current == 0 ? timerOver() : ''
        time.innerHTML = formatSeconds(current)
        setPercent(current, total)
    }, 1000)
}

function timerOver() {
    clearInterval(intervalTimer)
}

function setPercent (current = 1, total = 1) {
    const GRITH = 618
    circleDom.style['stroke-dashoffset'] = GRITH * (current / total)
}

export { timerForward, timerBackward, timerOver, setPercent }
