// 1. Datos del Menú Estructurados
const menuData = {
    "Bebidas": [
        { nombre: "Coca-Cola Original 600 Ml", precio: 30.00, descripcion: null },
        { nombre: "Jugo De Zanahoria", precio: 40.00, descripcion: null },
        { nombre: "Café Americano", precio: 45.00, descripcion: "Café americano." },
        { nombre: "Licuado De Plátano", precio: 50.00, descripcion: "Licuado de plátano, 600 ml." },
        { nombre: "Café De Olla", precio: 30.00, descripcion: "Café de olla." },
        { nombre: "Malteada De Vainilla", precio: 55.00, descripcion: "Malteada de vainilla, 500 ml." },
        { nombre: "Chocolate Caliente", precio: 50.00, descripcion: "Leche lala o deslactosada." },
        { nombre: "Licuado De Papaya", precio: 50.00, descripcion: "Licuado de papaya, 600 ml." },
        { nombre: "Agua De Sabor", precio: 40.00, descripcion: "Jamaica, tamarindo, horchata, mango, fresa." },
        { nombre: "Jugo Verde", precio: 65.00, descripcion: "Jugo de naranja, piña, apio y nopal." },
        { nombre: "Licuado De Fresa", precio: 50.00, descripcion: "Licuado de fresa, 500 ml." },
        { nombre: "Café De La Olla", precio: 45.00, descripcion: "Café aromatizado canela y piloncillo" },
        { nombre: "Jugo De Naranja", precio: 55.00, descripcion: "Jugo de naranja, 500 ml." },
        { nombre: "Malteada De Chocolate", precio: 55.00, descripcion: "Malteada de chocolate, 500 ml." },
        { nombre: "Choco Milk", precio: 40.00, descripcion: "Choco milk, 500 ml." },
        { nombre: "Jugo Zanahoria", precio: 50.00, descripcion: null },
        { nombre: "Frappe", precio: 60.00, descripcion: "Mocka, taro, matcha." }
    ],
    "Combos by Coca Cola": [
        { nombre: "Combo Chilaquiles C/ Queso +Cocacola Orig 600ml", precio: 135.00, descripcion: "Chilaquiles sencillos con queso y preparación a elegir. + Refresco" },
        { nombre: "Combo Chilaquiles C/ Huevo +Cocacola Orig 600ml", precio: 140.00, descripcion: "Chilaquiles con huevo estrellado, una porción de frijoles, cebolla y preparación a elegir. + Refresco" },
        { nombre: "Combo Chilaquiles C/ Pollo +Cocacola Orig 600ml", precio: 155.00, descripcion: "Chilaquiles con pollo desmenuzado, cebolla y preparación a elegir. + Refresco" },
        { nombre: "Combo Chilaquiles C/ Milanesa +Cocacola Orig 600ml", precio: 160.00, descripcion: "Chilaquiles con milanesa empanizada, queso, cebolla y preparación a elegir. + Refresco" },
        { nombre: "Combo Chilaquiles C/ Cecina +Cocacola Orig 600ml", precio: 180.00, descripcion: "Chilaquiles con cecina y preparación a elección. + Refresco" }
    ],
    "Chilaquiles": [
        { nombre: "Chilaquiles Con Cecina", precio: 150.00, descripcion: "Chilaquiles con cecina y preparación a elección." },
        { nombre: "Chilaquiles Con Queso", precio: 105.00, descripcion: "Chilaquiles sencillos con queso y preparación a elegir." },
        { nombre: "Chilaquiles Con Tocino", precio: 95.00, descripcion: "Chilaquiles con tocino y preparación a elección." },
        { nombre: "Chilaquiles Con Huevo", precio: 110.00, descripcion: "Chilaquiles con huevo estrellado, una porción de frijoles, cebolla y preparación a elegir." },
        { nombre: "Chilaquiles Con Milanesa", precio: 130.00, descripcion: "Chilaquiles con milanesa empanizada, queso, cebolla y preparación a elegir." },
        { nombre: "Chilaquiles Pastor", precio: 125.00, descripcion: "Chilaquiles con carne marinada al pastor y preparación a elegir." },
        { nombre: "Chilaquiles Con Cebolla", precio: 105.00, descripcion: "Chilaquiles sencillos con cebolla y preparación a elegir." },
        { nombre: "Chilaquiles Enmolados", precio: 105.00, descripcion: "Queso y cebolla." },
        { nombre: "Chilaquiles Con Crema", precio: 105.00, descripcion: "Chilaquiles sencillos con crema encima y preparación a elegir." },
        { nombre: "Chilaquiles Con Arrachera", precio: 145.00, descripcion: "Chilaquiles con arrachera, cebolla y preparación a elegir." },
        { nombre: "Chilaquiles Con Pollo", precio: 125.00, descripcion: "Chilaquiles con pollo desmenuzado, cebolla y preparación a elegir." },
        { nombre: "Chilaquiles Con Chorizo", precio: 120.00, descripcion: "Chilaquiles con chorizo y preparación a elección." },
        { nombre: "Chilaquiles Con Cilantro", precio: 105.00, descripcion: "Chilaquiles sencillos con cilantro y preparación a elegir." },
        { nombre: "Chilaquiles Con Frijoles", precio: 105.00, descripcion: "Chilaquiles sencillos con frijoles y preparación a elegir." }
    ],
    "Tortas de Chilaquiles": [
        { nombre: "Torta De Chilaquil", precio: 90.00, descripcion: "Torta rellena de chilaquil con cebolla, preparación y un adicional a elección." },
        { nombre: "Torta De Chilaquil Con Queso", precio: 90.00, descripcion: "Torta de chilaquil con queso, preparación y un adicional a elección." },
        { nombre: "Torta De Chilaquil Con Cilantro", precio: 90.00, descripcion: "Torta de chilaquil con cilantro, preparación y un adicional a elección." },
        { nombre: "Torta De Chilaquil Con Frijoles", precio: 90.00, descripcion: "Torta de chilaquil con frijoles, preparación y un adicional a elección." },
        { nombre: "Torta De Chilaquil Con Crema", precio: 90.00, descripcion: "Torta de chilaquil con crema, preparación y un adicional a elección." }
    ],
    "Entradas": [
        { nombre: "Plato De Fruta", precio: 95.00, descripcion: "Fruta con granola, plátano, manzana, papaya, melón y ingrediente a elección." },
        { nombre: "Chile Chilako", precio: 125.00, descripcion: "Chile seco rojo relleno de chilaquiles, ingrediente y salsa de elección." }
    ],
    "Desayunos y Comidas": [
        { nombre: "Tamales Puercos", precio: 140.00, descripcion: "Acompañados con carne de puerco." },
        { nombre: "Alambre", precio: 175.00, descripcion: "Queso, morrón y tocino." },
        { nombre: "Guisos", precio: 130.00, descripcion: "Plato con 2 guisos a elección, acompañados de frijoles." },
        { nombre: "Enchilada Suiza Queso O Pollo", precio: 115.00, descripcion: "Enchiladas con queso derretido y cebolla." },
        { nombre: "Quesadilla De Guiso", precio: 38.00, descripcion: "Quesadilla con guiso a elección." },
        { nombre: "Orden Nugget (4)", precio: 70.00, descripcion: "Capsu, mostaza, chimichurri." },
        { nombre: "Combo Hamburguesa Tradicional + Papas + Refresco", precio: 155.00, descripcion: "Hamburguesa con carne 115 gr, tocino, cebolla, pepinos, mayonesa, mostaza, kétchup y queso amarillo." },
        { nombre: "Espagueti Blanco O Verde", precio: 125.00, descripcion: "Acompañado de arrachera." },
        { nombre: "Empanadas (2)", precio: 85.00, descripcion: "Carne o jamón con queso." },
        { nombre: "Sopa De Arroz Roja", precio: 105.00, descripcion: "Acompañada de milanesa." },
        { nombre: "Orden Cecina", precio: 180.00, descripcion: null },
        { nombre: "Empalme", precio: 85.00, descripcion: "Frijol, chorizo, prensado." },
        { nombre: "Papas Ala Francesa", precio: 75.00, descripcion: "Capsu, mostaza, chimichurri." },
        { nombre: "Sopa Azteca", precio: 125.00, descripcion: "Aguacate, chile seco y queso panela." }
    ],
    "Postres": [
        { nombre: "Churro", precio: 15.00, descripcion: null },
        { nombre: "Churros", precio: 10.00, descripcion: null },
        { nombre: "Waffle", precio: 80.00, descripcion: "Chocolate, nutella, miel, lechera, fruta." },
        { nombre: "Hotcakes (2)", precio: 85.00, descripcion: "Chocolate, miel, cajeta, nutella, lechera, fruta." },
        { nombre: "Concha De Nata", precio: 55.00, descripcion: "Pan con sabor a elección y relleno de nata." }
    ]
};

