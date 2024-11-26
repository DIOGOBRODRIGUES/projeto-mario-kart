const Player1 ={
    nome:"Mario",
    velocidade: 4,
    manobrabilidade: 3,
    poder: 3,
    pontos: 0
}

const Player2 ={
    nome:"Luigi",
    velocidade: 3,
    manobrabilidade: 4,
    poder: 4,
    pontos: 0
}

async function rolldice(){
    return Math.floor(Math.random()*6)+1;
}

(async function main(){
    console.log(`🏁🚨 Corrida entre ${Player1.nome} e ${Player2.nome} começando...`)
})();