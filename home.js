const toggle = document.getElementById('theme-toggle');
const html = document.getElementById('html');

toggle.addEventListener('change', function () {
    document.body.classList.toggle('dark_mode');
});