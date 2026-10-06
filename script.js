async function consultarCEP() {
    const cep = document.getElementById("cep").value;

    const resposta = await fetch(
        `https://brasilapi.com.br/api/cep/v2/${cep}`
    );

    const dados = await resposta.json();

    document.getElementById("resultado").innerHTML = `
        <p>Rua: ${dados.street}</p>
        <p>Bairro: ${dados.neighborhood}</p>
        <p>Cidade: ${dados.city}</p>
        <p>Estado: ${dados.state}</p>
    `;
}
