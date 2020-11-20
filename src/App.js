import React from 'react';
import '@clr/ui/clr-ui.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { GlobalStorage } from './components/useContext/GlobalContext';
import Card from './components/Cards';
import Classificacao from './components/Classificacao';
import DetalhesJogo from './components/DetalhesJogo';

const App = () => {
  return (
    <div className="container">
      <BrowserRouter>
        <GlobalStorage>
          <Routes>
            <Route path="v5/campeonatos/" exact element={<Card />} />
            <Route
              path="v5/campeonatos/classificacao/:campeonato/:codigo_campeonato/*"
              element={<Classificacao />}
            />
            <Route
              path="v5/campeonatos/classificacao/:campeonato/:codigo_campeonato/detalhes/:id_jogo"
              element={<DetalhesJogo />}
            />
          </Routes>
        </GlobalStorage>
      </BrowserRouter>
    </div>
  );
};

export default App;
