let nav = document.querySelector('.header>.nav');
let navBurger = document.querySelector('.header>.nav-burger');
let popupNav = document.querySelector('.popup-nav');
let popupNavItem = document.querySelectorAll('.popup-nav>.popup-nav-item');

function popupNavbar() {
    popupNavItem.forEach(function(item) {
        if(item.style.display === 'block') {
            item.style.display = 'none';
        } else {
            item.style.display = 'block';
        }
    });
};

window.addEventListener('resize', () => {
    if(document.body.clientWidth < 580) {
        nav.style.display = 'none';
        navBurger.style.display = 'block';
    } else {
        nav.style.display = 'flex';
        navBurger.style.display = 'none';
    }
});

navBurger.addEventListener('click', (e) => {
    e.stopPropagation();
    popupNavbar();
});

document.addEventListener('click', (e) => {
    if(e.target !== popupNav && e.target !== navBurger) {
        popupNavItem.forEach(function(item) {
            if(item.style.display === 'block') {
                item.style.display = 'none';
            }
        });
    }
});