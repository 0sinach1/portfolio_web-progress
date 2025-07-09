const toggle = document.getElementById('theme-toggle');
const dataPortfolio = document.getElementById('data-portfolio');
const devPortfolio = document.getElementById('dev-portfolio');

toggle.addEventListener('change', () => {
    document.body.classList.toggle('dark_mode');

    if (toggle.checked) {
        dataPortfolio.style.display = 'none';
        devPortfolio.style.display = 'block';
    } else {
        dataPortfolio.style.display = 'block';
        devPortfolio.style.display = 'none';
    }
});
