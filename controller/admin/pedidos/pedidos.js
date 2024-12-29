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

        getDocs(query(collection(db, "Users", "IdUser", "Private_Data"), where("Id", "==", user.uid))).
            then((querySnapshot) => {
                querySnapshot.forEach(doc => {

                    if (doc.data().Rol == "Administrador" || doc.data().Rol == "SuperAdmin") {

                        const btnmenu = document.querySelector('.menu-btn')
                        const sidebar = document.querySelector('.sidebar')

                        const btnsidebar = document.getElementById('btnsidebar')
                        const btnsidebar2 = document.getElementById('btnsidebar2')

                        btnsidebar.addEventListener('click', () => {
                            sidebar.classList.toggle('response')
                        })

                        btnsidebar2.addEventListener('click', () => {
                            sidebar.classList.toggle('response')
                        })

                        sidebar.classList.add('active')

                        btnmenu.addEventListener('click', () => {
                            sidebar.classList.toggle('active')
                        })

                        // Select Estado 

                        onAuthStateChanged(auth, (user) => {
                            if (user) {
                                const uid = user.uid;

                                // Details

                                var details = document.querySelectorAll('.details')

                                details.forEach(detail => {
                                    detail.addEventListener('click', () => {
                                        window.open('/views/admin/details/details.html', '_blank');
                                    })
                                })

                                var btnEstado = document.querySelectorAll('#estado')
                                var modalEstado = document.querySelector('.modalEstado')

                                btnEstado.forEach(estado => {
                                    estado.addEventListener('click', () => {
                                        modalEstado.classList.add('active')
                                        window.addEventListener('click', event => {
                                            if (event.target == modalEstado) {
                                                modalEstado.classList.remove('active')
                                            }
                                        })
                                    })
                                })

                            } else {
                                const tryAgain = document.getElementById('okBtn')
                                const modal = document.querySelector('.modal')
                                const textModal = document.querySelector('.textModal')
                        
                                textModal.textContent = "No has iniciado sesión de manera correcta"
                                modal.classList.add('active')
                                tryAgain.addEventListener('click', () => {
                                    location.href = "/views/login/login.html"
                                })
                            }
                        });

                        // name, rol and img

                        onAuthStateChanged(auth, (user) => {
                            if (user) {
                                const uid = user.uid;

                                var rol = document.querySelector('.rol')
                                var name = document.querySelector('.name_user')

                                var img = document.querySelector('.img_profile')

                                getDocs(query(collection(db, "Users", "IdUser", "Private_Data"), where("Id", "==", user.uid))).
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
                        
                                textModal.textContent = "No has iniciado sesión de manera correcta"
                                modal.classList.add('active')
                                tryAgain.addEventListener('click', () => {
                                    location.href = "/views/login/login.html"
                                })
                            }
                        });

                        // Dark Mode
                        onAuthStateChanged(auth, (user) => {
                            if (user) {
                                const uid = user.uid;

                                const body = document.body
                                const checkbox = document.querySelector('.theme-switch__checkbox');
                                const palanca = document.querySelector('.theme-switch__checkbox')

                                getDocs(query(collection(db, "Users", "IdUser", "Private_Data"), where("Id", "==", user.uid))).
                                    then((querySnapshot) => {
                                        querySnapshot.forEach((doc2) => {
                                            if (doc2.data().DarkMode == "desactive") {
                                                body.classList.remove('dark-mode')
                                                checkbox.checked = false
                                            }
                                            else if (doc2.data().DarkMode == "active") {
                                                body.classList.add('dark-mode')
                                                checkbox.checked = true
                                            }
                                            else {
                                                body.classList.add('dark-mode')
                                                checkbox.checked = true
                                            }
                                        })
                                    })

                                palanca.addEventListener('click', () => {
                                    getDocs(query(collection(db, "Users", "IdUser", "Private_Data"), where("Id", "==", user.uid))).
                                        then((querySnapshot) => {
                                            querySnapshot.forEach((doc2) => {
                                                if (doc2.data().DarkMode == "desactive") {
                                                    getDocs(collection(db, "Users", "IdUser", "Private_Data"))
                                                        .then((querySnapshot) => {
                                                            querySnapshot.forEach((doc) => {
                                                                updateDoc(doc.ref, {
                                                                    DarkMode: 'active'
                                                                })
                                                            })
                                                        })
                                                }
                                                else if (doc2.data().DarkMode == "active") {
                                                    getDocs(collection(db, "Users", "IdUser", "Private_Data"))
                                                        .then((querySnapshot) => {
                                                            querySnapshot.forEach((doc) => {
                                                                updateDoc(doc.ref, {
                                                                    DarkMode: 'desactive'
                                                                })
                                                            })
                                                        })
                                                }
                                                else {
                                                    getDocs(collection(db, "Users", "IdUser", "Private_Data"))
                                                        .then((querySnapshot) => {
                                                            querySnapshot.forEach((doc) => {
                                                                updateDoc(doc.ref, {
                                                                    DarkMode: 'desactive'
                                                                })
                                                            })
                                                        })
                                                }
                                            })
                                        })
                                })

                            } else {
                                const tryAgain = document.getElementById('okBtn')
                                const modal = document.querySelector('.modal')
                                const textModal = document.querySelector('.textModal')

                                textModal.textContent = "No has iniciado sesión de manera correcta"
                                modal.classList.add('active')
                                tryAgain.addEventListener('click', () => {
                                    location.href = "/views/login/login.html"
                                })
                            }
                        });

                        const palanca = document.querySelector('.theme-switch__checkbox')
                        const body = document.body

                        palanca.addEventListener('click', () => {
                            body.classList.toggle('dark-mode')
                        })

                        // logout
                        const closeBtn2 = document.querySelector('.closeIcon2')
                        const tryAgain2 = document.getElementById('okBtn2')
                        const cancelAgain2 = document.getElementById('cancelBtn2')
                        const modal2 = document.querySelector('.modal2')

                        const logout = document.getElementById('logout')

                        logout.addEventListener('click', () => {
                            modal2.classList.add('active')
                            closeBtn2.addEventListener('click', () => {
                                modal2.classList.remove('active')
                            })
                            cancelAgain2.addEventListener('click', () => {
                                modal2.classList.remove('active')
                            })
                            tryAgain2.addEventListener('click', () => {
                                signOut(auth).then(() => {
                                    location.href = "/index.html"
                                }).catch((error) => {
                                });
                            })
                            window.addEventListener('click', event => {
                                if (event.target == modal2) {
                                    modal2.classList.remove('active')
                                }
                            })
                        })

                    } else {
                        const tryAgain = document.getElementById('okBtn')
                        const modal = document.querySelector('.modal')
                        const textModal = document.querySelector('.textModal')

                        textModal.textContent = "Acceso no autorizado a esta página"
                        modal.classList.add('active')
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

        textModal.textContent = "No has iniciado sesión de manera correcta"
        modal.classList.add('active')
        tryAgain.addEventListener('click', () => {
            location.href = "/views/login/login.html"
        })
    }
});