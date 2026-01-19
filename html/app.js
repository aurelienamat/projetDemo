const monInput = document.getElementById('nom');
const monBouton = document.getElementById('btn');

const autreBouton = document.getElementById('btn1');

const titre = document.getElementById('titre2');

// Ajout d'un écouteur d'événement sur le bouton
monBouton.addEventListener('click', () => {
    fetch('/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ inputValue: monInput.value })     
    }).then(response => response.text())
      .then(data => {
          alert(data);
      })
      .then(console.log("Fin"));
});

autreBouton.addEventListener('click', () => {
    fetch('/info').then(response => response.json()).then(repjson => {titre.innerHTML = repjson.cle1});
});
