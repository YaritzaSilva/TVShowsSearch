const handleSearch = async (event) => {
  event.preventDefault();

  const message = document.querySelector('#message');
  message.innerHTML = 'carregando...';

  const lista = document.querySelector('#shows');
  lista.innerHTML = '';

  const pesquisa = document.querySelector('#query');
  const texto = pesquisa.value;

  const url = `https://api.tvmaze.com/search/shows?q=${texto}`;

  const resposta = await fetch(url);
  const programas = await resposta.json();

  if (programas.length === 0) {
    message.innerHTML = 'Nenhum resultado.';
    return;
  }
  message.innerHTML = '';

  programas.forEach((programa) => {
    const titulo = programa?.show?.name || '';
    const imagem = programa?.show?.image?.medium || '';

    lista.insertAdjacentHTML(
      'beforeend',
      `
      <li>
        <img class="poster" src="${imagem}">
        <span class="show-name">${titulo}</span>
      </li>
      `
    );
  });
};

document.addEventListener('DOMContentLoaded', () => {
  document
    .querySelector('#search-form')
    .addEventListener('submit', handleSearch);
});
