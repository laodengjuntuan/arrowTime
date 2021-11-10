function getDate() {
    let date = new Date()
    let year = date.getFullYear()
    let month = date.getMonth() + 1
    let day = date.getDate()
    return year + '/' + month + '/' + day
}

function  getTime() {
    let date = new Date()
    let hour = date.getHours()
    let min = date.getMinutes()
    hour = hour < 10 ? '0' + hour : hour
    min = min < 10 ? '0' + min : min
    return hour + ':' + min
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

export { getDate, getTime, formatSeconds }
