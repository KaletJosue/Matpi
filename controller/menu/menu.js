const plus = document.querySelector('#plus')
const substract = document.querySelector('#substract')
const count = document.querySelector('#count')

plus.addEventListener('click', () => {
    count.textContent = parseInt(count.textContent) + 1;
})

substract.addEventListener('click', () => {
    if (parseInt(count.textContent) == 0) {
        alert ("No puedes pedir menos de una hamburguesa")
    } else {
        count.textContent = parseInt(count.textContent) - 1;
    }
})