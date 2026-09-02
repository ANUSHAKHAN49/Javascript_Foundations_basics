const memoryKey = document.querySelector('#keys');
const memoryValue = document.querySelector('#store');
const saveBtn = document.querySelector('#save');
const memoryRecall = document.querySelector('#recall');
const findBtn = document.querySelector('#find');
const result = document.querySelector('#output');

const memoryData = {};

saveBtn.addEventListener('click', function () {
  const key = memoryKey.value.trim().toLowerCase();
  const value = memoryValue.value.trim();

  if (key && value) {
    memoryData[key] = value;
    result.innerText = `Saved "${key}" with "${value}"`;
    memoryKey.value = '';
    memoryValue.value = '';
  } else {
    result.innerText = 'Please enter both key and value!';
  }
});

findBtn.addEventListener('click', function () {
  const search = memoryRecall.value.trim().toLowerCase();

  if (memoryData.hasOwnProperty([search]) {
    result.innerText = `Found: ${memoryData[search]}`;
  } else {
    result.innerText = 'This is not in my memory.';
  }
});
