const worksApiURL = 'http://localhost:5678/api/works';
const categoriesApiURL = 'http://localhost:5678/api/categories';
let allWorks = []; // Déclaration de la variable pour stocker tous les travaux

// Récupération des travaux


// Fonction pour afficher les travaux dans la galerie
function displayWorks(works) {
    const gallery = document.getElementById('gallery');
    gallery.innerHTML = ''; // Vider la galerie

    // Boucle pour afficher chaque travail dans la galerie
    works.forEach(work => {
        const workElement = document.createElement('div');

    
        workElement.innerHTML = `
      <img src="${work.imageUrl}" alt="${work.title}" />
      <h3>${work.title}</h3>
      <p>Catégorie : ${work.category.name}</p>
    `;
        gallery.appendChild(workElement); // Ajouter l'élément à la galerie
    });
}





function displayCategories(categories) {
    const filterMenu = document.getElementById('filterMenu');
    filterMenu.innerHTML = '';

    const allButton = document.createElement('button');
    allButton.textContent = 'Tous';
    allButton.addEventListener('click', () => {
        displayWorks(allWorks);
    });
    filterMenu.appendChild(allButton);

    categories.forEach(category => {
        const categoryButton = document.createElement('button');
        categoryButton.textContent = category.name;
        categoryButton.addEventListener('click', () => {
            filterWorksByCategory(category.id);
        });
        filterMenu.appendChild(categoryButton);
    });
}

function filterWorksByCategory(categoryId) {
    const filteredWorks = allWorks.filter(work => work.category.id === categoryId);
    displayWorks(filteredWorks);
}

// Fonction d'initialisation au chargement de la page//
function init() {
    //Afficher les works
    fetch(worksApiURL)
        .then(response => response.json())
        .then(data => {
            console.log("data works", data); // Affiche les données récupérées dans la console
            allWorks = data; // Stocke tous les travaux pour un accès ultérieur
            displayWorks(data); // Affiche les travaux dans la galerie
        })
        .catch(error => {
            console.error('Erreur lors de la récupération des travaux:', error);
        });
    //Affichrer les categories
    fetch(categoriesApiURL)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            displayCategories(data);
        })
        .catch(error => {
            console.error('Erreur lors de la récupération des catégories:', error);
        });
        //Afficher le bandeau
    displaybandeau();
}
// Appel de la fonction d'initialisation//

init();

function displaybandeau() { 
    //Verifier si l'utilisateur est connecté
    if (sessionStorage.getItem('token')) {
        const bandeau = document.getElementById('bandeau');
        bandeau.style.display = 'block';
    }
    //Si connnecté afficher le bandeau

    //Sinon masqué le bandeau

}
    








//Récuperer les works à partir de l'api//
//Se positionner dans le conteneur des works//
//Vider le contenue//
//Parcourir les works recuperer sur l'api//
//Construit l' element a inserer//
//Inserer l'element//




//Detecter le declenchement du click sur ce connecter//
//Recuperer login et mdp renseigner par l'utilisateur//
//Appeler l'api//
//Recuperer les information a partir de l'api login//
//Si erreur Afficher le message a l'utilisateur//
    //Se ppositionner sur le conteneur//
    //Vider le contenue//
    //Inserer le message//
//Si c'est un succes,Afficher la page d'acceuil a nouveau//




