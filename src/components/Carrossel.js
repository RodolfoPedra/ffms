import React from 'react';
import '../assets/css/style.css';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import { GlobalContext } from './useContext/GlobalContext';
import { Link } from 'react-router-dom';

const Carrossel = ({ idFase, abrev }) => {
  const dadosGlobais = React.useContext(GlobalContext);

  const [rodadas, setRodadas] = React.useState(null);
  const [jogosRodada, setJogosRodada] = React.useState(null);

  function retornadiaSemana(data) {
    var semana = ['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SAB'];
    if (data != null) {
      var arr = data.split('/').reverse();
      var datearray = new Date(arr[0], arr[2] - 1, arr[1]);
      var dia = datearray.getDay();
      return semana[dia];
    }
  }

  function getJogos() {
    const proxyurl = 'https://cors-anywhere.herokuapp.com/';
    const url = `${dadosGlobais.baseUrl}JogosPorCampeonatoFase/${idFase}`;
    fetch(proxyurl + url, {
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        Authorization: `${dadosGlobais.auth}`,
      },
    })
      .then((response) => response.json())
      .then((json) => setJogosRodada(json));
  }

  React.useEffect(() => {
    if (idFase) {
      getJogos();
    }
  }, [idFase]);

  function unique(value, index, self) {
    return self.indexOf(value) === index;
  }

  React.useEffect(() => {
    if (Array.isArray(jogosRodada)) {
      const temp_rodadas = jogosRodada.reduce((acc, item, index) => {
        return [...acc, (acc[index] = item.Rodada)];
      }, []);

      const rodadas = temp_rodadas.filter(unique);
      setRodadas(rodadas);
    }
  }, [jogosRodada]);

  if (rodadas === null || jogosRodada === null) return null;
  console.log('carrossel id: ', idFase);
  return (
    <>
      <div
        id="carouselExampleControls"
        className="carousel"
        data-interval="false"
      >
        <div className="carousel-inner">
          {rodadas.map((r) => (
            <div
              className={`carousel-item ${
                r === rodadas.length ? 'active' : ''
              }`}
              key={r}
            >
              <p className="rodada">{r}ª RODADA</p>
              {jogosRodada.map((j, index) =>
                j.Rodada == r ? (
                  <div className="infoJogo" key={index}>
                    <p className="dataLocal">
                      {`${retornadiaSemana(j.Jogo_Data)}, ${
                        j.Jogo_DataDDMMYYYY
                      } - ${j.Horario} - ${j.Estadio}`}
                    </p>
                    {/* <span>2 alterações</span> */}
                    <div className="timesJogo clr-row clr-col-12">
                      <div className="time1">
                        <p>{[abrev[j.Codigo_Time_Mandante]]}</p>
                        <img
                          className="brasaoRodada"
                          src={`http://futebolms.com.br/v5/wp-content/uploads/api/escudos/serieA/${j.Codigo_Time_Mandante}.png`}
                          alt=""
                        />
                      </div>
                      <span>{j.Resultado}</span>
                      <div className="time2">
                        <img
                          className="brasaoRodada"
                          src={`http://futebolms.com.br/v5/wp-content/uploads/api/escudos/serieA/${j.Codigo_Time_Visitante}.png`}
                          alt=""
                        />
                        <p>{[abrev[j.Codigo_Time_Visitante]]}</p>
                      </div>
                    </div>
                    <Link to={`detalhes/${j.id_jogo}`}>
                      <p className="detalhesJogo">DETALHES DO JOGO</p>
                    </Link>
                  </div>
                ) : null,
              )}
            </div>
          ))}
        </div>
        <a
          className="carousel-control-prev"
          href="#carouselExampleControls"
          role="button"
          data-slide="prev"
        >
          <MdChevronLeft className="iconLeft" />
          <span className="sr-only">Previous</span>
        </a>
        <a
          className="carousel-control-next"
          href="#carouselExampleControls"
          role="button"
          data-slide="next"
        >
          <MdChevronRight className="iconRight" />
          <span className="sr-only">Next</span>
        </a>
      </div>
    </>
  );
};

export default Carrossel;
