let timeTable = document.getElementById('time-table')

function getNode(item) {
    let li = document.createElement('li')
    li.innerHTML = `<li>${item.startTime} - ${item.endTime} 总计：${item.resultTime || item._resultTime} min</li>`
    return li
}

function addOneItem(item) {
    timeTable.appendChild(getNode(item))
}

export { addOneItem }