const menuContainer = document.getElementById('menu-container');
const menuNav = document.getElementById('menu-nav');
let currentActiveSectionId = null;

// 2. Función para renderizar un producto
function renderItem(item) {
    return `
        <div class="menu-item">
            <div class="item-details">
                <span class="item-name">${item.nombre}</span>
                ${item.descripcion ? `<p class="item-description">${item.descripcion}</p>` : ''}
            </div>
            <span class="item-price">$${item.precio.toFixed(2)}</span>
        </div>
    `;
}

// 3. Generar el Menú y la Navegación
function generateMenu() {
    let menuHTML = '';
    let navHTML = '';
    const categories = Object.keys(menuData);

    categories.forEach(category => {
        // Generar botón de navegación
        const categoryId = category.replace(/\s+/g, '-').toLowerCase();
        navHTML += `<button class="nav-button" data-target="${categoryId}">${category}</button>`;

        // Generar sección del menú
        let itemsHTML = menuData[category].map(renderItem).join('');
        menuHTML += `
            <section class="menu-section" id="${categoryId}">
                <h2>${category}</h2>
                ${itemsHTML}
            </section>
        `;
    });

    menuContainer.innerHTML = menuHTML;
    menuNav.innerHTML = navHTML;
}

// 4. Lógica para mostrar solo una sección con animación suave
function showSection(targetId, navButtons) {
    const targetElement = document.getElementById(targetId);
    
    if (currentActiveSectionId === targetId) {
        return; 
    }

    // --- 1. Ocultar la SECCIÓN ACTUAL ---
    if (currentActiveSectionId) {
        const oldElement = document.getElementById(currentActiveSectionId);
        // Quitamos la clase de activación para que el CSS la oculte y reseteamos animación
        oldElement.classList.remove('is-active');
        // Quitamos las clases de animación individual de los productos
        oldElement.querySelectorAll('.menu-item').forEach(item => item.classList.remove('animate-show'));
        
        // Mantenemos el scroll si es necesario (sin animación de scroll dramática)
    }

    // --- 2. Mostrar la NUEVA SECCIÓN con retraso para suavizar la transición ---
    setTimeout(() => {
        if (targetElement) {
            // Añadir 'is-active' para que el CSS aplique el @keyframes fadeInSlide
            targetElement.classList.add('is-active'); 

            // Animación secuencial de CADA PRODUCTO (Efecto Cascada Suave)
            const items = targetElement.querySelectorAll('.menu-item');
            items.forEach((item, index) => {
                // Retraso incremental: Sutil aparición uno tras otro
                setTimeout(() => {
                    item.classList.add('animate-show');
                }, index * 70); // 70ms es el tiempo de retraso (sutil y rápido)
            });
        }
        
        currentActiveSectionId = targetId;

    }, 100); // 100ms de retraso entre la salida y la entrada

    // --- 3. Actualizar el botón de navegación ACTIVO ---
    navButtons.forEach(btn => btn.classList.remove('active'));
    const activeButton = document.querySelector(`.nav-button[data-target="${targetId}"]`);
    if (activeButton) {
        activeButton.classList.add('active');
    }
}

// 5. Configuración de la Navegación e Inicialización
function setupNavigation() {
    const navButtons = document.querySelectorAll('.nav-button');
    
    // Al cargar la página, mostrar la primera sección por defecto
    const firstButton = navButtons[0];
    if (firstButton) {
        const firstTargetId = firstButton.getAttribute('data-target');
        // Inicializa la primera sección 
        showSection(firstTargetId, navButtons); 
    }

    // Agregar el evento click a todos los botones
    navButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const targetId = event.target.getAttribute('data-target');
            showSection(targetId, navButtons);
        });
    });
}

// 6. Inicializar al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    generateMenu();
    setupNavigation();
});