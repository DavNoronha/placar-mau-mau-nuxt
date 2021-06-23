import Vuex from 'vuex';

const createStore = () => {
  return new Vuex.Store({
    state: {
      jogadores: [
        {nome:'burpee', pts: 0},
        {nome:'elvis', pts: 0},
        {nome:'psdb', pts: 0},
      ]
    },
    mutations: {
      addJogador(state, payload) {
        state.jogadores.push(payload);
      },
      excluir(state, payload) {
        state.jogadores.splice(payload, 1);
      }
    },
    actions: {
      addJogador(context, payload) {
        context.commit('addJogador', payload);
      },
      excluir(context, payload) {
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