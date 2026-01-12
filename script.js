// constantes dos scripts + headers da API

const API_URL = 'https://medina-portfolio-api-2e362865a1d8.herokuapp.com/projects';

const HEADERS = new Headers({
    "Content-Type": "application/json",
    "PORTFOLIO-API-KEY": "medina-personal-key"
});

const REQUEST_OPTIONS = {
    method: 'GET',
    headers: HEADERS,
    redirect: 'follow'
};

// github SVG
const GITHUB_SVG = `
    <svg viewBox="0 0 24 24" width="20" height="20">
        <path d="M12 0.5C5.73 0.5 0.5 5.73 0.5 12c0 5.1 3.29 9.42 7.86 10.96.57.1.78-.25.78-.55v-2.02c-3.2.7-3.88-1.54-3.88-1.54-.52-1.33-1.28-1.68-1.28-1.68-1.05-.72.08-.71.08-.71 1.16.08 1.77 1.19 1.77 1.19 1.03 1.76 2.71 1.25 3.37.96.1-.75.4-1.25.72-1.54-2.55-.29-5.23-1.28-5.23-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11.1 11.1 0 0 1 5.8 0c2.21-1.49 3.18-1.18 3.18-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.43-2.69 5.41-5.25 5.69.41.35.77 1.04.77 2.1v3.11c0 .3.21.65.79.54A11.52 11.52 0 0 0 23.5 12C23.5 5.73 18.27.5 12 .5z"/>
    </svg>
`;

// fetch da API

async function fetchApi() {
    try {
        // em um cenario real o fetch ocorreria aqui
        let response = await fetch(API_URL, REQUEST_OPTIONS);

        if(!response.ok) {
            throw new Error('API não respondendo.');
        }

        return await response.json(); // o fetch retorna o objeto JS 

    } catch (error) {
        console.error("erro ao buscar dados:", error);
        return [];
    }
}



// funcoes para o DOM

function formatCategory(rawCategory) {
    if(rawCategory === 'FRONT_END') return 'Front-end';
    if(rawCategory === 'BACK_END') return 'Back-end';
    return 'Full Stack';
}

async function construirCard(visibility, name, subtitle, creationDate, category, githubUrl, description) {

    // selecionamos o container do HTML para adicionar o card criado ao final
    let cardContainer = document.querySelector('.project-card-container');
    
    // criamos uma div com a classe project-card para cada card
    let card = document.createElement('div');
    card.classList.add('project-card');
    
    // se o card não deve ser visivel, é adicionada essa classe a ele
    if(visibility === false) {
        card.classList.add('hidden');
    }

    // header do card - secao de simbolos bonitinhos
    let cardHeader = document.createElement('div');
    cardHeader.classList.add('card-header');

    // criando o elemento da pasta e colocando o icone lá com as classes
    let folderIcon = document.createElement('span');
    folderIcon.classList.add('material-symbols-outlined', 'folder-icon');
    folderIcon.textContent = 'folder_info';

    // o mesmo para o github, mas aqui tambem manipulamos o href desse botao
    let githubLink = document.createElement('a');
    githubLink.href = githubUrl;
    githubLink.target = '_blank';
    githubLink.classList.add('github-button');
    githubLink.innerHTML = GITHUB_SVG + ' Code'; 

    cardHeader.append(folderIcon, githubLink);

    // corpo do card
    // titulo do card
    let cardTitle = document.createElement('h3');
    cardTitle.classList.add('card-title');
    cardTitle.textContent = name;

    // subtitulo do card
    let cardSubtitle = document.createElement('p');
    cardSubtitle.classList.add('card-subtitle');
    cardSubtitle.textContent = subtitle;

    // criamos um container para a descricao do projeto
    let descBox = document.createElement('div');
    descBox.classList.add('card-description-box');
    // agora sim damos a descricao, nao lembro o pq exatamente do container, mas acho que é pela altura
    let cardDesc = document.createElement('p');
    cardDesc.classList.add('card-description');
    cardDesc.textContent = description;
    // colocamos a descricao dentro do container de descricao
    descBox.append(cardDesc);

    let metaBox = document.createElement('div');
    metaBox.classList.add('card-meta'); // isso aqui é pra formatarmos a data bonitinho no fim do card
    
    metaBox.textContent = 'Criado em: ' + creationDate;

    // --- footer do card ---
    let cardFooter = document.createElement('div');
    cardFooter.classList.add('card-footer');

    let typeBadge = document.createElement('span'); 
    typeBadge.classList.add('card-type');
    typeBadge.textContent = category;

    cardFooter.append(typeBadge);

    // montando tudo na ordem tambem
    card.append(
        cardHeader,
        cardTitle,
        cardSubtitle,
        descBox,
        metaBox,
        cardFooter
    );

    // adicionamos ao container, evitamos return
    cardContainer.append(card);
}

