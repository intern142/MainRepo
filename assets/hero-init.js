// Shared hero + nav initializer + scroll reveal and subtle parallax
(function(){
  var prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function initNavToggle(root){
    var nav = root.querySelector('.site-nav');
    if(!nav) return;
    var toggle = nav.querySelector('.nav-toggle');
    var links = nav.querySelector('.nav-links');
    if(!toggle) return;
    toggle.addEventListener('click', function(){
      var expanded = toggle.getAttribute('aria-expanded') === 'true';
      nav.classList.toggle('nav-open');
      var open = nav.classList.contains('nav-open');
      toggle.setAttribute('aria-expanded', String(open));
      if(links) links.setAttribute('aria-hidden', String(!open));
    });
  }

  function applyPageClasses(){
    var body = document.body;
    // Mark article pages so CSS can apply simpler hero styles
    if(document.querySelector('.post')){
      body.classList.add('article-page');
    }
  }

  function handleHeroEntrance(){
    try{
      var body = document.body;
      // Play entrance only once per session
      var already = sessionStorage.getItem('heroAnimated');
      if(!already){
        // add class that enables entrance animations scoped in CSS
        body.classList.add('first-visit');
        // mark as played so it won't play again in this browser session
        sessionStorage.setItem('heroAnimated','1');
        // remove the class after a short timeout so subsequent dynamic additions won't rely on it
        window.setTimeout(function(){ body.classList.remove('first-visit'); }, 2500);
      }
    }catch(e){ /* noop */ }
  }

  // Intersection Observer based reveal for article items
  function initScrollReveal(){
    if(prefersReduced) return;
    if(!('IntersectionObserver' in window)){
      // fallback: simply mark all as in-view
      document.querySelectorAll('.article-item').forEach(function(el){ el.classList.add('in-view'); });
      return;
    }
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if(entry.isIntersecting){
          entry.target.classList.add('in-view');
          io.unobserve(entry.target);
        }
      });
    }, { root: null, rootMargin: '0px 0px -8% 0px', threshold: 0.08 });

    document.querySelectorAll('.article-item').forEach(function(el){
      el.classList.add('reveal-on-scroll');
      io.observe(el);
    });
  }

  // Subtle hero parallax / background-position tweak based on scroll
  function initHeroParallax(){
    if(prefersReduced) return;
    var hero = document.querySelector('.hero-full');
    if(!hero) return;
    var ticking = false;
    function onScroll(){
      if(ticking) return; ticking = true;
      window.requestAnimationFrame(function(){
        var rect = hero.getBoundingClientRect();
        var vh = window.innerHeight || document.documentElement.clientHeight;
        // Calculate a percentage to nudge background-position between 36% and 64%
        var centerPct = 50;
        if(rect.bottom > 0 && rect.top < vh){
          var visibleTop = Math.max(0, Math.min(rect.top, vh));
          var progress = 1 - (visibleTop / (vh + rect.height));
          progress = Math.max(0, Math.min(1, progress));
          centerPct = 40 + (progress * 20);
        }
        hero.style.backgroundPosition = 'center ' + centerPct + '%';
        ticking = false;
      });
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    // run once to set initial position
    onScroll();
  }

  document.addEventListener('DOMContentLoaded', function(){
    initNavToggle(document);
    applyPageClasses();
    handleHeroEntrance();
    initScrollReveal();
    initHeroParallax();
  });
})();
