import React from 'react';

const Documentos = ({ campeonato, exercicio }) => {
  React.useEffect(() => {
    const tabSeletoresD = document.querySelectorAll('.btn-link-doc');
    const tabConteudosD = document.querySelectorAll('div[role=tabpanel]');

    function activeTab(index) {
      tabSeletoresD.forEach((i) => i.classList.remove('active'));
      tabSeletoresD[index].classList.add('active');

      tabConteudosD.forEach((i) => i.classList.remove('ativo'));
      tabConteudosD[index].classList.add('ativo');
    }

    tabSeletoresD.forEach((i, k) => {
      tabSeletoresD[0].classList.add('active');
      tabConteudosD[0].classList.add('ativo');
      i.addEventListener('click', () => {
        activeTab(k);
      });
    });
  }, []);

  function regulamento(campeonato) {
    window.open(
      `http://www.futebolms.com.br/v5/wp-content/uploads/${exercicio}/${campeonato}/Regulamento ${campeonato} ${exercicio}.pdf`,
    );
  }

  function tabelaJogos(campeonato) {
    window.open(
      `http://www.futebolms.com.br/v5/wp-content/uploads/${exercicio}/${campeonato}/Tabela ${campeonato} ${exercicio}.pdf`,
    );
  }

  function planoAcao(campeonato) {
    window.open(
      `http://www.futebolms.com.br/v5/wp-content/uploads/${exercicio}/${campeonato}/Plano de ação ${campeonato} ${exercicio}.pdf`,
    );
  }

  return (
    <div className="tabs tabelaDocumentos">
      <ul id="demoTabs" className="nav" role="tablist">
        <li role="presentation" className="nav-item">
          <button
            id="tab1"
            className="btn btn-link nav-link btn-link-doc"
            type="button"
          >
            REGULAMENTO
          </button>
        </li>
        <li role="presentation" className="nav-item">
          <button
            id="tab2"
            className="btn btn-link nav-link btn-link-doc"
            type="button"
          >
            TABELA
          </button>
        </li>
        <li role="presentation" className="nav-item">
          <button
            id="tab3"
            className="btn btn-link nav-link btn-link-doc"
            type="button"
          >
            PLANO DE AÇÃO
          </button>
        </li>
      </ul>
      <div className="alinhamentoHorizontal">
        <div id="panel1" role="tabpanel" aria-labelledby="tab1">
          <table className="table">
            <thead className="tableHead">
              <tr>
                <th>TÍTULO</th>
                <th></th>
              </tr>
            </thead>
            <tbody className="tableBody">
              <tr>
                <td>Regulamento Específico {campeonato}</td>
                <td>
                  <button
                    className="btn btn-primary"
                    onClick={() => regulamento(campeonato)}
                  >
                    Visualizar
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div id="panel2" role="tabpanel" aria-labelledby="tab2">
          <table className="table">
            <thead className="tableHead">
              <tr>
                <th>TÍTULO</th>
                <th></th>
              </tr>
            </thead>
            <tbody className="tableBody">
              <tr>
                <td>Tabela de Jogos {campeonato}</td>

                <button
                  className="btn btn-primary"
                  onClick={() => tabelaJogos(campeonato)}
                >
                  Visualizar
                </button>
              </tr>
            </tbody>
          </table>
        </div>
        <div id="panel3" role="tabpanel" aria-labelledby="tab3">
          <table className="table">
            <thead className="tableHead">
              <tr>
                <th>TÍTULO</th>
                <th></th>
              </tr>
            </thead>
            <tbody className="tableBody">
              <tr>
                <td>Plano Geral de Ação - {exercicio}</td>
                <button
                  className="btn btn-primary"
                  onClick={() => planoAcao(campeonato)}
                >
                  Visualizar
                </button>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Documentos;
