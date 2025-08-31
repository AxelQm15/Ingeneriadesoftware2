(function () {
  'use strict';
  const $  = (s, r=document) => r.querySelector(s);
  const $$ = (s, r=document) => r.querySelectorAll(s);

  const STORAGE_KEY = 'cartItems';

  function getCart(){ try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'); } catch { return []; } }
  function setCart(items){
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    // Actualiza badge con total de unidades
    const count = items.reduce((a,it)=> a + (it.qty||0), 0);
    localStorage.setItem('cartCount', String(count)); // compatibilidad
    renderBadge(count);
    renderMiniCart();   // si existe offcanvas
    renderCartPage();   // si estás en carrito.html
  }
  function formatMXN(n){ return n.toLocaleString('es-MX', {style:'currency', currency:'MXN', maximumFractionDigits:0}); }

  function renderBadge(count){
    const badge = $('#cartCount');
    if (!badge) return;
    badge.textContent = String(count);
    badge.classList.toggle('d-none', count === 0);
  }

  function addToCart(item){
    const items = getCart();
    const idx = items.findIndex(i => i.id === item.id);
    if (idx >= 0) { items[idx].qty += item.qty; }
    else { items.push(item); }
    setCart(items);
    // Toast (si existe)
    const toastEl = $('#cartToast');
    const toast = (typeof bootstrap !== 'undefined' && toastEl) ? new bootstrap.Toast(toastEl) : null;
    toast && toast.show();
  }

  function removeFromCart(id){
    setCart(getCart().filter(i => i.id !== id));
  }
  function updateQty(id, qty){
    const items = getCart().map(i => i.id===id ? {...i, qty: Math.max(1, qty)} : i);
    setCart(items);
  }
  function clearCart(){
    setCart([]);
  }

  /* ====== Extras de UI ====== */

  // Lee datos desde el botón .add-cart y su tarjeta
  function parseItemFromButton(btn){
    const card = btn.closest('.card, .p-card') || document;
    const name = btn.dataset.name || $('.card-body h6, h5, .card-title', card)?.textContent?.trim() || 'Producto';
    const priceAttr = btn.dataset.price;
    let price = priceAttr ? parseFloat(String(priceAttr).replace(/[^\d.]/g,'')) : NaN;
    if (isNaN(price)) {
      const priceText = $('.price', card)?.textContent || '';
      const parsed = parseFloat(priceText.replace(/[^\d.]/g,''));
      price = isNaN(parsed) ? 0 : parsed;
    }
    const img = btn.dataset.img || $('img', card)?.getAttribute('src') || '';
    const id  = btn.dataset.id  || (name + '|' + img);
    return { id, name, price, img, qty: 1 };
  }

  // Render Offcanvas mini-cart
  function renderMiniCart(){
    const list = $('#miniCartItems');
    const sub  = $('#miniCartSubtotal');
    const empty = $('#miniCartEmpty');
    const actions = $('#miniCartActions');
    if (!list || !sub) return;
    const items = getCart();
    list.innerHTML = '';
    if (!items.length){
      if (empty) empty.classList.remove('d-none');
      if (actions) actions.classList.add('d-none');
      sub.textContent = formatMXN(0);
      return;
    }
    if (empty) empty.classList.add('d-none');
    if (actions) actions.classList.remove('d-none');

    let subtotal = 0;
    items.forEach(it => {
      const line = it.price * it.qty;
      subtotal += line;
      const li = document.createElement('li');
      li.className = 'list-group-item d-flex gap-2 align-items-center';
      li.innerHTML = `
        <img src="${it.img}" alt="${it.name}" style="width:56px;height:56px;object-fit:cover;border-radius:.35rem">
        <div class="flex-grow-1">
          <div class="fw-semibold">${it.name}</div>
          <div class="text-muted"><small>${formatMXN(it.price)} · Cant: ${it.qty}</small></div>
        </div>
        <div class="text-end">
          <div>${formatMXN(line)}</div>
          <button class="btn btn-sm btn-link text-danger p-0 remove-item" data-id="${it.id}">Quitar</button>
        </div>`;
      list.appendChild(li);
    });
    sub.textContent = formatMXN(subtotal);
  }

  // Render página carrito.html
  function renderCartPage(){
    const tableBody = $('#cartTableBody');
    const sub = $('#cartPageSubtotal');
    const vacio = $('#cartPageEmpty');
    const cont  = $('#cartPageContainer');
    if (!tableBody || !sub) return;

    const items = getCart();
    tableBody.innerHTML = '';
    if (!items.length){
      if (vacio) vacio.classList.remove('d-none');
      if (cont)  cont.classList.add('d-none');
      sub.textContent = formatMXN(0);
      return;
    }
    if (vacio) vacio.classList.add('d-none');
    if (cont)  cont.classList.remove('d-none');

    let subtotal = 0;
    items.forEach(it => {
      const line = it.price * it.qty;
      subtotal += line;
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>
          <div class="d-flex align-items-center gap-2">
            <img src="${it.img}" alt="${it.name}" style="width:64px;height:64px;object-fit:cover;border-radius:.35rem">
            <div>
              <div class="fw-semibold">${it.name}</div>
              <button class="btn btn-sm btn-link text-danger p-0 remove-item" data-id="${it.id}">Quitar</button>
            </div>
          </div>
        </td>
        <td>${formatMXN(it.price)}</td>
        <td style="min-width:120px">
          <div class="input-group input-group-sm" style="max-width: 140px;">
            <button class="btn btn-outline-secondary qty-dec" data-id="${it.id}" type="button">–</button>
            <input type="number" class="form-control text-center qty-input" data-id="${it.id}" value="${it.qty}" min="1">
            <button class="btn btn-outline-secondary qty-inc" data-id="${it.id}" type="button">+</button>
          </div>
        </td>
        <td class="line-total">${formatMXN(line)}</td>`;
      tableBody.appendChild(tr);
    });
    sub.textContent = formatMXN(subtotal);
  }

  // Delegación de eventos global
  function attachGlobalHandlers(){
    // Botones Agregar
    document.addEventListener('click', (e)=>{
      const btn = e.target.closest('.add-cart');
      if (!btn) return;
      e.preventDefault();
      const item = parseItemFromButton(btn);
      addToCart(item);
      // anim badge
      const badge = $('#cartCount');
      if (badge && badge.animate) badge.animate([{transform:'scale(1)'},{transform:'scale(1.2)'},{transform:'scale(1)'}], {duration:300});
    });

    // Offcanvas: quitar item
    const offcanvas = $('#offcanvasCart');
    offcanvas?.addEventListener('click', (e)=>{
      const rm = e.target.closest('.remove-item');
      if (rm) { e.preventDefault(); removeFromCart(rm.dataset.id); }
    });

    // Página carrito: quitar / qty
    document.addEventListener('click', (e)=>{
      const rm = e.target.closest('.remove-item');
      if (rm && $('#cartTableBody')) { e.preventDefault(); removeFromCart(rm.dataset.id); }
      const inc = e.target.closest('.qty-inc');
      if (inc) {
        const id = inc.dataset.id; const items = getCart();
        const it = items.find(i=>i.id===id); if (it){ it.qty++; setCart(items); }
      }
      const dec = e.target.closest('.qty-dec');
      if (dec) {
        const id = dec.dataset.id; const items = getCart();
        const it = items.find(i=>i.id===id); if (it){ it.qty = Math.max(1, it.qty-1); setCart(items); }
      }
    });
    document.addEventListener('change', (e)=>{
      const input = e.target.closest('.qty-input');
      if (!input) return;
      const id = input.dataset.id;
      const val = Math.max(1, parseInt(input.value||'1',10));
      updateQty(id, val);
    });

    // Vaciar carrito
    $('#clearCart')?.addEventListener('click', ()=> clearCart());

    // Render al abrir el offcanvas
    offcanvas?.addEventListener('show.bs.offcanvas', renderMiniCart);
  }

  document.addEventListener('DOMContentLoaded', ()=>{
    // Iniciar badge desde storage
    renderBadge(getCart().reduce((a,it)=>a+(it.qty||0),0));
    renderMiniCart();
    renderCartPage();
    attachGlobalHandlers();
  });
})();

