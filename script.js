const glossary = [
 {term:'Dunk',translation:'Enterrada',meaning:'Quando o jogador salta e coloca a bola diretamente na cesta, geralmente com uma ou duas mãos.',example:'“What a dunk!” — “Que enterrada!”'},
 {term:'Layup',translation:'Bandeja',meaning:'Finalização próxima à cesta, normalmente feita em movimento e usando a tabela.',example:'“He finished with a layup.” — “Ele concluiu com uma bandeja.”'},
 {term:'Jump shot',translation:'Arremesso em suspensão',meaning:'Arremesso realizado durante um salto, muito usado de média e longa distância.',example:'“That was a clean jump shot.” — “Foi um arremesso em suspensão perfeito.”'},
 {term:'Three-pointer',translation:'Cesta de três pontos',meaning:'Arremesso convertido de trás da linha de três pontos. Vale três pontos.',example:'“He hit a three-pointer.” — “Ele acertou uma bola de três.”'},
 {term:'Alley-oop',translation:'Ponte aérea',meaning:'Jogada em que um atleta lança a bola perto da cesta e um companheiro a recebe no ar para finalizar.',example:'“What an alley-oop!” — “Que ponte aérea!”'},
 {term:'Block',translation:'Toco',meaning:'Ação defensiva de desviar ou impedir um arremesso do adversário.',example:'“He got a huge block.” — “Ele deu um toco enorme.”'},
 {term:'Steal',translation:'Roubo de bola',meaning:'Quando um defensor tira a posse de bola do adversário de forma legal.',example:'“She made the steal.” — “Ela roubou a bola.”'},
 {term:'Rebound',translation:'Rebote',meaning:'Recuperação da bola após um arremesso errado. Pode ser ofensivo ou defensivo.',example:'“Get the rebound!” — “Pega o rebote!”'},
 {term:'Assist',translation:'Assistência',meaning:'Passe que deixa um companheiro em condição de marcar uma cesta, conforme os critérios estatísticos.',example:'“Great assist!” — “Grande assistência!”'},
 {term:'Turnover',translation:'Erro de posse',meaning:'Perda da posse de bola pela equipe, por exemplo, em um passe errado ou uma infração.',example:'“Too many turnovers.” — “Muitos erros de posse.”'},
 {term:'Buzzer-beater',translation:'Cesta no estouro do cronômetro',meaning:'Cesta convertida praticamente no fim do período ou da partida, antes de o cronômetro zerar.',example:'“A game-winning buzzer-beater.” — “Uma cesta da vitória no estouro do cronômetro.”'},
 {term:'Triple-double',translation:'Triplo-duplo',meaning:'Quando um jogador registra dois dígitos em três categorias estatísticas diferentes na mesma partida.',example:'Pontos, rebotes e assistências são uma combinação comum.'},
 {term:'Double-double',translation:'Duplo-duplo',meaning:'Quando um jogador chega a dois dígitos em duas categorias estatísticas na mesma partida.',example:'Por exemplo: 12 pontos e 10 rebotes.'},
 {term:'Clutch',translation:'Decisivo / sob pressão',meaning:'Usado para descrever um jogador ou uma jogada que aparece nos momentos mais importantes da partida.',example:'“He is clutch.” — “Ele é decisivo.”'},
 {term:'Fast break',translation:'Contra-ataque',meaning:'Ataque rápido logo após recuperar a bola, aproveitando a defesa adversária desorganizada.',example:'“They scored on the fast break.” — “Eles pontuaram no contra-ataque.”'},
 {term:'Pick and roll',translation:'Bloqueio e continuação',meaning:'Jogada em que um jogador faz um bloqueio para quem tem a bola e depois se movimenta em direção à cesta ou a um espaço livre.',example:'Uma das ações mais comuns para criar vantagem ofensiva.'},
 {term:'Airball',translation:'Airball',meaning:'Arremesso que não toca no aro nem na tabela.',example:'“That was an airball.” — “Esse arremesso nem pegou no aro.”'},
 {term:'Paint',translation:'Garrafão',meaning:'Área pintada próxima à cesta, importante para finalizações, rebotes e disputas físicas.',example:'“Protect the paint.” — “Proteja o garrafão.”'}
];
const glossaryGrid = document.getElementById('glossaryGrid');
const glossarySearch = document.getElementById('glossarySearch');
const glossaryCount = document.getElementById('glossaryCount');
const glossaryEmpty = document.getElementById('glossaryEmpty');
function renderGlossary(query='') {
  const q = query.trim().toLocaleLowerCase('pt-BR');
  const items = glossary.filter(x => [x.term,x.translation,x.meaning,x.example].join(' ').toLocaleLowerCase('pt-BR').includes(q));
  glossaryGrid.innerHTML = items.map((x,i)=>`<article class="term-card"><div class="term-card-top"><div><h3>${x.term}</h3><div class="translation">${x.translation}</div></div><span class="term-number">${String(i+1).padStart(2,'0')}</span></div><p>${x.meaning}</p><div class="term-example">${x.example}</div></article>`).join('');
  glossaryCount.textContent = items.length;
  glossaryEmpty.hidden = items.length > 0;
}
glossarySearch.addEventListener('input', e=>renderGlossary(e.target.value));
renderGlossary();
document.getElementById('year').textContent = new Date().getFullYear();
const menuToggle = document.getElementById('menuToggle');
const mainNav = document.getElementById('mainNav');
menuToggle.addEventListener('click',()=>{const open=mainNav.classList.toggle('open');menuToggle.setAttribute('aria-expanded',String(open));menuToggle.textContent=open?'×':'☰';});
mainNav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{mainNav.classList.remove('open');menuToggle.setAttribute('aria-expanded','false');menuToggle.textContent='☰';}));
const quiz = [
 {q:'Quantos pontos vale uma cesta convertida de fora da linha de três?',options:['1 ponto','2 pontos','3 pontos'],correct:2,why:'Arremessos convertidos de trás da linha de três valem três pontos.'},
 {q:'Como se chama a ação de impedir um arremesso com um desvio defensivo?',options:['Assist','Block (toco)','Turnover'],correct:1,why:'Block, conhecido no Brasil como toco, é uma ação defensiva sobre o arremesso.'},
 {q:'O que é um rebote ofensivo?',options:['Recuperar a bola após erro do próprio time','Roubar a bola no meio da quadra','Recuperar a bola após erro do adversário no ataque'],correct:0,why:'O rebote ofensivo acontece quando o time que arremessou recupera a bola após errar.'}
];
let quizIndex=0, score=0, answered=false;
const quizQuestion=document.getElementById('quizQuestion'), quizOptions=document.getElementById('quizOptions'), quizFeedback=document.getElementById('quizFeedback'), quizNext=document.getElementById('quizNext');
function renderQuiz(){const item=quiz[quizIndex];answered=false;document.getElementById('quizProgress').textContent=`PERGUNTA ${String(quizIndex+1).padStart(2,'0')} / ${String(quiz.length).padStart(2,'0')}`;quizQuestion.textContent=item.q;quizOptions.innerHTML=item.options.map((o,i)=>`<button data-answer="${i}">${o}</button>`).join('');quizOptions.querySelectorAll('button').forEach(b=>b.addEventListener('click',()=>answerQuiz(Number(b.dataset.answer))));quizFeedback.textContent='';quizNext.hidden=true;quizNext.textContent=quizIndex===quiz.length-1?'VER RESULTADO ↗':'PRÓXIMA PERGUNTA →';}
function answerQuiz(answer){if(answered)return;answered=true;const item=quiz[quizIndex];const buttons=[...quizOptions.querySelectorAll('button')];buttons.forEach((b,i)=>{b.disabled=true;if(i===item.correct)b.classList.add('correct');else if(i===answer)b.classList.add('wrong')});if(answer===item.correct){score++;quizFeedback.textContent='ACERTOU! '+item.why;}else quizFeedback.textContent='QUASE! '+item.why;document.getElementById('quizScore').textContent=score;quizNext.hidden=false;}
quizNext.addEventListener('click',()=>{if(quizIndex<quiz.length-1){quizIndex++;renderQuiz();}else{quizQuestion.textContent=`Você acertou ${score} de ${quiz.length}!`;quizOptions.innerHTML='';quizFeedback.textContent=score===3?'MVP DA ARENA! Mandou muito bem.':'Boa! Continue acompanhando o jogo e volte para tentar de novo.';quizNext.textContent='JOGAR DE NOVO ↻';quizNext.hidden=false;quizNext.onclick=()=>{quizIndex=0;score=0;document.getElementById('quizScore').textContent='0';quizNext.onclick=null;renderQuiz();};}});
renderQuiz();
