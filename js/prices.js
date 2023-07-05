function updatePrices() {
   const prices = document.querySelectorAll('.price');
   prices.forEach((price) => {
      const normalPrice = price.querySelector('.normal');
      const normalPriceValue = parseInt(normalPrice.textContent.replace('$', ''), 10);
      const discount = parseFloat(normalPrice.closest('.item').querySelector('.discount span').textContent.replace('%', '')) / 100;

      normalPrice.setAttribute('data-discount', discount.toFixed(2));

      const usdPrice = ((normalPriceValue * (100 - discount)) / 100).toFixed(2);
      price.setAttribute('data-usd', usdPrice);
      price.setAttribute('data-eur', ((usdPrice * 1.1) * (100 - discount)) / 100);
      price.setAttribute('data-gbp', ((usdPrice * 1.3) * (100 - discount)) / 100);
      normalPrice.textContent = `$${usdPrice}`;
   });
}

window.addEventListener('load', () => {
   updatePrices();
});

// Экспортируем функцию updatePrices для использования в других модулях
export { updatePrices };