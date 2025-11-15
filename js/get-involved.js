// Elements
const openBtn = document.getElementById('open-involve');
const overlay = document.getElementById('popup-overlay');
const closeBtn = document.getElementById('close-popup');
const tabs = document.querySelectorAll('.tab-btn');
const forms = document.querySelectorAll('.involved-form');

// --- Functions to open/close ---
function openPopup() { overlay.classList.add('active'); }
function closePopup() { overlay.classList.remove('active'); }

// --- Open popup triggers ---
openBtn.addEventListener('click', (e) => { 
  e.preventDefault(); 
  openPopup(); 
});

openBtn.addEventListener('mouseenter', () => openPopup()); // Desktop hover
openBtn.addEventListener('touchstart', (e) => { 
  e.preventDefault(); 
  openPopup(); 
}); // Mobile touch

// --- Close popup ---
closeBtn.addEventListener('click', closePopup);
overlay.addEventListener('click', (e) => { 
  if (e.target === overlay) closePopup(); 
});

// --- Tab switching ---
tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    tabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');

    const target = tab.dataset.target;
    forms.forEach(f => f.classList.remove('active'));
    document.getElementById(target).classList.add('active');
  });
});

//  CTA buttons (Volunteer / Donate / Partner) ---
const ctaButtons = document.querySelectorAll('.cta-btn');

ctaButtons.forEach(btn => {
  btn.addEventListener('click', e => {
    e.preventDefault();

    // Open popup
    openPopup();

    // Determine target form
    const target = btn.dataset.target;

    // Switch active tab + form
    tabs.forEach(t => t.classList.remove('active'));
    forms.forEach(f => f.classList.remove('active'));

    const targetTab = document.querySelector(`.tab-btn[data-target="${target}"]`);
    const targetForm = document.getElementById(target);

    if (targetTab && targetForm) {
      targetTab.classList.add('active');
      targetForm.classList.add('active');
    }
  });
});
