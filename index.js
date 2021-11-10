import { getDate, getTime, formatSeconds } from './modules/date-and-time.js'

let time = document.getElementsByClassName('time')[0]
let radioTimerForward = document.getElementById('forward')
let radioTimerBackward = document.getElementById('backward')
let start = document.getElementById('start')
let end = document.getElementById('end')
let timeTable = document.getElementById('time-table')
let timerInput = document.getElementById('time-value')
const circleDom = document.getElementsByClassName('circle')[0]
const textDom = document.getElementsByClassName('time')[0]

let isRunning = false
let intervalTimer = 0
let today = getDate()
const storage = JSON.parse(localStorage.getItem(today)) || []
storage.forEach((item) => {
    timeTable.appendChild(getNode(item))
})
// 创建构造函数
function TimeItem(startTime, endTime) {
    this.startTime = startTime
    this.endTime = endTime
    this._resultTime = 0
    Object.defineProperty(this, "resultTime", {
        get: function() {
            let t1 = this.startTime.split(':')
            let t2 = this.endTime.split(':')
            let t1All = t1[0] * 60 + t1[1] * 1
            let t2All = t2[0] * 60 + t2[1] * 1
            this._resultTime = t2All - t1All
            return this._resultTime
        }
    })
}

start.onclick = function() {
    if (!isRunning) {
        let item = new TimeItem()
        isRunning = true
        start.classList.remove('clickable')
        end.classList.add('clickable')
        let ifForward = document.getElementsByName("timer")[0].checked
        ifForward ? timerForward(item) : timerBackward(item)
        storage.push(item)
    } else {
        console.log('正在运行中...')
    }
}


function timerForward(item) {

    item.startTime = getTime()

    let total = 0
    time.innerHTML = '00:00:00'
    intervalTimer = setInterval(() => {
        total++
        time.innerHTML = formatSeconds(total)
    }, 1000)

}

function timerBackward(item) {
    item.startTime = getTime()

    let total = parseInt(timerInput.value) * 60 // 以秒为单位
    let current = total
    time.innerHTML = formatSeconds(total)
    intervalTimer = setInterval(() => {
        current--
        current == 0 ? timeOver() : ''
        time.innerHTML = formatSeconds(current)
        setPercent(current, total)
    }, 1000)
}

function timeOver() {
    if (isRunning) {
        isRunning = false
        end.classList.remove('clickable')
        start.classList.add('clickable')
    
        let item = storage[storage.length - 1]
        item.endTime = getTime()
    
        clearInterval(intervalTimer)
        timeTable.appendChild(getNode(item))
        localStorage.setItem(today, JSON.stringify(storage))
    } else {
        console.log('尚未运行')
    }
}

end.onclick = timeOver

function setPercent (current = 1, total = 1) {
    const GRITH = 618
    circleDom.style['stroke-dashoffset'] = GRITH * (current / total)
}

function getNode(item) {
    let li = document.createElement('li')
    li.innerHTML = `<li>${item.startTime} - ${item.endTime} 总计：${item.resultTime || item._resultTime} min</li>`
    return li
}

radioTimerForward.onclick = function() {
    setPercent(0)
    timerInput.classList.add('invisitable')
}

radioTimerBackward.onclick = function() {
    setPercent()
    timerInput.classList.remove('invisitable')
}