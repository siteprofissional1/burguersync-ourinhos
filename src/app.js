/**
 * ==============================================================================
 * BurguerSync Ourinhos - Controlador Principal da Aplicação (Layer 3)
 * ==============================================================================
 * Gerencia a alternância de visões (Cliente x Cozinha) e inicializa os módulos reativos.
 */

import { inicializarCliente } from "./cliente.js";
import { inicializarCozinha } from "./cozinha.js";

document.addEventListener("DOMContentLoaded", () => {
  console.log("🍔 [BurguerSync Ourinhos] Sistema inicializado.");

  const btnModoCliente = document.getElementById("btnModoCliente");
  const btnModoCozinha = document.getElementById("btnModoCozinha");
  const viewCliente = document.getElementById("viewCliente");
  const viewCozinha = document.getElementById("viewCozinha");

  function alternarModo(modo) {
    if (modo === "cliente") {
      btnModoCliente?.classList.add("active");
      btnModoCozinha?.classList.remove("active");
      viewCliente?.classList.add("active");
      viewCozinha?.classList.remove("active");
    } else {
      btnModoCozinha?.classList.add("active");
      btnModoCliente?.classList.remove("active");
      viewCozinha?.classList.add("active");
      viewCliente?.classList.remove("active");
    }
  }

  btnModoCliente?.addEventListener("click", () => alternarModo("cliente"));
  btnModoCozinha?.addEventListener("click", () => alternarModo("cozinha"));

  // Inicializa a lógica de cada visão
  inicializarCliente();
  inicializarCozinha();
});
