async function buscarCEP() {
  const cep = document.getElementById('cep').value

  const resposta = await fetch(`https://viacep.com.br/ws/${cep}/json/`)

  const dados = await resposta.json()

  const informacoesFiltradas = {
    rua: dados.logradouro,
    bairro: dados.bairro,
    estado: dados.estado,
    regiao: dados.regiao,
    ddd: dados.ddd
  }

  return informacoesFiltradas
}

async function enviarDados(event) {
  event.preventDefault()

  const dadosCep = await buscarCEP()
  const email = document.getElementById('email').value
  const mensagem = document.getElementById('message').value

  const dadosParaEnviar = {
    dadosCep: dadosCep,
    email: email,
    mensagem: mensagem
  }

  const resposta = await fetch('https://formspree.io/f/mqeybygr', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(dadosParaEnviar)
  })

  const dados = await resposta.json()

  console.log(dados);
  console.log(dadosCep);
  console.log(email);
  console.log(mensagem);
}