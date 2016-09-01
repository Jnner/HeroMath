// JUGADORES
// contenedor de jugadores
var conterPlayers = [];

//gestion rangos
var rangosGame = ["Koala","Ostrich","Hare","HeroMath"];
const maxTNvl = 525;
var criterioRangos = [maxTNvl*2/1.6, maxTNvl*4/1.2, maxTNvl*4];

//VARIABLES DE GESTION
// gestion botones de respuestas y mostrar respuestas
var answer = 0;
var posL=0, posP=0;
// pos player actual para gestion y rangos
var playerActual = 0;
// gestion num partidas
var partidas = 0;
// gestion de piques
var contPikes = "";//"pedro,lucia1carla,jessy2jaz,lola,pepa4"

 //MODOS DE JUEGOS
 // modo pakete: empieza siempre desde el ultimo nivel no superado
// modo chalenge: empieza siempre desde el nivel 1
var Paket_Chlng = true;

//SONIDO
var atucasa = new Audio("sound/atucasa.mp3")
, aquihaynivel = new Audio("sound/aquihaynivel.mp3")
, claroquesi = new Audio("sound/claroquesi.mp3")
, madremia = new Audio("sound/madremia.mp3")
, medesorino = new Audio("sound/medesorino.mp3")
, comienzo = new Audio("sound/vingahomava.mp3")
, bip = new Audio("sound/bip.mp3")
, quevashacer = new Audio("sound/chicoquevashacer.mp3")
, noesposible = new Audio("sound/noesposible.mp3")
, nonobisbal = new Audio("sound/nonobisbal.mp3")
, correcto = new Audio("sound/soberacorrecto.mp3")
, muybien = new Audio("sound/muybien.mp3")
, victory = new Audio("sound/victory.mp3")
, callateya = new Audio("sound/callateya.mp3")
, winclick = new Audio("sound/click-window.mp3")
, btnclick = new Audio("sound/click-button.mp3")
, music = new Audio("sound/music-game.mp3");
// respuestas random
var loser = [atucasa,claroquesi,aquihaynivel,madremia,medesorino]
, respOk = [correcto,muybien]
, noPlayers = [nonobisbal,noesposible];
// funciones gestion audio
function AudioLoser() {
	var pos = parseInt(Math.random()*5);
	loser[pos].play();
}
function AudioRespOk() {
	var pos = parseInt(Math.random()*2);
	respOk[pos].play();
}
function AudioNo() {
	var pos = parseInt(Math.random()*2);
	noPlayers[pos].play();
}
function Music(pause) {
	var mouse = document.getElementById('titleGame');
	music.loop = true;
	if (pause==1 && !music.paused) {
		callateya.play();
		music.pause();
		mouse.style.cursor = "pointer";
	} else {
		music.play();
		mouse.style.cursor = "not-allowed";
	}
}

//NIVELES
//preguntas
var pregLvl1 = ["1+2", "2+1", "2-1", "1+1", "3-1"]
, pregLvl2 = ["1+2-1", "2+1-2", "2-1+1", "1+1+1", "3-1-1"]
, pregLvl3 = ["1+1-1", "2+1-1", "2-1+2", "1+1-1", "3-1-1"]
, pregLvl4 = ["1+1-1+1", "2+1-1+1", "2-1+2-1", "1+1-1+2", "3-1-1+2"]
, pregLvl5 = ["1+2-1-1+1", "2+1-2+1-1", "2-1+1+1-2", "1+1+1-2+1", "3-1-1+2-1"]
, pregLvl6 = ["1+1-1+1+1-2", "2+1-1+1-2+2", "2-1+2-1+1-1", "1+1-1+2-1+1", "3-1-1+2-2+1"];
//respuestas
var respLvl1 = [1+2, 2+1, 2-1, 1+1, 3-1]
, respLvl2 = [1+2-1, 2+1-2, 2-1+1, 1+1+1, 3-1-1]
, respLvl3 = [1+1-1, 2+1-1, 2-1+2, 1+1-1, 3-1-1]
, respLvl4 = [1+1-1+1, 2+1-1+1, 2-1+2-1, 1+1-1+2, 3-1-1+2]
, respLvl5 = [1+2-1-1+1, 2+1-2+1-1, 2-1+1+1-2, 1+1+1-2+1, 3-1-1+2-1]
, respLvl6 = [1+1-1+1+1-2, 2+1-1+1-2+2, 2-1+2-1+1-1, 1+1-1+2-1+1, 3-1-1+2-2+1];

//contenedor de niveles
var conterQuestions = [];
	conterQuestions[0] = pregLvl1;
	conterQuestions[1] = pregLvl2;
	conterQuestions[2] = pregLvl3;
	conterQuestions[3] = pregLvl4;
	conterQuestions[4] = pregLvl5;
	conterQuestions[5] = pregLvl6;
var conterAnswers = [];
	conterAnswers[0] = respLvl1;
	conterAnswers[1] = respLvl2;
	conterAnswers[2] = respLvl3;
	conterAnswers[3] = respLvl4;
	conterAnswers[4] = respLvl5;
	conterAnswers[5] = respLvl6;