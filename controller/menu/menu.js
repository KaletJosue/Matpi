import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-auth.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-analytics.js";
import { getFirestore, collection, addDoc, setDoc, doc, getDocs, where, getDoc, query, updateDoc, deleteDoc } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyCHMlDhb4hdGrKWIhLeaBCDCfCNADGbcaQ",
    authDomain: "matpicolombia.firebaseapp.com",
    projectId: "matpicolombia",
    storageBucket: "matpicolombia.appspot.com",
    messagingSenderId: "298853028950",
    appId: "1:298853028950:web:01b1d50f4bfcc14b5557f7",
    measurementId: "G-R654P1MLDK"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();
const db = getFirestore(app);

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

// header sections

var all = document.querySelector('.con');

getDocs(collection(db, "Section", "idSection", "Data_Documents"))
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            var li = document.createElement('li');
            var a = document.createElement('a');

            li.className = 'link';
            a.id = doc.data().Nombre

            li.addEventListener('click', () => {
                location.href = `https://matpicolombia.web.app/views/menu/menu.html#${a.id}`
            })

            all.appendChild(li);
            li.appendChild(a);

            a.textContent = doc.data().Nombre;
        });

        var li = document.createElement('li');
        var a = document.createElement('a');
        var i = document.createElement('i');

        all.appendChild(li);
        li.appendChild(a);
        a.appendChild(i);

        i.className = 'ri-user-line';
    });

