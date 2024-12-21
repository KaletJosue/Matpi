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

        // Chart Donut

        onAuthStateChanged(auth, (user) => {
            if (user) {
                const uid = user.uid;

                const ctxDonut = document.getElementById('myDonut');

                const ingresos = 7000000;
                const gastos = 4200000;
                const ganancias = ingresos - gastos;

                let myDonut = new Chart(ctxDonut, {
                    type: 'doughnut',
                    data: {
                        labels: [
                            'Ingresos',
                            'Gastos',
                            'Ganancias'
                        ],
                        datasets: [{
                            data: [ingresos, gastos, ganancias],
                            backgroundColor: [
                                '#ff8730',
                                '#b330ff',
                                '#00bf58'
                            ],
                            hoverOffset: 4
                        }]
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

        // Chart Lines

        onAuthStateChanged(auth, (user) => {
            if (user) {
                const uid = user.uid;

                let inputDay = document.querySelector('.day');
                let inputMonth = document.querySelector('.month');
                let inputYear = document.querySelector('.year');

                let selectDay = document.querySelector('.day')
                let selectMonth = document.querySelector('.month')
                let selectYear = document.querySelector('.year')

                var conCalendar = document.querySelector('.con_calendar')
                var conMonth = document.querySelector('.conMonth')
                var conYear = document.querySelector('.conYear')

                const today = new Date();
                const day = today.getDate().toString().padStart(2, '0');
                const month = (today.getMonth() + 1).toString().padStart(2, '0');
                const year = today.getFullYear();

                const formattedDate = `${day}/${month}/${year}`;

                selectDay.addEventListener('click', () => {
                    selectMonth.value = ""
                    selectYear.value = ""
                })

                selectMonth.addEventListener('click', () => {
                    selectDay.value = ""
                    selectYear.value = ""
                })

                selectYear.addEventListener('click', () => {
                    selectDay.value = ""
                    selectMonth.value = ""
                    conYear.classList.add('active')

                    window.addEventListener('click', event => {
                        if (event.target == conYear) {
                            conYear.classList.remove('active')
                        }
                    })
                })

                window.addEventListener('click', event => {
                    if (event.target == conCalendar || event.target == conMonth || event.target == conYear) {
                        if (selectDay.value == "" && selectMonth.value == "" && selectYear.value == "") {
                            selectDay.value = formattedDate

                            const horasLabels = ['12:00', '13:00',
                                '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00',
                                '21:00', '22:00', '23:00'
                            ];
                            const ingresosHoras = [500000, 600000, 700000, 800000, 400000, 300000, 200000, 600000, 700000, 800000, 900000, 800000];
                            const gastosHoras = [300000, 400000, 500000, 600000, 200000, 100000, 150000, 400000, 500000, 600000, 700000, 200000];
                            const gananciasHoras = ingresosHoras.map((ingreso, index) => ingreso - gastosHoras[index]);

                            updateChart(horasLabels, ingresosHoras, gastosHoras, gananciasHoras);

                        }
                    }
                })

                const ctx = document.getElementById('myChart');

                const ingresos = [500000, 600000, 700000, 800000, 400000, 300000, 200000, 600000, 700000, 800000, 900000, 800000];
                const gastos = [300000, 400000, 500000, 600000, 200000, 100000, 150000, 400000, 500000, 600000, 700000, 200000];
                const ganancias = ingresos.map((ingreso, index) => ingreso - gastos[index]);

                function updateChart(labels, ingresosData, gastosData, gananciasData) {
                    myChart.data.labels = labels;
                    myChart.data.datasets[0].data = ingresosData;
                    myChart.data.datasets[1].data = gastosData;
                    myChart.data.datasets[2].data = gananciasData;
                    myChart.update();
                }

                let myChart = new Chart(ctx, {
                    type: 'line',
                    data: {
                        labels: ['12:00', '13:00',
                            '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00',
                            '21:00', '22:00', '23:00'],
                        datasets: [{
                            label: 'Ingresos',
                            data: ingresos,
                            borderColor: '#ff8730',
                            tension: 0.2
                        },
                        {
                            label: 'Gastos',
                            data: gastos,
                            borderColor: '#b330ff',
                            tension: 0.2
                        },
                        {
                            label: 'Ganancias',
                            data: ganancias,
                            borderColor: '#00bf58',
                            tension: 0.2
                        }]
                    },
                    options: {
                        scales: {
                            y: {
                                beginAtZero: true
                            }
                        }
                    }
                });

                inputDay.addEventListener('click', () => {
                    const horasLabels = ['12:00', '13:00',
                        '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00',
                        '21:00', '22:00', '23:00'
                    ];
                    const ingresosHoras = [500000, 600000, 700000, 800000, 400000, 300000, 200000, 600000, 700000, 800000, 900000, 800000];
                    const gastosHoras = [300000, 400000, 500000, 600000, 200000, 100000, 150000, 400000, 500000, 600000, 700000, 200000];
                    const gananciasHoras = ingresosHoras.map((ingreso, index) => ingreso - gastosHoras[index]);

                    updateChart(horasLabels, ingresosHoras, gastosHoras, gananciasHoras);
                });

                inputMonth.addEventListener('click', () => {
                    const diasLabels = ['Semana 1', 'Semana 2', 'Semana 3', 'Semana 4'];
                    const ingresosDias = [1000000, 1200000, 1300000, 1100000];
                    const gastosDias = [800000, 900000, 1000000, 950000];
                    const gananciasDias = ingresosDias.map((ingreso, index) => ingreso - gastosDias[index]);

                    updateChart(diasLabels, ingresosDias, gastosDias, gananciasDias);
                });

                inputYear.addEventListener('click', () => {
                    updateChart(
                        ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
                        ingresos,
                        gastos,
                        ganancias
                    );
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

        // Select Fecha

        onAuthStateChanged(auth, (user) => {
            if (user) {
                const uid = user.uid;

                var selectMonth = document.querySelector('.month')
                var conMonth = document.querySelector('.conMonth')

                var meses = document.querySelectorAll('.meses p')

                var yearMonth = document.querySelector('#yearMonth')
                var yearSelect = parseInt(document.querySelector('#yearMonth').textContent)
                var prevYearMonth = document.querySelector('#prevYearMonth')
                var nextYearMonth = document.querySelector('#nextYearMonth')

                prevYearMonth.addEventListener('click', () => {
                    yearSelect--
                    yearMonth.textContent = yearSelect
                })

                nextYearMonth.addEventListener('click', () => {
                    yearSelect++
                    yearMonth.textContent = yearSelect
                })

                meses.forEach(mes => {
                    mes.addEventListener('click', () => {

                        if (mes.textContent == "Enero") {
                            selectMonth.value = `01/${yearMonth.textContent}`
                        } else if (mes.textContent == "Febrero") {
                            selectMonth.value = `02/${yearMonth.textContent}`
                        } else if (mes.textContent == "Marzo") {
                            selectMonth.value = `03/${yearMonth.textContent}`
                        } else if (mes.textContent == "Abril") {
                            selectMonth.value = `04/${yearMonth.textContent}`
                        } else if (mes.textContent == "Mayo") {
                            selectMonth.value = `05/${yearMonth.textContent}`
                        } else if (mes.textContent == "Junio") {
                            selectMonth.value = `06/${yearMonth.textContent}`
                        } else if (mes.textContent == "Julio") {
                            selectMonth.value = `07/${yearMonth.textContent}`
                        } else if (mes.textContent == "Agosto") {
                            selectMonth.value = `08/${yearMonth.textContent}`
                        } else if (mes.textContent == "Septiembre") {
                            selectMonth.value = `09/${yearMonth.textContent}`
                        } else if (mes.textContent == "Octubre") {
                            selectMonth.value = `10/${yearMonth.textContent}`
                        } else if (mes.textContent == "Noviembre") {
                            selectMonth.value = `11/${yearMonth.textContent}`
                        } else if (mes.textContent == "Diciembre") {
                            selectMonth.value = `12/${yearMonth.textContent}`
                        }

                        conMonth.classList.remove('active')

                    })
                })

                selectMonth.addEventListener('click', () => {
                    conMonth.classList.add('active')
                    window.addEventListener('click', event => {
                        if (event.target == conMonth) {
                            conMonth.classList.remove('active')
                        }
                    })
                })

                var dayInput = document.querySelector('.day');
                var conCalendar = document.querySelector('.con_calendar');
                let currentDayElement = null;

                const updateInputWithDate = (date) => {
                    let day = date.getDate().toString().padStart(2, '0');
                    let month = (date.getMonth() + 1).toString().padStart(2, '0');
                    let year = date.getFullYear();
                    dayInput.value = `${day}/${month}/${year}`;
                };

                const isLeapYear = (year) => {
                    return (year % 4 === 0 && year % 100 !== 0 && year % 400 !== 0) ||
                        (year % 100 === 0 && year % 400 === 0);
                };

                const getFebDays = (year) => {
                    return isLeapYear(year) ? 29 : 28;
                };

                let calendar = document.querySelector('.calendar');
                const month_names = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

                let month_picker = document.querySelector('#month-picker');

                month_picker.onclick = () => {
                    month_list.classList.add('show');
                };

                const genetaCalendar = (month, year) => {
                    let calendar_days = document.querySelector('.calendar-days');
                    calendar_days.innerHTML = '';
                    let calendar_header_year = document.querySelector('#year');

                    let days_of_month = [31, getFebDays(year), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

                    let currDate = new Date();

                    month_picker.innerHTML = month_names[month];
                    calendar_header_year.innerHTML = year;

                    let first_day = new Date(year, month, 1);
                    let total_days = days_of_month[month];

                    for (let i = 0; i < first_day.getDay(); i++) {
                        const day = document.createElement('div');
                        day.classList.add('empty');
                        calendar_days.appendChild(day);
                    }

                    for (let i = 1; i <= total_days; i++) {
                        const day = document.createElement('div');
                        day.classList.add('calendar-day-hover');
                        day.innerHTML = i;
                        day.innerHTML += `<span></span><span></span><span></span><span></span>`;

                        if (i === currDate.getDate() && year === currDate.getFullYear() && month === currDate.getMonth()) {
                            day.classList.add('curr-date');
                            currentDayElement = day;
                        }

                        day.addEventListener('click', () => {
                            if (currentDayElement) {
                                currentDayElement.classList.remove('curr-date');
                            }
                            day.classList.add('curr-date');
                            currentDayElement = day;
                            const selectedDate = new Date(year, month, i);
                            updateInputWithDate(selectedDate);
                            conCalendar.classList.remove('active');
                        });

                        calendar_days.appendChild(day);
                    }
                };

                let month_list = calendar.querySelector('.month-list');

                month_names.forEach((e, index) => {
                    let month = document.createElement('div');
                    month.innerHTML = `<div>${e}</div>`;
                    month.onclick = () => {
                        month_list.classList.remove('show');
                        curr_month.value = index;
                        genetaCalendar(curr_month.value, curr_year.value);
                    };
                    month_list.appendChild(month);
                });

                document.querySelector('#prev-year').onclick = () => {
                    --curr_year.value;
                    genetaCalendar(curr_month.value, curr_year.value);
                };

                document.querySelector('#next-year').onclick = () => {
                    ++curr_year.value;
                    genetaCalendar(curr_month.value, curr_year.value);
                };

                let currDate = new Date();

                let curr_month = { value: currDate.getMonth() };
                let curr_year = { value: currDate.getFullYear() };

                genetaCalendar(curr_month.value, curr_year.value);

                updateInputWithDate(currDate);

                dayInput.addEventListener('click', () => {
                    conCalendar.classList.add('active');
                    window.addEventListener('click', event => {
                        if (event.target == conCalendar) {
                            conCalendar.classList.remove('active');
                        }
                    });
                });
            } else {
                const tryAgain = document.getElementById('okBtn');
                const modal = document.querySelector('.modal');
                modal.classList.add('active');
                tryAgain.addEventListener('click', () => {
                    location.href = "/views/login/login.html";
                });
            }
        });

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