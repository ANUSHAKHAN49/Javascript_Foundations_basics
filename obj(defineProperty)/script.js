const print = document.querySelector('#loop');
const marksTd = document.querySelector('#m');
const sheetTd = document.querySelector('#s');

const name = document.querySelector('#name');
const marks = document.querySelector('#mark');
const sheetNo = document.querySelector('#sheetno');
const submit = document.querySelector('#submit');
const list = document.querySelector('#list');

const stuData = [];

submit.addEventListener('click', function () {
    // Har student ke liye naya object
    let dataObj = {
        name: name.value,
        marks: marks.value,
        sheet: sheetNo.value
    };

  
    Object.defineProperty(dataObj, 'name', {
        enumerable: false
    });

    stuData.push(dataObj);


    name.value = '';
    marks.value = '';
    sheetNo.value = '';
});

print.addEventListener('click', function () {

    for (let i = 0; i < stuData.length; i++) {
        marksTd.innerText = stuData[i].marks;
        sheetTd.innerText = stuData[i].sheet;
    }
    

    list.style.display = 'block'; 
});
