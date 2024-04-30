const backgroundColor = document.getElementById('background-color')

backgroundColor.addEventListener('change', function(){
    changeTheme();
})

function changeTheme() {
    const selectedColor = backgroundColor.value;

    if(selectedColor === 'dark') {
        document.body.classList.add('dark');
        document.querySelector('footer img').src = 'images/byui-logo_white.png';
    } else {
        document.body.classList.remove('dark');
        document.querySelector('footer img').src = 'images/byui-logo_blue.webp';
    }
}