(() => {
  const metricCopy = {
    etr: '<strong>ETR &mdash; Empty-Thinking Ratio.</strong> Strict answer-only compliance: the share of outputs with an empty visible pre-answer field <code>T</code>.',
    qrel: '<strong>QRel. &mdash; Question--Pre-answer Relevance.</strong> An instruction-aware relevance signal between the question <code>Q</code> and pre-answer text <code>T</code>; it is not a reasoning detector.',
    eir: '<strong>EIR &mdash; Explicit Inference Rate.</strong> The all-output rate at which a blinded judge finds visible deduction, computation, comparison, elimination, rule application, evidence-to-conclusion, or causality in <code>T</code>.'
  };

  const description = document.querySelector('#metricDescription');
  document.querySelectorAll('.metric-tab').forEach((tab) => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.metric-tab').forEach((item) => {
        const selected = item === tab;
        item.classList.toggle('active', selected);
        item.setAttribute('aria-selected', String(selected));
      });
      if (description) description.innerHTML = metricCopy[tab.dataset.metric];
    });
  });

  const revealItems = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, currentObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          currentObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    revealItems.forEach((item) => observer.observe(item));
  } else revealItems.forEach((item) => item.classList.add('is-in'));

  const copyButton = document.querySelector('.copy-bib');
  const copyStatus = document.querySelector('.copy-status');
  if (copyButton && copyStatus) {
    copyButton.addEventListener('click', async () => {
      const bibtex = document.querySelector('#bibtex-text');
      const text = bibtex ? bibtex.textContent : '';
      try {
        await navigator.clipboard.writeText(text);
        copyStatus.textContent = 'Copied.';
      } catch (error) {
        copyStatus.textContent = 'Select the BibTeX block to copy it.';
      }
      window.setTimeout(() => { copyStatus.textContent = ''; }, 2200);
    });
  }

  const demo = document.querySelector('.response-demo');
  const toggle = document.querySelector('#thinkToggle');
  if (demo && toggle) {
    const trace = demo.querySelector('.demo-trace');
    const traceNote = demo.querySelector('.demo-trace-note');
    const stateBadge = demo.querySelector('.demo-state-badge');
    const status = demo.querySelector('.demo-status');
    const label = toggle.querySelector('.switch-label');
    const states = {
      native: {
        trace: '17 × 20 = 340, then subtract 17. So the product is 323.',
        note: 'The answer is correct, but a visible inferential step remains before it.',
        badge: 'EXPLICIT INFERENCE',
        status: 'Native no-think · visible pre-answer text remains',
        label: 'NATIVE NO-THINK'
      },
      strict: {
        trace: '—',
        note: 'No visible pre-answer text; the final answer is still evaluated separately.',
        badge: 'EMPTY',
        status: 'Strict answer-only · T is empty',
        label: 'STRICT ANSWER-ONLY'
      }
    };
    toggle.addEventListener('click', () => {
      const next = demo.dataset.state === 'strict' ? 'native' : 'strict';
      const copy = states[next];
      demo.dataset.state = next;
      toggle.setAttribute('aria-checked', String(next === 'strict'));
      if (trace) trace.textContent = copy.trace;
      if (traceNote) traceNote.textContent = copy.note;
      if (stateBadge) stateBadge.textContent = copy.badge;
      if (status) status.textContent = copy.status;
      if (label) label.textContent = copy.label;
    });
  }
})();
