/* Prices Currency */
import './prices.js';

const currentCurrency = document.querySelector('.current-currency');
const currencyItems = document.querySelectorAll('.currency-item');
const prices = document.querySelectorAll('.price');
currencyItems.forEach((currencyItem) => {
   currencyItem.addEventListener('click', (event) => {
      event.preventDefault();
      currentCurrency.innerHTML = `${currencyItem.textContent} <span class="icon-small"><i class="ri-arrow-down-s-line"></i></span>`;
      currencyItems.forEach((item) => {
         item.classList.remove('selected');
      });
      currencyItem.classList.add('selected');

      prices.forEach((price) => {
         const usd = parseInt(price.getAttribute('data-usd'));
         const eur = parseInt(price.getAttribute('data-eur'));
         const gbp = parseInt(price.getAttribute('data-gbp'));
         const current = price.querySelector('.current');
         const normal = price.querySelector('.normal');
         const normalDiscount = price.querySelector('.normal').getAttribute('data-discount');

         if (currencyItem.classList.contains('usd')) {
            normal.textContent = `$${usd.toFixed(2)}`;
            current.textContent = `$${(usd - (usd * normalDiscount)).toFixed(2)}`;
         } else if (currencyItem.classList.contains('eur')) {
            normal.textContent = `€${eur.toFixed(2)}`;
            current.textContent = `€${(eur - (eur * normalDiscount)).toFixed(2)}`;
         } else if (currencyItem.classList.contains('gbp')) {
            normal.textContent = `£${gbp.toFixed(2)}`;
            current.textContent = `£${(gbp - (gbp * normalDiscount)).toFixed(2)}`;
         }
      });
   });
});

/* Modal */
document.addEventListener('DOMContentLoaded', function() {
   const hoverableHeartIcons = document.querySelectorAll('.hoverable .ri-heart-line');

   hoverableHeartIcons.forEach((hoverableHeartIcon, index) => {
      hoverableHeartIcon.dataset.index = index;
   });
});

const items = document.querySelectorAll('.products .item');

items.forEach(item => {
   const eyeIcons = item.querySelectorAll('.ri-eye-line');

   eyeIcons.forEach(eyeIcon => {
      eyeIcon.addEventListener('click', (event) => {
         event.preventDefault();
         const modal = document.createElement('div');
         modal.classList.add('modal');

         const modalContent = document.createElement('div');
         modalContent.classList.add('modal-content');

         const media = item.querySelector('.media');
         const content = item.querySelector('.content');
         const modalItem = document.createElement('div');
         modalItem.classList.add('item');
         modalItem.appendChild(media.cloneNode(true));
         modalItem.appendChild(content.cloneNode(true));
         const closeButton = document.createElement('span');
         closeButton.classList.add('close-button');
         closeButton.textContent = '×';
         modalItem.appendChild(closeButton);
         modalContent.appendChild(modalItem);
         
         // Добавление элемента "крестик"
         

         modal.appendChild(modalContent);
         document.body.appendChild(modal);
      })
   });
});

// Обработчик события клика на область вне модального окна для закрытия модального окна
window.addEventListener('click', (event) => {
   const modal = document.querySelector('.modal');
   const closeButton = event.target.closest('.close-button');

   if (event.target === modal || closeButton) {
      const modalHeartIcons = modal.querySelectorAll('.ri-heart-line');
      const hoverableHeartIcons = document.querySelectorAll('.hoverable .ri-heart-line');

      modalHeartIcons.forEach((modalHeartIcon) => {
         const index = modalHeartIcon.dataset.index;
         const hoverableHeartIcon = document.querySelector(`.hoverable .ri-heart-line[data-index="${index}"]`);
         if (hoverableHeartIcon) {
            if (modalHeartIcon.classList.contains('red-heart')) {
               hoverableHeartIcon.classList.add('red-heart');
            } else {
               hoverableHeartIcon.classList.remove('red-heart');
            }
         }
      });

      modal.remove();
   }
});


/* Like */

const heartIcons = document.querySelectorAll('.hoverable .ri-heart-line, .modal .ri-heart-line');
const itemNumber = document.querySelector('.item-number');

heartIcons.forEach(icon => {
   icon.addEventListener('click', (event) => {
      event.preventDefault();
      icon.classList.toggle('red-heart');
      itemNumber.textContent = parseInt(itemNumber.textContent) + (icon.classList.contains('red-heart') ? 1 : -1);
      localStorage.setItem('heartIconsState', JSON.stringify(Array.from(heartIcons).map(icon => icon.classList.contains('red-heart'))));
      localStorage.setItem('itemNumberState', itemNumber.textContent);
   });
});

window.addEventListener('load', () => {
   const heartIconsState = JSON.parse(localStorage.getItem('heartIconsState'));
   const itemNumberState = localStorage.getItem('itemNumberState');

   if (heartIconsState && itemNumberState) {
      heartIcons.forEach((icon, index) => {
         if (heartIconsState[index]) {
            icon.classList.add('red-heart');
         } else {
            icon.classList.remove('red-heart');
         }
      });
      itemNumber.textContent = itemNumberState;
   }
});

document.addEventListener('click', (event) => {
   if (event.target.matches('.modal .ri-heart-line')) {
      event.preventDefault();
      const icon = event.target;
      const itemNumber = document.querySelector('.item-number');

      icon.classList.toggle('red-heart');
      itemNumber.textContent = parseInt(itemNumber.textContent) + (icon.classList.contains('red-heart') ? 1 : -1);

      // Сохраняем состояние в localStorage
      const heartIcons = document.querySelectorAll('.hoverable .ri-heart-line, .modal .ri-heart-line');
      localStorage.setItem('heartIconsState', JSON.stringify(Array.from(heartIcons).map(icon => icon.classList.contains('red-heart'))));
      localStorage.setItem('itemNumberState', itemNumber.textContent);
   }
});

/* menu for mobile */
function copyMenu() {
   let dptCategory = document.querySelector('.dpt-cat');
   let dptPlace = document.querySelector('.departments');
   dptPlace.innerHTML = dptCategory.innerHTML;

   let mainNav = document.querySelector('.header-nav nav');
   let navPlace = document.querySelector('.off-canvas nav');
   navPlace.innerHTML = mainNav.innerHTML;
}

copyMenu();

const menuButton = document.querySelector('.trigger');
const closeButton = document.querySelector('.t-close');
const addclass = document.querySelector('.site');
menuButton.addEventListener('click', () => {
   addclass.classList.toggle('showmenu');
})
closeButton.addEventListener('click', () => {
   addclass.classList.remove('showmenu');
})


const submenu = document.querySelectorAll('.has-child .icon-small');
submenu.forEach((item) => {
   item.addEventListener('click', toggle)
});

function toggle(e) {
   e.preventDefault();
   submenu.forEach((item) => {
      item != this ? item.closest('.has-child').classList.remove('expand') : null
   })

   if (this.closest('.has-child').classList != 'expand') {
      this.closest('.has-child').classList.add('expand')
   }
}

const swiper = new Swiper('.swiper', {
   speed: 1200,
   loop: true,
   autoplay: {
      delay: 3000,
      disableOnInteraction: false
   },

   pagination: {
      el: '.swiper-pagination',
   },
});