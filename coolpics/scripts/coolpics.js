const hamButton = document.querySelector('.menu');
const navigation = document.querySelector('.menu-items');

hamButton.addEventListener('click', () => {
    navigation.classList.toggle('open');
    hamButton.classList.toggle('open');
});

const gallery = document.querySelectorAll('.gallery figure');

gallery.forEach(function(items) {
    items.addEventListener('click', function() {
        const img = items.querySelector('img').src;
        const alt = items.querySelector('img').alt;
        const display = viewerTemplate(img, alt);
        
        document.body.insertAdjacentHTML('beforeend', display);
        
        const closeButton = document.querySelector('.close-viewer');
        closeButton.addEventListener('click', function() {
            document.querySelector('.viewer').remove();
        });
    });
});

function viewerTemplate(pic, alt) {
    return `<div class="viewer">
      <span class="close-viewer">X</span>
      <img src="${pic}" alt="${alt}">
      </div>`;
}