//GESTION JUGADORES
function BuscarNombre(name)
{
	var i;
	for(i=0; i<conterPlayers.length; i++) {
		if (name==conterPlayers[i].nombre)
			return i;
	}
	if (i==conterPlayers.length) {
		return -1;
	}
}
// dependencias para buscar desde una pos y contar niveles
 function BuscDesdePos(pos,nivel)
{
	var i;
	for (i=pos+1; i<conterPlayers.length; i++) {
		if (nivel==conterPlayers[i].nivel) { return true }
	}
	if (i==conterPlayers.length) { return false }
}
function ContNiveles(nivel)
{
	var contador=0;
	for (var i=0; i<conterPlayers.length; i++) {
		if (nivel==conterPlayers[i].nivel) { contador++ }
	}
	return contador;
}
// genera una cadena con los datos de los jugadores empatados
function Piques()
{
	for (var i=0; i<conterQuestions.length; i++) {//total de niveles
		for (var j=0; j<conterPlayers.length; j++) {//total de jugadores
			if (conterPlayers[j].nivel!=0) {//el nivel no es 0
				if (j<conterPlayers.length) {//no es el ultimo jugador de array
					if (conterPlayers[j].nivel==(i+1) && BuscDesdePos(j,conterPlayers[j].nivel)) {//nivel es i+1 y esta repe(en players) despues de la pos actual
						contPikes += conterPlayers[j].nombre + ",";
					} else if (conterPlayers[j].nivel==(i+1) && ContNiveles(conterPlayers[j].nivel)>1) {//ya no hay mas jugadores empatados en este nivel
						contPikes += conterPlayers[j].nombre + (i+1);
					}
				} else {
					contPikes += conterPlayers[j].nombre + (i+1);//ultimo jugador del array
				}
			}
		}
	}
}
function InputPlayers()
{
	var jugador,
			nick = document.getElementById("nickJugador"),
			nick2 = document.getElementById("changeNick"),
			msn = document.getElementById("spnMsn"),
			maxPlyrs=10,
			pos = BuscarNombre(nick.value);
	CamposTexto(1,0,0);//mostrar.js
	nick2.value = "";//borramos el valor al campo cambiar nombre
	nick.focus();
	msn.innerHTML = "";
	ColorMs(9);
	if (nick.value!="" && pos==-1 && conterPlayers.length<maxPlyrs) {
		conterPlayers.push(
			{
				nombre: nick.value,
				nivel: 0,
				pAcertadas: 0,
				partidas: 0,
				rango: 0, // referencia a la posicion rangosGame
				timeRango: 0, // para gestionar los rangos
				timeCache: 0, // total tiempo hasta fin turno (se reinicia cada turno)
				timePartida: 0
			});
		msn.innerHTML = " Jugador " + (conterPlayers.length) + " introducido correctamente";
		ColorMs(1); //si es 0 pone las letras del span de mensajes en rojo, si es 1 las pone en verde
		nick.value = "";
		nick.focus();
	} else if (nick.value=="") {
		msn.innerHTML = "Tienes que escribir un nick";
		ColorMs(0);
		nick.focus();
	} else if (pos!=-1) {
		msn.innerHTML = "Este nick NO está DISPONIBLE";
		ColorMs(0);
		nick.focus();
	} else {
		msn.innerHTML = "NO se puede MÁS de " + maxPlyrs + " jugadores";
		ColorMs(0);
		nick.focus();
		AudioNo();
	}
	btnclick.play();
}
function CambiarNombre()
{
	var nick = document.getElementById("nickJugador"),
			nick2 = document.getElementById("changeNick"),
			msn = document.getElementById("spnMsn"),
			gamers = conterPlayers.length,
			pos = BuscarNombre(nick.value);
	CamposTexto(1,1,0);
	nick.focus();
	msn.innerHTML = "";
	ColorMs(9);
	if (gamers>0) {
		if (nick.value!="" && nick2.value!="" && pos!=-1) {
			conterPlayers[pos].nombre = nick2.value;
			msn.innerHTML = "Nombre cambiado";
			ColorMs(1);
			CamposTexto(0,0,0);
			nick.value = "";
			nick.focus();
		} else if (nick.value=="" || nick2.value=="") {
			msn.innerHTML = "Tienes que escribir un nick";
			ColorMs(0);
		}  else if (BuscarNombre(nick2.value)!=-1) {
			msn.innerHTML = "Este nick NO está DISPONIBLE";
			ColorMs(0);
			nick2.focus();
		} else {
			msn.innerHTML = "El jugador NO EXISTE";
			ColorMs(0);
			nick.value = "";
			nick.focus();
		}
	} else {
		msn.innerHTML = "No hay jugadores";
		ColorMs(0);
	}
	btnclick.play();
}
// a partir de aqui esta las funciones de borrado de datos
function BorrarJugador()
{
	var msn = document.getElementById("spnMsn"),
			pass = document.getElementById("pass"),
			nick = document.getElementById('nickJugador'),
			pos = BuscarNombre(nick.value);
	CamposTexto(1,0,1);
	nick.focus();
	msn.innerHTML = "";
	ColorMs(9);
	if (BossPass()) {
		if (pos!=-1 && nick.value!="") {
			conterPlayers.splice(pos,1);
			msn.innerHTML = nick.value + ", ha sido BORRAD@";
			ColorMs(1);
			nick.value = "";
			nick.focus();
		} else if (nick.value=="") {
			msn.innerHTML = "Tienes que escribir un nombre";
			ColorMs(0);
		} else {
			msn.innerHTML = "El jugador NO EXISTE";
			ColorMs(0);
			nick.value = "";
			nick.focus();
		}
	} else {
		msn.innerHTML = "BossPass incorrecto: Deberías preguntarle a Jaz";
		ColorMs(0);
		quevashacer.play();
	}
}
function WinerPartida()
{
	var mayorLvlRecord=0, mayorPregRecord=0, maxTimeLvl=525, posMayorRecord=-1;
	for(var i=0; i<conterPlayers.length; i++) {
		if (conterPlayers[i].nivel >= mayorLvlRecord) {
			if (conterPlayers[i].nivel > mayorLvlRecord) {
				mayorLvlRecord = conterPlayers[i].nivel;
				posMayorRecord = i;
			}
			else {
				if (conterPlayers[i].pAcertadas >= mayorPregRecord) {
					if (conterPlayers[i].pAcertadas > mayorPregRecord) {
						mayorPregRecord = conterPlayers[i].pAcertadas;
						posMayorRecord = i;
					}
					else {
						if (conterPlayers[i].timePartida <= maxTimeLvl) {
							if (conterPlayers[i].timePartida < maxTimeLvl) {
								maxTimeLvl = conterPlayers[i].timePartida;
								posMayorRecord = i;
							}
							else {
								document.getElementById('display2').innerHTML = "EXCEPCION INCREIBLE<br/><br/>Hay mínimo dos jugadores igualados en nivel, preguntas y tiempo de respuestas";
							}
						}
					}
				}
			}
		}
	}
	return posMayorRecord;
}
function GestionRangos()
{
	// si Player esta en fin nivel 2
	if (posL==1) {
		// * si tiempo/nvl es menor que el criterio de tiempo para ese rango
		if (conterPlayers[playerActual].timeCache<=criterioRangos[0]) {
			conterPlayers[playerActual].rango += 1;
			conterPlayers[playerActual].timeRango = conterPlayers[playerActual].timeCache;
		}
	}
	else {
		// si Player esta en fin nivel 4
		if (posL==3) {
			// *
			if (conterPlayers[playerActual].timeCache<=criterioRangos[1]) {
				conterPlayers[playerActual].rango += 1;
				conterPlayers[playerActual].timeRango = conterPlayers[playerActual].timeCache;
			}
		}
		else {
			// si Player esta en fin nivel 5
			if (posL==4) {
				// *
				if (conterPlayers[playerActual].timeCache<=criterioRangos[2]) {
					conterPlayers[playerActual].rango += 1;
					conterPlayers[playerActual].timeRango = conterPlayers[playerActual].timeCache;
				}
			}
		}
	}
}
//END GESTION JUGADORES
//GESTION DEL JUEGO
function GestionJuego()
{
	var startTime = new Date().getTime();
	var i=0;
	var valueBar;
	var posWinPartida = WinerPartida();

	// modo pakete: empieza siempre desde el ultimo nivel no superado
	if (Paket_Chlng) {
		posL = conterPlayers[playerActual].nivel;
	}
	// modo chalenge: empieza siempre desde el nivel 1
	else {
		posL = 0;
	}

	var level = "<p style='margin:0; padding:0; text-align:left; font-size:50px;'><span style='font-size:50px;'>nivel:</span> " + (posL+1) + "</p>";
	var pregunta = "<p style='margin:0; padding:0; text-align:center; font-size:100px;'>" + conterQuestions[posL][posP] + "</p>";

	document.getElementById("display2").innerHTML = level + pregunta;

	var interval = setInterval(function(){
		if (new Date().getTime() - startTime > 4000)
		{
			clearInterval(interval);
			// si Player ACIERTA la pregunta
			if (answer==conterAnswers[posL][posP]) {
				posP++;
				conterPlayers[playerActual].pAcertadas += 1;
				conterPlayers[playerActual].timeCache += i;
				conterPlayers[playerActual].timePartida += i;
				answer=0;
				AudioRespOk();
				// si Player contesta la ULTIMA pregunta del NIVEL
				if (posP==conterQuestions[posL].length) {
					// si NIVEL ACTUAL|superado es MAYOR que nivel GUARDADO
					if (posL>conterPlayers[playerActual].nivel-1) {
						conterPlayers[playerActual].nivel = posL + 1;
						GestionRangos();
						conterPlayers[playerActual].timeCache = 0;
					}
					// si Player contesta la ULTIMA pregunta del ULTIMO NIVEL pero NO es el ULTIMO jugador
					if (posL==conterQuestions.length-1) {
						conterPlayers[playerActual].nivel = posL + 1;
						playerActual++;
						posL=0;
						posP=0;
						answer=0;
						PnlGame(1,0);
						victory.play();
						document.getElementById("display2").innerHTML = "<p style='margin:0; padding:0; text-align:center; font-size:70px;'>HAS GANADO<br/><span id='spanNomGame'>HeroMath</span></p>";
						// si Player contesta la ULTIMA pregunta del ULTIMO NIVEL y ES el ULTIMO jugador
						if (playerActual==conterPlayers.length) {
							playerActual=0;
							partidas++;
							if (posWinPartida!=-1)
								conterPlayers[posWinPartida].partidas += 1;
							conterPlayers[playerActual].timePartida = 0;
							PnlCabecera(1);
							MostrarPlayers();
							document.getElementById("display2").innerHTML = "<p style='margin:0; padding:0; text-align:center; font-size:70px;'>Fin de Partida<br/>HAS GANADO<br/><span id='spanNomGame'>HeroMath</span></p>";
							return;
						}
						return;
					}
					posL++;
					posP=0;
				}
				// recursividad para reiniciar el bucle y pasar a la siguiente posicion del conterQuestions
				GestionJuego();
			}
			// si Player NO ACIERTA la pregunta
			else {
				// si Player NO ES el ULTIMO jugador
				if (playerActual<conterPlayers.length-1) {
					playerActual++;
					posL=0;
					posP=0;
					answer=0;
					PnlGame(1,0);
					AudioLoser();
					document.getElementById("display2").innerHTML = "<p style='margin:0; padding:0; text-align:center; font-size:30px;'>"+
					conterPlayers[playerActual-1].nombre + " LOSER<br/>"+
					"Turno de " + conterPlayers[playerActual].nombre + "</p>";
					return;
				}
				// si Player ES el ULTIMO jugador
				if (playerActual==conterPlayers.length-1) {
					playerActual=0;
					partidas++;
					posL=0;
					posP=0;
					answer=0;
					if (posWinPartida!=-1)
						conterPlayers[posWinPartida].partidas += 1;
					conterPlayers[playerActual].timePartida = 0;
					PnlGame(1,0);
					PnlCabecera(1);
					AudioLoser();
					MostrarPlayers();
					return;
				}
				else {
					return;
				}
			}
		}
		// si Player CONTESTA ANTES de terminar el tiempo
		// esto hace que salte directamente a la siguiente pregunta
		if (answer!=0)
			startTime = 4000;
		// se suma el valor de la barra y se va mostrando en cada vuelta
		// se ejecuta sin parar hasta que se pulse alguna respuesta
		document.getElementById("barProgress").value = i++;
		valueBar = document.getElementById("barProgress").value;
	}, 38);
}
function TimerStart()
{
	var inicio = new Date().getTime();
	var i=0, segundos=6;
	// si el array players esta VACIO
	if (conterPlayers.length==0) {
		PnlAjustes();
		document.getElementById("spnMsn").innerHTML = "No hay jugadores. Para jugar registrate";
		ColorMs(0);
		AudioNo();
	}
	// si el array player NO esta VACIO
	else {
		PnlCabecera(0);
		PnlGame(0,0);
		document.getElementById("display2").innerHTML = "<span style='margin:0; font-size:100px;'>"+conterPlayers[playerActual].nombre+"</span>";
		// comienzo de la cuenta atras
		var intervalo = setInterval(function(){
			if (new Date().getTime() - inicio > 6000)
			{
				clearInterval(intervalo);
				PnlGame(0,1);
				GestionJuego();
				comienzo.play();
				return;
			}
			segundos--;
			bip.play();
			document.getElementById("display2").innerHTML = "<p style='margin:0; padding:0; text-align:center; font-size:200px;'>" + segundos + "</p>";
		}, 1100);
	}
}
//END GESTION DEL JUEGO
