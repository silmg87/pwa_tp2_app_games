// EJECUCION DE LA FUNCION mostrarFavoritos
if (!localStorage.favoritos) {
    console.log('No existen favoritos')

    let div = document.createElement('div')
        div.classList = 'text-center mensaje mt-5'
    let p = document.createElement('p')
        p.innerHTML = `Aun no tienes juegos favoritos, <br> ¿Que esperas para añadir uno?`;

    document.querySelector('main').append(div)
    div.append(p)
}

if (JSON.parse(localStorage.getItem('favoritos')).length == 0) {
    localStorage.removeItem('favoritos')
}

const mostrarFavoritos = () => {

    if (localStorage.favoritos) {
        console.log('Existen favoritos')

        let divResultado = document.createElement('div');
        divResultado.id = 'resultado';
        divResultado.className = 'd-flex flex-wrap justify-content-center align-items-center mt-5';
        let main = document.getElementById('main');
        main.append(divResultado);

        let favoritos = JSON.parse(localStorage.favoritos)

        favoritos.forEach(favorito => {
            fetch(`https://api.rawg.io/api/games/${favorito.id}?key=${APIKEY}`)
                    .then( response =>  { return response.json() })
                        .then (json => { 
                            console.log(json);
                        
                            let divCard1 = document.createElement('div');
                            divCard1.className = 'd-flex flex-wrap justify-content-center align-items-center';
                        
                            divResultado.append(divCard1); 
                            
                            let divCard2 = document.createElement('div');
                            divCard2.className = 'card resultado';
                            divCard1.append(divCard2);
                        
                            let img = document.createElement('img');
                            img.src = json.background_image;
                            img.className = 'card-img-top imgResultado';
                        
                            let divCard3 = document.createElement('div');
                            divCard3.className = 'card-body juegos d-flex justify-content-between';
                            divCard2.append(img, divCard3);

                            let a = document.createElement('a');
                            a.href = 'modalJuego';

                            // FUNCION CONSTRUCTURA DE LA VENTANA MODAL
                            a.addEventListener('click', event => {
                                event.preventDefault();
                                
                                let id = json.id;

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
                                    img.src = json.background_image;
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
                                    li1.innerHTML = `<span>Genre</span> ${json.genres[0].name}`;
                                    let li2 = document.createElement('li');
                                    li2.innerHTML = `<span>Release date</span> ${json.released}`;
                                    ul1.append(li1, li2);
                
                                    let ul2 = document.createElement('ul');
                                    ul2.className = 'd-flex justify-content-between info';
                                    let li3 = document.createElement('li');
                                    li3.innerHTML = `<span>Publisher</span> ${json.publishers[0].name}`;
                                    let li4 = document.createElement('li');
                                    li4.innerHTML = `<span>Metascore</span> <span>${json.metacritic}</span>`;
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
                            h5Titulo.innerHTML = json.name;
                        
                            let divFavorito = document.createElement('div');
                            let labelFavorito = document.createElement('label');
                            labelFavorito.htmlFor = json.id;
                            let checkFavorito = document.createElement('input');
                            checkFavorito.type = 'checkbox';  
                            checkFavorito.checked = true;
                            checkFavorito.id = json.id;
                            checkFavorito.name = json.name;
                            checkFavorito.addEventListener('change', e => {
                                estado(e);
                            }) 
                    
                            divFavorito.append(checkFavorito, labelFavorito);
                        
                            a.append(h5Titulo);
                            divCard3.append(a, divFavorito);                            
                            });
        });
    };
}

const estado = (e) => {
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

mostrarFavoritos();
