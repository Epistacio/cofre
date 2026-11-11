// Aponta sinais de que um link pode ser golpe (phishing).

function sinaisDeAlerta(link) {
  const alertas = [];
  if (link.startsWith("http://")) alertas.push("não usa https (a conexão não é protegida)");
  if (link.includes("@")) alertas.push("tem @, que pode esconder o site verdadeiro");
  if (/\/\/\d+\.\d+\.\d+\.\d+/.test(link)) alertas.push("usa um número (IP) no lugar do nome do site");
  if (/bit\.ly|tinyurl|cutt\.ly/.test(link)) alertas.push("é um link encurtado, que esconde o destino");
  if (link.length > 75) alertas.push("é longo demais");
  return alertas;
}

function verificarLink() {
  const link = document.getElementById("link-endereco").value.trim().toLowerCase();
  const saida = document.getElementById("link-resultado");
  if (link === "") {
    saida.className = "resultado ruim";
    saida.textContent = "Cole um link primeiro.";
    return;
  }
  const alertas = sinaisDeAlerta(link);
  if (alertas.length === 0) {
    saida.className = "resultado bom";
    saida.textContent = "Nenhum sinal de alerta. Mesmo assim, desconfie de links que você não pediu.";
  } else {
    saida.className = "resultado ruim";
    saida.textContent = "Cuidado: " + alertas.join("; ") + ".";
  }
}

document.getElementById("link-botao").addEventListener("click", verificarLink);