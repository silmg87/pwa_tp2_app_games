// DECLARACION DE VARIABLES
const APIKEY = '38d5e808c5ec460db70f8cb787f5d0ee';
//const APIKEY = '71388fa6bc1242419e2f8377bf447483';
const btn = document.getElementById('buscar');
const inputBusqueda = document.getElementById('inputBusqueda');


let divResultado = document.createElement('div');
divResultado.id = 'resultado';

// FUNCION CARD RESULTADOS
const cardResultado = (json) => {
    divResultado.innerHTML = '';
    divResultado.className = 'container mt-5 py-5';

    let divCard1 = document.createElement('div');
    divCard1.className = 'row row-cols-1 row-cols-md-3 g-4';

    divResultado.append(divCard1); 
    
    for (let juego of json.results) {
        let divCard2 = document.createElement('div');
        divCard2.className = 'col resultado';
        divCard1.append(divCard2);

        let divCard3 = document.createElement('div');
        divCard3.className = 'card h-100';
        divCard2.append(divCard3);

        let img = document.createElement('img');
        img.src = juego.background_image;
        img.className = 'imgResultado';

        let divCard4 = document.createElement('div');
        divCard4.className = 'card-body juegos d-flex justify-content-between';

        let a = document.createElement('a');
        a.href = 'modalJuego';

        // Ventana Modal
        a.addEventListener('click', event => {
            event.preventDefault();
            
            let id = juego.id;

            fetch(`https://api.rawg.io/api/games/${id}?key=${APIKEY}`)
                .then(response=>{
                    return response.json();
                })

                .then(json=>{
                    console.log(json);
                    let modalJuego = document.createElement('div');
                    modalJuego.id = 'modalJuego';
                    modalJuego.className = 'modal';

                    let divModal = document.createElement('div');
                    divModal.className = 'divModal';

                    // Cierre de la ventana modal
                    let cerrarModal = document.createElement('a');
                    cerrarModal.href = 'javascript:void(0)';
                    cerrarModal.className = 'cerrar';
                    cerrarModal.innerHTML = 'x';
                    cerrarModal.addEventListener('click', (e) => {
                    document.querySelector('#modalJuego').remove();
                    return false;
                    });

                    document.body.append(modalJuego);
                    modalJuego.append(cerrarModal, divModal);

                    let img = document.createElement('img');
                    img.src = juego.background_image;
                    img.className = 'imgModal';

                    let h5Titulo = document.createElement('h5');
                    h5Titulo.className = 'card-title my-5 title';
                    h5Titulo.innerHTML = json.name;

                    let pDescripcion = document.createElement('p');
                    pDescripcion.innerHTML = json.description;
                    pDescripcion.className = 'my-4';

                    let divInfo = document.createElement('div');
                    divInfo.className = 'divInfo';

                    let ul1 = document.createElement('ul');
                    ul1.className = 'd-flex flex-row justify-content-between info';
                    let li1 = document.createElement('li');
                    li1.innerHTML = `<span>Genre:</span> ${juego.genres[0].name}`;
                    let li2 = document.createElement('li');
                    li2.innerHTML = `<span>Release date:</span> ${juego.released}`;
                    ul1.append(li1, li2);

                    let ul2 = document.createElement('ul');
                    ul2.className = 'd-flex flex-row justify-content-between info';
                    let li3 = document.createElement('li');
                    li3.innerHTML = `<span>Publisher:</span> ${json.publishers[0].name}`;
                    let li4 = document.createElement('li');
                    li4.innerHTML = `<span>Metascore:</span> <span>${juego.metacritic}</span>`;
                    ul2.append(li3, li4);

                    let divPlataformas = document.createElement('div');
                    divPlataformas.className = 'divPlataformas';
                    divPlataformas.innerHTML = 'Platforms: ';
                    for (let items of json.platforms) {
                        let span = document.createElement('span');
                        span.innerHTML = `${items.platform.name}, `;  
                        divPlataformas.append(span);                     
                    }
                    
                    divInfo.append(ul1, ul2, divPlataformas);

                    let divBtn = document.createElement('div');
                    divBtn.className = 'd-flex divBtn';
                    let button1 = document.createElement('button');
                    button1.innerHTML = 'Cerrar';
                    button1.className = 'btn button1 m-3';
                    button1.addEventListener('click', (e) => {
                        document.querySelector('#modalJuego').remove();
                        return false;
                        });

                    let button2 = document.createElement('button');
                    button2.innerHTML = 'Me gusta';
                    button2.className = 'btn button2 m-3';
                    divBtn.append(button1, button2)

                    divModal.append(h5Titulo, img, pDescripcion, divInfo, divBtn);
                })  
        })
        
        let h5Titulo = document.createElement('h5');
        h5Titulo.className = 'card-title';
        h5Titulo.innerHTML = juego.name;

        let divFavorito = document.createElement('div');
        let labelFavorito = document.createElement('label');
        labelFavorito.htmlFor = juego.id;
        let checkFavorito = document.createElement('input');
        checkFavorito.type = 'checkbox';  
        checkFavorito.id = juego.id;     
        divFavorito.append(checkFavorito, labelFavorito);

        a.append(h5Titulo);
        divCard4.append(a, divFavorito);
        divCard3.append(img, divCard4);
    }
    
    let main = document.getElementById('main');
    main.append(divResultado);
}



