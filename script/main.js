// DECLARACION DE VARIABLES
const APIKEY = '38d5e808c5ec460db70f8cb787f5d0ee';
//const APIKEY = '71388fa6bc1242419e2f8377bf447483';
const btn = document.getElementById('buscar');
const inputBusqueda = document.getElementById('inputBusqueda');


// LOADING
window.onload = function() {
    let spinner = document.getElementById('loader');
    setTimeout(() => {
        spinner.remove();
    },
    2000);    
}


// SECCION NOVEDADES
fetch('https://final-programacion-1.000webhostapp.com/novedades.php')
    .then(resp => resp.json())
    .then(data => { localStorage.setItem('novedades', JSON.stringify(data))
})


// VALIDACION  
const validacion = () => {
    if (!inputBusqueda) {
        let divError = document.createElement('div');
        divError.className = 'mensaje';
        let body = document.querySelector('body');
        body.append(divError);
        divError.innerHTML = `Oops, ha ocurrido un error!<br/>
                        Verifique que vaya ingresado correctamente el nombre del juego e intentelo nuevamente.`;

        setTimeout(() => {
            divError.remove();
        },
        5000); 
    }
}


// FUNCION CONSTRUCTORA DEL RESULTADO DE LA BUSQUEDA
let divResultado = document.createElement('div');
divResultado.id = 'resultado';

const cardResultado = (json) => {
    divResultado.innerHTML = '';
    divResultado.className = 'container mt-5 py-5';

    let divCard1 = document.createElement('div');
    divCard1.className = 'd-flex flex-wrap justify-content-center align-items-center';

    divResultado.append(divCard1); 
    
    for (let juego of json.results) {      
        let divCard2 = document.createElement('div');
        divCard2.className = 'card resultado';
        divCard1.append(divCard2);

        let img = document.createElement('img');
        img.src = juego.background_image;
        img.className = 'card-img-top imgResultado';

        let divCard3 = document.createElement('div');
        divCard3.className = 'card-body juegos d-flex justify-content-between';

        let a = document.createElement('a');
        a.href = 'modalJuego';

        // FUNCION CONSTRUCTURA DE LA VENTANA MODAL
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
                    ul1.className = 'd-flex justify-content-between info';
                    let li1 = document.createElement('li');
                    li1.innerHTML = `<span>Genre</span> ${juego.genres[0].name}`;
                    let li2 = document.createElement('li');
                    li2.innerHTML = `<span>Release date</span> ${juego.released}`;
                    ul1.append(li1, li2);

                    let ul2 = document.createElement('ul');
                    ul2.className = 'd-flex justify-content-between info';
                    let li3 = document.createElement('li');
                    li3.innerHTML = `<span>Publisher</span> ${json.publishers[0].name}`;
                    let li4 = document.createElement('li');
                    li4.innerHTML = `<span>Metascore</span> <span>${juego.metacritic}</span>`;
                    ul2.append(li3, li4);

                    let divPlataformas = document.createElement('div');
                    divPlataformas.className = 'divPlataformas';
                    divPlataformas.innerHTML = '<p>Platforms</p';
                    for (let items of json.platforms) {
                        let span = document.createElement('span');
                        span.innerHTML = `${items.platform.name} `;  
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

                    divBtn.append(button1)

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
        checkFavorito.name = juego.name;
        checkFavorito.addEventListener('change', e => {
            estadoFavoritos(e);
        }) 

        divFavorito.append(checkFavorito, labelFavorito);

        a.append(h5Titulo);
        divCard3.append(a, divFavorito);
        divCard2.append(img, divCard3);
    }
    
    let main = document.getElementById('main');
    main.append(divResultado);

    verificarFavoritos();
}


// EVENTO CLICK DEL BOTON BUSCAR
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

    .catch(error=>{ 
        let divError = document.createElement('div');
        divError.className = 'mensaje';
        let body = document.querySelector('body');
        body.append(divError);
        divError.innerHTML = `Oops, ha ocurrido un error!<br/>
                        Verifique que vaya ingresado correctamente el nombre del juego e intentelo nuevamente.`;

        setTimeout(() => {
            divError.remove();
        },
        5000); 
    })
        
    inputBusqueda.value = '';
})


// LOCALSTORAGE
const estadoFavoritos = (e) => {
    let estado = e.target.checked;
    let id = e.target.id;
    let titulo = e.target.name;

    let ids = [];
    let data = {id, titulo};

    if (estado === true) {

        if (localStorage.getItem('favoritos')) {
            ids = JSON.parse(localStorage.favoritos);
            ids.push(data);
            localStorage.setItem('favoritos', JSON.stringify(ids));
        }

        if (!localStorage.getItem('favoritos')) {
            ids.push(data);
            localStorage.setItem('favoritos', JSON.stringify(ids));
        }
    }

    if (estado === false) {
        let found;
        let index;
        let favoritos = JSON.parse(localStorage.favoritos);
        found = favoritos.find(favorito => favorito.id == data.id);            
        index = favoritos.indexOf(found);
        favoritos.splice(index, 1);
        localStorage.setItem('favoritos', JSON.stringify(favoritos));
    }
}


// FAVORITOS 
const verificarFavoritos = () => {
    let found;
    let favoritos = JSON.parse(localStorage.favoritos)
    let inputs = document.querySelectorAll('input')
        inputs.forEach(input => {
            found = favoritos.find(favorito => favorito.id == input.id);
            if (found != undefined) {
                input.checked = true;
            }
        })
}


// ONLINE Y OFFLINE APP
window.addEventListener('offline', event => {
    console.log('Web App sin cconexión', event);
    let div = document.getElementById('notificacion')
    div.className = 'mensaje text-center';
    div.style.display = "block";
    let box = document.getElementById('fondo-box');
    box.style.display = "block";
});

window.addEventListener('online', event => {
    console.log('Web App conectada', event);
});


