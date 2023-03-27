document.addEventListener('DOMContentLoaded', function() {
    const clickMeButton = document.getElementById('clickMeButton');
    const clickCounter = document.getElementById('clickCounter');
    let counter = 0;

    clickMeButton.addEventListener('click', function() {
        counter++;
        clickCounter.textContent = counter;
    });
});