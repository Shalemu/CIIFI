const options = document.querySelectorAll('.select-option');
const forms = document.querySelectorAll('.involved-form');

options.forEach(opt => {
  opt.addEventListener('click', (e) => {
    const type = e.target.dataset.type;

    // Hide all forms
    forms.forEach(f => f.style.display = 'none');

    // Show selected form
    const formToShow = document.getElementById(type + '-form');
    if(formToShow) formToShow.style.display = 'flex';
  });
});
