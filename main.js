const btn = document.querySelector('.choise__form-btn');
const chInfo = document.querySelector('.choise__info');
const chChar = document.querySelectorAll('.choise__chars-char');
const formName = document.querySelector('.choise__form-name')

// console.log(formName);

user = {
    char: 0,
    name: ''
}

for (let i = 0; i < chChar.length; i++) {
    chChar[i].addEventListener('click', () => {
        chChar.forEach(item => {
            item.classList.remove('chosen');
        })
        chChar[i].classList.toggle('chosen');
        user.char = i;
    })
}


btn.onclick = () => {
    chInfo.innerHTML = `
    <h2 class="choise__title">Loading...</h2>`
    user.name = formName.value ? formName.value : 'userNoname';
    console.log(user);
    sessionStorage.setItem('user', JSON.stringify(user));
    setTimeout(() => {
        window.location.href = './pages/play/play.html';
    }, 1000);
}