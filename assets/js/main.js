(function () {
  function qs(selector, scope) { return (scope || document).querySelector(selector); }
  function qsa(selector, scope) { return Array.from((scope || document).querySelectorAll(selector)); }

  // Banner Slider
  const bannerSlider = qs('.banner-slider');
  if (bannerSlider) {
    const track = qs('.banner-slider-track', bannerSlider);
    const slides = qsa('.banner-slide', track);
    const prev = qs('.banner-arrow-left', bannerSlider);
    const next = qs('.banner-arrow-right', bannerSlider);
    let index = 0;
    let timer;

    function goTo(i) {
      index = (i + slides.length) % slides.length;
      const x = -index * 100;
      track.style.transform = 'translateX(' + x + '%)';
    }

    function start() {
      stop();
      timer = setInterval(function () { goTo(index + 1); }, 3500); // 3.5 saniye
    }
    function stop() {
      if (timer) { clearInterval(timer); timer = null; }
    }

    if (prev) prev.addEventListener('click', function () { goTo(index - 1); start(); });
    if (next) next.addEventListener('click', function () { goTo(index + 1); start(); });

    bannerSlider.addEventListener('mouseenter', stop);
    bannerSlider.addEventListener('mouseleave', start);

    start();
  }

  // Katalog Carousel
  const carousel = qs('.carousel');
  if (carousel) {
    const track = qs('.carousel-track', carousel);
    const slides = qsa('.carousel-slide', track);
    const prev = qs('[data-carousel-prev]', carousel);
    const next = qs('[data-carousel-next]', carousel);
    let index = 0;
    let timer;

    function goTo(i) {
      index = (i + slides.length) % slides.length;
      const x = -index * 100;
      track.style.transform = 'translateX(' + x + '%)';
    }

    function start() {
      stop();
      timer = setInterval(function () { goTo(index + 1); }, 4000);
    }
    function stop() {
      if (timer) { clearInterval(timer); timer = null; }
    }

    if (prev) prev.addEventListener('click', function () { goTo(index - 1); start(); });
    if (next) next.addEventListener('click', function () { goTo(index + 1); start(); });

    carousel.addEventListener('mouseenter', stop);
    carousel.addEventListener('mouseleave', start);

    start();
  }

  const searchForm = qs('#site-search-form');
  if (searchForm) {
    searchForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const term = qs('input[type="search"]', searchForm).value.trim();
      const target = 'urunlerimiz.html' + (term ? ('?q=' + encodeURIComponent(term)) : '');
      window.location.href = target;
    });
  }

  // External links configuration
  var EXTERNAL_LINKS = {
    dealer: 'https://alpteknikhirdavat.com/',
    sales: 'https://alpteknikhirdavat.com/sales'
  };
  var dealerA = document.getElementById('dealer-link');
  if (dealerA && EXTERNAL_LINKS.dealer) { dealerA.href = EXTERNAL_LINKS.dealer; dealerA.target = '_blank'; dealerA.rel = 'noopener'; }
  var salesA = document.getElementById('sales-link');
  if (salesA && EXTERNAL_LINKS.sales) { salesA.href = EXTERNAL_LINKS.sales; salesA.target = '_blank'; salesA.rel = 'noopener'; }

  // Mobile Menu Toggle
  var mobileMenuToggle = qs('.mobile-menu-toggle');
  var nav = qs('.nav');
  
  if (mobileMenuToggle && nav) {
    mobileMenuToggle.addEventListener('click', function() {
      mobileMenuToggle.classList.toggle('active');
      nav.classList.toggle('active');
      document.body.style.overflow = nav.classList.contains('active') ? 'hidden' : '';
    });
    
    // Menü dışına tıklanınca kapat
    document.addEventListener('click', function(e) {
      if (window.innerWidth <= 900 && nav.classList.contains('active')) {
        if (!nav.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
          mobileMenuToggle.classList.remove('active');
          nav.classList.remove('active');
          document.body.style.overflow = '';
        }
      }
    });
  }

  // Dropdown navigation
  var navDropdown = qs('.nav-dropdown');
  if (navDropdown) {
    var dropdownToggle = qs('.nav-dropdown-toggle', navDropdown);
    var clickCount = 0;
    var clickTimer = null;
    
    if (dropdownToggle) {
      dropdownToggle.addEventListener('click', function(e) {
        // Mobil cihazlarda (<=900px)
        if (window.innerWidth <= 900) {
          e.preventDefault();
          // Mobilde sadece dropdown'u toggle et
          navDropdown.classList.toggle('active');
        } else {
          // Desktop'ta çift tıklama mantığı
          e.preventDefault();
          clickCount++;
          
          if (clickCount === 1) {
            navDropdown.classList.add('active');
            clickTimer = setTimeout(function() {
              clickCount = 0;
            }, 500);
          } else if (clickCount === 2) {
            clearTimeout(clickTimer);
            window.location.href = dropdownToggle.getAttribute('href');
          }
        }
      });
      
      // Desktop'ta dropdown dışına tıklanınca kapat
      document.addEventListener('click', function(e) {
        if (window.innerWidth > 900) {
          if (!navDropdown.contains(e.target)) {
            navDropdown.classList.remove('active');
            clickCount = 0;
            if (clickTimer) clearTimeout(clickTimer);
          }
        }
      });
    }
  }
})();


