let novedades = JSON.parse(localStorage.novedades)

let sectionNovedades = document.createElement('section');
sectionNovedades.id = 'novedades';
sectionNovedades.className = 'd-flex flex-column justify-content-center align-items-center';

let main = document.getElementById('main');
main.append(sectionNovedades);

const listNovedades = () => {

    novedades.forEach(novedad => {
        
        let article = document.createElement('article');
        article.className = 'card';
        article.id = novedad.id
        sectionNovedades.append(article)

        let divCard2 = document.createElement('div');
        article.append(divCard2);

        let divCard3 = document.createElement('div');
        divCard2.append(divCard3);

        let imgNovedades = document.createElement('img');
        imgNovedades.className = 'imgNovedades img-fluid';
        imgNovedades.src = '../image/novedades1.jpg'; //novedad.image;
        imgNovedades.atl = novedad.titulo;
        divCard3.append(imgNovedades)

        let divCard4 = document.createElement('div');
        article.append(divCard4)

        let divCard5 = document.createElement('div');
        divCard5.className = 'card-body';
        divCard4.append(divCard5);

        let title = document.createElement('h5');
        title.className = 'card-title';
        title.innerHTML = novedad.titulo;
        divCard5.append(title)

        let text1 = document.createElement('p');
        text1.className = 'card-text';
        text1.innerHTML = novedad.texto
        divCard5.append(text1)

        let text2 = document.createElement('p');
        text2.className = 'card-text';
        divCard5.append(text2)

        let small = document.createElement('small');
        small.className = 'text-muted';
        small.innerHTML = novedad.descripcion
        text2.append(small);
    });
}
listNovedades();