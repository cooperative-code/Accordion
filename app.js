(function() {
  let accordions = document.querySelectorAll('.accordion');
  accordions.forEach(function(element, i) {
    element.addEventListener('click', function() {
      const panel = element.querySelector('.accordion-panel');
      if (panel.style.maxHeight) {
        element.classList.remove('open');
        panel.style.maxHeight = null;
      }else{
        element.classList.add('open');
        panel.style.maxHeight = panel.scrollHeight + "px";
      }
    });
  });
})();
