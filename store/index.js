const url = 'http://localhost:4000';

export const state = () => ({
  jogadores: []
})

export const mutations = {
  listaJogadores(state, payload) {
    payload.sort((a, b) => {
      return (a.points > b.points) ? 1 : ((b.points > a.points) ? -1 : 0);
    });

    state.jogadores = payload;
  },
  addJogador(state,payload) {
    state.jogadores.push(payload);
  },
  addPts(state, {jogador, ptsRodada}) {
    // fazendo tabela invertida e salvando pts da rodada
    let aux = state.jogadores.find(item => item._id == jogador._id)

    aux.rounds.unshift(ptsRodada)
  },
  atualizaPontos(state, {jogador, idxPontos, novosPts}) {
    let idxJogador = state.jogadores.findIndex(item => item._id == jogador._id)

    state.jogadores[idxJogador].rounds[idxPontos].points = novosPts;
  },
  somaPts(state, jogador) {
    let aux = state.jogadores.find(item => item._id == jogador._id)
    // fazendo soma baseado na tabela de pontos
    let totalPts = []
    const reducer = (a, b) => a + b;

    aux.rounds.forEach(round => totalPts.push(round.points))
    
    aux.points = totalPts.reduce(reducer);
  },
  excluirJogador(state, payload) {
    let idx = state.jogadores.findIndex(item => item._id == payload)

    state.jogadores.splice(idx, 1)
  },

  //não funciona bem a funcionalidade abaixo (não está em uso)
  excluirRodada(state, {jogador, idxRodada}) {
    const aux = state.jogadores.find(item => item._id == jogador._id)

    aux.rounds.splice(idxRodada, 1)
  }
}

export const actions = {
  async listaJogadores(context) {
    try {
      const {data} = await this.$axios.$get(url+'/players')

      context.commit('listaJogadores', data);      
    } catch({message}) {
      console.log('GET JOGADORES ERRO: ', message)
    }
  },

  async addJogador(context, payload) {
    try {
      const {data} = await this.$axios.$post(url+'/players', payload)

      context.commit('addJogador', data);
    } catch({message}) {
      console.log('ADD JOGADOR ERRO: ', message)
    }
  },

  async excluirJogador(context, payload) {
    try {
      await this.$axios.$delete(url+`/players/${payload}`)

      context.commit('excluirJogador', payload);
    } catch({message}) {
      console.log('EXCLUIR JOGADOR ERRO: ', message)
    }
  },
  // pontos
  async addPts(context, {jogador, ptsRodada}) {
    context.commit('addPts', {jogador, ptsRodada})
    context.commit('somaPts', jogador)

    let aux = context.state.jogadores.find(item => item._id == jogador._id)

    try {
      await this.$axios.$put(url+`/players/${jogador._id}`, aux)

      context.dispatch('listaJogadores')
    } catch({message}) {
      console.log('ADD PONTOS ERRO: ', message)
    }
  },
  async atualizaPontos(context, {jogador, idxPontos, novosPts}) {
    context.commit('atualizaPontos', {jogador, idxPontos, novosPts})
    context.commit('somaPts', jogador)

    let aux = context.state.jogadores.find(item => item._id == jogador._id)

    try {
      await this.$axios.$put(url+`/players/${jogador._id}`, aux)

      context.dispatch('listaJogadores')
    } catch({message}) {
      console.log('ATUALIZA PONTOS ERRO: ', message)
    }
  },

  // exclui rodada de pontos de algum jogador (não funciona muito bem, implementação comentada)
  async excluirRodada(context, {jogador, idxRodada}) {
    context.commit('excluirRodada', {jogador, idxRodada})

    let aux = context.state.jogadores.find(item => item._id == jogador._id)

    try {
      await this.$axios.$put(url+`/players/${jogador._id}`, aux)
    } catch({message}) {
      console.log('EXCLUIR RODADA ERRO: ', message)
    }
  }  
}

export const getters = {
  listaJogadores(state) {
    return state.jogadores;
  }
}