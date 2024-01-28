const skillContainer = document.getElementById('skills');

function loadConfig() {
    fetch('js/config.json')
        .then(res => {
            if (!res.ok) {
                throw new Error(`HTTP Error! status: ${res.status}`);
            }
            return res.json();
        })
        .then(config => {
            displaySkills(config.skills);
        })
        .catch(err => {
            console.log(err);
        });
}

function displaySkills(skills) {
    skills.forEach(skill => {
        const skillElement = document.createElement('span');
        skillElement.classList.add('skill');
        skillElement.textContent = skill;
        skillContainer.appendChild(skillElement);
    });
}

function toggleFooter() {
    const collapsable = document.getElementById('collapsable');
    const footerExpandIcon = document.getElementById('footer-expand').querySelector('i');

    // Check if the collapsable content is currently visible
    const isCollapsed = collapsable.classList.contains('collapsed');

    if (isCollapsed) {
        // If collapsed, expand it
        collapsable.classList.remove('collapsed');
        collapsable.style.display = 'block'; // Display the content
        footerExpandIcon.classList.remove('bi-caret-up-fill');
        footerExpandIcon.classList.add('bi-caret-down-fill');
    } else {
        // If expanded, collapse it
        collapsable.classList.add('collapsed');
        collapsable.style.display = 'none'; // Hide the content
        footerExpandIcon.classList.remove('bi-caret-down-fill');
        footerExpandIcon.classList.add('bi-caret-up-fill');
    }
}

function loadContactForm() {
    const form = document.querySelector('#contact form');

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            message: document.getElementById('message').value
        };

        fetch('/email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then(res => res.json())
        .then(data => {
            console.log('Success: ', data)
        })
        .catch((err) => {
            console.error('Error: ', err)
        });
        disableSendButton();
    });
}

function disableSendButton() {
    const button = document.querySelector('#contact button');
    let countdown = 30;

    button.disabled = true;
    button.innerText = `Send (${countdown}s)`;
    button.classList.toggle('button-disabled');
    
    let intervalId = setInterval(() => {
        countdown--;
        button.innerText = `Send (${countdown}s)`;
        
        if (countdown == 0) {
            clearInterval(intervalId);
            button.disabled = false;
            button.innerText = 'Send';
            button.classList.toggle('button-disabled')
        }
    }, 1000);
}

document.addEventListener('DOMContentLoaded', () => {
    loadConfig();

    document.querySelector('footer').addEventListener('click', () => {
        toggleFooter();
    });

    // Initially hide the collapsable content
    document.getElementById('collapsable').style.display = 'none';

    loadContactForm();
});

