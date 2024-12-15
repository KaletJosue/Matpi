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

        // name, rol and img

        onAuthStateChanged(auth, (user) => {
            if (user) {
                const uid = user.uid;

                var rol = document.querySelector('.rol')
                var name = document.querySelector('.name_user')

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

                modal.classList.add('active')
                tryAgain.addEventListener('click', () => {
                    location.href = "/views/login/login.html"
                })
            }
        });

        // Add Gasto

        onAuthStateChanged(auth, (user) => {
            if (user) {
                const uid = user.uid;

                var btnGasto = document.querySelector('#addGasto')
                var modalGasto = document.querySelector('.modal_pago')
                var spanPago = document.querySelector('.con_pago span')

                btnGasto.addEventListener('click', () => {
                    modalGasto.classList.add('active')
                })
                spanPago.addEventListener('click', () => {
                    modalGasto.classList.remove('active')
                })
                window.addEventListener('click', event => {
                    if (event.target == modalGasto) {
                        modalGasto.classList.remove('active')
                    }
                })

                onAuthStateChanged(auth, (user) => {
                    if (user) {
                        const uid = user.uid;

                        const closeBtn3 = document.querySelector('.closeIcon3')
                        const tryAgain3 = document.getElementById('okBtn3')
                        const modal3 = document.querySelector('.modal3')
                        const textModal3 = document.querySelector('.text_modal3')

                        var nameGasto = document.querySelector('.nameGasto')
                        var valorGasto = document.querySelector('.valorGasto')
                        var metodoGasto = document.querySelector('.metodoGasto')
                        var addGasto = document.querySelector('.addGasto')

                        addGasto.addEventListener('click', () => {
                            if (nameGasto.value.length != 0) {
                                if (valorGasto.value.length != 0) {
                                    if (metodoGasto.value.length != 0) {
                                        if (metodoGasto.value.toLowerCase() == "nequi" || metodoGasto.value.toLowerCase() == "daviplata" || metodoGasto.value.toLowerCase() == "targetas" || metodoGasto.value.toLowerCase() == "efectivo") {

                                            addDoc(collection(db, "Gastos", "GastosUID", "Private_Gastos"), {
                                                Nombre: nameGasto.value,
                                                Valor: valorGasto.value,
                                                Metodo: metodoGasto.value.toLowerCase(),
                                            }).then(() => {
                                                location.reload()
                                            }).catch(() => {
                                                modal3.classList.add('active')
                                                textModal3.textContent = "No pudimos agregar el gasto"
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
                                            });

                                        } else {
                                            modal3.classList.add('active')
                                            textModal3.textContent = "En el metodo de pago solo puedes ingresar: Nequi, Daviplata, Targetas o Efectivo"
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
                                    } else {
                                        modal3.classList.add('active')
                                        textModal3.textContent = "Debes ingresar el metodo de pago"
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
                                } else {
                                    modal3.classList.add('active')
                                    textModal3.textContent = "Debes ingresar el valor"
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
                            } else {
                                modal3.classList.add('active')
                                textModal3.textContent = "Debes ingresar el nombre"
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

                    } else {
                        const tryAgain = document.getElementById('okBtn')
                        const modal = document.querySelector('.modal')

                        modal.classList.add('active')
                        tryAgain.addEventListener('click', () => {
                            location.href = "/views/login/login.html"
                        })
                    }
                });

            } else {
                const tryAgain = document.getElementById('okBtn')
                const modal = document.querySelector('.modal')

                modal.classList.add('active')
                tryAgain.addEventListener('click', () => {
                    location.href = "/views/login/login.html"
                })
            }
        });

        // See Gastos

        onAuthStateChanged(auth, (user) => {
            if (user) {
                const uid = user.uid;

                var valorTotal = 0

                getDocs(collection(db, "Gastos", "GastosUID", "Private_Gastos")).
                    then((querySnapshot) => {
                        querySnapshot.forEach((doc) => {

                            var container = document.querySelector('.con_gastos')
                            var gasto = document.createElement('div')
                            var i = document.createElement('i')
                            var textGasto = document.createElement('div')
                            var name = document.createElement('h3')
                            var valor = document.createElement('h2')

                            gasto.className = "gasto"

                            if (doc.data().Metodo == "efectivo") {
                                i.className = 'ph-fill ph-money-wavy'
                                i.style.backgroundColor = "#00bf58"
                            } else if (doc.data().Metodo == "targetas") {
                                i.className = 'ph-fill ph-credit-card'
                                i.style.backgroundColor = "#b330ff"
                            } else if (doc.data().Metodo == "nequi") {
                                i.className = 'ph-fill ph-devices'
                                i.style.backgroundColor = "#fe8631"
                            } else if (doc.data().Metodo == "daviplata") {
                                i.className = 'ph-fill ph-devices'
                                i.style.backgroundColor = "#fe8631"
                            }

                            textGasto.className = "text_gasto"

                            name.textContent = doc.data().Nombre
                            valor.textContent = `$${Number(doc.data().Valor).toLocaleString('es-ES')}`;

                            container.appendChild(gasto)
                            gasto.appendChild(i)
                            gasto.appendChild(textGasto)
                            textGasto.appendChild(name)
                            textGasto.appendChild(valor)

                            valorTotal += parseInt(doc.data().Valor)

                            var gastoTotal = document.querySelector('.gastoTotal')

                            gastoTotal.textContent = valorTotal.toLocaleString('es-ES')
                        })
                    })

            } else {
                const tryAgain = document.getElementById('okBtn')
                const modal = document.querySelector('.modal')

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

                getDocs(query(collection(db, "Users", user.uid, "Private_Data"), where("Id", "==", user.uid))).
                    then((querySnapshot) => {
                        querySnapshot.forEach((doc2) => {
                            getDoc(doc(db, "Users", user.uid, "Private_Data", doc2.data().DarkMode)).
                                then((docSnap) => {
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
                    })

                palanca.addEventListener('click', () => {
                    getDocs(query(collection(db, "Users", user.uid, "Private_Data"), where("Id", "==", user.uid))).
                        then((querySnapshot) => {
                            querySnapshot.forEach((doc2) => {
                                getDoc(doc(db, "Users", user.uid, "Private_Data", doc2.data().DarkMode)).
                                    then((docSnap) => {
                                        if (doc2.data().DarkMode == "desactive") {
                                            getDocs(collection(db, "Users", user.uid, "Private_Data"))
                                                .then((querySnapshot) => {
                                                    querySnapshot.forEach((doc) => {
                                                        updateDoc(doc.ref, {
                                                            DarkMode: 'active'
                                                        })
                                                    })
                                                })
                                        }
                                        else if (doc2.data().DarkMode == "active") {
                                            getDocs(collection(db, "Users", user.uid, "Private_Data"))
                                                .then((querySnapshot) => {
                                                    querySnapshot.forEach((doc) => {
                                                        updateDoc(doc.ref, {
                                                            DarkMode: 'desactive'
                                                        })
                                                    })
                                                })
                                        }
                                        else {
                                            getDocs(collection(db, "Users", user.uid, "Private_Data"))
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
                })

            } else {
                const tryAgain = document.getElementById('okBtn')
                const modal = document.querySelector('.modal')

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

        modal.classList.add('active')
        tryAgain.addEventListener('click', () => {
            location.href = "/views/login/login.html"
        })
    }
});