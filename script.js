document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form-personaliza");
  const listaCarrito = document.getElementById("lista-carrito");
  const totalDisplay = document.getElementById("total");
  const formCorreo = document.getElementById("form-correo");
  const mensaje = document.getElementById("mensaje-confirmacion");
  const btnEliminar = document.getElementById("btn-eliminar"); // Botón eliminar pedido

  let carrito = [];
  let total = 0;

  const precios = {
    sabores: { limon: 500, frutilla: 600, mango: 650, naranja: 550, sandia: 580 },
    toppings: { gomitas: 150, chocolate: 200, frutas: 180, crema: 170, granola: 190 },
    alcohol: 250
  };

  // Función para actualizar la lista y total en pantalla
  function actualizarCarrito() {
    listaCarrito.innerHTML = "";
    carrito.forEach(item => {
      const li = document.createElement("li");
      li.textContent = `${item.descripcion} - $${item.precio}`;
      listaCarrito.appendChild(li);
    });
    totalDisplay.textContent = total;

    // Mostrar u ocultar formulario de correo según si hay productos
    formCorreo.style.display = carrito.length > 0 ? "block" : "none";

    // Mensaje cuando carrito vacío
    if (carrito.length === 0) {
      mensaje.textContent = "El carrito está vacío.";
      mensaje.style.color = "red";
    } else {
      mensaje.textContent = "";
    }
  }

  // Evento para agregar producto al carrito
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const sabor = form.sabor.value;
    const topping = form.topping.value;
    const alcohol = form.alcohol.checked;

    if (!sabor || !topping) return;

    const precio = (precios.sabores[sabor] || 0) + (precios.toppings[topping] || 0) + (alcohol ? precios.alcohol : 0);
    const descripcion = `Granizado de ${sabor} con ${topping}${alcohol ? ' y alcohol' : ''}`;

    carrito.push({ descripcion, precio });
    total += precio;

    actualizarCarrito();
    form.reset();
  });

  // Evento para enviar recibo por correo
  formCorreo.addEventListener("submit", function (e) {
    e.preventDefault();
    const email = e.target.email.value;
    const resumen = carrito.map(item => item.descripcion + " ($" + item.precio + ")").join("\n");
    const contenido = `Gracias por tu pedido.\n\n${resumen}\n\nTotal: $${total}`;

    alert(`Recibo enviado a ${email}\n\n${contenido}`);
    mensaje.textContent = `¡Tu pedido ha sido confirmado y se ha enviado un recibo a ${email}!`;
    mensaje.style.color = "green";
    formCorreo.reset();
  });

  // Evento para eliminar todo el pedido
  btnEliminar.addEventListener("click", () => {
    carrito = [];
    total = 0;
    actualizarCarrito();
  });

  // Inicializa la página ocultando el formulario de correo y mensaje
  actualizarCarrito();
});



