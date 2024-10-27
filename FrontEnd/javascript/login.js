document.addEventListener('DOMContentLoaded', function() {
    const loginApiURL = 'http://localhost:5678/api/users/login';
    const connection = document.getElementById('connection');

    connection.addEventListener('click', function(event) {
        event.preventDefault(); // Empêche la soumission du formulaire

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        console.log('Tentative de connexion avec:', { email, password });

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
            console.log('response.ok =',response.ok)
            console.log('response.status =',response.status)
            if (!response.ok) {
                console.log ('chemin reponse')
                if (response.status == 404) {
                    document.getElementById ('error-msg').textContent = 'Utilisateur non-trouve-404';
                    return;
                    //throw new Error('Identifiant incorrect.'); 
                }
                return response.json().then(errorData => {
                    
                    if (errorData.message === 'user not found') {
                        document.getElementById ('error-msg').textContent = 'Utilisateur non-trouve';
                        return;
                        //throw new Error('Identifiant incorrect.'); 
                    } else if (errorData.message === 'Mot de passe incorrect') {
                        throw new Error('Mot de passe incorrect.');
                    } else {
                        throw new Error('Erreur lors de la connexion.');
                    }
                });
            }
            return response.json();
        })
        .then(data => {
            if (data) {
            console.log('chemin data')
            console.log('Connexion réussie, données:', data);
            //Enregistrer le token dans le localStorage
            sessionStorage.setItem('token', data.token);
            window.location.href = 'index.html';}
        })
        .catch(error => {
            console.log('erreur')
            console.error('Erreur lors de la connexion:', error);
            alert(error.message);
        });
    });
});

