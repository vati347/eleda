document.addEventListener('DOMContentLoaded', function () {
  var menu = document.getElementById('menu');
  var header = document.querySelector('header');

  if (menu && header) {
    function toggleMenu() {
      var expanded = menu.classList.toggle('expanded');
      header.classList.toggle('filled', expanded);
      menu.setAttribute('aria-expanded', expanded ? 'true' : 'false');
    }
    menu.addEventListener('click', toggleMenu);
    menu.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleMenu();
      }
    });
  }

  const slide = document.getElementById('carouselSlide');
  const dotsContainer = document.getElementById('carouselDots');

  const slide2 = document.getElementById('carouselSlide2');
  const dotsContainer2 = document.getElementById('carouselDots2');

  const totalSlides = slide.children.length;
  const totalSlides2 = slide2.children.length;

  let currentIndex = 0;
  let currentIndex2 = 0;
  let autoSlideInterval;
  let autoSlideInterval2;

  const updateCarousel = () => {
    slide.style.transform = `translateX(-${currentIndex * 100}%)`;
    [...dotsContainer.children].forEach(dot => dot.classList.remove('active'));
    dotsContainer.children[currentIndex].classList.add('active');
  };

  const updateCarousel2 = () => {
    slide2.style.transform = `translateX(-${currentIndex2 * 100}%)`;
    [...dotsContainer2.children].forEach(dot => dot.classList.remove('active'));
    dotsContainer2.children[currentIndex2].classList.add('active');
  };

  const goToSlide = (index) => {
    currentIndex = (index + totalSlides) % totalSlides;
    updateCarousel();
    resetAutoSlide();
  };

  const goToSlide2 = (index) => {
    currentIndex2 = (index + totalSlides2) % totalSlides2;
    updateCarousel2();
    resetAutoSlide2();
  };

  // Create dot indicators
  for (let i = 0; i < totalSlides; i++) {
    const dot = document.createElement('span');
    dot.addEventListener('click', () => goToSlide(i));
    dotsContainer.appendChild(dot);
  }

  for (let i = 0; i < totalSlides2; i++) {
    const dot = document.createElement('span');
    dot.addEventListener('click', () => goToSlide2(i));
    dotsContainer2.appendChild(dot);
  }

  // Navigation buttons
  document.getElementById('next').addEventListener('click', () => {
    goToSlide(currentIndex + 1);
  });

  document.getElementById('prev').addEventListener('click', () => {
    goToSlide(currentIndex - 1);
  });

  // Navigation buttons
  document.getElementById('next2').addEventListener('click', () => {
    goToSlide2(currentIndex2 + 1);
  });

  document.getElementById('prev2').addEventListener('click', () => {
    goToSlide2(currentIndex2 - 1);
  });

  // Auto slide
  function startAutoSlide() {
    autoSlideInterval = setInterval(() => {
      goToSlide(currentIndex + 1);
    }, 6000);
  }

  // Auto slide
  function startAutoSlide2() {
    autoSlideInterval2 = setInterval(() => {
      goToSlide2(currentIndex2 + 1);
    }, 6000);
  }

  function resetAutoSlide() {
    clearInterval(autoSlideInterval);
    startAutoSlide();
  }

    function resetAutoSlide2() {
    clearInterval2(autoSlideInterval2);
    startAutoSlide2();
  }

  // Touch swipe
  let touchStartX = 0;
  let touchEndX = 0;
  const swipeThreshold = 50;

  slide.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  });

  slide.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  });

    // Touch swipe
  let touchStartX2 = 0;
  let touchEndX2 = 0;
  const swipeThreshold2 = 50;

  slide2.addEventListener('touchstart', (e) => {
    touchStartX2 = e.changedTouches[0].screenX;
  });

  slide2.addEventListener('touchend', (e) => {
    touchEndX2 = e.changedTouches[0].screenX;
    handleSwipe2();
  });

  function handleSwipe() {
    const deltaX = touchEndX - touchStartX;
    if (Math.abs(deltaX) > swipeThreshold) {
      if (deltaX < 0) {
        goToSlide(currentIndex + 1);
      } else {
        goToSlide(currentIndex - 1);
      }
    }
  }

    function handleSwipe2() {
    const deltaX = touchEndX2 - touchStartX2;
    if (Math.abs(deltaX) > swipeThreshold2) {
      if (deltaX < 0) {
        goToSlide2(currentIndex2 + 1);
      } else {
        goToSlide2(currentIndex2 - 1);
      }
    }
  }

  updateCarousel();
  startAutoSlide();

  updateCarousel2();
  startAutoSlide2();
});