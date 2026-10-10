(() => {
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.site-nav');
  toggle?.addEventListener('click', () => {
    const open = nav.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(open));
  });
  document.querySelectorAll('[data-year]').forEach(el => el.textContent = new Date().getFullYear());
  const form = document.querySelector('#amify-form');
  if (!form) return;
  const endpoint = window.AMIFY_CONFIG?.formEndpoint;
  if (endpoint) form.action = endpoint;
  const roleInputs = form.querySelectorAll('input[name="participant_type"]');
  const panels = form.querySelectorAll('[data-role-panel]');
  const steps = form.querySelectorAll('[data-form-step]');
  const progress = form.querySelector('[data-progress]');
  const progressLabel = form.querySelector('[data-progress-label]');
  const back = form.querySelector('[data-back]');
  const next = form.querySelector('[data-next]');
  const submit = form.querySelector('[data-submit]');
  let step = 1;
  const role = () => form.querySelector('input[name="participant_type"]:checked')?.value || '';
  function updatePanels() {
    const selected = role();
    panels.forEach(panel => {
      const visible = panel.dataset.rolePanel === selected || panel.dataset.rolePanel === 'all';
      panel.hidden = !visible;
      panel.querySelectorAll('input,select,textarea').forEach(field => field.disabled = !visible);
    });
  }
  roleInputs.forEach(input => input.addEventListener('change', updatePanels)); updatePanels();
  function render() {
    steps.forEach(el => { const active = Number(el.dataset.formStep) === step; el.hidden = !active; el.setAttribute('aria-hidden', String(!active)); });
    if (progress) progress.style.width = `${step / 3 * 100}%`;
    if (progressLabel) progressLabel.textContent = `Step ${step} of 3`;
    if (back) back.hidden = step === 1;
    if (next) next.hidden = step === 3;
    if (submit) submit.hidden = step !== 3;
  }
  function validate() {
    const active = form.querySelector(`[data-form-step="${step}"]`);
    for (const field of active.querySelectorAll('input,select,textarea')) {
      if (field.disabled || field.type === 'hidden') continue;
      if (!field.checkValidity()) { field.reportValidity(); field.focus(); return false; }
    }
    if (step === 1 && !role()) { alert('Please choose the option that best describes you.'); return false; }
    return true;
  }
  next?.addEventListener('click', () => { if (validate()) { step = Math.min(3, step + 1); render(); } });
  back?.addEventListener('click', () => { step = Math.max(1, step - 1); render(); });
  form.addEventListener('submit', event => {
    updatePanels();
    if (!form.reportValidity()) { event.preventDefault(); return; }
    if (!endpoint || !endpoint.startsWith('https://formsubmit.co/')) { event.preventDefault(); alert('Check the FormSubmit destination in js/config.js.'); return; }
    if (submit) { submit.disabled = true; submit.textContent = 'Sending…'; }
  });
  const queryType = new URLSearchParams(location.search).get('type');
  if (queryType && ['farmer','buyer'].includes(queryType)) {
    const radio = form.querySelector(`input[name="participant_type"][value="${queryType}"]`);
    if (radio) { radio.checked = true; updatePanels(); }
  }
  render();
})();