// Função de criar skeletons
function criarSkeletonCards(quantidade = 6) {
    const container = document.querySelector('.skeleton-card-container');

    // limpa antes de criar
    container.innerHTML = '';

    for (let i = 0; i < quantidade; i++) {

        // criamos o skeleton card em si - o card como container e elemento
        const card = document.createElement('div');
        card.classList.add('skeleton-card');

        // simulamos o header
        const header = document.createElement('div');
        header.classList.add('skeleton-header');

        const icon = document.createElement('div');
        icon.classList.add('skeleton-line', 'skeleton-icon');

        const button = document.createElement('div');
        button.classList.add('skeleton-line', 'skeleton-button');

        header.append(icon, button);

        // simulamos o title
        const title = document.createElement('div');
        title.classList.add('skeleton-line', 'skeleton-title');

        // simulamos o subtitle
        const subtitle = document.createElement('div');
        subtitle.classList.add('skeleton-line', 'skeleton-subtitle');

        // simulamos o description
        const description = document.createElement('div');
        description.classList.add('skeleton-line', 'skeleton-description');

        // simulamos o meta
        const meta = document.createElement('div');
        meta.classList.add('skeleton-line', 'skeleton-meta');

        // simulamos o footer
        const footer = document.createElement('div');
        footer.classList.add('skeleton-footer');

        const badge = document.createElement('div');
        badge.classList.add('skeleton-line', 'skeleton-badge');

        footer.append(badge);

        // montando tudo na ordem que vai aparecer
        card.append(
            header,
            title,
            subtitle,
            description,
            meta,
            footer
        );

        // colocando esse card no container
        container.append(card);
    }
}


// funcao principal

async function genesis() {
    // criamos o skeleton aqui dentro, antes de mais nada 
    // primeiro proque estamos esperando resposta da API
    // segundo pra evitar bugs ;p

    criarSkeletonCards(); 

    try {
        // buscando os dados da API
        let data = await fetchApi();

        // estamos selecionando ambos wrappers do skeleton e dos cards de project
        const skeletonWrapper = document.querySelector('.skeleton-card-wrapper');
        const projectWrapper  = document.querySelector('.project-card-wrapper');

        for(let i = 0; i < data.length; i++) {
            
            // chamamos a funcao de construcao repassando todos os param que isolamos com o [i] + .nomedoAtributo
            construirCard(
                data[i].visible,
                data[i].name,
                data[i].subtitle,
                data[i].creationDate,
                formatCategory(data[i].category), // ja estamos formatando a categoria com a nossa funcao la de cima
                data[i].githubUrl,
                data[i].projectDescription.longDescription
            );
        }

        // quando tudo estiver pronto, removemos a visibilidade do skeleton e damos ela ao DOM
        skeletonWrapper.classList.remove('dom-visible');
        skeletonWrapper.classList.add('dom-no-visible');

        projectWrapper.classList.remove('dom-no-visible');
        projectWrapper.classList.add('dom-visible');
        

    } catch (e) {
        console.error('Erro na função genesis:', e.message);
    }
}


genesis();


// funcao do menu 

function openMenu() {
    // selecionando o header todo, isso pois para que seja possível animar esse menu
    // o menu sempre existe, o que muda é o estado dele
    // essa classe só serve pra repassarmos o estado para o css
    
    const header = document.querySelector('.header');
    header.classList.toggle('menu-open')

}



// funcao de digitacao

const targetElement = document.querySelector('#auto-type');
const words = ['APIs', 'interfaces', 'aplicações', 'experiências']; // depois você pode virar array de várias
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typingEffect() {
    const currentWord = words[wordIndex];

    // escreve ou apaga            
    if (!isDeleting) {
        targetElement.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
    } else {
        targetElement.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
    }

    // controle de delay
    let delay = isDeleting ? 50 : 100;

    // pausa após digitar
        if (!isDeleting && charIndex === currentWord.length) {
        delay = 1200;
        isDeleting = true;
    }

    // pausa após apagar
        else if (isDeleting && charIndex === 0) {
        delay = 50;
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
    }

    setTimeout(typingEffect, delay);
}

typingEffect();


// Funcao para visualizacao de curriculo em celulares (nao da pra fazer download)

const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
const cvLink = document.getElementById('cv-link');

if (isMobile) {
    cvLink.removeAttribute('download');
    cvLink.setAttribute('target', '_blank');
    cvLink.textContent = 'Abrir CV (PDF)';
}