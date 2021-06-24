import Vuex from 'vuex';

const url = 'https://mau-mau-a91e9-default-rtdb.firebaseio.com/jogadores';

const createStore = () => {
  return new Vuex.Store({
    state: {
      jogadores: []
    },
    mutations: {
      getJogadores(state, payload) {
        state.jogadores = payload;
      },
      addJogador(state,payload) {
        state.jogadores.push(payload);
      },
      excluir(state, payload) {
        const res = state.jogadores.filter(j => j.id !== payload);
        state.jogadores = res;
      }
    },
    actions: {
      async getJogadores(context) {
        const lista = []

        const response = await fetch(url+'.json');

        const responseData = await response.json()

        for(const key in responseData) {
          const jogador = {
            id: key,
            nome: responseData[key].nome,
            pts: responseData[key].pts
          }
          lista.push(jogador);
        }
        context.commit('getJogadores', lista);
      },
      async addJogador(context, payload) {
        const response = await fetch(url+'.json', {
          method: 'POST',
          body: JSON.stringify(payload)
        });
        const responseData = await response.json();

        const newJogador = {...payload, id: responseData.name};

        context.commit('addJogador', newJogador);
      },
      async excluir(context, payload) {
        const response = await fetch(`${url}/${payload}.json`, {
          method: 'DELETE',
        });

        const responseData = await response.json();

        context.commit('excluir', payload);
      }
    },
    getters: {
      listaJogadores(state) {
        return state.jogadores;
      }
    }
  })
}

export default createStore;