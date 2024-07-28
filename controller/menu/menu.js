const plus = document.querySelector('#plus')
const substract = document.querySelector('#substract')
const count = document.querySelector('#count')
const carshop = document.querySelectorAll('#carshop')

const closeBtn = document.querySelector('.closeIcon')
const tryAgain = document.getElementById('okBtn')
const modal = document.querySelector('.modal')
const modaltxt = document.querySelector('.modaltxt')

carshop.forEach(btncarshop => {
    btncarshop.addEventListener('click', () => {
        modal.classList.add('active')
        closeBtn.addEventListener('click', () => {
            modal.classList.remove('active')
        })
        tryAgain.addEventListener('click', () => {
            location.href = "/views/login/login.html"
        })
        window.addEventListener('click', event => {
            if (event.target == modal) {
                modal.classList.remove('active')
            }
        })
        modaltxt.textContent = "No te reconocemos, inicia sesion"
        tryAgain.textContent = "Iniciar Sesion"
    })
})

plus.addEventListener('click', () => {
    count.textContent = parseInt(count.textContent) + 1;
})

substract.addEventListener('click', () => {
    if (parseInt(count.textContent) <= 0) {
        modal.classList.add('active')
        closeBtn.addEventListener('click', () => {
            modal.classList.remove('active')
        })
        tryAgain.addEventListener('click', () => {
            modal.classList.remove('active')
        })
        window.addEventListener('click', event => {
            if (event.target == modal) {
                modal.classList.remove('active')
            }
        })
        modaltxt.textContent = "No puedes pedir menos de una hamburguesa"
        tryAgain.textContent = "Intentar de nuevo"
        count.textContent = 0
    } else {
        count.textContent = parseInt(count.textContent) - 1;
    }
})

const swiper = new Swiper('.mySwiper', {
    slidesPerView: 1,
    spaceBetween: 20,
    grabCursor: true,
    breakpoints: {
        991: {
            slidesPerView: 3
        }
    }
});

document.querySelector(".bars__menu").addEventListener("click", animateBars)

var line1__bars = document.querySelector('.line1__bars-menu')
var line2__bars = document.querySelector('.line2__bars-menu')
var line3__bars = document.querySelector('.line3__bars-menu')

const con = document.querySelector('.con')
const acon = document.querySelectorAll('.con li')

function animateBars() {
    line1__bars.classList.toggle("active")
    line2__bars.classList.toggle("active")
    line3__bars.classList.toggle("active")

    con.classList.toggle('active')

    acon.forEach(as => {
        as.addEventListener('click', () => {
            line1__bars.classList.remove("active")
            line2__bars.classList.remove("active")
            line3__bars.classList.remove("active")

            con.classList.remove('active')
        })
    })
}
