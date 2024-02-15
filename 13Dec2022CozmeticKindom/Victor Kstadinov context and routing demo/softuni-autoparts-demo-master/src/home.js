const homeSection = document.getElementById('home');

export function showHome() {
    const userData = JSON.parse(localStorage.getItem('userData'))
    const email = userData.email;
    if (email != null) {
        homeSection.querySelector('p').textContent = `Welcome back, ${email}!`;
    } else {
        homeSection.querySelector('p').textContent = 'Welcome to our site';
    }

    document.querySelector('main').replaceChildren(homeSection);
}