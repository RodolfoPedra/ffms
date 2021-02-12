import React from 'react';
import '@clr/ui/clr-ui.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { GlobalStorage } from './components/useContext/GlobalContext';
import Card from './components/Cards';
import Classificacao from './components/Classificacao';
import DetalhesJogo from './components/DetalhesJogo';
import Documentos from './components/Documentos';

const App = () => {
  return (
    <div className="container">
      <BrowserRouter>
        <GlobalStorage>
          <Routes>
            <Route
              path="v5/campeonatos/"
              exact
              element={<Card exercicio="2020" />}
            />
            <Route
              path="v5/campeonatos/classificacao/:campeonato/:codigo_campeonato/*"
              element={<Classificacao />}
            />
            <Route
              path="v5/campeonatos/classificacao/:campeonato/:codigo_campeonato/detalhes/:id_jogo"
              element={<DetalhesJogo />}
            />
            <Route
              path="v5/campeonatos/2021"
              exact
              element={<Card exercicio="2021" codCompeticao="48" />}
            />
            <Route
              path="v5/campeonatos/2021/classificacao/:campeonato/:codigo_campeonato/*"
              element={
                <Documentos
                  campeonato="Sul-Mato-Grossense Série A"
                  exercicio="2021"
                />
              }
            />
          </Routes>
        </GlobalStorage>
      </BrowserRouter>
    </div>
  );
};

export default App;
