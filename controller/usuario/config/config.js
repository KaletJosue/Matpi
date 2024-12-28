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

onAuthStateChanged(auth, (user) => {
    if (user) {

        getDocs(query(collection(db, "Users", user.uid, "Private_Data"))).
            then((querySnapshot) => {
                querySnapshot.forEach((doc) => {

                    if (doc.data().Rol == "Usuario") {

                        // Dark Mode
                        onAuthStateChanged(auth, (user) => {
                            if (user) {
                                const uid = user.uid;

                                getDocs(query(collection(db, "Users", user.uid, "Private_Data"), where("Id", "==", user.uid))).
                                    then((querySnapshot) => {
                                        querySnapshot.forEach((doc2) => {
                                            getDoc(doc(db, "Users", user.uid, "Private_Data", doc2.data().DarkMode)).
                                                then((docSnap) => {
                                                    var body = document.querySelector('body')

                                                    if (doc2.data().DarkMode == "desactive") {
                                                        body.classList.remove('dark-mode')
                                                    }
                                                    else if (doc2.data().DarkMode == "active") {
                                                        body.classList.add('dark-mode')
                                                    }
                                                    else {
                                                        body.classList.add('dark-mode')
                                                    }
                                                })
                                        })
                                    })

                            } else {
                                const tryAgain = document.getElementById('okBtn')
                                const modal = document.querySelector('.modal')
                                const textModal = document.querySelector('.textModal')

                                modal.classList.add('active')
                                textModal.textContent = "No has iniciado sesión de manera correcta"
                                tryAgain.addEventListener('click', () => {
                                    location.href = "/views/login/login.html"
                                })
                            }
                        });

                        // Modal Info and Security

                        var btnInfo = document.querySelector('.infoPersonal')
                        var btnSecurity = document.querySelector('.security')

                        var modalInfo = document.querySelector('.modalInfo')
                        var modalSecurity = document.querySelector('.modalSecurity')

                        btnInfo.addEventListener('click', () => {
                            modalInfo.classList.add('active')
                            window.addEventListener('click', event => {
                                if (event.target == modalInfo) {
                                    modalInfo.classList.remove('active')
                                }
                            })
                        })

                        btnSecurity.addEventListener('click', () => {
                            modalSecurity.classList.add('active')
                            window.addEventListener('click', event => {
                                if (event.target == modalSecurity) {
                                    modalSecurity.classList.remove('active')
                                }
                            })
                        })

                    } else {
                        const tryAgain = document.getElementById('okBtn')
                        const modal = document.querySelector('.modal')
                        const textModal = document.querySelector('.textModal')

                        modal.classList.add('active')
                        textModal.textContent = "Acceso no autorizado a esta página"
                        tryAgain.addEventListener('click', () => {
                            location.href = "/views/login/login.html"
                        })
                    }

                })
            })

    } else {
        const tryAgain = document.getElementById('okBtn')
        const modal = document.querySelector('.modal')
        const textModal = document.querySelector('.textModal')

        modal.classList.add('active')
        textModal.textContent = "No has iniciado sesión de manera correcta"
        tryAgain.addEventListener('click', () => {
            location.href = "/views/login/login.html"
        })
    }
});