btn.addEventListener('click', event => {
    event.preventDefault();

    let portada = document.getElementById('portada-inicio');
    portada.style.height = '50vh';
    let pInicio = document.getElementById('p-inicio');
    pInicio.style.display = 'none';
    
        fetch(`https://api.rawg.io/api/games?key=${APIKEY}&search=${inputBusqueda.value}`)
        .then(response=>{
            return response.json();
        })

        .then(json=>{
            console.log(json)
            cardResultado(json);
        })

        // .catch(error=>{ 
        //     let divError = document.createElement('div');
        //     divError.className = 'error';
        //     let body = document.querySelector('body');
        //     body.append(divError);
        //     divError.innerHTML = `Oops, ha ocurrido un error!<br/>
        //                     Verifique que vaya ingresado correctamente el nombre del juego e intentelo nuevamente.`;

        //     setTimeout(() => {
        //         divError.remove();
        //     },
        //     5000); 
        //})
        
        inputBusqueda.value = '';
})



// Estado: Conexión y desconexión
window.addEventListener('offline', event => {
    console.log('Aplicación desconectada', event);
});

window.addEventListener('online', event => {
    console.log('Aplicación conectada', event);
});

if (!navigator.onLine) {
    console.log('Aplicación sin conexión al cargar');
}


// Loading
// window.onload = function() {
//     let spinner = document.getElementById('loader');
//     setTimeout(() => {
//         spinner.remove();
//     },
//     1000);    
// }


// Función para instalar al app
// var deferredPrompt;

// window.addEventListener('beforeinstallprompt', function (e) {
//   // Prevent Chrome 67 and earlier from automatically showing the prompt
//   e.preventDefault();
//   // Stash the event so it can be triggered later.
//   deferredPrompt = e;
//   showAddToHomeScreen();
// });
   

// function showAddToHomeScreen() {
//   var a2hsBtn = document.querySelector(".ad2hs-prompt");
//   a2hsBtn.style.display = "block";
//   a2hsBtn.addEventListener("click", showAddToHomeScreen());

// }


// let installApp;

// window.addEventListener('beforeinstallprompt', (e) => {
//   e.preventDefault();
//   installApp = e;
//   showInstallPromotion();
//   console.log('Activación del evento beforeinstallprompt');
// });

// let installBtn = document.getElementById('installBtn');
// installBtn.addEventListener('click', async () => {
//     //hideInstallPromotion();
//     installApp.prompt();
//     const { outcome } = await installApp.userChoice;
//     console.log(`User response to the install prompt: ${outcome}`);
//     installApp = null;
//   });

// window.addEventListener('appinstalled', () => {
//     //hideInstallPromotion();
//     installApp = null;
//     console.log('PWA fue instalada exitosamente');
// });


let beforeInstallPrompt = null;
window.addEventListener("beforeinstallprompt", eventHandler, errorHandler);

function eventHandler(event){
    beforeInstallPrompt = event;        
}

function errorHandler(event){
    console.log('error: ' + event);
}

function eventHandler(event){
    beforeInstallPrompt = event;
    document.getElementById('installBtn').style.display = 'block';
}

let installBtn = document.getElementById('installBtn');
installBtn.addEventListener('click', event => {
    if (beforeInstallPrompt) beforeInstallPrompt.prompt();
});
