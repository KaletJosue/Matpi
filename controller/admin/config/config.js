import { getAuth, onAuthStateChanged, signOut, updatePassword } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-auth.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-analytics.js";
import { getFirestore, collection, addDoc, setDoc, doc, getDocs, where, getDoc, query, updateDoc, deleteDoc } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-firestore.js";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-storage.js";

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
const storage = getStorage();

onAuthStateChanged(auth, (user) => {
    if (user) {

        getDocs(query(collection(db, "Users", "IdUser", "Private_Data"), where("Id", "==", user.uid))).
            then((querySnapshot) => {
                querySnapshot.forEach(doc => {

                    if (doc.data().Rol == "Administrador" || doc.data().Rol == "SuperAdmin") {

                        // Update Info
                        var photo = document.querySelector('.photo')
                        var inputPhoto = document.querySelector('.inputPhoto')
                        var inputName = document.querySelector('.inputName')
                        var inputEmail = document.querySelector('.inputEmail')
                        var inputUpdate = document.querySelector('.inputUpdate')

                        getDocs(query(collection(db, "Users", "IdUser", "Private_Data"), where("Id", "==", user.uid))).
                            then((querySnapshot) => {
                                querySnapshot.forEach((doc) => {
                                    if (doc.data().URL == "") {
                                        photo.src = "/assets/profile-5.jpg"
                                    } else {
                                        photo.src = doc.data().URL
                                    }

                                    inputEmail.value = doc.data().Correo
                                    inputName.value = doc.data().Nombre

                                    inputPhoto.addEventListener('change', e => {
                                        if (e.target.files[0]) {
                                            const reader = new FileReader();
                                            reader.onload = function (e) {
                                                photo.src = e.target.result;
                                            }
                                            reader.readAsDataURL(e.target.files[0])
                                            photo.src = "/assets/profile-1.jpg"
                                        } else {
                                            if (doc.data().URL == "") {
                                                photo.src = "/assets/profile-5.jpg"
                                            } else {
                                                photo.src = doc.data().URL
                                            }
                                        }
                                    })

                                    const closeBtn2 = document.querySelector('.closeIcon2')
                                    const tryAgain2 = document.getElementById('okBtn2')
                                    const modal2 = document.querySelector('.modal2')
                                    const text2 = document.querySelector('.textModal2')

                                    inputUpdate.addEventListener('click', () => {
                                        if (inputName.value.length != 0) {
                                            if (inputPhoto.value.length != 0) {

                                                const storageRef = ref(storage, 'Fotos/' + user.uid + "/" + inputName.value);
                                                const uploadTask = uploadBytesResumable(storageRef, inputPhoto.files[0]);

                                                var loading = document.querySelector('.loader')

                                                uploadTask.on('state_changed',
                                                    (snapshot) => {
                                                        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                                                        console.log('Upload is ' + progress + '% done');
                                                        loading.classList.add('active')
                                                        switch (snapshot.state) {
                                                            case 'paused':
                                                                loading.classList.remove('active')
                                                                modal2.classList.add('active')
                                                                text2.textContent = "No pudimos actualizar tus datos, intenta mas tarde"
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
                                                                break;
                                                            case 'running':
                                                                loading.classList.add('active')
                                                                break;
                                                        }
                                                    },
                                                    (error) => {
                                                        switch (error.code) {
                                                            case 'storage/unauthorized':
                                                                loading.classList.remove('active')
                                                                modal2.classList.add('active')
                                                                text2.textContent = "No pudimos actualizar tus datos, intenta mas tarde"
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
                                                                break;
                                                            case 'storage/canceled':
                                                                loading.classList.remove('active')
                                                                modal2.classList.add('active')
                                                                text2.textContent = "No pudimos actualizar tus datos, intenta mas tarde"
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
                                                                break;
                                                            case 'storage/unknown':
                                                                loading.classList.remove('active')
                                                                modal2.classList.add('active')
                                                                text2.textContent = "No pudimos actualizar tus datos, intenta mas tarde"
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
                                                                break;
                                                        }
                                                    },
                                                    () => {
                                                        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                                                            getDocs(query(collection(db, "Users", "IdUser", "Private_Data"), where("Id", "==", user.uid))).
                                                                then((querySnapshot) => {
                                                                    querySnapshot.forEach((doc) => {
                                                                        updateDoc(doc.ref, {
                                                                            Nombre: inputName.value,
                                                                            URL: downloadURL
                                                                        }).
                                                                            then(() => {
                                                                                location.reload()
                                                                            }).
                                                                            catch(() => {
                                                                                modal2.classList.add('active')
                                                                                text2.textContent = "No pudimos actualizar tus datos, intenta mas tarde"
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
                                                        });
                                                    }
                                                );

                                            } else {
                                                if (inputName.value != doc.data().Nombre) {
                                                    updateDoc(doc.ref, {
                                                        Nombre: inputName.value
                                                    }).
                                                        then(() => {
                                                            var modalInfo = document.querySelector('.modalInfo')
                                                            modalInfo.classList.remove('active')
                                                            location.reload()
                                                        }).
                                                        catch(() => {
                                                            modal2.classList.add('active')
                                                            text2.textContent = "No pudimos actualizar tus datos, intenta mas tarde"
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
                                                    text2.textContent = "Tus datos siguen siendo los mismos"
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
                                            }
                                        } else {
                                            modal2.classList.add('active')
                                            text2.textContent = "Debes ingresar tu nombre"
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
                                })
                            })

                        // Update Contra
                        var newContra = document.querySelector('.newContra')
                        var newConfir = document.querySelector('.newConfir')
                        var updateContra = document.querySelector('.updateContra')

                        const closeBtn2 = document.querySelector('.closeIcon2')
                        const tryAgain2 = document.getElementById('okBtn2')
                        const modal2 = document.querySelector('.modal2')
                        const text2 = document.querySelector('.textModal2')

                        updateContra.addEventListener('click', () => {
                            if (newContra.value.length != 0) {
                                if (newConfir.value.length != 0) {
                                    if (newConfir.value == newContra.value) {

                                        onAuthStateChanged(auth, (user) => {
                                            if (user) {

                                                const user = auth.currentUser;

                                                updatePassword(user, newContra.value).then(() => {
                                                    var toast = document.querySelector('.toast')
                                                    var textToast = document.querySelector('.textToast')

                                                    toast.classList.add('active')
                                                    toast.style.background = "#53c54f"
                                                    textToast.textContent = "Ya puedes iniciar sesion con tu nueva contraseña"

                                                    setTimeout(() => {
                                                        toast.classList.remove('active')
                                                        location.reload()
                                                    }, 3000);
                                                }).catch((error) => {
                                                    modal2.classList.add('active')
                                                    text2.textContent = "No pudimos actualizar tu contraseña, prueba iniciando sesion nuevamente, si el error persiste comunicate con Oasis"
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
                                                });

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
                                        modal2.classList.add('active')
                                        text2.textContent = "Las contraseñas deben ser iguales, intenta otra vez"
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
                                    text2.textContent = "Debes confirmar la contraseña nueva"
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
                                text2.textContent = "Debes ingresar la contraseña nueva"
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

                        // Name, email and img
                        var imgConfig = document.querySelector('.imgConfig')
                        var emailConfig = document.querySelector('.emailConfig')
                        var nameConfig = document.querySelector('.nameConfig')

                        getDocs(query(collection(db, "Users", "IdUser", "Private_Data"), where("Id", "==", user.uid))).
                            then((querySnapshot) => {
                                querySnapshot.forEach((doc) => {
                                    if (doc.data().URL == "") {
                                        imgConfig.src = "/assets/profile-5.jpg"
                                    } else {
                                        imgConfig.src = doc.data().URL
                                    }
                                    emailConfig.textContent = doc.data().Correo
                                    nameConfig.textContent = doc.data().Nombre
                                })
                            })

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

                        // Modal Info and Security

                        var btnInfo = document.querySelector('.infoPersonal')
                        var btnSecurity = document.querySelector('.security')

                        var modalInfo = document.querySelector('.modalInfo')
                        var modalSecurity = document.querySelector('.modalSecurity')

                        var btnUsers = document.querySelector('.users')

                        btnInfo.addEventListener('click', () => {
                            modalInfo.classList.add('active')
                            window.addEventListener('click', event => {
                                if (event.target == modalInfo) {
                                    modalInfo.classList.remove('active')
                                    location.reload()
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

                        btnUsers.addEventListener('click', () => {
                            getDocs(query(collection(db, "Users", "IdUser", "Private_Data"), where("Id", "==", user.uid))).
                                then((querySnapshot) => {
                                    querySnapshot.forEach((doc) => {
                                        if (doc.data().Rol == "SuperAdmin") {
                                            location.href = "/views/admin/permisos/permisos.html"
                                        } else {
                                            var toast = document.querySelector('.toast')
                                            var textToast = document.querySelector('.textToast')

                                            toast.classList.add('active')
                                            textToast.textContent = "Lo sentimos, no tienes acceso a esta pagina comunicate con el SuperAdmin de Matpi"

                                            setTimeout(() => {
                                                toast.classList.remove('active')
                                            }, 5000);
                                        }
                                    })
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