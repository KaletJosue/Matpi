import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-auth.js";
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

                        // See Inventory
                        getDocs(query(collection(db, "Inventory", "IdInventory", "Data_Documents"))).
                            then((querySnapshot) => {
                                querySnapshot.forEach((doc) => {
                                    var tbody = document.querySelector('.tbody')
                                    var tr = document.createElement('tr')
                                    var thImg = document.createElement('th')
                                    var img = document.createElement('img')
                                    var name = document.createElement('th')
                                    var category = document.createElement('th')
                                    var cant = document.createElement('th')
                                    var price = document.createElement('th')
                                    var date = document.createElement('th')
                                    var thActions = document.createElement('th')
                                    var actions = document.createElement('div')
                                    var edit = document.createElement('a')
                                    var deletePro = document.createElement('a')

                                    img.src = doc.data().URL
                                    name.textContent = doc.data().Nombre
                                    category.textContent = doc.data().Categoria
                                    cant.textContent = doc.data().Stock + " " + doc.data().Medida
                                    price.textContent = `$${(doc.data().Precio).toLocaleString('es-ES')}`
                                    date.textContent = doc.data().Fecha
                                    edit.textContent = "Editar"
                                    deletePro.textContent = "Eliminar"

                                    actions.className = "actions"
                                    edit.className = "edit"
                                    deletePro.className = "delete"

                                    tbody.appendChild(tr)
                                    tr.appendChild(thImg)
                                    thImg.appendChild(img)
                                    tr.appendChild(name)
                                    tr.appendChild(category)
                                    tr.appendChild(cant)
                                    tr.appendChild(price)
                                    tr.appendChild(date)
                                    tr.appendChild(thActions)
                                    thActions.appendChild(actions)
                                    actions.appendChild(edit)
                                    actions.appendChild(deletePro)

                                    // Delete Product
                                    deletePro.addEventListener('click', () => {
                                        deleteDoc(doc.ref).
                                            then(() => {
                                                location.reload()
                                            }).catch(() => {
                                                const closeBtn3 = document.querySelector('.closeIcon3')
                                                const tryAgain3 = document.getElementById('okBtn3')
                                                const modal3 = document.querySelector('.modal3')
                                                const text3 = document.querySelector('.textModal3')

                                                modal3.classList.add('active')
                                                text3.textContent = "No pudimos eliminar el producto intenta mas tarde"
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
                                            })
                                    })


                                    // Update Product
                                    edit.addEventListener('click', () => {
                                        var addProductUpdate = document.querySelector('.addProductUpdate')

                                        addProductUpdate.classList.add('active')
                                        window.addEventListener('click', event => {
                                            if (event.target == addProductUpdate) {
                                                addProductUpdate.classList.remove('active')
                                            }
                                        })

                                        const today = new Date();
                                        const day = String(today.getDate()).padStart(2, '0');
                                        const month = String(today.getMonth() + 1).padStart(2, '0');
                                        const year = today.getFullYear();

                                        var updateName = document.querySelector('#updateName')
                                        var updateCategory = document.querySelector('#updateCategory')
                                        var updateStock = document.querySelector('#updateStock')
                                        var updateMedida = document.querySelector('#updateMedida')
                                        var updatePrice = document.querySelector('#updatePrice')
                                        var btnUpdate = document.querySelector('#btnUpdate')

                                        var fecha = `${day}/${month}/${year}`

                                        updateName.value = doc.data().Nombre
                                        updateCategory.textContent = doc.data().Categoria
                                        updateStock.value = doc.data().Stock
                                        updateMedida.textContent = doc.data().Medida
                                        updatePrice.value = doc.data().Precio

                                        const closeBtn3 = document.querySelector('.closeIcon3')
                                        const tryAgain3 = document.getElementById('okBtn3')
                                        const modal3 = document.querySelector('.modal3')
                                        const text3 = document.querySelector('.textModal3')

                                        var selectCategory = document.querySelector('.selectCategory')
                                        var categorias = document.querySelectorAll('.con_selectCategory p')

                                        var selectUni = document.querySelector('.selectUni')
                                        var medidas = document.querySelectorAll('.con_selectUni p')

                                        updateCategory.addEventListener('click', () => {
                                            selectCategory.classList.add('active')
                                            window.addEventListener('click', event => {
                                                if (event.target == selectCategory) {
                                                    selectCategory.classList.remove('active')
                                                }
                                            })

                                            categorias.forEach(categoria => {
                                                categoria.addEventListener('click', () => {
                                                    updateCategory.textContent = categoria.textContent
                                                    selectCategory.classList.remove('active')
                                                })
                                            })
                                        })

                                        updateMedida.addEventListener('click', () => {
                                            selectUni.classList.add('active')
                                            window.addEventListener('click', event => {
                                                if (event.target == selectUni) {
                                                    selectUni.classList.remove('active')
                                                }
                                            })

                                            medidas.forEach(medida => {
                                                medida.addEventListener('click', () => {
                                                    updateMedida.textContent = medida.textContent
                                                    selectUni.classList.remove('active')
                                                })
                                            })
                                        })

                                        btnUpdate.addEventListener('click', () => {
                                            if (updateName.value.length != 0) {
                                                if (updateStock.value.length != 0) {
                                                    if (updateName.value.length != 0) {

                                                        updateDoc(doc.ref, {
                                                            Nombre: updateName.value,
                                                            Categoria: updateCategory.textContent,
                                                            Stock: updateStock.value,
                                                            Medida: updateMedida.textContent,
                                                            Precio: updatePrice.value,
                                                            Fecha: fecha,
                                                        }).
                                                            then(() => {
                                                                location.reload()
                                                            }).
                                                            catch(() => {
                                                                modal3.classList.add('active')
                                                                text3.textContent = "No pudimos actualizar el producto intenta mas tarde"
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
                                                            })

                                                    } else {
                                                        modal3.classList.add('active')
                                                        text3.textContent = "Debes ingresar el precio del producto"
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
                                                    text3.textContent = "Debes ingresar la cantidad del producto"
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
                                                text3.textContent = "Debes ingresar el nombre del producto"
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
                                    })
                                })
                            })

                        // Add Product
                        onAuthStateChanged(auth, (user) => {
                            if (user) {
                                const uid = user.uid;

                                var btnAdd = document.querySelector('#add')
                                var modalAddProduct = document.querySelector('.addProduct')
                                var closeAddProduct = document.querySelector('.text_addProduct i')

                                var inputPhoto = document.querySelector('#inputPhoto')

                                var nameImage = document.querySelector('.nameImage')

                                var category = document.querySelector('.category')
                                var selectCategory = document.querySelector('.selectCategory')
                                var closeCategory = document.querySelector('.selectCategory span')

                                var unidades = document.querySelector('.unidades')
                                var selectUni = document.querySelector('.selectUni')
                                var closeUni = document.querySelector('.selectUni span')

                                var categorias = document.querySelectorAll('.con_selectCategory p')
                                var medidas = document.querySelectorAll('.selectUni p')

                                category.addEventListener('click', () => {
                                    selectCategory.classList.add('active')
                                    closeCategory.addEventListener('click', () => {
                                        selectCategory.classList.remove('active')
                                    })
                                    window.addEventListener('click', event => {
                                        if (event.target == selectCategory) {
                                            selectCategory.classList.remove('active')
                                        }
                                    })

                                    categorias.forEach(categoria => {
                                        categoria.addEventListener('click', () => {
                                            category.textContent = categoria.textContent
                                            selectCategory.classList.remove('active')
                                        })
                                    })
                                })

                                unidades.addEventListener('click', () => {
                                    selectUni.classList.add('active')
                                    closeUni.addEventListener('click', () => {
                                        selectUni.classList.remove('active')
                                    })
                                    window.addEventListener('click', event => {
                                        if (event.target == selectUni) {
                                            selectUni.classList.remove('active')
                                        }
                                    })

                                    medidas.forEach(medida => {
                                        medida.addEventListener('click', () => {
                                            unidades.textContent = medida.textContent
                                            selectUni.classList.remove('active')
                                        })
                                    })
                                })

                                btnAdd.addEventListener('click', () => {
                                    modalAddProduct.classList.add('active')
                                })
                                closeAddProduct.addEventListener('click', () => {
                                    modalAddProduct.classList.remove('active')
                                })
                                window.addEventListener('click', event => {
                                    if (event.target == modalAddProduct) {
                                        modalAddProduct.classList.remove('active')
                                    }
                                })

                                inputPhoto.addEventListener('change', () => {
                                    const file = inputPhoto.files[0];
                                    if (file) {
                                        nameImage.textContent = file.name;
                                    } else {
                                        nameImage.textContent = '';
                                    }
                                });

                                const today = new Date();
                                const day = String(today.getDate()).padStart(2, '0');
                                const month = String(today.getMonth() + 1).padStart(2, '0');
                                const year = today.getFullYear();

                                var inputPhoto = document.querySelector('#inputPhoto')
                                var inputName = document.querySelector('#inputName')
                                var inputCategoria = document.querySelector('#inputCategoria')
                                var inputCantidad = document.querySelector('#inputCantidad')
                                var inputMedida = document.querySelector('#inputMedida')
                                var inputPrice = document.querySelector('#inputPrice')
                                var addInventory = document.querySelector('#addInventory')
                                var fecha = `${day}/${month}/${year}`

                                const closeBtn3 = document.querySelector('.closeIcon3')
                                const tryAgain3 = document.getElementById('okBtn3')
                                const modal3 = document.querySelector('.modal3')
                                const text3 = document.querySelector('.textModal3')

                                addInventory.addEventListener('click', () => {
                                    if (inputPhoto.value.length != 0) {
                                        if (inputName.value.length != 0) {
                                            if (inputCategoria.textContent != "Categoria") {
                                                if (inputCantidad.value.length != 0) {
                                                    if (inputMedida.textContent != "Unidad de Medida") {
                                                        if (inputPrice.value.length != 0) {

                                                            const storageRef = ref(storage, 'Inventory/' + "IdProductInventory/" + inputName.value);
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
                                                                            modal3.classList.add('active')
                                                                            text3.textContent = "No pudimos guardar el producto, intenta más tarde"
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
                                                                            modal3.classList.add('active')
                                                                            text3.textContent = "No pudimos guardar el producto, intenta más tarde"
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
                                                                            break;
                                                                        case 'storage/canceled':
                                                                            loading.classList.remove('active')
                                                                            modal3.classList.add('active')
                                                                            text3.textContent = "No pudimos guardar el producto, intenta más tarde"
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
                                                                            break;
                                                                        case 'storage/unknown':
                                                                            loading.classList.remove('active')
                                                                            modal3.classList.add('active')
                                                                            text3.textContent = "No pudimos guardar el producto, intenta más tarde"
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
                                                                            break;
                                                                    }
                                                                },
                                                                () => {
                                                                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                                                                        addDoc(collection(db, "Inventory", "IdInventory", "Data_Documents"), {
                                                                            Nombre: inputName.value,
                                                                            URL: downloadURL,
                                                                            Categoria: inputCategoria.textContent,
                                                                            Stock: inputCantidad.value,
                                                                            Medida: inputMedida.textContent,
                                                                            Precio: inputPrice.value,
                                                                            Fecha: fecha
                                                                        }).then(() => {
                                                                            location.reload()
                                                                        }).catch(() => {
                                                                            modal3.classList.add('active')
                                                                            text3.textContent = "No pudimos guardar el producto, intenta más tarde"
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
                                                                        })
                                                                    });
                                                                }
                                                            );

                                                        } else {
                                                            modal3.classList.add('active')
                                                            text3.textContent = "Debes agregar el precio unitario del producto"
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
                                                        text3.textContent = "Debes agregar la unidad de medida del producto"
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
                                                    text3.textContent = "Debes agregar la cantidad del producto"
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
                                                text3.textContent = "Debes agregar la categoria del producto"
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
                                            text3.textContent = "Debes agregar el nombre del producto"
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
                                        text3.textContent = "Debes agregar una foto del producto"
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