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

document.addEventListener('DOMContentLoaded', () => {
    loadConfig();

    document.querySelector('footer').addEventListener('click', () => {
        toggleFooter();
    });

    // Initially hide the collapsable content
    document.getElementById('collapsable').style.display = 'none';
});
