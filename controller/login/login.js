// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-analytics.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendEmailVerification, sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-auth.js";
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

const container = document.querySelector('.container');
const container2 = document.querySelector('.container2');
const registerBtn = document.getElementById('registerBtn');
const loginBtn = document.getElementById('loginBtn');

var count = document.querySelector('.count')
var noCount = document.querySelector('.noCount')

noCount.addEventListener('click', () => {
    container.classList.add("active");
    container2.classList.add("active");
})

count.addEventListener('click', () => {
    container.classList.remove("active");
    container2.classList.remove("active");
})

registerBtn.addEventListener('click', () => {
    container.classList.add("active");
    container2.classList.add("active");
});

loginBtn.addEventListener('click', () => {
    container.classList.remove("active");
    container2.classList.remove("active");
});

// Eyes

var eye = document.querySelector('#eye')
var eye2 = document.querySelector('#eye2')

var contra = document.querySelector('#contra')
var contraRegis = document.querySelector('#pass_regis')

eye.addEventListener('click', () => {
    if (contra.type === 'password') {
        contra.type = 'text'
    } else {
        contra.type = 'password'
    }
    eye.classList.toggle('active')
})

eye2.addEventListener('click', () => {
    if (contraRegis.type === 'password') {
        contraRegis.type = 'text'
    } else {
        contraRegis.type = 'password'
    }
    eye2.classList.toggle('active')
})

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
                                            if (rol == "Administrador" || rol == "SuperAdmin") {
                                                location.href = '/views/admin/dashboard/dashboard.html'
                                            }
                                            if (rol == "Cajero") {
                                                location.href = '/views/cajero/home/home.html'
                                            }
                                            if (rol == "Usuario") {
                                                location.href = '/views/usuario/home/home.html'
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
                    container.classList.add('active')
                    container2.classList.add('active')
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

    var name
    name = document.getElementById('name').value

    var phone
    phone = document.getElementById('phone').value

    var direction
    direction = document.getElementById('direction').value

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

    if ((password_regis.length != 0) && (email_regis.length != 0) && (name.length != 0) && (phone.length != 0) && (direction.length != 0)) {

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
                            Telefono: phone,
                            Direccion: direction,
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
                    container.classList.remove('active')
                    container2.classList.remove('active')
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
                    container.classList.remove('active')
                    container2.classList.remove('active')
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

var modalRemember = document.querySelector('.modalRemember')

rememberPaswword.addEventListener('click', () => {
    modalRemember.classList.add('active')
    window.addEventListener('click', event => {
        if (event.target == modalRemember) {
            modalRemember.classList.remove('active')
        }
    })
})

var sendRemember = document.querySelector('.sendRemember')
var valueRemember = document.querySelector('.valueRemember')

sendRemember.addEventListener('click', () => {
    const closeBtn7 = document.querySelector('.closeIcon7')
    const tryAgain7 = document.getElementById('okBtn7')
    const modal7 = document.querySelector('.modal7')
    const text7 = document.querySelector('.textModal7')

    const closeBtn8 = document.querySelector('.closeIcon8')
    const tryAgain8 = document.getElementById('okBtn8')
    const modal8 = document.querySelector('.modal8')

    if (valueRemember.value.length != 0) {

        sendPasswordResetEmail(auth, valueRemember.value)
            .then(() => {
                modal8.classList.add('active')
                closeBtn8.addEventListener('click', () => {
                    modal8.classList.remove('active')
                    modalRemember.classList.remove('active')
                    valueRemember.value = ""
                })
                tryAgain8.addEventListener('click', () => {
                    modal8.classList.remove('active')
                    modalRemember.classList.remove('active')
                    valueRemember.value = ""
                })
                window.addEventListener('click', event => {
                    if (event.target == modal8) {
                        modal8.classList.remove('active')
                        modalRemember.classList.remove('active')
                        valueRemember.value = ""
                    }
                })
            })
            .catch((error) => {
                modal7.classList.add('active')
                text7.textContent = "Tenemos problemas, intena mas tarde"
                closeBtn7.addEventListener('click', () => {
                    modal7.classList.remove('active')
                })
                tryAgain7.addEventListener('click', () => {
                    modal7.classList.remove('active')
                })
                window.addEventListener('click', event => {
                    if (event.target == modal7) {
                        modal7.classList.remove('active')
                    }
                })
            });

    } else {
        modal7.classList.add('active')
        text7.textContent = "Debes ingresar tu correo"
        closeBtn7.addEventListener('click', () => {
            modal7.classList.remove('active')
        })
        tryAgain7.addEventListener('click', () => {
            modal7.classList.remove('active')
        })
        window.addEventListener('click', event => {
            if (event.target == modal7) {
                modal7.classList.remove('active')
            }
        })
    }
})




