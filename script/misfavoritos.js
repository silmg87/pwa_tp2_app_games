// EJECUCION DE LA FUNCION mostrarFavoritos
if (JSON.parse(localStorage.getItem('favoritos')).length == 0) {
    localStorage.removeItem('favoritos')
}

const mostrarFavoritos = () => {

    if (!localStorage.favoritos) {
        console.log('No existen favoritos')

        let div = document.createElement('div')
            div.classList = 'text-center w-100'
            div.style.paddingTop = '20vh'
        let p = document.createElement('p')
            p.innerHTML = `Aun no tienes juegos favoritos, <br> ¿Que esperas para añadir uno?`;
            p.style.fontSize = '3em'
            p.style.lineHeight = '1.4em'

        document.querySelector('main').append(div)
        div.append(p)
    }

    if (localStorage.favoritos) {
        console.log('Existen favoritos')

        let divResultado = document.createElement('div');
        divResultado.id = 'resultado';
        divResultado.className = 'container mt-5 py-5';
        
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

                            let h5Titulo = document.createElement('h5');
                            h5Titulo.className = 'card-title';
                            h5Titulo.innerHTML = json.name;
                        
                            let divFavorito = document.createElement('div');
                            let labelFavorito = document.createElement('label');
                            labelFavorito.htmlFor = json.id;
                            let checkFavorito = document.createElement('input');
                            checkFavorito.type = 'checkbox';  
                            checkFavorito.id = json.id;
                            checkFavorito.name = json.name;
                            checkFavorito.addEventListener('change', e => {
                                estadoFavoritos(e);
                            }) 
                    
                            divFavorito.append(checkFavorito, labelFavorito);
                        
                            a.append(h5Titulo);
                            divCard3.append(a, divFavorito);
                            

                            });
                            
        });
        
    };
}

mostrarFavoritos();