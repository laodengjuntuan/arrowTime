let time = document.getElementsByClassName('time')[0]
let timerForward = document.getElementById('forward')
let timerBackward = document.getElementById('backward')
let end = document.getElementById('end')
let clock = document.getElementById('nowTime')
let timeTable = document.getElementById('time-table')

const storage = JSON.parse(localStorage.getItem('2021/11/3')) 
storage.forEach((item) => {
    console.log(item)
    timeTable.appendChild(getNode(item))
})
// 创建构造函数
function TimeItem(startTime, endTime) {
    this.startTime = startTime
    this.endTime = endTime
    this._resultTime = 0
}

timerForward.onclick = () => {
    let item = new TimeItem()
    Object.defineProperty(item, "resultTime", {
        get: function() {
            let t1 = this.startTime.split(':')
            let t2 = this.endTime.split(':')
            let t1All = t1[0] * 60 + t1[1] * 1
            let t2All = t2[0] * 60 + t2[1] * 1
            this._resultTime = t2All - t1All
            return this._resultTime
        }
    })
    item.startTime = getDate()

    let total = 0
    time.innerHTML = '00:00:00'
    intervalTimer = setInterval(() => {
        total++
        time.innerHTML = formatSeconds(total)
    }, 1000)

    storage.push(item)
}
timerBackward.onclick = () => {
    timeItem.startTime = getDate()

    let total = parseInt(document.getElementById('time-value').value) * 60 // 以秒为单位
    time.innerHTML = formatSeconds(total)
    intervalTimer = setInterval(() => {
        total--
        total == 0 ? timeOver() : ''
        time.innerHTML = formatSeconds(total)
    }, 1000)
}
function formatSeconds(total) {
    let sec = Math.floor(total % 60)
    let min = Math.floor(total / 60 % 60)
    let hour = Math.floor(total / 3600)
    sec = sec < 10 ? '0' + sec : sec
    min = min < 10 ? '0' + min : min
    hour = hour < 10 ? '0' + hour : hour
    return hour + ':' + min + ':' + sec
}

function timeOver() {
    let item = storage[storage.length - 1]
    item.endTime = getDate()

    clearInterval(intervalTimer)

    timeTable.appendChild(getNode(item))
    localStorage.setItem("2021/11/3", JSON.stringify(storage))
}

end.onclick = timeOver

function  getDate() {
    let date = new Date()
    let hour = date.getHours()
    let min = date.getMinutes()
    return hour + ':' + min
}

function getNode(item) {
    let li = document.createElement('li')
    li.innerHTML = `<li>${item.startTime} - ${item.endTime} 总计：${item.resultTime} min</li>`
    return li
}