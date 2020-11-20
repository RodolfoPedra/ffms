import React from 'react';
import { Link, useParams } from 'react-router-dom';
import Documentos from './Documentos';
import PrimeiraFase from './PrimeiraFase';
import QuartasFinal from './QuartasFinal';
import { GlobalContext } from './useContext/GlobalContext';
import { MdKeyboardReturn } from 'react-icons/md';

const Classificacao = () => {
  const dadosGlobais = React.useContext(GlobalContext);

  const { campeonato, codigo_campeonato } = useParams();
  const [fases, setFases] = React.useState(null);

  function getFases() {
    const proxyurl = 'https://cors-anywhere.herokuapp.com/';
    const url = `${dadosGlobais.baseUrl}CampeonatosFases`;
    fetch(proxyurl + url, {
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        Authorization: `${dadosGlobais.auth}`,
      },
    })
      .then((response) => response.json())
      .then((result) => {
        const fases = result.filter(
          (v) => v.codigo_campeonato == codigo_campeonato,
        );
        setFases(fases);
      });
  }

  React.useEffect(() => {
    if (codigo_campeonato) {
      getFases();
    }
  }, [codigo_campeonato]);

  // Início JS para movimentação das abas

  React.useEffect(() => {
    const tabSeletores = document.querySelectorAll('.btn-link-class');
    const tabConteudos = document.querySelectorAll('.tabs section');

    function activeTab(index) {
      const idCarrossel = document.querySelectorAll('.carousel');

      tabSeletores.forEach((i) => i.classList.remove('active'));
      tabSeletores[index].classList.add('active');

      tabConteudos.forEach((i) => i.setAttribute('aria-hidden', true));
      tabConteudos[index].removeAttribute('aria-hidden');

      idCarrossel.forEach((i) => i.removeAttribute('id'));
      idCarrossel[index].setAttribute('id', 'carouselExampleControls');
    }

    tabSeletores.forEach((i, k) => {
      tabSeletores[0].classList.add('active');
      tabConteudos[0].removeAttribute('aria-hidden');
      i.addEventListener('click', () => {
        activeTab(k);
      });
    });
  }, [fases]);

  // Fim JS movimentações

  if (fases === null) return null;
  return (
    <div className="">
      <Link to="/v5/campeonatos/">
        <MdKeyboardReturn />
        Campeonatos
      </Link>
      <div className="tabs">
        <ul id="demoTabs" className="nav" role="tablist">
          {fases.map((v, k) => (
            <li role="presentation" className="nav-item" key={v.Descricao_Fase}>
              <button
                id={`tab${k + 1}`}
                className="btn btn-link nav-link btn-link-class"
                type="button"
                name={`${v.id_campeonatofase}`}
              >
                {v.Descricao_Fase}
              </button>
            </li>
          ))}
        </ul>
        {fases.map((v, k) => (
          <section
            key={v.id_campeonatofase}
            id={`panel${k + 1}`}
            role={`tabpane${k + 1}`}
            aria-labelledby={`tab${k + 1}`}
            aria-hidden="true"
          >
            {v.Descricao_Fase == 'Primeira Fase' ? (
              <PrimeiraFase idFase={v.id_campeonatofase} />
            ) : v.Descricao_Fase == 'Quartas de Final' ? (
              <QuartasFinal idFase={v.id_campeonatofase} />
            ) : null}
          </section>
        ))}
      </div>
      <Documentos campeonato={campeonato} />
    </div>
  );
};

export default Classificacao;
