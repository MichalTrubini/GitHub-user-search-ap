//VARIABLES ----START

const themeSwitch = document.querySelector('.header__mode-switch');
const bodyEl = document.body;
const formEl = document.querySelector('.dev-search');
const inputEl = document.querySelector('.dev-search__input');
const userEl = document.querySelector('.user');
const userStatsEl = document.querySelector('.user__stats');
const userSocial = document.querySelectorAll('.user__social-content');
const fontAccent = document.querySelectorAll('.dark-font-accent');
const iconAccent = document.querySelectorAll('.user__social-icon');

const searchUser = document.querySelector('.dev-search__button');
const userName = document.querySelector('#user-name');
const userUsername = document.querySelector('#user-username');
const userJoinedDate = document.querySelector('#user-joined-date');
const userBio = document.querySelector('#bio');
const publicRepos = document.querySelector('#public_repos');
const followers = document.querySelector('#followers');
const following = document.querySelector('#following');
const geoLocation = document.querySelector('#js-location');
const blog = document.querySelector('#js-blog');
const twitterUsername = document.querySelector('#js-twitter_username');
const company = document.querySelector('#js-company');
const avatarUrlMobile = document.querySelector('#avatar_url');
const avatarUrlDesktop = document.querySelector('#avatar_url-desktop');

var months = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", 
           "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ];

//VARIABLES ----END

themeSwitch.addEventListener('click', themeSwitcher)
searchUser.addEventListener('click', githubUserSearch)

//FUNCTIONS ----START

function themeSwitcher (event) {

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
    
    event.preventDefault();
}


function githubUserSearch (event) {
    
    let inputValue = document.getElementById('input-value').value;

    fetch('https://api.github.com/users/' + inputValue)
        .then(response => {
            if (response.ok) {
              return response.json()
            } else {
              return Promise.reject(
                   'error 404')
            } 
          })
        .then(data => {
            userName.innerText = data.name;
            userUsername.innerText = '@' + data.login;
            userJoinedDate.innerText = new Date(data.created_at).getDate().toString() + ' ' + months[new Date(data.created_at).getMonth()] + ' ' + new Date(data.created_at).getFullYear().toString();
            userBio.innerText = data.bio
            publicRepos.innerText = data.public_repos;
            followers.innerText = data.followers;
            following.innerText = data.following;
            geoLocation.innerText = data.location;
            blog.innerText = data.blog;
            twitterUsername.innerText = data.twitter_username;
            company.innerText = data.company;
            avatarUrlMobile.src=data.avatar_url;
            avatarUrlDesktop.src=data.avatar_url;

            let keys = Object.keys(data);

            keys.forEach((key) => {

                if ((data[key] === null || (data[key] === '')) && document.getElementById('js-' + key)) {
                    document.getElementById('js-' + key).innerText ='Not available';
                    document.getElementById('js-' + key).classList.add('no-data');
                    if (document.querySelector('.header__theme-name').innerText == "LIGHT") {
                        document.getElementById('js-' + key + '-icon').classList.add('icon-unavailable');
                        document.getElementById('js-' + key + '-icon').classList.remove('icon-unavailable-light');
                    }
                    else {document.getElementById('js-' + key + '-icon').classList.add('icon-unavailable-light');
                    document.getElementById('js-' + key + '-icon').classList.remove('icon-unavailable');
                }}
                
            })

            if (data.bio === null) {
                userBio.innerText ='This profile has no bio.';
                userBio.classList.add('no-data');
            }
            
        })

    event.preventDefault();
}

//FUNCTIONS ----END

