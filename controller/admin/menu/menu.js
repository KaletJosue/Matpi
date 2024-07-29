import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-auth.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-analytics.js";
import { getFirestore, collection, addDoc, setDoc, doc, getDocs, where, getDoc, query, deleteDoc, updateDoc } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-firestore.js";

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

        // btns section and food
        const section = document.querySelector('.left')
        const food = document.querySelector('.right')

        const tablesection = document.getElementById('tablesection')
        const tablefood = document.getElementById('tablealiments')

        const btnplus = document.getElementById('plus')

        const modal3 = document.querySelector('.modal3')
        const closeBtn3 = document.querySelector('.closeIcon3')
        const tryAgain3 = document.getElementById('okBtn3')

        const modal4 = document.querySelector('.modal4')
        const closeBtn4 = document.querySelector('.closeIcon4')
        const tryAgain4 = document.getElementById('okBtn4')
        const modal4txt = document.querySelector('.txt4')

        const modal5 = document.querySelector('.modal5')
        const closeBtn5 = document.querySelector('.closeIcon5')
        const tryAgain5 = document.getElementById('okBtn5')
        const modal5txt = document.querySelector('.txt5')

        const modal7 = document.querySelector('.modal7')
        const closeBtn7 = document.querySelector('.closeIcon7')
        const tryAgain7 = document.getElementById('okBtn7')

        tablesection.style.display = ''
        tablefood.style.display = 'none'

        // Add section
        btnplus.addEventListener('click', () => {
            modal3.classList.add('active')
            closeBtn3.addEventListener('click', () => {
                modal3.classList.remove('active')
            })
            tryAgain3.addEventListener('click', () => {
                onAuthStateChanged(auth, (user) => {
                    if (user) {
                        const uid = user.uid;

                        var inputsection = document.getElementById('inputsection').value
                        var inputsectioid = document.getElementById('inputsectionid').value
                        var band = false
                        var band2 = false

                        let today = new Date();
                        let day = String(today.getDate()).padStart(2, '0');
                        let month = String(today.getMonth() + 1).padStart(2, '0');
                        let year = String(today.getFullYear()).slice(-2);
                        let formattedDate = `${day}/${month}/${year}`;

                        if (inputsection.length != 0) {
                            if (inputsectioid.length != 0) {
                                getDocs(collection(db, "Section", "idSection", "Data_Documents")).
                                    then((querySnapshot) => {
                                        querySnapshot.forEach((doc) => {
                                            if (inputsection == doc.data().Nombre) {
                                                band = true
                                            }

                                            if (inputsectioid == doc.data().Id) {
                                                band2 = true
                                            }
                                        })
                                    }).then(() => {

                                        if (band2 == true) {
                                            modal4txt.textContent = `La seccion con el id (${inputsectioid}) ya esta registrado prueba otro Id`
                                            modal4.classList.add('active')
                                            closeBtn4.addEventListener('click', () => {
                                                modal4.classList.remove('active')
                                            })
                                            tryAgain4.addEventListener('click', () => {
                                                modal4.classList.remove('active')
                                            })
                                            window.addEventListener('click', event => {
                                                if (event.target == modal4) {
                                                    modal4.classList.remove('active')
                                                }
                                            })
                                        } else {
                                            if (band == true) {
                                                modal4txt.textContent = `La seccion con el nombre (${inputsection}) ya esta registrada prueba otro nombre`
                                                modal4.classList.add('active')
                                                closeBtn4.addEventListener('click', () => {
                                                    modal4.classList.remove('active')
                                                })
                                                tryAgain4.addEventListener('click', () => {
                                                    modal4.classList.remove('active')
                                                })
                                                window.addEventListener('click', event => {
                                                    if (event.target == modal4) {
                                                        modal4.classList.remove('active')
                                                    }
                                                })
                                            } else {

                                                onAuthStateChanged(auth, (user) => {
                                                    if (user) {
                                                        const uid = user.uid;

                                                        addDoc(collection(db, "Section", "idSection", "Data_Documents"), {
                                                            Nombre: inputsection,
                                                            Fecha: formattedDate,
                                                            Id: inputsectioid,
                                                        })
                                                        modal3.classList.remove('active')
                                                        modal5txt.textContent = `La seccion con el nombre (${inputsection}) ya quedo registrada`
                                                        modal5.classList.add('active')
                                                        closeBtn5.addEventListener('click', () => {
                                                            modal5.classList.remove('active')
                                                        })
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

                                            }
                                        }
                                    })
                            } else {
                                modal4txt.textContent = "Debes agregar un id para la seccion"
                                modal4.classList.add('active')
                                closeBtn4.addEventListener('click', () => {
                                    modal4.classList.remove('active')
                                })
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
                            modal4txt.textContent = "Debes agregar un nombre para la seccion"
                            modal4.classList.add('active')
                            closeBtn4.addEventListener('click', () => {
                                modal4.classList.remove('active')
                            })
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
                        const tryAgain = document.getElementById('okBtn')
                        const modal = document.querySelector('.modal')

                        modal.classList.add('active')
                        tryAgain.addEventListener('click', () => {
                            location.href = "/views/login/login.html"
                        })
                    }
                });
            })
            window.addEventListener('click', event => {
                if (event.target == modal3) {
                    modal3.classList.remove('active')
                }
            })
        })

        section.addEventListener('click', () => {
            section.classList.add('active')
            food.classList.remove('active')

            btnplus.style.background = "#f65656"
            btnplus.style.color = "#fff"

            tablesection.style.display = ''
            tablefood.style.display = 'none'

            // Add section
            btnplus.addEventListener('click', () => {
                modal3.classList.add('active')
                closeBtn3.addEventListener('click', () => {
                    modal3.classList.remove('active')
                })
                tryAgain3.addEventListener('click', () => {
                    onAuthStateChanged(auth, (user) => {
                        if (user) {
                            const uid = user.uid;

                            var inputsection = document.getElementById('inputsection').value
                            var inputsectioid = document.getElementById('inputsectionid').value
                            var band = false
                            var band2 = false

                            let today = new Date();
                            let day = String(today.getDate()).padStart(2, '0');
                            let month = String(today.getMonth() + 1).padStart(2, '0');
                            let year = String(today.getFullYear()).slice(-2);
                            let formattedDate = `${day}/${month}/${year}`;

                            if (inputsection.length != 0) {
                                if (inputsectioid.length != 0) {
                                    getDocs(collection(db, "Section", "idSection", "Data_Documents")).
                                        then((querySnapshot) => {
                                            querySnapshot.forEach((doc) => {
                                                if (inputsection == doc.data().Nombre) {
                                                    band = true
                                                }

                                                if (inputsectioid == doc.data().Id) {
                                                    band2 = true
                                                }
                                            })
                                        }).then(() => {

                                            if (band2 == true) {
                                                modal4txt.textContent = `La seccion con el id (${inputsectioid}) ya esta registrado prueba otro Id`
                                                modal4.classList.add('active')
                                                closeBtn4.addEventListener('click', () => {
                                                    modal4.classList.remove('active')
                                                })
                                                tryAgain4.addEventListener('click', () => {
                                                    modal4.classList.remove('active')
                                                })
                                                window.addEventListener('click', event => {
                                                    if (event.target == modal4) {
                                                        modal4.classList.remove('active')
                                                    }
                                                })
                                            } else {
                                                if (band == true) {
                                                    modal4txt.textContent = `La seccion con el nombre (${inputsection}) ya esta registrada prueba otro nombre`
                                                    modal4.classList.add('active')
                                                    closeBtn4.addEventListener('click', () => {
                                                        modal4.classList.remove('active')
                                                    })
                                                    tryAgain4.addEventListener('click', () => {
                                                        modal4.classList.remove('active')
                                                    })
                                                    window.addEventListener('click', event => {
                                                        if (event.target == modal4) {
                                                            modal4.classList.remove('active')
                                                        }
                                                    })
                                                } else {

                                                    onAuthStateChanged(auth, (user) => {
                                                        if (user) {
                                                            const uid = user.uid;

                                                            addDoc(collection(db, "Section", "idSection", "Data_Documents"), {
                                                                Nombre: inputsection,
                                                                Fecha: formattedDate,
                                                                Id: inputsectioid,
                                                            })
                                                            modal3.classList.remove('active')
                                                            modal5txt.textContent = `La seccion con el nombre (${inputsection}) ya quedo registrada`
                                                            modal5.classList.add('active')
                                                            closeBtn5.addEventListener('click', () => {
                                                                modal5.classList.remove('active')
                                                            })
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

                                                }
                                            }
                                        })
                                } else {
                                    modal4txt.textContent = "Debes agregar un id para la seccion"
                                    modal4.classList.add('active')
                                    closeBtn4.addEventListener('click', () => {
                                        modal4.classList.remove('active')
                                    })
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
                                modal4txt.textContent = "Debes agregar un nombre para la seccion"
                                modal4.classList.add('active')
                                closeBtn4.addEventListener('click', () => {
                                    modal4.classList.remove('active')
                                })
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
                            const tryAgain = document.getElementById('okBtn')
                            const modal = document.querySelector('.modal')

                            modal.classList.add('active')
                            tryAgain.addEventListener('click', () => {
                                location.href = "/views/login/login.html"
                            })
                        }
                    });
                })
                window.addEventListener('click', event => {
                    if (event.target == modal3) {
                        modal3.classList.remove('active')
                    }
                })
            })
        })

        food.addEventListener('click', () => {
            food.classList.add('active')
            section.classList.remove('active')

            btnplus.style.background = "#f69156"
            btnplus.style.color = "#fff"

            tablesection.style.display = 'none'
            tablefood.style.display = ''
        })

        const closeBtn6 = document.querySelector('.closeIcon6')
        const tryAgain6 = document.getElementById('okBtn6')
        const cancelAgain6 = document.getElementById('cancelBtn6')
        const modal6 = document.querySelector('.modal6')
        const txt6 = document.querySelector('.txt6')

        // See Sections
        var all = document.querySelector('.bodysection')
        var inputeditsecion = document.getElementById('ineditsection')

        getDocs(collection(db, "Section", "idSection", "Data_Documents")).
            then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    var tr = document.createElement('tr')
                    var th1 = document.createElement('th')
                    var th2 = document.createElement('th')
                    var th3 = document.createElement('th')
                    var th4 = document.createElement('th')
                    var div = document.createElement('div')
                    var btn1 = document.createElement('button')
                    var btn2 = document.createElement('button')

                    all.appendChild(tr)
                    tr.appendChild(th1)
                    tr.appendChild(th2)
                    tr.appendChild(th3)
                    tr.appendChild(th4)
                    th4.appendChild(div)
                    div.appendChild(btn1)
                    div.appendChild(btn2)

                    th1.textContent = doc.data().Id
                    th2.textContent = doc.data().Nombre
                    th3.textContent = doc.data().Fecha
                    btn1.textContent = "Editar"
                    btn2.textContent = "Eliminar"

                    // Delete Sections
                    btn2.addEventListener('click', async function () {
                        try {

                            const querySnapshot = await getDocs(collection(db, "Section", "idSection", "Data_Documents"))
                            querySnapshot.forEach(async (doc) => {
                                if (doc.data().Nombre == th2.textContent && doc.data().Id == th1.textContent) {
                                    txt6.textContent = `Seguro que quieres eliminar el recordatorio de nombre ( ${th2.textContent} )`
                                    modal6.classList.add('active')
                                    closeBtn6.addEventListener('click', () => {
                                        modal6.classList.remove('active')
                                    })
                                    cancelAgain6.addEventListener('click', () => {
                                        modal6.classList.remove('active')
                                    })
                                    tryAgain6.addEventListener('click', async function () {

                                        await deleteDoc(doc.ref)

                                        modal6.classList.remove('active')
                                        modal5txt.textContent = `La seccion con el nombre (${th2.textContent}) ya fue eliminada`
                                        modal5.classList.add('active')
                                        closeBtn5.addEventListener('click', () => {
                                            modal5.classList.remove('active')
                                        })
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
