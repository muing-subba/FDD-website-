/**
 * LBEF HOOP FEST 2027 - FAQ Accordion & Filter Module
 */

let activeFaqCat = 'all';
let allExpanded = false;

function toggleFaq(headerEl) {
  const item = headerEl.parentElement;
  item.classList.toggle('active');
}

function toggleAllFaqs() {
  allExpanded = !allExpanded;
  const items = document.querySelectorAll('.faq-item');
  items.forEach(item => {
    if (allExpanded) item.classList.add('active');
    else item.classList.remove('active');
  });
}

function setFaqCat(cat, btn) {
  activeFaqCat = cat;
  document.querySelectorAll('.faq-tab').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
  filterFaq();
}

function filterFaq() {
  const searchEl = document.getElementById('faq-search');
  const query = (searchEl ? searchEl.value : '').toLowerCase().trim();
  const items = document.querySelectorAll('.faq-item');
  let visibleCount = 0;

  items.forEach(item => {
    const cat = item.getAttribute('data-cat');
    const text = (item.getAttribute('data-q') || '').toLowerCase();

    const matchCat = (activeFaqCat === 'all' || cat === activeFaqCat);
    const matchQuery = (!query || text.includes(query));

    if (matchCat && matchQuery) {
      item.style.display = 'block';
      visibleCount++;
    } else {
      item.style.display = 'none';
    }
  });

  const emptyState = document.getElementById('faq-empty-state');
  if (emptyState) {
    emptyState.style.display = visibleCount === 0 ? 'block' : 'none';
  }
}

window.toggleFaq = toggleFaq;
window.toggleAllFaqs = toggleAllFaqs;
window.setFaqCat = setFaqCat;
window.filterFaq = filterFaq;
