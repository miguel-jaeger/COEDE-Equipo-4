// Utilidades de UI para Blog Equipo 4
(function () {
const $ = (sel, root=document) => root.querySelector(sel);
const $$ = (sel, root=document) => Array.from(root.querySelectorAll(sel));


// ===== Sticky shadow en header al hacer scroll
const siteHeader = $("header.site-header");
const onScroll = () => {
if (!siteHeader) return;
const sc = window.scrollY || document.documentElement.scrollTop;
siteHeader.classList.toggle('scrolled', sc > 8);
};
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

    // Llamamos a la función para cada sección
    cargarContenido('pages/fernandez.html', 'fernandez');
    cargarContenido('pages/alva.html', 'alva');
    cargarContenido('pages/lopezpere.html', 'lopezperez');
    cargarContenido('pages/bermejo.html', 'bermejo');
    cargarContenido('pages/tapia.html', 'tapia');

// ===== Menú responsive (toggle)
const nav = $("nav.primary");
const btn = $(".menu-toggle");
if (btn && nav) {
btn.addEventListener('click', () => nav.classList.toggle('open'));
}


// ===== Cerrar menú al hacer click en un enlace (mobile)
const links = $$('nav.primary a[href^="#"]');
links.forEach(a => a.addEventListener('click', () => nav && nav.classList.remove('open')));


// ===== Resaltado de link activo según sección visible
const sections = links
.map(a => ({ id: a.getAttribute('href').slice(1), link: a }))
.map(({ id, link }) => ({ el: document.getElementById(id), link }))
.filter(({ el }) => !!el);


const io = new IntersectionObserver((entries) => {
entries.forEach(entry => {
const target = entry.target.id;
const active = sections.find(s => s.el.id === target)?.link;
if (!active) return;
if (entry.isIntersecting) {
links.forEach(l => l.classList.remove('active'));
active.classList.add('active');
}
});
}, { rootMargin: "-60% 0px -35% 0px", threshold: 0.01 });


sections.forEach(s => io.observe(s.el));


// ===== Fallback suave para navegadores antiguos
// (si el navegador no soporta scroll-behavior, hacemos scroll animado)
if (!('scrollBehavior' in document.documentElement.style)) {
links.forEach(a => {
a.addEventListener('click', (e) => {
const id = a.getAttribute('href');
if (!id || !id.startsWith('#')) return;
const target = document.querySelector(id);
if (!target) return;
e.preventDefault();
const y = target.getBoundingClientRect().top + window.pageYOffset - 84;
window.scrollTo({ top: y, left: 0, behavior: 'smooth' });
});
});
}
})();