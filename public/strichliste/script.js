const addBtn = document.getElementById('addBtn');
const removeBtn = document.getElementById('removeBtn');
const counter = document.getElementById('counter');

addBtn.addEventListener('click', () => {
    fetch('/strichliste/add')
        .then(res => {
            if (res.ok) {
                // Counter erhöht, aktualisiere den Zähler
                updateCounter();
            } else {
                console.error('Failed to increment counter');
            }
        })
        .catch(error => {
            console.error('Error occurred while incrementing counter:', error);
        });
});

removeBtn.addEventListener('click', () => {
    fetch('/strichliste/remove')
        .then(res => {
            if (res.ok) {
                // Counter verringert, aktualisiere den Zähler
                updateCounter();
            } else {
                console.error('Failed to decrement counter');
            }
        })
        .catch(error => {
            console.error('Error occurred while decrementing counter:', error);
        });
});

// Funktion zum Aktualisieren des Zählers
function updateCounter() {
    fetch('/strichliste/info')
        .then(res => res.json())
        .then(data => {
            counter.innerText = data.counter;
        })
        .catch(error => {
            console.error('Error occurred while fetching counter info:', error);
        });
}

// Beim Laden der Seite den Zähler initialisieren
document.addEventListener('DOMContentLoaded', updateCounter);
