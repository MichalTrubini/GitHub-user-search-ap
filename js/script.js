const themeSwitch = document.querySelector('.header__mode-switch');
const bodyEl = document.body;
const formEl = document.querySelector('.dev-search');
const inputEl = document.querySelector('.dev-search__input');
const userEl = document.querySelector('.user');
const userStatsEl = document.querySelector('.user__stats');
const userSocial = document.querySelectorAll('.user__social-content');
const fontAccent = document.querySelectorAll('.dark-font-accent');
const iconAccent = document.querySelectorAll('.user__social-icon');
const placeholderEl = document.querySelector('input[type=text]').style.setProperty("--c", "blue");

themeSwitch.addEventListener('click', function (event) {

    themeSwitcher();
    
    event.preventDefault();
})

function themeSwitcher () {

    if (document.querySelector('.header__theme-name').innerText == "LIGHT") {
        document.querySelector('.header__theme-name').innerText = "DARK";
        document.querySelector('.theme-switch-light').style.display = "none"
        document.querySelector('.theme-switch-dark').style.display = "inline-block";
        document.querySelector('input[type=text]').classList.add('placeholder-color-switch');
    }
        else if (document.querySelector('.header__theme-name').innerText == "DARK") {
            document.querySelector('.header__theme-name').innerText = "LIGHT";
            document.querySelector('.theme-switch-light').style.display = "inline-block"
            document.querySelector('.theme-switch-dark').style.display = "none"
            document.querySelector('input[type=text]').classList.remove('placeholder-color-switch');
        }

    bodyEl.classList.toggle('body-light');
    formEl.classList.toggle('input-light');
    inputEl.classList.toggle('input-light');
    userEl.classList.toggle('main-light');
    userStatsEl.classList.toggle('user-stats-light');
    userSocial.forEach(e => e.classList.toggle('user-social-content-light'));
    fontAccent.forEach(e => e.classList.toggle('light-font-accent'));
    iconAccent.forEach(e => e.classList.toggle('light-icon-accent'));
    
}
