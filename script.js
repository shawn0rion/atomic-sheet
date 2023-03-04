let imgList = document.querySelectorAll('img')
let rows = document.querySelectorAll('.row');
let sheet = document.querySelector('#sheet')
let saveArr = [];
let start = document.querySelector('#start');
let scramble = document.querySelector('#scramble');
let save = document.querySelector('#save_atom');
start.addEventListener('click', () => {
    load(resetArrIdx());
})
scramble.addEventListener('click', () => {
    let saved = parseInt(save.value) - 1;
    if (!(isNaN(saved)) && !(inArray(saveArr, saved))){
        saveArr.push(saved);
    }
    load(randomArrIdx());
})

function resetArrIdx() {
    return [0, 1, 2, 3, 4, 5, 6, 7, 8];
}

function rng() {
    return Math.floor(Math.random() * (imgList.length));
}


function inArray(arr, rand) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] == rand){
            return true;
        }
    }
    return false;
}

function randomArrIdx() {
    let newArr = [];
    while (newArr.length < imgList.length) {
        let rand = rng();
        if (!(inArray(newArr, rand)) || inArray(saveArr, rand)){
            newArr.push(rand);
        }
    } 
    return newArr;
}

function clear() {
    for (let row = 0; row < rows.length; row++){
        while (rows[row].firstChild) {
            rows[row].removeChild(rows[row].lastChild)
        }
    }
}

function load(arrIdx) {
    clear();
    let clones = [0,0];
    let rowIdx = 0;
    let breakRow = imgList.length / rows.length;
    for (let img = 0; img < imgList.length; img++) {
        if (img % breakRow == 0 && img != 0) {
            rowIdx += 1;
        }
        // when a saved idx reappears
        if (inArray(arrIdx.slice(0,img), arrIdx[img])){
            let clone = imgList[arrIdx[img]].cloneNode(true);
            rows[rowIdx].appendChild(clone);
            clones[rowIdx] += 1;
        }
        else{
            rows[rowIdx].appendChild(imgList[arrIdx[img]]);
        }

        if (rows.item(rowIdx).childNodes.length > 4){
            // fix document when it adds two children for every clone
            snip(rows.item(rowIdx))
        }
    }

}

function snip(row){
    for (let i = 0; i < row.length - 4; i++){
        row.removeChild(row.lastChild);
    }
}

