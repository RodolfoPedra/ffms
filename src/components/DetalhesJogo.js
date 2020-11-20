import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { GlobalContext } from './useContext/GlobalContext';
import { BsGraphUp, BsReverseLayoutTextSidebarReverse } from 'react-icons/bs';
import Documentos from './Documentos';
import { MdKeyboardReturn } from 'react-icons/md';

const tabelas = ['ARBITRAGEM EM CAMPO', 'ALTERAÇÕES'];
const tableHeadArbitro = ['FUNÇÃO', 'NOME', 'CATEGORIA'];

const DetalhesJogo = () => {
  const { id_jogo } = useParams();
  const [arbitros, setArbitros] = React.useState(null);
  const [alteracoes, setAlteracoes] = React.useState(null);
  const dadosGlobais = React.useContext(GlobalContext);
  const [jogo, setJogo] = React.useState(null);
  const [nomeFase, setNomeFase] = React.useState(null);
  console.log('detalhes :', dadosGlobais.campeonatosNomes);
  function getJogo() {
    const proxyurl = 'https://cors-anywhere.herokuapp.com/';
    const url = `${dadosGlobais.baseUrl}Jogo/${id_jogo}`;
    fetch(proxyurl + url, {
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        Authorization: `${dadosGlobais.auth}`,
      },
    })
      .then((response) => response.json())
      .then((json) => setJogo(json));
  }

  function getArbitrosJogos() {
    const proxyurl = 'https://cors-anywhere.herokuapp.com/';
    const url = `${dadosGlobais.baseUrl}ArbitrosEscaladosJogo/${id_jogo}`;
    fetch(proxyurl + url, {
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        Authorization: `${dadosGlobais.auth}`,
      },
    })
      .then((response) => response.json())
      .then((json) => setArbitros(json));
  }

  function getAlteracoes() {
    const proxyurl = 'https://cors-anywhere.herokuapp.com/';
    const url = `${dadosGlobais.baseUrl}AlteracoesJogo/${id_jogo}`;
    fetch(proxyurl + url, {
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        Authorization: `${dadosGlobais.auth}`,
      },
    })
      .then((response) => response.json())
      .then((json) => setAlteracoes(json));
  }

  function getNomeFase() {
    dadosGlobais.campeonatosNomes.map((item) => {
      if (item.codigo_campeonato == jogo.Codigo_Campeonato) {
        setNomeFase(item.Campeonato_Nome);
      }
    });
  }

  React.useEffect(() => {
    if (id_jogo) {
      getJogo();
      getArbitrosJogos();
      getAlteracoes();
    }
  }, [id_jogo]);

  React.useEffect(() => {
    if (jogo) {
      getNomeFase();
    }
  }, [jogo]);

  React.useEffect(() => {
    const tabSeletoresDetalhes = document.querySelectorAll(
      '.btn-link-detalhes',
    );
    const tabConteudosDetalhes = document.querySelectorAll('.tabs section');

    function activeTab(index) {
      tabSeletoresDetalhes.forEach((i) => i.classList.remove('active'));
      tabSeletoresDetalhes[index].classList.add('active');

      tabConteudosDetalhes.forEach((i) => i.setAttribute('aria-hidden', true));
      tabConteudosDetalhes[index].removeAttribute('aria-hidden');
    }

    tabSeletoresDetalhes.forEach((i, k) => {
      tabSeletoresDetalhes[0].classList.add('active');
      tabConteudosDetalhes[0].removeAttribute('aria-hidden');
      i.addEventListener('click', () => {
        activeTab(k);
        console.log(k);
      });
    });
  }, [arbitros, alteracoes]);

  function reverterData(data) {
    if (data !== null) {
      const dataSplit = data.split(' ')[0];
      const dataRv = dataSplit.split('-').reverse();
      const novaData = dataRv.join('/');
      return novaData;
    }
  }

  function getHora(data) {
    if (data !== null) {
      const horaSplit = data.split(' ')[1];
      const hora = horaSplit.substring(0, 5);
      return hora;
    }
  }

  function retornadiaSemana(data) {
    var semana = ['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SAB'];
    if (data != null) {
      var arr = data.split('/').reverse();
      var datearray = new Date(arr[0], arr[2] - 1, arr[1]);
      var dia = datearray.getDay();
      return semana[dia];
    }
  }

  function sumula(idJogo) {
    window.open(
      `https://conteudo.cbf.com.br/federacoes/5/sumulas/2020/${idJogo}.pdf`,
    );
  }

  function beletimFinanca(idJogo) {
    window.open(
      `https://conteudo.cbf.com.br/federacoes/5/borderos/2020/${idJogo}b.pdf`,
    );
  }

  if (
    arbitros === null ||
    alteracoes === null ||
    jogo === null ||
    nomeFase === null
  )
    return null;
  return (
    <div>
      <Link to="/v5/campeonatos/">
        <MdKeyboardReturn />
        Campeonatos
      </Link>
      <section className="infoDetalhesJogo">
        <div className="infoJogo">
          <p>{jogo.Campeonato_Nome}</p>
          <div className="timesJogo clr-row clr-col-12">
            <div className="time1">
              <p>{jogo.TimeNomeMandante}</p>
              <img
                className="brasaoRodada"
                src={`http://futebolms.com.br/v5/wp-content/uploads/api/escudos/serieA/${jogo.Codigo_Time_Mandante}.png`}
                alt=""
              />
            </div>
            <span className="resultado">{jogo.Resultado}</span>
            <div className="time2">
              <img
                className="brasaoRodada"
                src={`http://futebolms.com.br/v5/wp-content/uploads/api/escudos/serieA/${jogo.Codigo_Time_Visitante}.png`}
                alt=""
              />
              <p>{jogo.TimeNomeVisitante}</p>
            </div>
          </div>
          <p className="dataLocal">
            {`${retornadiaSemana(jogo.Jogo_Data)}, ${
              jogo.Jogo_DataDDMMYYYY
            } - ${jogo.Horario} - ${jogo.Estadio}`}
          </p>
        </div>
      </section>
      <div className="tabs">
        <ul id="demoTabs" className="nav" role="tablist">
          {tabelas.map((v, k) => (
            <li role="presentation" className="nav-item" key={v}>
              <button
                id={`tab${k + 1}`}
                className="btn btn-link nav-link btn-link-detalhes"
                type="button"
              >
                {v}
              </button>
            </li>
          ))}
        </ul>
        <div className="alinhamentoHorizontal">
          <section
            id="panel1"
            role="tabpanel"
            aria-labelledby="tab1"
            aria-hidden="false"
            className="tabelaDados"
          >
            <table className="table ">
              <thead className="tableHead">
                <tr>
                  {tableHeadArbitro.map((th, index) => (
                    <th key={th}>{th}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="tableBody">
                {arbitros.map((item, index) => (
                  <tr key={item.Arbitro_Nome}>
                    <td>{item.Funcao_Nome}</td>
                    <td>{item.Arbitro_Nome}</td>
                    <td>FFMS</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
          <section
            id="panel2"
            role="tabpanel"
            aria-labelledby="tab2"
            aria-hidden="true"
            className="tabelaDados"
          >
            <table className="table table-vertical">
              {alteracoes.map((item, index) => (
                <tbody>
                  <tr>
                    <th></th>
                    <td>ORIGINAL</td>
                    <td>ALTERADA PARA</td>
                  </tr>
                  <tr>
                    <th>DATA</th>
                    <td>{reverterData(item.Data_Inicial)}</td>
                    <td>{reverterData(item.Data_Final)}</td>
                  </tr>
                  <tr>
                    <th>HORA</th>
                    <td>{getHora(item.Data_Inicial)}</td>
                    <td>{getHora(item.Data_Final)}</td>
                  </tr>
                  <tr>
                    <th>ESTÁDIO</th>
                    <td>{item.NomeEstadioInicial}</td>
                    <td>{item.NomeEstadioFinal}</td>
                  </tr>
                  <tr>
                    <th>MOTIVO</th>
                    <td>{item.MotivoMudancaJogo}</td>
                    <td></td>
                  </tr>
                </tbody>
              ))}
            </table>
          </section>
          <div className="documentos">
            <ul>
              <li>DOCUMENTOS</li>
              <li>
                <BsReverseLayoutTextSidebarReverse />
                <a onClick={() => sumula(id_jogo)}>SÚMULA</a>
              </li>
              <li>
                <BsGraphUp />
                <a onClick={() => beletimFinanca(id_jogo)}>
                  BOLETIM FINANCEIRO
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <Documentos nomeFase={nomeFase} campeonato={jogo.Campeonato_Nome} />
    </div>
  );
};

export default DetalhesJogo;
