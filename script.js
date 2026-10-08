let form = document.getElementById("cepForm");
let inputCep = document.getElementById("cep");
let resultado = document.getElementById("resultado");

let regioes = {
  AC: "Norte",
  AP: "Norte",
  AM: "Norte",
  PA: "Norte",
  RO: "Norte",
  RR: "Norte",
  TO: "Norte",
  AL: "Nordeste",
  BA: "Nordeste",
  CE: "Nordeste",
  MA: "Nordeste",
  PB: "Nordeste",
  PE: "Nordeste",
  PI: "Nordeste",
  RN: "Nordeste",
  SE: "Nordeste",
  DF: "Centro-Oeste",
  GO: "Centro-Oeste",
  MT: "Centro-Oeste",
  MS: "Centro-Oeste",
  ES: "Sudeste",
  MG: "Sudeste",
  RJ: "Sudeste",
  SP: "Sudeste",
  PR: "Sul",
  RS: "Sul",
  SC: "Sul",
};


inputCep.addEventListener("input", () => {
  let valor = inputCep.value.replace(/\D/g, "").slice(0, 8);

  if (valor.length > 5) {
    valor = valor.slice(0, 5) + "-" + valor.slice(5);
  }

  inputCep.value = valor;
});

form.addEventListener("submit", consultarCep);

async function consultarCep(event) {
  event.preventDefault();

  let cep = inputCep.value.replace(/\D/g, "");

  if (cep.length !== 8) {
    resultado.innerHTML = `
      <div class="erro">Digite um CEP válido com 8 números.</div>
    `;
    inputCep.focus();
    return;
  }

  resultado.innerHTML = `
    <div class="card-endereco carregando">
      <span class="spinner"></span>
      Consultando CEP...
    </div>
  `;

  try {

    let resposta = await fetch(`https://brasilapi.com.br/api/cep/v2/${cep}`);

    if (!resposta.ok) {
      throw new Error("CEP não encontrado.");
    }

    let dados = await resposta.json();

    let regiao = regioes[dados.state] || "Não informada";

    resultado.innerHTML = `
      <div class="card-endereco">
        <h2>Endereço encontrado</h2>

        <div class="grid-info">
          <div class="info">
            <small>CEP</small>
            <strong>${dados.cep || "-"}</strong>
          </div>

          <div class="info">
            <small>Estado</small>
            <strong>${nomeEstado(dados.state)}</strong>
          </div>

          <div class="info">
            <small>UF</small>
            <strong>${dados.state || "-"}</strong>
          </div>

          <div class="info">
            <small>Região</small>
            <strong>${regiao}</strong>
          </div>

          <div class="info">
            <small>Cidade</small>
            <strong>${dados.city || "-"}</strong>
          </div>

          <div class="info">
            <small>Bairro</small>
            <strong>${dados.neighborhood || "-"}</strong>
          </div>

          <div class="info" style="grid-column: 1 / -1;">
            <small>Logradouro</small>
            <strong>${dados.street || "Não informado"}</strong>
          </div>
        </div>
      </div>
    `;
  } catch (erro) {
    resultado.innerHTML = `
      <div class="erro">
        Não foi possível consultar esse CEP. Verifique os números e tente novamente.
      </div>
    `;
  }
}

function nomeEstado(uf) {
  let estados = {
    AC: "Acre",
    AL: "Alagoas",
    AP: "Amapá",
    AM: "Amazonas",
    BA: "Bahia",
    CE: "Ceará",
    DF: "Distrito Federal",
    ES: "Espírito Santo",
    GO: "Goiás",
    MA: "Maranhão",
    MT: "Mato Grosso",
    MS: "Mato Grosso do Sul",
    MG: "Minas Gerais",
    PA: "Pará",
    PB: "Paraíba",
    PR: "Paraná",
    PE: "Pernambuco",
    PI: "Piauí",
    RJ: "Rio de Janeiro",
    RN: "Rio Grande do Norte",
    RS: "Rio Grande do Sul",
    RO: "Rondônia",
    RR: "Roraima",
    SC: "Santa Catarina",
    SP: "São Paulo",
    SE: "Sergipe",
    TO: "Tocantins",
  };

  return estados[uf] || uf || "-";
}
