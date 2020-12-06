let table = document.getElementById('table')
let dataInput = document.getElementById('data')
let reader = new FileReader();
let dataSet = []

dataInput.addEventListener('change', event => {
    reader.onload = onReaderLoad;
    reader.readAsText(event.target.files[0]);
    document.getElementById('header').remove()
})

window.addEventListener('scroll', () => {
    table.innerHTML = "";
    renderData()
})

function onReaderLoad(event) {
    const data = JSON.parse(event.target.result);
    data.forEach(item => {
        dataSet.push(item)
    })
    renderData()
    document.getElementById('box').style.height = `${dataSet.length * 25}px`;
}

function renderData() {
    const wH = window.innerHeight; 
    const countRows = Math.floor(wH / 25) // magic numbers...
    const startPos = Math.floor(window.pageYOffset / 25)

    table.style.paddingTop = `${window.pageYOffset}px`
    
    for(let i = startPos; i <= startPos + countRows; i++) {
        item = dataSet[i]

        let row = document.createElement("div")
        row.className = 'row'

        let colName = document.createElement("div")
        colName.className = 'col'

        let colSurname = document.createElement("div")
        colSurname.className = 'col'

        let colFathername = document.createElement("div")
        colFathername.className = 'col'

        colName.appendChild(document.createTextNode(item.name))
        colSurname.appendChild(document.createTextNode(item.surname))
        colFathername.appendChild(document.createTextNode(item.fathername))

        row.appendChild(colName)
        row.appendChild(colSurname)
        row.appendChild(colFathername)

        table.appendChild(row)
    }
}