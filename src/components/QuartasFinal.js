import React from 'react';
import TabelaClassificacao from './TabelaClassificacao';
import Carrossel from './Carrossel';
import { GlobalContext } from './useContext/GlobalContext';

const tableHead = [
  'Posição',
  '',
  '',
  'PTS',
  'J',
  'V',
  'E',
  'D',
  'GP',
  'GC',
  'SG',
  'CA',
  'VA',
  '%',
];

const QuartasFinal = ({ idFase }) => {
  const dadosGlobais = React.useContext(GlobalContext);
  const [grupos, setGrupos] = React.useState(null);

  function getClassificacaoFase() {
    const proxyurl = 'https://cors-anywhere.herokuapp.com/';
    const url = `${dadosGlobais.baseUrl}CampeonatoGrupos/${idFase}`;
    fetch(proxyurl + url, {
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        Authorization: `${dadosGlobais.auth}`,
      },
    })
      .then((response) => response.json())
      .then((json) => setGrupos(json));
  }

  React.useEffect(() => {
    getClassificacaoFase();
  }, [idFase]);

  if (grupos === null) return null;
  return (
    <div className="alinhamentoHorizontal">
      <div className="tabelaDados">
        {grupos.map((grupo, index) => (
          <>
            <h3>{grupo.grupo_nome}</h3>
            <TabelaClassificacao
              key={grupo.id_campeonatogrupo}
              idFase={grupo.id_campeonatofase}
              idGrupo={grupo.id_campeonatogrupo}
            />
          </>
        ))}
      </div>
      <Carrossel
        idFase={idFase}
        abrev={dadosGlobais.abrevTimes}
        className="carrocel"
      ></Carrossel>
    </div>
  );
};

export default QuartasFinal;
