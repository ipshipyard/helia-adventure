console.log('Hello from Helia globSource test!');

document.addEventListener('DOMContentLoaded', function() {
    const title = document.querySelector('h1');
    if (title) {
        title.addEventListener('click', function() {
            alert('Welcome to the Helia workshop!');
        });
    }
});