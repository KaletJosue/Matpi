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

        // Verificar el rol

        getDocs(query(collection(db, "Users", user.uid, "Private_Data"))).
            then((querySnapshot) => {
                querySnapshot.forEach((doc) => {

                    if (doc.data().Rol == "Usuario") {

                        // Open Details

                        var details = document.querySelectorAll('.details')

                        details.forEach(detail => {
                            detail.addEventListener('click', () => {
                                window.open('/views/usuario/details/details.html', '_blank');
                            })
                        })

                        // name, rol and img
                        onAuthStateChanged(auth, (user) => {
                            if (user) {
                                const uid = user.uid;

                                var rol = document.querySelector('.rol')
                                var name = document.querySelector('.name')

                                var img = document.querySelector('.img_profile')

                                getDocs(query(collection(db, "Users", user.uid, "Private_Data"), where("Id", "==", user.uid))).
                                    then((querySnapshot) => {
                                        querySnapshot.forEach((doc) => {
                                            var nombres = doc.data().Nombre.split(" ")
                                            var dosPrimerosNombres = nombres.slice(0, 2).join(" ")

                                            rol.textContent = doc.data().Rol
                                            name.textContent = dosPrimerosNombres

                                            if (doc.data().URL == "") {
                                                img.src = "/assets/profile-5.jpg"
                                            } else {
                                                img.src = doc.data().URL
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