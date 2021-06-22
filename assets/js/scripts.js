// Criamos uma variável "form" que vai receber o form da DOM.
const form = document.getElementById("form");
// Adicionamos um evento que recebe dois paramêtros, sempre que houver um submit no "form" ele irá iniciar uma função.
form.addEventListener("submit", handleSubmit);

// Uma função para o evento de submit do "form".
function handleSubmit(event) {
  // preventDefault previne as configurações padrão do navegador, faz com que a página não recarregue após um submit.
  event.preventDefault();

  // Vamos guardar os valores dos inputs nessas variáveis.
  const gender = getSelectedValue("gender");
  const age = getInputNumberValue("age");
  const weight = getInputNumberValue("weight");
  const height = getInputNumberValue("height");
  const activityLevel = getSelectedValue("activity_level");

  // Uma variável que carrega a fórmula da taxa do metabolismo basal.
  const tmb = Math.round(
    gender === "female"
      ? 655 + 9.6 * weight + 1.8 * height - 4.7 * age
      : 66 + 13.7 * weight + 5 * height - 6.8 * age
  );
  // Uma variável que carrega a fórmula para manter seu peso.
  const maintenance = Math.round(tmb * Number(activityLevel));
  // Uma variável que carrega a fórmula para perder peso.
  const loseWeight = maintenance - 450;
  // Uma variável que carrega a fórmula para ganhar peso.
  const gainWeight = maintenance + 450;

  // Uma variável que carrega o código HTML dentro de "string literals" junto das variáveis das fórmulas.
  const layout = `
    <h2>Aqui está o resultado:</h2>
    <div class="result-content">
      <ul>
        <li>
          Seu metabolismo basal é de <strong>${tmb} calorias</strong>.
        </li>
        <li>
          Para manter o seu peso você precisa consumir em média
          <strong>${maintenance} calorias</strong>.
        </li>
        <li>
          Para perder peso você precisa consumir em média
          <strong>${loseWeight} calorias</strong>.
        </li>
        <li>
          Para ganhar peso você precisa consumir em média
          <strong>${gainWeight} calorias</strong>.
        </li>
      </ul>
    </div>
  `;

  // Uma variável que recebe a div com o id "result".
  const result = document.getElementById("result");
  // O HTML da variável recebe a variável que carregava o código HTML.
  result.innerHTML = layout;
}

// Uma função para pegar os values dos selects.
function getSelectedValue(id) {
  const select = document.getElementById(id);
  return select.options[select.selectedIndex].value;
}

// Uma função para pegar os values dos inputs e transformá-los em Number (eles, por padrão, são strings).
function getInputNumberValue(id) {
  return Number(document.getElementById(id).value);
}
