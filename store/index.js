import Vuex from 'vuex';

import jogadoresModule from './modules/jogadores/index.js';
import pontosModule from './modules/pontos/index.js';

const url = 'https://mau-mau-a91e9-default-rtdb.firebaseio.com/jogadores';

const createStore = () => {
  return new Vuex.Store({
    modules: {
      jogadores: jogadoresModule,
      pontos: pontosModule
    }
  })
}

export default createStore;