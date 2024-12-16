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
const db = getFirestore(app);

const sr = ScrollReveal({
    distance: '65px',
    duration: 2600,
    delay: 450,
    rest: true
})

sr.reveal('.textinicio', { delay: 100, origin: 'top' });
sr.reveal('.imgscroll', { delay: 300, origin: 'top' });
sr.reveal('.imgsmenu', { delay: 50, origin: 'left' });
sr.reveal('.unocards', { delay: 100, origin: 'left' });
sr.reveal('.doscards', { delay: 100, origin: 'left' });
sr.reveal('.trescards', { delay: 100, origin: 'left' });
sr.reveal('.cuatrocards', { delay: 100, origin: 'left' });
sr.reveal('.cincocards', { delay: 100, origin: 'left' });
sr.reveal('.imgcon', { delay: 100, origin: 'top' });
sr.reveal('.textredes', { delay: 100, origin: 'left' });
sr.reveal('.textdulce', { delay: 400, origin: 'left' });
sr.reveal('.imgdulce', { delay: 10, origin: 'bottom' });

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