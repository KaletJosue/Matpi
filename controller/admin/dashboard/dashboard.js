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

        // quitar gastos

        const today = new Date();
        const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

        if (today.getDate() === lastDayOfMonth.getDate()) {
            getDocs(collection(db, "Gastos", "GastosUID", "Private_Gastos"))
                .then((querySnapshot) => {
                    querySnapshot.forEach((docSnapshot) => {
                        const docRef = doc(db, "Gastos", "GastosUID", "Private_Gastos", docSnapshot.id);

                        deleteDoc(docRef)
                            .then(() => {
                                console.log(`Documento con ID ${docSnapshot.id} eliminado correctamente.`);
                            })
                            .catch((error) => {
                                console.error("Error al eliminar el documento:", error);
                            });
                    });
                })
                .catch((error) => {
                    console.error("Error al obtener los documentos:", error);
                });
        }

        // circular progress

        onAuthStateChanged(auth, (user) => {
            if (user) {
                const uid = user.uid;

                getDocs(collection(db, "Gastos", "GastosUID", "Private_Gastos"))
                    .then((querySnapshot) => {
                        var ingresosTotales = 10000000;
                        var ingresosActuales = 7000000;
                        var gastos = 0;

                        querySnapshot.forEach((doc) => {
                            gastos += parseInt(doc.data().Valor);
                        });

                        var ganancias = ingresosActuales - gastos;
                        var formato = new Intl.NumberFormat('es-ES');

                        document.querySelector('.valor_ingresos').textContent = formato.format(ingresosActuales);
                        document.querySelector('.valor_gastos').textContent = formato.format(gastos);
                        document.querySelector('.valor_ganancias').textContent = formato.format(ganancias);

                        var porcentajeIngresos = parseInt((ingresosActuales / ingresosTotales) * 100);
                        var porcentajeGastos = parseInt((gastos / ingresosActuales) * 100);
                        var porcentajeGanancias = parseInt((ganancias / ingresosActuales) * 100);

                        let circularProgress = document.querySelector('.circular_progress');
                        let progressValue = document.querySelector('.progress_value');

                        let circularProgress2 = document.querySelector('.circular_progress2');
                        let progressValue2 = document.querySelector('.progress_value2');

                        let circularProgress3 = document.querySelector('.circular_progress3');
                        let progressValue3 = document.querySelector('.progress_value3');

                        let start = 0;
                        let start2 = 0;
                        let start3 = 0;

                        let end = porcentajeIngresos > 0 ? porcentajeIngresos : 1;
                        let end2 = porcentajeGastos > 0 ? porcentajeGastos : 1;
                        let end3 = porcentajeGanancias > 0 ? porcentajeGanancias : 1;

                        let speed = 15;

                        let progress = setInterval(() => {
                            start++;

                            progressValue.textContent = porcentajeIngresos <= 0 ? `0%` : `${start}%`;
                            circularProgress.style.background = `conic-gradient(#ff8730, ${start * 3.6}deg, var(--color-gray-white) 0deg)`;

                            if (start == end) {
                                clearInterval(progress);
                            }
                        }, speed);

                        let progress2 = setInterval(() => {
                            start2++;

                            progressValue2.textContent = porcentajeGastos <= 0 ? `0%` : `${start2}%`;
                            circularProgress2.style.background = `conic-gradient(#b330ff, ${start2 * 3.6}deg, var(--color-gray-white) 0deg)`;

                            if (start2 == end2) {
                                clearInterval(progress2);
                            }
                        }, speed);

                        let progress3 = setInterval(() => {
                            start3++;

                            progressValue3.textContent = porcentajeGanancias <= 0 ? `0%` : `${start3}%`;
                            circularProgress3.style.background = `conic-gradient(#00bf59, ${start3 * 3.6}deg, var(--color-gray-white) 0deg)`;

                            if (start3 == end3) {
                                clearInterval(progress3);
                            }
                        }, speed);
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

        // Add Reminders

        onAuthStateChanged(auth, (user) => {
            if (user) {
                const uid = user.uid;

                flatpickr(".start_reminder", {
                    enableTime: true,
                    noCalendar: true,
                    dateFormat: "H:i",
                    time_24hr: true,
                });

                flatpickr(".end_reminder", {
                    enableTime: true,
                    noCalendar: true,
                    dateFormat: "H:i",
                    time_24hr: true,
                });

                var btnAdd = document.querySelector('.bottom_reminders')
                var modalReminder = document.querySelector('.modal_reminder')
                var closeModal = document.querySelector('#closeModal')

                btnAdd.addEventListener('click', () => {
                    modalReminder.classList.toggle('active')
                })
                window.addEventListener('click', event => {
                    if (event.target == modalReminder) {
                        modalReminder.classList.remove('active')
                    }
                })
                closeModal.addEventListener('click', () => {
                    modalReminder.classList.remove('active')
                })

                const closeBtn3 = document.querySelector('.closeIcon3')
                const tryAgain3 = document.getElementById('okBtn3')
                const modal3 = document.querySelector('.modal3')
                const textModal3 = document.querySelector('.text_modal3')

                const closeBtn4 = document.querySelector('.closeIcon4')
                const tryAgain4 = document.getElementById('okBtn4')
                const modal4 = document.querySelector('.modal4')

                var add = document.querySelector('.add')
                var name = document.querySelector('.name_reminder')
                var start = document.querySelector('.start_reminder')
                var end = document.querySelector('.end_reminder')

                add.addEventListener('click', () => {
                    const colores = ['#FF5733', '#33FF57', '#3357FF', '#FF33A1', '#FFC300', '#581845'];

                    const indiceAleatorio = Math.floor(Math.random() * colores.length);
                    const colorAleatorio = colores[indiceAleatorio];

                    onAuthStateChanged(auth, (user) => {
                        if (user) {
                            const uid = user.uid;

                            if (name.value.length != 0) {
                                if (start.value.length != 0) {
                                    if (end.value.length != 0) {

                                        var band = false

                                        getDocs(collection(db, "Reminders", user.uid, "Private_Reminder"))
                                            .then((querySnapshot) => {
                                                querySnapshot.forEach((doc) => {
                                                    if (name.value.toLowerCase() == doc.data().Nombre.toLowerCase()) {
                                                        band = true
                                                    }
                                                })
                                            }).then(() => {

                                                if (band == false) {
                                                    addDoc(collection(db, "Reminders", user.uid, "Private_Reminder"), {
                                                        Nombre: name.value,
                                                        Inicio: start.value,
                                                        Final: end.value,
                                                        Color: colorAleatorio,
                                                    }).then(() => {
                                                        modal4.classList.add('active')
                                                        closeBtn4.addEventListener('click', () => {
                                                            modal4.classList.remove('active')
                                                            location.reload()
                                                        })
                                                        tryAgain4.addEventListener('click', () => {
                                                            modal4.classList.remove('active')
                                                            location.reload()
                                                        })
                                                        window.addEventListener('click', event => {
                                                            if (event.target == modal4) {
                                                                modal4.classList.remove('active')
                                                                location.reload()
                                                            }
                                                        })
                                                        modalReminder.classList.remove('active')
                                                    }).catch(() => {
                                                        modal3.classList.add('active')
                                                        textModal3.textContent = "No pudimos agregar el recordatorio"
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
                                                    textModal3.textContent = "Este recordatorio ya esta agregado"
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
                                        modal3.classList.add('active')
                                        textModal3.textContent = "Debes ingresar la hora final"
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
                                    textModal3.textContent = "Debes ingresar la hora de inicio"
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

                        } else {
                            const tryAgain = document.getElementById('okBtn')
                            const modal = document.querySelector('.modal')

                            modal.classList.add('active')
                            tryAgain.addEventListener('click', () => {
                                location.href = "/views/login/login.html"
                            })
                        }
                    });
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

        // See Reminders

        onAuthStateChanged(auth, (user) => {
            if (user) {
                const uid = user.uid;

                getDocs(collection(db, "Reminders", user.uid, "Private_Reminder")).
                    then((querySnapshot) => {
                        querySnapshot.forEach((doc) => {

                            var container = document.querySelector('.center_reminders')
                            var reminder = document.createElement('div')
                            var leftReminder = document.createElement('div')
                            var bell = document.createElement('i')
                            var textReminder = document.createElement('div')
                            var name = document.createElement('h3')
                            var hora = document.createElement('p')
                            var iconMenu = document.createElement('i')
                            var deleteReminder = document.querySelector('.deleteReminder')
                            var spanDelete = document.querySelector('.content_deleteReminder span')
                            var btnDelete = document.querySelector('.btnDelete')

                            reminder.className = "reminder"
                            leftReminder.className = "left_reminder"

                            bell.style.background = doc.data().Color

                            bell.className = "fa-solid fa-bell"
                            name.textContent = doc.data().Nombre
                            hora.textContent = `${doc.data().Inicio} - ${doc.data().Final}`
                            iconMenu.className = "fa-solid fa-ellipsis-vertical"
                            iconMenu.style.cursor = "pointer"
                            iconMenu.style.color = "var(--color-black)"

                            container.appendChild(reminder)
                            reminder.appendChild(leftReminder)
                            reminder.appendChild(iconMenu)
                            leftReminder.appendChild(bell)
                            leftReminder.appendChild(textReminder)
                            textReminder.appendChild(name)
                            textReminder.appendChild(hora)

                            iconMenu.addEventListener('click', () => {
                                deleteReminder.classList.add('active')
                                spanDelete.addEventListener('click', () => {
                                    deleteReminder.classList.remove('active')
                                })
                                window.addEventListener('click', event => {
                                    if (event.target == deleteReminder) {
                                        deleteReminder.classList.remove('active')
                                    }
                                })

                                var h1Delete = document.querySelector('.content_deleteReminder h1')
                                var pDelete = document.querySelector('.content_deleteReminder p')

                                h1Delete.textContent = doc.data().Nombre
                                pDelete.textContent = `${doc.data().Inicio} - ${doc.data().Final}`

                                btnDelete.addEventListener('click', () => {
                                    const docRef = doc.ref

                                    const closeBtn5 = document.querySelector('.closeIcon5')
                                    const tryAgain5 = document.getElementById('okBtn5')
                                    const modal5 = document.querySelector('.modal5')

                                    deleteDoc(docRef).
                                        then(() => {
                                            modal5.classList.add('active')
                                            closeBtn5.addEventListener('click', () => {
                                                modal5.classList.remove('active')
                                                location.reload()
                                            })
                                            tryAgain5.addEventListener('click', () => {
                                                modal5.classList.remove('active')
                                                location.reload()
                                            })
                                            window.addEventListener('click', event => {
                                                if (event.target == modal5) {
                                                    modal5.classList.remove('active')
                                                    location.reload()
                                                }
                                            })
                                        }).catch(() => {
                                            console.log("Error al eliminar")
                                        })
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