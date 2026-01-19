const monInput = document.getElementById('nom');
const monInputPassWord = document.getElementById('password');
const monBouton = document.getElementById('btn');

const autreBouton = document.getElementById('btn1');

const titre = document.getElementById('titre2');

var i = 1;
// Ajout d'un écouteur d'événement sur le bouton
monBouton.addEventListener('click', () => {
    fetch('/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ loginValue: nom.value ,passwordValue: password.value})
    }).then(response => response.text())
        .then(data => {
            alert(data);
        });
    i++;
});

autreBouton.addEventListener('click', () => {
    fetch('/info').then(response => response.json()).then(repjson => {titre.innerHTML = repjson.cle1});
});
