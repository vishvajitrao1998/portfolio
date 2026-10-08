document.getElementById('year').textContent = new Date().getFullYear();

  // ---------- THEME TOGGLE ----------
  (function(){
    var root = document.documentElement;
    var toggle = document.getElementById('themeToggle');
    var icon = document.getElementById('themeIcon');

    function applyIcon(theme){
      icon.className = theme === 'light' ? 'bi bi-sun-fill' : 'bi bi-moon-stars-fill';
    }

    var saved = null;
    try { saved = localStorage.getItem('darkroom-theme'); } catch(e) {}

    if (saved === 'light' || saved === 'dark') {
      root.setAttribute('data-theme', saved);
      applyIcon(saved);
    } else {
      applyIcon('dark');
    }

    toggle.addEventListener('click', function(){
      var current = root.getAttribute('data-theme');
      var isLight = current === 'light' || (!current && window.matchMedia('(prefers-color-scheme: light)').matches);
      var next = isLight ? 'dark' : 'light';
      root.setAttribute('data-theme', next);
      applyIcon(next);
      try { localStorage.setItem('darkroom-theme', next); } catch(e) {}
    });
  })();

  // ---------- RESUME PDF PREVIEW ----------
  (function(){
    var input = document.getElementById('resumeInput');
    var frame = document.getElementById('resumeFrame');
    var placeholder = document.getElementById('resumePlaceholder');
    var openBtn = document.getElementById('openResumeBtn');
    var downloadBtn = document.getElementById('downloadResumeBtn');

    // If a resume.pdf actually exists alongside this file, try to show it automatically.
    fetch('resume.pdf', { method: 'HEAD' }).then(function(res){
      if (res.ok) {
        frame.src = 'resume.pdf';
        frame.style.display = 'block';
        placeholder.style.display = 'none';
      }
    }).catch(function(){ /* no resume.pdf present yet — placeholder stays visible */ });

    input.addEventListener('change', function(e){
      var file = e.target.files && e.target.files[0];
      if (!file) return;
      var url = URL.createObjectURL(file);
      frame.src = url;
      frame.style.display = 'block';
      placeholder.style.display = 'none';
      openBtn.setAttribute('href', url);
      downloadBtn.setAttribute('href', url);
      downloadBtn.setAttribute('download', file.name);
    });
  })();

  // ---------- ACTIVE NAV LINK ----------
  (function(){
    var links = document.querySelectorAll('.nav-link-custom');
    var sections = Array.prototype.map.call(links, function(l){ return document.querySelector(l.getAttribute('href')); });
    function onScroll(){
      var pos = window.scrollY + 120;
      var activeIndex = -1;
      sections.forEach(function(sec, i){ if (sec && sec.offsetTop <= pos) activeIndex = i; });
      links.forEach(function(l, i){ l.classList.toggle('active', i === activeIndex); });
    }
    window.addEventListener('scroll', onScroll, { passive:true });
    onScroll();
  })();