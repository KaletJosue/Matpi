// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-analytics.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendEmailVerification } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-auth.js";
import { getFirestore, collection, addDoc, setDoc, doc, getDocs, where, getDoc, query } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCHMlDhb4hdGrKWIhLeaBCDCfCNADGbcaQ",
    authDomain: "matpicolombia.firebaseapp.com",
    projectId: "matpicolombia",
    storageBucket: "matpicolombia.appspot.com",
    messagingSenderId: "298853028950",
    appId: "1:298853028950:web:01b1d50f4bfcc14b5557f7",
    measurementId: "G-R654P1MLDK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();
const db = getFirestore(app);

const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");
const title = document.querySelector(".title23")

sign_up_btn.addEventListener("click", () => {
    container.classList.add("sign-up-mode");
    title.textContent = "Registrate | Matpi"
});

sign_in_btn.addEventListener("click", () => {
    container.classList.remove("sign-up-mode");
    title.textContent = "Inicia sesion | Matpi"
});

iniciar.addEventListener('click', (e) => {
    e.preventDefault()

    const closeBtn = document.querySelector('.closeIcon')
    const tryAgain = document.getElementById('okBtn')
    const modal = document.querySelector('.modal')

    const closeBtn2 = document.querySelector('.closeIcon2')
    const tryAgain2 = document.getElementById('okBtn2')
    const modal2 = document.querySelector('.modal2')

    const closeBtn3 = document.querySelector('.closeIcon3')
    const tryAgain3 = document.getElementById('okBtn3')
    const modal3 = document.querySelector('.modal3')

    var correo
    correo = document.getElementById('email').value

    var con
    con = document.getElementById('contra').value

    if ((correo.length != 0) && (con.length != 0)) {
        signInWithEmailAndPassword(auth, correo, con)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                // ...
                if (getAuth().currentUser.emailVerified) {
                    if (correo.length != 0 && con.length != 0) {

                        getDocs(query(collection(db, "Users", user.uid, "Private_Data"), where("Id", "==", user.uid))).
                            then((querySnapshot) => {
                                querySnapshot.forEach((doc2) => {
                                    getDoc(doc(db, "Users", user.uid, "Private_Data", doc2.id)).
                                        then((docSnap) => {
                                            if (docSnap.exists()) {
                                                var rol = docSnap.data().Rol
                                            }
                                            if (rol == "Administrador") {
                                                location.href = '/views/admin/dashboard/dashboard.html'
                                            }
                                            if (rol == "Gerente" || rol == "Secretario") {
                                                alert('eres gerente')
                                            }
                                            if (rol == "Usuario") {
                                                alert('eres usuario')
                                            }
                                        })
                                })
                            })

                    }

                }

                else {
                    modal3.classList.add('active')
                    closeBtn3.addEventListener('click', () => {
                        modal3.classList.remove('active')
                    })
                    tryAgain3.addEventListener('click', () => {
                        modal3.classList.remove('active')
                    })
                    window.addEventListener('click', event => {
                        if (event.target == modal3) {
                            modal3.classList.remove('active')
                        }
                    })
                }

            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                modal2.classList.add('active')
                closeBtn2.addEventListener('click', () => {
                    modal2.classList.remove('active')
                })
                tryAgain2.addEventListener('click', () => {
                    modal2.classList.remove('active')
                    container.classList.add("sign-up-mode");
                    title.textContent = "Registrate"
                })
                window.addEventListener('click', event => {
                    if (event.target == modal2) {
                        modal2.classList.remove('active')
                    }
                })
            });
    }

    else {
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

    }
})



regis.addEventListener('click', (e) => {
    e.preventDefault()

    var password_regis
    password_regis = document.getElementById('pass_regis').value


    var email_regis
    email_regis = document.getElementById('ema_regis').value

    var confir_regis
    confir_regis = document.getElementById('confir_regis').value

    var name
    name = document.getElementById('name').value

    const closeBtn = document.querySelector('.closeIcon')
    const tryAgain = document.getElementById('okBtn')
    const modal = document.querySelector('.modal')

    const closeBtn4 = document.querySelector('.closeIcon4')
    const tryAgain4 = document.getElementById('okBtn4')
    const modal4 = document.querySelector('.modal4')

    const closeBtn5 = document.querySelector('.closeIcon5')
    const tryAgain5 = document.getElementById('okBtn5')
    const modal5 = document.querySelector('.modal5')

    const closeBtn6 = document.querySelector('.closeIcon6')
    const tryAgain6 = document.getElementById('okBtn6')
    const modal6 = document.querySelector('.modal6')

    if ((password_regis.length != 0) && (email_regis.length != 0) && (confir_regis.length != 0) && (name.length != 0)) {

        if (password_regis == confir_regis) {
            createUserWithEmailAndPassword(auth, email_regis, password_regis)
                .then((userCredential) => {
                    // Signed in
                    const user = userCredential.user;
                    sendEmailVerification(auth.currentUser).
                        then(() => {
                            addDoc(collection(db, "Users", user.uid, "Private_Data"), {
                                Correo: email_regis,
                                Id: user.uid,
                                Nombre: name,
                                Rol: "Usuario",
                                DarkMode: "desactive",
                                URL: "",
                            })
                        })

                    // ...
                    modal4.classList.add('active')
                    closeBtn4.addEventListener('click', () => {
                        modal4.classList.remove('active')
                    })
                    tryAgain4.addEventListener('click', () => {
                        container.classList.remove("sign-up-mode");
                        title.textContent = "Inicia sesion"
                        modal4.classList.remove('active')
                        password_regis.value = ''
                        email_regis.value = ''
                        confir_regis.value = ''
                        name.value = ''
                    })
                    window.addEventListener('click', event => {
                        if (event.target == modal4) {
                            modal4.classList.remove('active')
                        }
                    })

                })


                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    // ..
                    modal5.classList.add('active')
                    closeBtn5.addEventListener('click', () => {
                        modal5.classList.remove('active')
                    })
                    tryAgain5.addEventListener('click', () => {
                        container.classList.remove("sign-up-mode");
                        title.textContent = "Inicia sesion"
                        modal5.classList.remove('active')
                    })
                    window.addEventListener('click', event => {
                        if (event.target == modal5) {
                            modal5.classList.remove('active')
                        }
                    })
                });
        }

        else {
            modal6.classList.add('active')
            closeBtn6.addEventListener('click', () => {
                modal6.classList.remove('active')
            })
            tryAgain6.addEventListener('click', () => {
                modal6.classList.remove('active')
            })
            window.addEventListener('click', event => {
                if (event.target == modal6) {
                    modal6.classList.remove('active')
                }
            })
        }

    }

    else {
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
    }


})




