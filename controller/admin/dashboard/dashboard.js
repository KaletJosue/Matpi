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

        // btnaccount
        var btnaccount = document.querySelector('.btnacount')
        var imgaccount = document.querySelector('.imghead')

        btnaccount.addEventListener('click', () => {
            location.href = '/views/admin/profile/profile.html'
        })

        imgaccount.addEventListener('click', () => {
            location.href = '/views/admin/profile/profile.html'
        })

        // sidebar.active
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

        // name and rol
        onAuthStateChanged(auth, (user) => {
            if (user) {
                const uid = user.uid;

                getDocs(query(collection(db, "Users", user.uid, "Private_Data"), where("Id", "==", user.uid))).
                    then((querySnapshot) => {
                        querySnapshot.forEach((doc2) => {
                            const name = document.querySelector('.namehead')
                            const rol = document.querySelector('.rol')

                            const imghead = document.querySelector('.imghead')

                            var cadena = doc2.data().Nombre
                            var palabras = cadena.split(" ")

                            var dosPrimerasPalabras = palabras.slice(0, 2).join(' ')

                            name.textContent = dosPrimerasPalabras
                            rol.textContent = doc2.data().Rol

                            if (doc2.data().URL == "") {
                                imghead.src = "/assets/profile-5.jpg"
                            } else {
                                imghead.src = doc2.data().URL
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

        // circularProgress

        onAuthStateChanged(auth, (user) => {
            if (user) {
                const uid = user.uid;

                let circularProgress = document.querySelector('.circular-progress'),
                    progressValue = document.querySelector('.progress-value')

                let progressStartValue = 0,
                    progressEndValue = 90,
                    speed = 15

                let progress = setInterval(() => {
                    progressStartValue++;

                    progressValue.textContent = `${progressStartValue}%`
                    circularProgress.style.background = `conic-gradient(#fe9516 ${progressStartValue * 3.6}deg, var(--color-fondo) 0deg`

                    if (progressStartValue == progressEndValue) {
                        clearInterval(progress)
                    }
                }, speed)

                let circularProgress2 = document.querySelector('.circular-progress2'),
                    progressValue2 = document.querySelector('.progress-value2')

                let progressStartValue2 = 0,
                    progressEndValue2 = 60,
                    speed2 = 15

                let progress2 = setInterval(() => {
                    progressStartValue2++;

                    progressValue2.textContent = `${progressStartValue2}%`
                    circularProgress2.style.background = `conic-gradient(#0085ae ${progressStartValue2 * 3.6}deg, var(--color-fondo) 0deg`

                    if (progressStartValue2 == progressEndValue2) {
                        clearInterval(progress2)
                    }
                }, speed2)

                let circularProgress3 = document.querySelector('.circular-progress3'),
                    progressValue3 = document.querySelector('.progress-value3')

                let progressStartValue3 = 0,
                    progressEndValue3 = 20,
                    speed3 = 15

                let progress3 = setInterval(() => {
                    progressStartValue3++;

                    progressValue3.textContent = `${progressStartValue3}%`
                    circularProgress3.style.background = `conic-gradient(#fe4c16 ${progressStartValue3 * 3.6}deg, var(--color-fondo) 0deg`

                    if (progressStartValue3 == progressEndValue3) {
                        clearInterval(progress3)
                    }
                }, speed3)

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
                    // An error happened.
                });
            })
            window.addEventListener('click', event => {
                if (event.target == modal2) {
                    modal2.classList.remove('active')
                }
            })
        })

        // Add Reminders
        const closeBtn3 = document.querySelector('.closeIcon3')
        const tryAgain3 = document.getElementById('okBtn3')
        const modal3 = document.querySelector('.modal3')

        const tryAgain4 = document.getElementById('okBtn4')
        const modal4 = document.querySelector('.modal4')
        const text4 = document.querySelector('.text4')

        const tryAgain5 = document.getElementById('okBtn5')
        const modal5 = document.querySelector('.modal5')
        const text5 = document.querySelector('.text5')

        const tryAgain6 = document.getElementById('okBtn6')
        const cancel6 = document.getElementById('okBtnNone6')
        const modal6 = document.querySelector('.modal6')
        const text6 = document.querySelector('.text6')

        var addreminder = document.querySelector('.addreminder')
        let hourreminder = '';

        flatpickr("#timepicker", {
            enableTime: true,
            noCalendar: true,
            dateFormat: "H:i K",
            time_24hr: false,
            onClose: function (selectedDates, dateStr, instance) {
                hourreminder = dateStr;
            }
        });

        const pickr = Pickr.create({
            el: '#color-picker',
            theme: 'classic',
            default: 'null',

            swatches: [
                'rgba(244, 67, 54, 1)',
                'rgba(233, 30, 99, 1)',
                'rgba(156, 39, 176, 1)',
                'rgba(103, 58, 183, 1)',
                'rgba(63, 81, 181, 1)',
                'rgba(33, 150, 243, 1)',
                'rgba(3, 169, 244, 1)',
                'rgba(0, 188, 212, 1)',
                'rgba(0, 150, 136, 1)',
                'rgba(76, 175, 80, 1)',
                'rgba(139, 195, 74, 1)',
                'rgba(205, 220, 57, 1)',
                'rgba(255, 235, 59, 1)',
                'rgba(255, 193, 7, 1)'
            ],

            components: {

                // Main components
                preview: true,
                opacity: false,
                hue: true,

                // Input / output Options
                interaction: {
                    hex: true,
                    rgba: true,
                    hsla: true,
                    hsva: true,
                    cmyk: true,
                    input: true,
                    clear: true,
                    save: true
                }
            }
        });

        function formatState(state) {
            if (!state.id) {
                return state.text;
            }
            var icon = $(state.element).data('icon');
            if (icon) {
                var $state = $(
                    '<span><i class="' + icon + '"></i> ' + state.text + '</span>'
                );
                return $state;
            }
            return state.text;
        }

        $(document).ready(function () {
            $('#opciones').select2({
                templateResult: formatState,
                templateSelection: formatState,
                minimumResultsForSearch: Infinity
            });
        });

        const now = new Date();
        let hours = now.getHours();
        const minutes = now.getMinutes();
        
        const minutesStr = minutes < 10 ? '0' + minutes : minutes;
        const hoursStr = hours < 10 ? '0' + hours : hours;

        addreminder.addEventListener('click', () => {
            modal3.classList.add('active')
            closeBtn3.addEventListener('click', () => {
                modal3.classList.remove('active')
            })
            tryAgain3.addEventListener('click', () => {

                // variables
                var namereminder
                namereminder = document.getElementById('name_reminder').value
                var iconreminder = $('.select2').val()
                var colorreminder = pickr.getColor().toHEXA().toString()
                const formattedTime = `${hoursStr}:${minutesStr}`;

                if (namereminder.length != 0) {
                    if (namereminder.length < 36) {
                        if (hourreminder.length != 0) {
                            if (iconreminder != 0) {

                                onAuthStateChanged(auth, (user) => {
                                    if (user) {
                                        const uid = user.uid;

                                        addDoc(collection(db, "Users", user.uid, "Data_Reminder"), {
                                            Nombre: namereminder,
                                            Hora_Inicial: formattedTime,
                                            Hora_Final: hourreminder,
                                            Icon: iconreminder,
                                            Color: colorreminder,
                                            IdUser: user.uid,
                                        })

                                        modal3.classList.remove('active')
                                        text5.textContent = 'El recordatorio con nombre ' + '( ' + namereminder + ' )' + ' se agrego correctamente'
                                        modal5.classList.add('active')
                                        tryAgain5.addEventListener('click', () => {
                                            modal5.classList.remove('active')
                                            setTimeout(function () {
                                                location.reload();
                                            }, 1000)
                                        })
                                        window.addEventListener('click', event => {
                                            if (event.target == modal5) {
                                                modal5.classList.remove('active')
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
                                text4.textContent = "Selecciona un icono para este recordatorio"
                                modal4.classList.add('active')
                                tryAgain4.addEventListener('click', () => {
                                    modal4.classList.remove('active')
                                })
                                window.addEventListener('click', event => {
                                    if (event.target == modal4) {
                                        modal4.classList.remove('active')
                                    }
                                })
                            }
                        } else {
                            text4.textContent = "Digita la hora a la que finalizara este recordatorio"
                            modal4.classList.add('active')
                            tryAgain4.addEventListener('click', () => {
                                modal4.classList.remove('active')
                            })
                            window.addEventListener('click', event => {
                                if (event.target == modal4) {
                                    modal4.classList.remove('active')
                                }
                            })
                        }
                    } else {
                        text4.textContent = "El nombre del recordatorio es demasiado largo"
                        modal4.classList.add('active')
                        tryAgain4.addEventListener('click', () => {
                            modal4.classList.remove('active')
                        })
                        window.addEventListener('click', event => {
                            if (event.target == modal4) {
                                modal4.classList.remove('active')
                            }
                        })
                    }
                } else {
                    text4.textContent = "Escribe un nombre para este recordatorio"
                    modal4.classList.add('active')
                    tryAgain4.addEventListener('click', () => {
                        modal4.classList.remove('active')
                    })
                    window.addEventListener('click', event => {
                        if (event.target == modal4) {
                            modal4.classList.remove('active')
                        }
                    })
                }

            })
            window.addEventListener('click', event => {
                if (event.target == modal3) {
                    modal3.classList.remove('active')
                }
            })
        })

        // See Reminders
        onAuthStateChanged(auth, (user) => {
            if (user) {
                const uid = user.uid;

                getDocs(query(collection(db, "Users", user.uid, "Data_Reminder"), where('IdUser', "==", user.uid))).
                    then((querySnapshot) => {
                        querySnapshot.forEach((doc2) => {
                            const contentreminder = document.querySelector('.contentreminders')
                            var reminder = document.createElement('div')
                            var leftreminder = document.createElement('div')
                            var i = document.createElement('i')
                            var textreminder = document.createElement('div')
                            var p = document.createElement('p')
                            var h3 = document.createElement('h3')
                            var rightreminder = document.createElement('div')
                            var i2 = document.createElement('i')
                            var deletereminder = document.createElement('p')

                            reminder.className = 'reminder'
                            leftreminder.className = 'leftreminder'
                            textreminder.className = 'textleftreminder'
                            rightreminder.className = 'rightreminder'
                            deletereminder.className = 'deletereminder'

                            if (doc2.data().Icon == 'opcion1') {
                                i.className = 'ph-fill ph-speaker-high'
                            } else if (doc2.data().Icon == 'opcion2') {
                                i.className = 'ph-fill ph-pencil-simple'
                            } if (doc2.data().Icon == 'opcion3') {
                                i.className = 'ph-fill ph-watch'
                            } else if (doc2.data().Icon == 'opcion4') {
                                i.className = 'ph-fill ph-folder-simple'
                            }

                            i.style.backgroundColor = doc2.data().Color

                            p.textContent = doc2.data().Nombre
                            h3.textContent = doc2.data().Hora_Inicial + ' - ' + doc2.data().Hora_Final
                            deletereminder.textContent = 'Eliminar'

                            i2.className = 'ri-more-2-fill'

                            contentreminder.appendChild(reminder)
                            reminder.appendChild(leftreminder)
                            reminder.appendChild(deletereminder)
                            leftreminder.appendChild(i)
                            leftreminder.appendChild(textreminder)
                            textreminder.appendChild(p)
                            textreminder.appendChild(h3)
                            reminder.appendChild(rightreminder)
                            rightreminder.appendChild(i2)

                            i2.addEventListener('click', () => {
                                reminder.classList.toggle('active')

                                onAuthStateChanged(auth, (user) => {
                                    if (user) {
                                        const uid = user.uid;

                                        // deleteReminder
                                        deletereminder.addEventListener('click', async function () {
                                            try {
                                                const querySnapshot = await getDocs(collection(db, "Users", user.uid, "Data_Reminder"))
                                                querySnapshot.forEach(async (doc) => {
                                                    if (doc.data().Nombre == p.textContent) {
                                                        modal6.classList.add('active')
                                                        text6.textContent = "Quires eliminar el recordatorio ( " + doc.data().Nombre + " )?" 
                                                        tryAgain6.addEventListener('click', async function () {
                                                            await deleteDoc(doc.ref)

                                                            modal6.classList.remove('active')
                                                            text5.textContent = 'El recordatorio con nombre ' + '( ' + doc.data().Nombre + ' )' + ' se elimino correctamente'
                                                            modal5.classList.add('active')
                                                            tryAgain5.addEventListener('click', () => {
                                                                modal5.classList.remove('active')
                                                                setTimeout(function () {
                                                                    location.reload();
                                                                }, 1)
                                                            })
                                                            window.addEventListener('click', event => {
                                                                if (event.target == modal5) {
                                                                    modal5.classList.remove('active')
                                                                }
                                                            })
                                                        })
                                                        cancel6.addEventListener('click', () => {
                                                            modal6.classList.remove('active')
                                                        })
                                                        window.addEventListener('click', event => {
                                                            if (event.target == modal6) {
                                                                modal6.classList.remove('active')
                                                            }
                                                        })
                                                    }
                                                })

                                            } catch (error) {

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

    } else {
        const tryAgain = document.getElementById('okBtn')
        const modal = document.querySelector('.modal')

        modal.classList.add('active')
        tryAgain.addEventListener('click', () => {
            location.href = "/views/login/login.html"
        })
    }
});
