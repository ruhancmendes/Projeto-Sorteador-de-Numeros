const btnSortear = document.getElementById("sortear");
const btnNovamente = document.getElementById("novamente");
const contentForm = document.querySelector(".content-form");
const formResults = document.querySelector(".form-results");
const resultsContainer = document.querySelector(".results");

btnSortear.addEventListener("click", () => {
  // Esconde o formulário e mostra os resultados
  contentForm.classList.add("hidden");
  formResults.classList.remove("hidden");

  // Limpa resultados anteriores
  resultsContainer.innerHTML = "";

  const quantidade = parseInt(document.getElementById("amount").value);
  const de = parseInt(document.getElementById("from").value);
  const ate = parseInt(document.getElementById("to").value);
  const semRepetir = document.getElementById("checkbox").checked;

  if (
    isNaN(quantidade) ||
    isNaN(de) ||
    isNaN(ate) ||
    quantidade <= 0 ||
    de >= ate
  ) {
    alert("Preencha os campos corretamente.");
    return;
  }

  const numeros = [];
  let sorteados = 0;

  function sortearNumeroComIntervalo(i) {
    setTimeout(() => {
      let numero;

      do {
        numero = Math.floor(Math.random() * (ate - de + 1)) + de;
      } while (semRepetir && numeros.includes(numero));

      numeros.push(numero);

      const resultWrapper = document.createElement("div");
      resultWrapper.classList.add("result-wrapper");

      const result = document.createElement("div");
      result.classList.add("result");

      const contentNumber = document.createElement("span");
      contentNumber.classList.add("content-number");
      contentNumber.textContent = numero;

      resultWrapper.appendChild(result);
      resultWrapper.appendChild(contentNumber);
      resultsContainer.appendChild(resultWrapper);

      // Quando o último for exibido, mostrar botão "Sortear novamente"
      if (i === quantidade - 1) {
        btnNovamente.style.opacity = "1"; // já tem animação no CSS
      }
    }, i * 3000); // 3 segundos entre cada número
  }

  for (let i = 0; i < quantidade; i++) {
    sortearNumeroComIntervalo(i);

    // clean up
    document.getElementById("amount").value = "";
    document.getElementById("from").value = "";
    document.getElementById("to").value = "";
  }
});

btnNovamente.addEventListener("click", () => {
  // Limpa e reinicia
  formResults.classList.add("hidden");
  contentForm.classList.remove("hidden");
});
