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
      },
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
            pts: responseData[key].pts,
            tabela: responseData[key].tabela
          }
          lista.push(jogador);
        }

        context.commit('getJogadores', lista);
        context.dispatch('ordena');
      },
      async addJogador(context, payload) {
        const response = await fetch(url+'.json', {
          method: 'POST',
          body: JSON.stringify(payload)
        });
        const responseData = await response.json();

        const newJogador = {...payload, id: responseData.name};

        context.commit('addJogador', newJogador);
        context.dispatch('ordena');
      },
      async excluir(context, payload) {
        const response = await fetch(`${url}/${payload}.json`, {
          method: 'DELETE',
        });

        const responseData = await response.json();

        context.commit('excluir', payload);
      },
      // pontos
      async addPts(context, payload) {
        // fazendo soma baseado na tabela de pontos
        let totalPts = []
        const reducer = (a, b) => a + b;
        for(const key in payload.tabela) {
          totalPts.push(payload.tabela[key].pontos);
        }
        console.log(totalPts)
        payload.pts = totalPts.reduce(reducer);

        const response = await fetch(url+'/'+payload.id+'.json', {
          method: 'PUT',
          body: JSON.stringify(payload)
        });

        const responseData = await response.json();

        context.dispatch('ordena');
      },
      // ordenando jogadores de acordo com os pontos
      ordena(context) {
        const lista = context.state.jogadores;
        lista.sort((a, b) => {
          return (a.pts > b.pts) ? 1 : ((b.pts > a.pts) ? -1 : 0);
        });

        context.commit('getJogadores', lista);
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