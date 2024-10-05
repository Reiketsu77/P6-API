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


function init() {
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

    fetch(categoriesApiURL)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            displayCategories(data);
        })
        .catch(error => {
            console.error('Erreur lors de la récupération des catégories:', error);
        });
}

init();