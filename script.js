(() => {
  const menuButton = document.querySelector('.menu-toggle');
  const nav = document.querySelector('#site-nav');

  if (menuButton && nav) {
    menuButton.addEventListener('click', () => {
      const open = nav.classList.toggle('is-open');
      menuButton.setAttribute('aria-expanded', String(open));
    });

    nav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        nav.classList.remove('is-open');
        menuButton.setAttribute('aria-expanded', 'false');
      });
    });
  }

  const items = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, currentObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          currentObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    items.forEach((item) => observer.observe(item));
  } else {
    items.forEach((item) => item.classList.add('is-visible'));
  }

  const copyButton = document.querySelector('.copy-bib');
  const status = document.querySelector('.copy-status');
  if (copyButton && status) {
    copyButton.addEventListener('click', async () => {
      const target = document.getElementById(copyButton.dataset.copyTarget);
      if (!target) return;
      try {
        await navigator.clipboard.writeText(target.textContent);
        status.textContent = 'Copied to clipboard.';
      } catch (error) {
        status.textContent = 'Select the BibTeX block to copy it.';
      }
      window.setTimeout(() => { status.textContent = ''; }, 2400);
    });
  }

  const year = document.querySelector('#year');
  if (year) year.textContent = String(new Date().getFullYear());
})();
