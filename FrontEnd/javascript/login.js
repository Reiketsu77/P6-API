const loginApiURL = 'http://localhost:5678/api/users/login';
const connection = document.getElementById('connection');


connection.addEventListener('click', function(event) {
    event.preventDefault(); 

    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    
    console.log('Le bouton "Se connecter" a été cliqué.');
    console.log('Email:', email);
    console.log('Password:', password);

    
    fetch(loginApiURL, {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json' 
        },
        body: JSON.stringify({
            email: email,  
            password: password  
        })
    })
    .then(response => {
        if (response.ok) {
            return response.json(); 
        } else {
            throw new Error('Erreur lors de la connexion. Vérifiez vos identifiants.');
        }
    })
    .then(data => {
        console.log("Réponse de l'API:", data);

        
        window.location.href = 'index.html';
    })
    .catch(error => {
        console.error('Erreur lors de la connexion:', error);
        alert(error.message); 
    });
});