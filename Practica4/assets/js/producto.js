/* assets/js/producto.js */

(() => {
  // ===== Demo de catálogo (puedes moverlo a JSON o a products.js) =====
  const PRODUCTS = [
    {
      id: "dunk-low",
      name: "Nike Dunk Low Retro",
      category: "Zapatos",
      sub: "Tenis unisex",
      genderTag: "UNISEX",
      price: 2599,
      images: [
        "https://nb.scene7.com/is/image/NB/mr530sg_nb_02_i?wid=880&hei=880&bgc=f1f1f1&layer=1&bgcolor=f1f1f1&blendMode=mult", // usa tus urls reales
        "https://i.imgur.com/6n9x2m7.jpeg",
        "https://i.imgur.com/UuD3w8j.jpeg",
        "https://i.imgur.com/6jZrQJ1.jpeg"
      ],
      sizes: {
        // true = disponible, false = agotado
        "CM 25": false, "CM 26": true, "CM 26.5": true, "CM 27": true,
        "CM 27.5": true, "CM 28": true, "CM 28.5": false, "CM 29": true
      },
      description:
        "Icono del básquetbol con materiales premium y comfort moderno. Perfecto para calle o cancha.",
      specs: [
        "Color mostrado: Blanco/Negro",
        "Estilo: DD1391-100",
        "Origen: Indonesia / Vietnam"
      ],
      related: ["530", "negroni-tee", "tote-bag"] // IDs de sugeridos
    },
    {
      id: "530",
      name: "New Balance 530",
      category: "Zapatos",
      sub: "Running Retro",
      genderTag: "HOMBRE",
      price: 2699,
      images: [
        "https://nb.scene7.com/is/image/NB/mr530sg_nb_02_i?wid=880&hei=880&bgc=f1f1f1&layer=1&bgcolor=f1f1f1&blendMode=mult"
      ],
      sizes: {"26":true,"26.5":true,"27":true,"27.5":true,"28":true,"28.5":true},
      description:"Clásico retro con amortiguación ABZORB™.",
      specs:["Plantilla cómoda","Upper mesh/sintético"],
      related:["dunk-low","tote-bag"]
    },
    {
      id: "negroni-tee",
      name: "Negroni Please Tee",
      category: "Ropa",
      sub: "Playera gráfica",
      genderTag: "UNISEX",
      price: 799,
      images: ["https://i.pinimg.com/736x/59/fa/c7/59fac7d9e7e769e6ff2a7af64e93af64.jpg"],
      sizes: {"S":true,"M":true,"L":true,"XL":true},
      description:"Algodón suave 180g. Estampa frontal y trasera.",
      specs:["100% algodón","Regular fit"],
      related:["dunk-low","tote-bag"]
    },
    {
      id: "tote-bag",
      name: "The Tote Bag",
      category: "Accesorios",
      sub: "Bolsa",
      genderTag: "MUJER",
      price: 5568,
      images: ["https://cdn.media.amplience.net/i/Marc_Jacobs/MJI_M0017025_263_F8F8F8_4-5_MAIN?w=500&qlt=100&img404=NOIMAGEMEDIUM_1-1"],
      sizes: {"U":true},
      description:"Canvas premium con cierre y bolsillo interior.",
      specs:["100% algodón","Made in VN"],
      related:["dunk-low","530"]
    }
  ];

  // ===== Helpers =====
  const $ = s => document.querySelector(s);
  const qs = new URLSearchParams(location.search);
  const money = v => v.toLocaleString("es-MX",{style:"currency",currency:"MXN"});

  const findProduct = id => PRODUCTS.find(p => p.id === id) || PRODUCTS[0];

  // ===== Render =====
  const renderProduct = (p) => {
    $("#pName").textContent  = p.name;
    $("#bcName").textContent = p.name;
    $("#bcCat a").textContent = p.category;
    $("#bcCat a").href = (p.category.toLowerCase().includes("zapato")) ? "zapatos.html" : "index.html";
    $("#pSub").textContent   = p.sub;
    $("#pPrice").textContent = money(p.price);
    $("#pTag").textContent   = p.genderTag || "UNISEX";

    // imagen principal
    const main = $("#pMain");
    main.src = p.images[0];
    main.alt = p.name;

    // thumbs
    const thumbsWrap = document.createElement("div");
    p.images.forEach((src, i) => {
      const d = document.createElement("div");
      d.className = "thumb" + (i === 0 ? " active":"");
      d.innerHTML = `<img alt="thumb" src="${src}">`;
      d.addEventListener("click", () => {
        main.src = src;
        [...thumbsWrap.children].forEach(el => el.classList.remove("active"));
        d.classList.add("active");
      });
      thumbsWrap.appendChild(d);
    });
    const thumbsTarget = $("#thumbs");
    thumbsTarget.innerHTML = "";
    thumbsTarget.appendChild(thumbsWrap);

    // tallas
    const sizes = $("#sizes");
    sizes.innerHTML = "";
    const sizeKeys = Object.keys(p.sizes);
    sizeKeys.forEach(size => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "size-btn";
      btn.textContent = size;
      if (!p.sizes[size]) btn.disabled = true;
      btn.addEventListener("click", () => {
        [...sizes.querySelectorAll(".size-btn")].forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
      });
      sizes.appendChild(btn);
    });

    // descripción/especificaciones
    $("#pDesc").textContent = p.description || "";
    const ul = $("#pSpecs");
    ul.innerHTML = "";
    (p.specs || []).forEach(s => {
      const li = document.createElement("li");
      li.textContent = s;
      ul.appendChild(li);
    });

    // relacionados
    const rel = $("#related");
    rel.innerHTML = "";
    (p.related || []).map(id => findProduct(id)).forEach(r => {
      const col = document.createElement("div");
      col.className = "col-6 col-md-3";
      col.innerHTML = `
        <a class="text-decoration-none text-dark" href="producto.html?id=${r.id}">
          <div class="card p-card">
            <img src="${r.images[0]}" class="card-img-top" alt="${r.name}">
            <div class="card-body">
              <div class="small text-muted">${r.category}</div>
              <div class="fw-bold">${r.name}</div>
              <div class="text-muted">${money(r.price)}</div>
            </div>
          </div>
        </a>`;
      rel.appendChild(col);
    });

    // ver más de la categoría
    const btnSeeMore = $("#seeMoreCat");
    btnSeeMore.href = (p.category.toLowerCase().includes("zapato")) ? "zapatos.html" : "index.html";

    // evento agregar a la bolsa
    $("#btnAdd").onclick = () => {
      const selected = sizes.querySelector(".size-btn.active");
      if (!selected) {
        alert("Selecciona una talla.");
        return;
      }
      const item = {
        id: p.id + "|" + selected.textContent, // id único por talla
        productId: p.id,
        name: p.name,
        price: p.price,
        size: selected.textContent,
        img: p.images[0],
        qty: 1
      };

      if (window.Cart && typeof window.Cart.add === "function") {
        // usa tu carrito si existe
        window.Cart.add(item);
      } else {
        // fallback simple a localStorage
        const CART_KEY = "CART";
        const cart = JSON.parse(localStorage.getItem(CART_KEY) || "[]");
        const ix = cart.findIndex(x => x.id === item.id);
        if (ix >= 0) cart[ix].qty += 1; else cart.push(item);
        localStorage.setItem(CART_KEY, JSON.stringify(cart));
      }

      updateBadge();
      showAddedToast();
    };

    // wishlist
    $("#btnWish").onclick = () => {
      const WL_KEY = "WISHLIST";
      let wl = JSON.parse(localStorage.getItem(WL_KEY) || "[]");
      if (!wl.includes(p.id)) wl.push(p.id);
      localStorage.setItem(WL_KEY, JSON.stringify(wl));
      $("#btnWish").innerHTML = `Añadido <i class="bi bi-heart-fill ms-1"></i>`;
    };
  };

  function updateBadge(){
    const CART_KEY = "CART";
    let count = 0;
    if (window.Cart && typeof window.Cart.count === "function") {
      count = window.Cart.count();
    } else {
      const cart = JSON.parse(localStorage.getItem(CART_KEY) || "[]");
      count = cart.reduce((a,b)=>a + (b.qty||1), 0);
    }
    const badge = document.getElementById("cartBadge");
    if (badge) badge.textContent = count;
  }

  // toast sencillo
  function showAddedToast(){
    const el = document.createElement("div");
    el.className = "position-fixed bottom-0 end-0 p-3";
    el.style.zIndex = "1080";
    el.innerHTML = `
      <div class="toast show text-bg-dark">
        <div class="d-flex">
          <div class="toast-body">Producto agregado a la bolsa ✅</div>
          <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
        </div>
      </div>`;
    document.body.appendChild(el);
    setTimeout(()=>el.remove(), 2500);
  }

  // ===== Init =====
  const id = qs.get("id") || "dunk-low";
  const product = findProduct(id);
  renderProduct(product);
  updateBadge();

})();
