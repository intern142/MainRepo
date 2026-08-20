// Shared hero + nav initializer
(function(){
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

  document.addEventListener('DOMContentLoaded', function(){
    initNavToggle(document);
    applyPageClasses();
    handleHeroEntrance();
  });
})();
