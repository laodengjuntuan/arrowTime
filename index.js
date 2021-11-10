import { getDate, getTime, formatSeconds } from './modules/date-and-time.js'
import { timerForward, timerBackward, timerOver, setPercent } from './modules/timer.js'
import { addOneItem } from './modules/table.js'

let radioTimerForward = document.getElementById('forward')
let radioTimerBackward = document.getElementById('backward')
let start = document.getElementById('start')
let end = document.getElementById('end')
let timerInput = document.getElementById('time-value')


let isRunning = false

let today = getDate()
const storage = JSON.parse(localStorage.getItem(today)) || []
storage.forEach((item) => {
    addOneItem(item)
})
// 创建构造函数
function TimeItem() {
    this.startTime = getTime()
    this.endTime = ''
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
        ifForward ? timerForward() : timerBackward(parseInt(timerInput.value) * 60)
        storage.push(item)
    } else {
        console.log('正在运行中...')
    }
}

end.onclick = function() {
    if (isRunning) {
        isRunning = false
        end.classList.remove('clickable')
        start.classList.add('clickable')
    
        let item = storage[storage.length - 1]
        item.endTime = getTime()
        timerOver()
        addOneItem(item)
        localStorage.setItem(today, JSON.stringify(storage))
    } else {
        console.log('尚未运行')
    }
}

radioTimerForward.onclick = function() {
    setPercent(0)
    timerInput.classList.add('invisitable')
}

radioTimerBackward.onclick = function() {
    setPercent()
    timerInput.classList.remove('invisitable')
}