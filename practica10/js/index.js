const persona1 = {
    nombre: "The",
    apellido: "Weeknd",
    edad: 35,
    ciudad: "Toronto",
    profesion: "Cantante",
    direccion: {
        calle: "123 Calle Principal",
        ciudad: "Toronto",
        estado: "Ontario",
    },
    hobbies: ["Música", "Producción", "Actuación"]
};

let nombre1 = document.getElementById("nombre1");
nombre1.innerHTML = persona1.nombre + " " + persona1.apellido;

let edad1 = document.getElementById("edad1");
edad1.innerHTML = persona1.edad + " años";

let profesion1 = document.getElementById("profesion1");
profesion1.innerHTML = persona1.profesion;

let direccion1 = document.getElementById("direccion1");
direccion1.innerHTML = persona1.direccion.calle + ", " + persona1.direccion.ciudad + ", " + persona1.direccion.estado;

let hobbies1 = document.getElementById("hobbies1");
persona1.hobbies.forEach(hobby => {
    let li = document.createElement("li");
    li.innerHTML = hobby;
    hobbies1.appendChild(li);
});

const persona2 = {
    nombre: "Lana",
    apellido: "Del Rey",
    edad: 35,
    profesion: "Cantante",
    direccion: {
        calle: "542 W4 Street",
        ciudad: "New York City",
        estado: "New York"
    },
    hobbies: ["Música", "Composición", "Arte"]
};

let nombre2 = document.getElementById("nombre2");
nombre2.innerHTML = persona2.nombre + " " + persona2.apellido;

let edad2 = document.getElementById("edad2");
edad2.innerHTML = persona2.edad + " años";

let profesion2 = document.getElementById("profesion2");
profesion2.innerHTML = persona2.profesion;

let direccion2 = document.getElementById("direccion2");
direccion2.innerHTML = persona2.direccion.calle + ", " + persona2.direccion.ciudad + ", " + persona2.direccion.estado;

let hobbies2 = document.getElementById("hobbies2");
persona2.hobbies.forEach(hobby => {
    let li = document.createElement("li");
    li.innerHTML = hobby;
    hobbies2.appendChild(li);
});

// Información de Playboi Carti
const persona3 = {
    nombre: "Playboi",
    apellido: "Carti",
    edad: 28,
    profesion: "Rapper",
    direccion: {
        calle: "1010 Carti Blvd",
        ciudad: "Atlanta",
        estado: "Georgia"
    },
    hobbies: ["Moda", "Música", "Fotografía"]
};

let nombre3 = document.getElementById("nombre3");
nombre3.innerHTML = persona3.nombre + " " + persona3.apellido;

let edad3 = document.getElementById("edad3");
edad3.innerHTML = persona3.edad + " años";

let profesion3 = document.getElementById("profesion3");
profesion3.innerHTML = persona3.profesion;

let direccion3 = document.getElementById("direccion3");
direccion3.innerHTML = persona3.direccion.calle + ", " + persona3.direccion.ciudad + ", " + persona3.direccion.estado;

let hobbies3 = document.getElementById("hobbies3");
persona3.hobbies.forEach(hobby => {
    let li = document.createElement("li");
    li.innerHTML = hobby;
    hobbies3.appendChild(li);
});

// Información de Anitta
const persona4 = {
    nombre: "Anitta",
    apellido: "",
    edad: 31,
    profesion: "Cantante",
    direccion: {
        calle: "Rua Figueiredo",
        ciudad: "Rio de Janeiro",
        estado: "RJ"
    },
    hobbies: ["Baile", "Música", "Moda"]
};

let nombre4 = document.getElementById("nombre4");
nombre4.innerHTML = persona4.nombre;

let edad4 = document.getElementById("edad4");
edad4.innerHTML = persona4.edad + " años";

let profesion4 = document.getElementById("profesion4");
profesion4.innerHTML = persona4.profesion;

let direccion4 = document.getElementById("direccion4");
direccion4.innerHTML = persona4.direccion.calle + ", " + persona4.direccion.ciudad + ", " + persona4.direccion.estado;

let hobbies4 = document.getElementById("hobbies4");
persona4.hobbies.forEach(hobby => {
    let li = document.createElement("li");
    li.innerHTML = hobby;
    hobbies4.appendChild(li);
});

// Información de Travis Scott
const persona5 = {
    nombre: "Travis",
    apellido: "Scott",
    edad: 32,
    profesion: "Rapper",
    direccion: {
        calle: "75th St, Houston",
        ciudad: "Houston",
        estado: "Texas"
    },
    hobbies: ["Música", "Moda", "Diseño"]
};

let nombre5 = document.getElementById("nombre5");
nombre5.innerHTML = persona5.nombre + " " + persona5.apellido;

let edad5 = document.getElementById("edad5");
edad5.innerHTML = persona5.edad + " años";

let profesion5 = document.getElementById("profesion5");
profesion5.innerHTML = persona5.profesion;

let direccion5 = document.getElementById("direccion5");
direccion5.innerHTML = persona5.direccion.calle + ", " + persona5.direccion.ciudad + ", " + persona5.direccion.estado;

let hobbies5 = document.getElementById("hobbies5");
persona5.hobbies.forEach(hobby => {
    let li = document.createElement("li");
    li.innerHTML = hobby;
    hobbies5.appendChild(li);
});

// Información de Florence Welch
const persona6 = {
    nombre: "Florence",
    apellido: "Welch",
    edad: 37,
    profesion: "Cantante",
    direccion: {
        calle: "Stoneleigh Road",
        ciudad: "London",
        estado: "England"
    },
    hobbies: ["Música", "Poesía", "Arte"]
};

let nombre6 = document.getElementById("nombre6");
nombre6.innerHTML = persona6.nombre + " " + persona6.apellido;

let edad6 = document.getElementById("edad6");
edad6.innerHTML = persona6.edad + " años";

let profesion6 = document.getElementById("profesion6");
profesion6.innerHTML = persona6.profesion;

let direccion6 = document.getElementById("direccion6");
direccion6.innerHTML = persona6.direccion.calle + ", " + persona6.direccion.ciudad + ", " + persona6.direccion.estado;

let hobbies6 = document.getElementById("hobbies6");
persona6.hobbies.forEach(hobby => {
    let li = document.createElement("li");
    li.innerHTML = hobby;
    hobbies6.appendChild(li);
});
