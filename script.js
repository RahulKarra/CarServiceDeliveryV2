/* ── Reveal on scroll ── */
const revealObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); revealObs.unobserve(e.target); }
    });
  }, { threshold: 0.10, rootMargin: '0px 0px -40px 0px' });
  document.querySelectorAll('[data-reveal]').forEach(el => revealObs.observe(el));
  
  /* ── Navbar scroll ── */
  window.addEventListener('scroll', () => {
    document.getElementById('navbar').classList.toggle('scrolled', scrollY > 40);
    // Active nav link highlight
    const sections = ['hero','about','services','how','testimonials','contact'];
    let current = 'hero';
    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el && el.getBoundingClientRect().top <= 80) current = id;
    });
    document.querySelectorAll('.nav-link').forEach(l => {
      l.classList.toggle('active', l.dataset.section === current);
    });
  }, { passive: true });
  
  /* ── Hero parallax ── */
  window.addEventListener('scroll', () => {
    const bg = document.getElementById('hero-bg');
    if (bg) bg.style.transform = `translateY(${scrollY * .35}px)`;
  }, { passive: true });
  
  /* ── Mobile menu ── */
  function toggleMobile() {
    const h = document.getElementById('hamburger');
    const d = document.getElementById('nav-drawer');
    h.classList.toggle('open');
    d.classList.toggle('open');
  }
  function closeMobileMenu() {
    document.getElementById('hamburger').classList.remove('open');
    document.getElementById('nav-drawer').classList.remove('open');
  }
  
  /* ── Admin ── */
  function openAdmin() {
    document.getElementById('admin-login').style.display = 'block';
    document.getElementById('admin-login').classList.add('active');
    document.querySelector('main, #navbar, footer, section, #hero')?.scrollIntoView?.();
    document.body.style.overflow = 'hidden';
    window.scrollTo(0, 0);
  }
  function closeAdmin() {
    document.querySelectorAll('.admin-page').forEach(p => { p.style.display = 'none'; p.classList.remove('active'); });
    document.body.style.overflow = '';
    // Reset sidebar
    document.querySelectorAll('.db-nav-btn').forEach(b => b.classList.remove('active'));
    document.querySelector('.db-nav-btn')?.classList.add('active');
    document.querySelectorAll('.db-tab').forEach(t => t.classList.remove('active'));
    document.getElementById('db-overview')?.classList.add('active');
  }
  function doLogin() {
    const u = document.getElementById('a-user').value;
    const p = document.getElementById('a-pass').value;
    const err = document.getElementById('login-err');
    if (u === 'admin' && p === 'admin123') {
      err.classList.remove('show');
      document.getElementById('admin-login').style.display = 'none';
      document.getElementById('admin-login').classList.remove('active');
      document.getElementById('admin-dashboard').style.display = 'block';
      document.getElementById('admin-dashboard').classList.add('active');
      document.body.style.overflow = '';
    } else {
      err.classList.add('show');
    }
  }
  
  /* ── Dashboard tabs ── */
  function switchDbTab(btn, tabId) {
    document.querySelectorAll('.db-nav-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    document.querySelectorAll('.db-tab').forEach(t => t.classList.remove('active'));
    document.getElementById(tabId).classList.add('active');
  }
  
  /* ── Modals ── */
  function openModal(id)  { const m = document.getElementById(id); m.classList.add('open'); }
  function closeModal(id) { document.getElementById(id).classList.remove('open'); }
  document.querySelectorAll('.modal-overlay').forEach(m => {
    m.addEventListener('click', e => { if (e.target === m) m.classList.remove('open'); });
  });
  
  /* ── Toast ── */
  function showToast(msg) {
    const t = document.getElementById('toast');
    document.getElementById('toast-msg').textContent = msg;
    t.classList.add('show');
    setTimeout(() => t.classList.remove('show'), 3200);
  }
  
  /* ── Delete row ── */
  function delRow(btn) {
    if (!confirm('Delete this record?')) return;
    const row = btn.closest('tr');
    row.style.transition = 'opacity .3s, transform .3s';
    row.style.opacity = '0'; row.style.transform = 'translateX(16px)';
    setTimeout(() => row.remove(), 320);
    showToast('Record deleted.');
  }
  
  /* ── CRUD ── */
  function addOffer() {
    const n = document.getElementById('o-name').value;
    const c = document.getElementById('o-code').value;
    const d = document.getElementById('o-disc').value;
    if (!n || !c) { alert('Fill required fields.'); return; }
    document.getElementById('offers-tb').insertAdjacentHTML('beforeend',
      `<tr><td>${n}</td><td style="font-family:'Geist Mono',monospace;color:var(--gold);font-weight:600">${c}</td><td>${d}</td><td><span class="badge badge-green">Active</span></td><td><button onclick="delRow(this)" style="font-size:12px;color:#DC2626;font-weight:600">Delete</button></td></tr>`);
    closeModal('m-offer'); showToast('Offer added successfully!');
    ['o-name','o-code','o-disc'].forEach(id => document.getElementById(id).value = '');
  }
  function addAddon() {
    const n = document.getElementById('ad-name').value;
    const d = document.getElementById('ad-desc').value;
    const p = document.getElementById('ad-price').value;
    if (!n) { alert('Enter add-on name.'); return; }
    document.getElementById('addons-tb').insertAdjacentHTML('beforeend',
      `<tr><td style="font-weight:600">${n}</td><td style="color:var(--gray-400)">${d}</td><td style="font-weight:600">${p}</td><td><button onclick="delRow(this)" style="font-size:12px;color:#DC2626;font-weight:600">Delete</button></td></tr>`);
    closeModal('m-addon'); showToast('Add-on created!');
    ['ad-name','ad-desc','ad-price'].forEach(id => document.getElementById(id).value = '');
  }
  function addExpert() {
    const n = document.getElementById('ex-name').value;
    const c = document.getElementById('ex-city').value;
    const s = document.getElementById('ex-spec').value;
    if (!n) { alert('Enter expert name.'); return; }
    document.getElementById('experts-tb').insertAdjacentHTML('beforeend',
      `<tr><td style="font-weight:600">${n}</td><td style="color:var(--gray-400)">${s}</td><td>${c}</td><td>0</td><td style="color:var(--gray-400)">New</td><td><span class="badge badge-green">Active</span></td><td><button onclick="delRow(this)" style="font-size:12px;color:#DC2626;font-weight:600">Delete</button></td></tr>`);
    closeModal('m-expert'); showToast('Expert added!');
    ['ex-name','ex-city','ex-spec'].forEach(id => document.getElementById(id).value = '');
  }
  
  /* ── Contact form ── */
  function submitBooking() {
    const n = document.getElementById('c-name').value;
    const p = document.getElementById('c-phone').value;
    const car = document.getElementById('c-car').value;
    if (!n || !p || !car) { alert('Please fill in Name, Phone, and Car Model.'); return; }
    showToast(`Booking confirmed for ${n}! We'll call within 1 hour.`);
  }
  
  /* ── FAQ ── */
  function toggleFaq(btn) {
    const body = btn.nextElementSibling;
    const isOpen = body.classList.contains('open');
    document.querySelectorAll('.faq-q').forEach(b => b.classList.remove('open'));
    document.querySelectorAll('.faq-a').forEach(a => a.classList.remove('open'));
    if (!isOpen) { btn.classList.add('open'); body.classList.add('open'); }
  }
  
  /* ── Close mobile menu on scroll ── */
  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    if (Math.abs(scrollY - lastScroll) > 60) { closeMobileMenu(); lastScroll = scrollY; }
  }, { passive: true });
  
  /* ── Keyboard: Escape closes admin ── */
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeAdmin(); });