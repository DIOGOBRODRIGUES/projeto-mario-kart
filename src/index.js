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

async function getRandmBlock() {
    let random = Math.random();
    let result;

    switch( true){
        case random <0.33:
            result = "Reta";
            break;
        
        case random < 0.66:
            result = "Curva";
            break;

        default:
            result = "Confronto"
            
    }

    return result; 
    
}

async function logRollResult(characterName, block, diceResult, attribute) {
    console.log(`${characterName} 🎲 rolou dado de ${block} ${diceResult} + ${attribute} = ${diceResult+attribute}`);
}

async function playRaceEngine(character1, character2) {
    for(let round = 1; round <= 5; round++){
        console.log(`🏁 Rodada ${round}`);

        //sotear um bloco
        let block = await getRandmBlock();
        console.log(`Bloco ${block}`);

        //rolar dados 
    let diceResult1 = await rolldice();
    let diceResult2 = await rolldice();

    //teste de habilidade

    let totalTestSkill1 = 0 ;
    let totalTestSkill2 = 0 ;

    if(block === "Reta"){
        totalTestSkill1 = diceResult1 + character1.velocidade;
        totalTestSkill2 = diceResult2 + character2.velocidade;

        await logRollResult(
            character1.nome,
            "velocidade",
            diceResult1,
            character1.velocidade
        )

        await logRollResult(
            character2.nome,
            "velocidade",
            diceResult2,
            character1.velocidade
        )
    }
    if(block === "Curva"){
        totalTestSkill1 = diceResult1 + character1.manobrabilidade;
        totalTestSkill2 = diceResult2 + character2.manobrabilidade;


        await logRollResult(
            character1.nome,
            "manobrabilidade",
            diceResult1,
            character1.manobrabilidade
        )

        await logRollResult(
            character2.nome,
            "manobrabilidade",
            diceResult2,
            character1.manobrabilidade
        )
    }
    if(block === "Confronto"){
        let powerResult1 =  diceResult1 + character1.poder;
        let powerResult2 =  diceResult2 + character1.poder;

        console.log(`${character1.nome} confronto com ${character2.nome} ! 🥊`)

        await logRollResult(
            character1.nome,
            "poder",
            diceResult1,
            character1.poder
        )

        await logRollResult(
            character2.nome,
            "poder",
            diceResult2,
            character1.poder
        )

        character2.pontos -= powerResult1 > powerResult2 && character2.pontos > 0 ? 1 :0 ;
        character1.pontos -= powerResult2 > powerResult1 && character2.pontos > 0 ? 1 :0 ;

        console.log(powerResult2 === powerResult1 ? "Confronto empatado! nenhum ponto foi perdido":"");

    }

    if(totalTestSkill1 > totalTestSkill2){
        console.log(`${character1.nome} marcou um ponto!`);
        character1.pontos++
    }else if (totalTestSkill2 > totalTestSkill1){
        console.log(`${character2.nome} marcou um ponto!`);
        character2.pontos++
    }
    console.log(`---------------------------------------`)

    }

    
}

//auto invoke 
(async function main(){
    console.log(`🏁🚨 Corrida entre ${Player1.nome} e ${Player2.nome} começando...`);

    //deve esperar a finalizacao da execucao para ir para proxima tarefea
    await playRaceEngine(Player1, Player2);
})();