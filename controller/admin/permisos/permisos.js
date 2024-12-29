import { getAuth, onAuthStateChanged, createUserWithEmailAndPassword, sendEmailVerification } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-auth.js";
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

                        // See Users
                        getDocs(query(collection(db, "Users", "IdUser", "Private_Data"))).
                            then(querySnapshot => {
                                querySnapshot.forEach(doc => {

                                    if (doc.data().Rol != "") {

                                        var tbody = document.querySelector('.tbody')
                                        var tr = document.createElement('tr')
                                        var thImg = document.createElement('th')
                                        var img = document.createElement('img')
                                        var nombre = document.createElement('th')
                                        var correo = document.createElement('th')
                                        var telefono = document.createElement('th')
                                        var direccion = document.createElement('th')
                                        var thPrivilegio = document.createElement('th')
                                        var privilegio = document.createElement('p')
                                        var thAccion = document.createElement('th')
                                        var divAccion = document.createElement('div')
                                        var accion = document.createElement('a')

                                        if (doc.data().URL == "") {
                                            img.src = "/assets/profile-5.jpg"
                                        } else {
                                            img.src = doc.data().URL
                                        }

                                        nombre.textContent = doc.data().Nombre
                                        correo.textContent = doc.data().Correo
                                        telefono.textContent = doc.data().Telefono
                                        direccion.textContent = doc.data().Direccion
                                        privilegio.textContent = doc.data().Rol
                                        accion.textContent = "Eliminar"

                                        privilegio.className = "permiso"
                                        divAccion.className = "actions"
                                        accion.className = "delete"

                                        tbody.appendChild(tr)
                                        tr.appendChild(thImg)
                                        tr.appendChild(nombre)
                                        tr.appendChild(correo)
                                        tr.appendChild(telefono)
                                        tr.appendChild(direccion)
                                        tr.appendChild(thPrivilegio)
                                        tr.appendChild(thAccion)
                                        thImg.appendChild(img)
                                        thPrivilegio.appendChild(privilegio)
                                        thAccion.appendChild(divAccion)
                                        divAccion.appendChild(accion)

                                        accion.addEventListener('click', () => {
                                            var modalDelete = document.querySelector('.modalDelete')

                                            modalDelete.classList.add('active')
                                            window.addEventListener('click', event => {
                                                if (event.target == modalDelete) {
                                                    modalDelete.classList.remove('active')
                                                }
                                            })

                                            var nameModalDelete = document.querySelector('.nameModalDelete')
                                            var emailModalDelete = document.querySelector('.emailModalDelete')
                                            var phoneModalDelete = document.querySelector('.phoneModalDelete')
                                            var deleteModalDelete = document.querySelector('.deleteModalDelete')
                                            var imgModalDelete = document.querySelector('.imgModalDelete')

                                            if (doc.data().URL == "") {
                                                imgModalDelete.src = "/assets/profile-5.jpg"
                                            } else {
                                                imgModalDelete.src = doc.data().URL
                                            }
                                            nameModalDelete.textContent = doc.data().Nombre
                                            emailModalDelete.textContent = doc.data().Correo
                                            phoneModalDelete.textContent = doc.data().Telefono

                                            deleteModalDelete.addEventListener('click', () => {
                                                getDocs(query(collection(db, "Users", "IdUser", "Private_Data"), where("Id", "==", doc.data().Id))).
                                                    then((querySnapshot) => {
                                                        querySnapshot.forEach(doc => {
                                                            updateDoc(doc.ref, {
                                                                Rol: ""
                                                            }).
                                                                then(() => {
                                                                    modalDelete.classList.remove('active')
                                                                    location.reload()
                                                                }).
                                                                catch(() => {
                                                                    const closeBtn2 = document.querySelector('.closeIcon2')
                                                                    const tryAgain2 = document.getElementById('okBtn2')
                                                                    const modal2 = document.querySelector('.modal2')
                                                                    const text2 = document.querySelector('.textModal2')

                                                                    modal2.classList.add('active')
                                                                    text2.textContent = "No pudimos actualizar el privilegio, intenta mas tarde"
                                                                    closeBtn2.addEventListener('click', () => {
                                                                        modal2.classList.remove('active')
                                                                    })
                                                                    tryAgain2.addEventListener('click', () => {
                                                                        modal2.classList.remove('active')
                                                                    })
                                                                    window.addEventListener('click', event => {
                                                                        if (event.target == modal2) {
                                                                            modal2.classList.remove('active')
                                                                        }
                                                                    })
                                                                })
                                                        })
                                                    })
                                            })
                                        })

                                        privilegio.addEventListener('click', () => {
                                            var modalPermiso = document.querySelector('.modalPermiso')
                                            var roles = document.querySelectorAll('.conModalPermiso p')

                                            modalPermiso.classList.add('active')
                                            window.addEventListener('click', event => {
                                                if (event.target == modalPermiso) {
                                                    modalPermiso.classList.remove('active')
                                                }
                                            })

                                            roles.forEach(rol => {
                                                rol.replaceWith(rol.cloneNode(true))
                                            })

                                            roles = document.querySelectorAll('.conModalPermiso p')

                                            roles.forEach(rol => {
                                                rol.addEventListener('click', () => {

                                                    getDocs(query(collection(db, "Users", "IdUser", "Private_Data"), where("Id", "==", doc.data().Id))).
                                                        then((querySnapshot) => {
                                                            querySnapshot.forEach(doc => {
                                                                updateDoc(doc.ref, {
                                                                    Rol: rol.textContent
                                                                }).
                                                                    then(() => {
                                                                        modalPermiso.classList.remove('active')
                                                                        location.reload()
                                                                    }).
                                                                    catch(() => {
                                                                        const closeBtn2 = document.querySelector('.closeIcon2')
                                                                        const tryAgain2 = document.getElementById('okBtn2')
                                                                        const modal2 = document.querySelector('.modal2')
                                                                        const text2 = document.querySelector('.textModal2')

                                                                        modal2.classList.add('active')
                                                                        text2.textContent = "No pudimos actualizar el privilegio, intenta mas tarde"
                                                                        closeBtn2.addEventListener('click', () => {
                                                                            modal2.classList.remove('active')
                                                                        })
                                                                        tryAgain2.addEventListener('click', () => {
                                                                            modal2.classList.remove('active')
                                                                        })
                                                                        window.addEventListener('click', event => {
                                                                            if (event.target == modal2) {
                                                                                modal2.classList.remove('active')
                                                                            }
                                                                        })
                                                                    })
                                                            })
                                                        })

                                                })
                                            })
                                        })

                                    }

                                })
                            })

                        // Add User
                        onAuthStateChanged(auth, (user) => {
                            if (user) {
                                const uid = user.uid;

                                var btnAddUser = document.querySelector('#addUser')
                                var modalAdd = document.querySelector('.modalAdd')
                                var closeModalAdd = document.querySelector('.modalAdd i')

                                var btnPrivilegio = document.querySelector('.addPrivilegio')
                                var modalPermiso = document.querySelector('.modalPermiso2')

                                btnAddUser.addEventListener('click', () => {
                                    modalAdd.classList.add('active')
                                    closeModalAdd.addEventListener('click', () => {
                                        modalAdd.classList.remove('active')
                                    })
                                    window.addEventListener('click', event => {
                                        if (event.target == modalAdd) {
                                            modalAdd.classList.remove('active')
                                        }
                                    })
                                })

                                btnPrivilegio.addEventListener('click', () => {
                                    modalPermiso.classList.add('active')
                                    window.addEventListener('click', event => {
                                        if (event.target == modalPermiso) {
                                            modalPermiso.classList.remove('active')
                                        }
                                    })
                                })

                                var addName = document.querySelector('.addName')
                                var addEmail = document.querySelector('.addEmail')
                                var addPhone = document.querySelector('.addPhone')
                                var addDirection = document.querySelector('.addDirection')
                                var addPrivilegio = document.querySelector('.addPrivilegio')
                                var addContra = document.querySelector('.addContra')
                                var addBtn = document.querySelector('.addBtn')

                                var addRoles = document.querySelectorAll('.conModalPermiso2 p')

                                addRoles.forEach(addRol => {
                                    addRol.addEventListener('click', () => {
                                        addPrivilegio.textContent = addRol.textContent
                                        modalPermiso.classList.remove('active')
                                    })
                                })

                                const closeBtn2 = document.querySelector('.closeIcon2')
                                const tryAgain2 = document.getElementById('okBtn2')
                                const modal2 = document.querySelector('.modal2')
                                const text2 = document.querySelector('.textModal2')

                                addBtn.addEventListener('click', () => {
                                    if (addName.value.length != 0) {
                                        if (addEmail.value.length != 0) {
                                            if (addPhone.value.length != 0) {
                                                if (addDirection.value.length != 0) {
                                                    if (addPrivilegio.textContent != "Privilegio") {
                                                        if (addContra.value.length != 0) {

                                                            createUserWithEmailAndPassword(auth, addEmail.value, addContra.value)
                                                                .then((userCredential) => {
                                                                    // Signed in
                                                                    const user = userCredential.user;
                                                                    sendEmailVerification(auth.currentUser).
                                                                        then(() => {
                                                                            addDoc(collection(db, "Users", "IdUser", "Private_Data"), {
                                                                                Correo: addEmail.value,
                                                                                Id: user.uid,
                                                                                Nombre: addName.value,
                                                                                Telefono: addPhone.value,
                                                                                Direccion: addDirection.value,
                                                                                Rol: addPrivilegio.textContent,
                                                                                DarkMode: "desactive",
                                                                                URL: "",
                                                                            }).then(() => {
                                                                                location.href = "/views/login/login.html"
                                                                            })
                                                                        })

                                                                }).catch(() => {
                                                                    modal2.classList.add('active')
                                                                    text2.textContent = "Parece que este usuario ya esta registrado"
                                                                    closeBtn2.addEventListener('click', () => {
                                                                        modal2.classList.remove('active')
                                                                    })
                                                                    tryAgain2.addEventListener('click', () => {
                                                                        modal2.classList.remove('active')
                                                                    })
                                                                    window.addEventListener('click', event => {
                                                                        if (event.target == modal2) {
                                                                            modal2.classList.remove('active')
                                                                        }
                                                                    })
                                                                })

                                                        } else {
                                                            modal2.classList.add('active')
                                                            text2.textContent = "Debes ingresar la contraseña"
                                                            closeBtn2.addEventListener('click', () => {
                                                                modal2.classList.remove('active')
                                                            })
                                                            tryAgain2.addEventListener('click', () => {
                                                                modal2.classList.remove('active')
                                                            })
                                                            window.addEventListener('click', event => {
                                                                if (event.target == modal2) {
                                                                    modal2.classList.remove('active')
                                                                }
                                                            })
                                                        }
                                                    } else {
                                                        modal2.classList.add('active')
                                                        text2.textContent = "Debes agregar el rol del usuario"
                                                        closeBtn2.addEventListener('click', () => {
                                                            modal2.classList.remove('active')
                                                        })
                                                        tryAgain2.addEventListener('click', () => {
                                                            modal2.classList.remove('active')
                                                        })
                                                        window.addEventListener('click', event => {
                                                            if (event.target == modal2) {
                                                                modal2.classList.remove('active')
                                                            }
                                                        })
                                                    }
                                                } else {
                                                    modal2.classList.add('active')
                                                    text2.textContent = "Debes agregar la direccion del usuario"
                                                    closeBtn2.addEventListener('click', () => {
                                                        modal2.classList.remove('active')
                                                    })
                                                    tryAgain2.addEventListener('click', () => {
                                                        modal2.classList.remove('active')
                                                    })
                                                    window.addEventListener('click', event => {
                                                        if (event.target == modal2) {
                                                            modal2.classList.remove('active')
                                                        }
                                                    })
                                                }
                                            } else {
                                                modal2.classList.add('active')
                                                text2.textContent = "Debes agregar el telefono del usuario"
                                                closeBtn2.addEventListener('click', () => {
                                                    modal2.classList.remove('active')
                                                })
                                                tryAgain2.addEventListener('click', () => {
                                                    modal2.classList.remove('active')
                                                })
                                                window.addEventListener('click', event => {
                                                    if (event.target == modal2) {
                                                        modal2.classList.remove('active')
                                                    }
                                                })
                                            }
                                        } else {
                                            modal2.classList.add('active')
                                            text2.textContent = "Debes agregar el correo del usuario"
                                            closeBtn2.addEventListener('click', () => {
                                                modal2.classList.remove('active')
                                            })
                                            tryAgain2.addEventListener('click', () => {
                                                modal2.classList.remove('active')
                                            })
                                            window.addEventListener('click', event => {
                                                if (event.target == modal2) {
                                                    modal2.classList.remove('active')
                                                }
                                            })
                                        }
                                    } else {
                                        modal2.classList.add('active')
                                        text2.textContent = "Debes agregar el nombre del usuario"
                                        closeBtn2.addEventListener('click', () => {
                                            modal2.classList.remove('active')
                                        })
                                        tryAgain2.addEventListener('click', () => {
                                            modal2.classList.remove('active')
                                        })
                                        window.addEventListener('click', event => {
                                            if (event.target == modal2) {
                                                modal2.classList.remove('active')
                                            }
                                        })
                                    }
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

                                getDocs(query(collection(db, "Users", "IdUser", "Private_Data"), where("Id", "==", user.uid))).
                                    then((querySnapshot) => {
                                        querySnapshot.forEach((doc2) => {
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