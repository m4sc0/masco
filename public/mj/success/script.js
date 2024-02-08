document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('nsfw-slider').addEventListener('change', () => {
        // change theme
        document.body.classList.toggle('horny');

        // change content
        document.getElementById('normal-card').classList.toggle('hidden');
        document.getElementById('horny-card').classList.toggle('hidden');

        // change label
        const lbl = document.getElementById('theme-label');

        if (lbl.innerText == 'SFW') {
            lbl.innerHTML = 'NSFW';
        } else {
            lbl.innerHTML = 'SFW';
        }
    })
})