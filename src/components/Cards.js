import React from 'react';
import { Link } from 'react-router-dom';
import { GlobalContext } from './useContext/GlobalContext';

const Cards = ({ exercicio, codCompeticao }) => {
  const dadosGlobais = React.useContext(GlobalContext);
  const [competicoes, setCompeticoes] = React.useState(null);

  function seriesCampeonatos() {
    const url = `${dadosGlobais.baseUrl}Campeonatos`;
    fetch(url, {
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    })
      .then((response) => response.json())
      .then((result) => {
        if (codCompeticao == null) {
          setCompeticoes(result);
        } else {
          const resultCompet = result.filter(
            (v) => v.codigo_campeonato == codCompeticao,
          );
          setCompeticoes(resultCompet);
        }
      });
  }

  React.useEffect(() => {
    if (dadosGlobais.baseUrl) {
      seriesCampeonatos();
    }
  }, [dadosGlobais]);

  if (dadosGlobais === null) return null;
  return (
    <div className="cards">
      {competicoes &&
        competicoes.map((v, k) => (
          <div className="clr-col-3" key={v.Campeonato_Nome}>
            <Link
              to={`classificacao/${v.Campeonato_Nome}/${v.codigo_campeonato}`}
              className="card clickable"
            >
              <div className="card-img">
                <img
                  src={`http://futebolms.com.br/v5/wp-content/uploads/api/campeonatos/${exercicio}/${v.codigo_campeonato}.png`}
                />
              </div>
              <div className="card-block">
                <p className="card-text">{v.Campeonato_Nome}</p>
              </div>
            </Link>
          </div>
        ))}
    </div>
  );
};

export default Cards;
