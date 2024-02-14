const addBtn = document.getElementById('addBtn');
const removeBtn = document.getElementById('removeBtn');
const setBtn = document.getElementById('setBtn');
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

setBtn.addEventListener('click', () => {
    let input = window.prompt("Please enter a value that cannot be less or equal to 0:");
    if (input && input < 0) {
        console.error('Too Low!');
        return;
    }
    if (input) {
        fetch('/strichliste/set', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ value: input })
        })
            .then(res => {
                if (!res.ok) {
                    console.error('Error setting the value. Please contact an admin about this issue!');
                    return;
                }
                updateCounter();
            })
            .catch(error => {
                console.error('Error setting the value. Please contact an admin about this issue!: ', error);
            })
    }
})

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
document.addEventListener('DOMContentLoaded', () => {
    updateCounter();
    setInterval(() => {
        updateCounter();
    }, 100);
})