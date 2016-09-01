// control colores mensajes
function ColorMs(error)
{
	var color = document.getElementById("spnMsn");
	switch (error) {
		case 0: //error
			color.style.background = "#B17071"; break;
		case 1: //info
			color.style.background = "#A3976A"; break;
		default:
			color.style.background = "none";
	}
}
// jpg va de 1 a n segun el numero de imagenes que queremos cambiar
function Fondo(jpg)
{
	if (jpg==1) {document.body.style.backgroundImage = "url('img/fondo.jpg')"}
	if (jpg==2) {document.body.style.backgroundImage = "url('img/fondopizarra.jpg')"}
}
// ocultar o mostrar campos de texto
function CamposTexto(camp1,camp2,camp3)
{
	var nick = document.getElementById('nickJugador'),
			changeNick = document.getElementById('changeNick'),
			pass = document.getElementById('pass');
	if (camp1!=0) {nick.style.visibility = "visible"}
		else {nick.style.visibility = "hidden"}
	if (camp2!=0) {changeNick.style.visibility = "visible"}
		else {changeNick.style.visibility = "hidden"}
	if (camp3!=0) {pass.style.visibility = "visible"}
		else {pass.style.visibility = "hidden"}
}
function Inicio() // saludo de bienvenida
{
	var saludo = "<div id='bossIni'>"+
				"<img src='img/boss-hearup.png'/>"+
				"<p id='dialogIni'>"+
				"BIENVENIDOS<br/>a<br/>HeroMath"+
				"</p>"+
				"</div>";
	document.getElementById("display2").innerHTML = saludo;
	winclick.play();
}
//CABECERA
function PnlCabecera(shift)
{
	var cabecera = "<header>"+
					"<h1 id='titleGame' onclick='Music(1)'>Hero Math</h1>"+
					"</header>"+
					"<nav>"+
						"<a class='bStyle4 bNav marginleft5' onclick='MostrarPlayers(), PnlGame(1,0), Fondo(2)'>Jugadores</a>"+
						"<a class='bStyle4 bNav marginleft5' onclick='PnlAjustes(), PnlGame(0,0), Fondo(1)'>Ajustes</a>"+
						"<a class='bStyle4 bNav marginleft5' onclick='InfoGame(), PnlGame(0,0), Fondo(1)'>Ayuda</a>"+
					"</nav>";
	if(shift==1)
		document.getElementById("display1").innerHTML = cabecera;
	else
		document.getElementById("display1").innerHTML = "";
}
// END CABECERA
// PANEL DE AJUSTES
function PnlAjustes()
{
	var panel = "<a class='bStyle3 floatright' onclick='Inicio(), PnlGame(1,0)'>Salir</a>"+
			"<p>"+
					"<span id='spnMsn'></span><br/><br/>"+
					"<input id='nickJugador' type='text' onkeypress='return EvalTxtJugador1(event)' placeholder='Nick del Jugador'> "+
					"<input id='changeNick' type='text' onkeypress='return EvalTxtJugador2(event)' placeholder='Nuevo Nick'>"+
					"<input id='pass' type='password' size='8' placeholder='BoosPass'><br/><br/>"+
					"<a class='bStyle3' onclick='InputPlayers()'>Añadir Jugador</a>&nbsp;"+
					"<a class='bStyle3' onclick='CambiarNombre()'>Cambiar Nombre</a><br/><br/><br/>"+
					"<a class='bStyle3' onclick='BorrarJugador()'>Borrar Jugador</a>&nbsp;"+
					"<a class='bStyle3' onclick='MostrarPlayers(), Fondo(2)'>Ver JUGADORES</a>"+
				"</p>"+
				"<h2 class='title-center'>Modo de Juego</h2>"+
				"<a id='bSwitchOn' class='bSwitch bSwitch-left' onclick=\"Paket_Chlng=true, this.style.background='#C1B20D', document.getElementById('bSwitchOf').style.background='#2F6E65'\">Paquete</a>"+
				"<a id='bSwitchOf' class='bSwitch bSwitch-right' onclick=\"Paket_Chlng=false, this.style.background='#C1B20D', document.getElementById('bSwitchOn').style.background='#2F6E65'\">Chalenger</a>";
	document.getElementById("display2").innerHTML = panel;
	document.getElementById('nickJugador').focus();
	CamposTexto(0,0,0);
	if(Paket_Chlng) {
		document.getElementById("bSwitchOn").style.background = "#C1B20D";
		document.getElementById("bSwitchOf").style.background = "#2F6E65";
	}
	else {
		document.getElementById('bSwitchOf').style.background = "#C1B20D";
		document.getElementById('bSwitchOn').style.background = "#2F6E65";
	}
	winclick.play();
}
// END PANEL DE AJUSTES
// PANEL DE JUEGO
function PnlGame(bStart, plGame)
{
	var boton = "<a id='bStart' class='bStyle2' onclick='TimerStart(), Fondo(1)'>COMENZAR</a>";
	var panel = "<p><progress id='barProgress' class='' value='0' max='100'></progress></p>"+
				"<a id='bResp1' class='bStyle1' onclick='answer=1'>1</a> "+
				"<a id='bResp2' class='bStyle1' onclick='answer=2'>2</a> "+
				"<a id='bResp3' class='bStyle1' onclick='answer=3'>3</a>";
	if(bStart==1)
		document.getElementById("display1a").innerHTML = boton;
	else
		document.getElementById("display1a").innerHTML = "";
	if(plGame==1)
		document.getElementById("display3").innerHTML = panel;
	else
		document.getElementById("display3").innerHTML = "";
}
 // END PANEL DE JUEGO
 // RESULTADOS DE PARTIDA
function MostrarPlayers()
{
	Piques();
	var texto = "<table id='tblVentana2'>"+
				"<tr>"+
				"<th colspan='2'>PARTIDAS REALIZADAS</th>"+
				"<td>" + partidas + "</td>"+
				"<tr>"+
				"<th colspan='2'>PIQUES</th>"+
				"</tr>";
		for (var i=0; i<contPikes.length; i++) {
			if (isNaN(contPikes[i])) {//es letra y no coma
				if (i>0 && contPikes[i]!=',') {//no es la primera pos
					texto += contPikes[i];
				} else if (i==0 && contPikes[i]!=',') {//es la primera pos
					texto += "<tr><td colspan='2'>" + contPikes[i];
				} else {//es una coma
					texto += "  <span style='color:#FA5656;'>vs</span>  ";
				}
			}
			if (!isNaN(contPikes[i])) {//si es numero
				if (i!=contPikes.length) {//no es la ultima pos
					texto += "</td> <td> Nivel " + contPikes[i] + "</td>"+
									"</tr> <tr> <td colspan='2'>";
				} else {//es la ultima pos
					texto += "</td> <td> nivel " + contPikes[i] + "</td>"+
									"</tr>";
				}
			}
		}
	texto += "<tr>"+
				"<th>JUGADORES</th><th>RECORDS</th><th>RANGO</th>"+
				"</tr>";
	for(var i=0; i<conterPlayers.length; i++) {
		texto += "<tr>"+
				"<td>" + conterPlayers[i].nombre + "</td>"+
				"<td id='tdRecord'>" +
					"Nivel " + conterPlayers[i].nivel +
					"<br/>Partidas " + conterPlayers[i].partidas +
					"<br/>Preguntas " + conterPlayers[i].pAcertadas +
					"<br/>Tiempo " + conterPlayers[i].timeRango +
				"</td>"+
				"<td>" + rangosGame[conterPlayers[i].rango] + "</td>"+
				"</tr>";
	}
	 texto += "</table>";
	document.getElementById('display2').innerHTML = texto;
	winclick.play();
	contPikes="";
}
// END RESULTADOS DE PARTIDA
// INFORMACION DEL JUEGO
function InfoGame()
{
	var info = "<a class='bStyle3 floatright' onclick='Inicio(), PnlGame(1,0)'>Salir</a>"+
				"<div id='bossInfo'>"+
				"<img src='img/boss-heardown.png'/>"+
				"<p id='dialogInfo'>"+
				"Aquí está todo lo que necesitas saber sobre HeroMath para pasartelo pipa"+
				"</p>"+
				"</div>"+
				"<p>HeroMath es un juego que pone a prueba tu habilidad mental y consiste en contestar preguntas matemáticas. Contestarás  las preguntas con un tiempo límite y por cada nivel que avances las preguntas se complicarán un poco más.</p>"+
				"<h2 class='title-center'>Ganador de Partida</h2>"+
				"<p>El ganador de partida será el que más niveles haya superado. Si hay empate, el que más preguntas haya contestado, si hay empate el que menos tiempo haya tardado en superar el nivel</p>"+
				"<h2 class='title-center'>Piques entre jugadores</h2>"+
				"<p>Cuando dos jugadores tienen el mismo número de niveles superados</p>"+
				"<h2 class='title-center'>Rangos</h2>"+
				"De menor a mayor:<ul>"+
				"<li>Koala (por defecto)</li>"+
				"<li>Ostrich (menor o igual a " + criterioRangos[0] + " ut)</li>"+
				"<li>Hare (menor o igual a " + criterioRangos[1] + " ut)</li>"+
				"<li>HeroMath (menor o igual a " + criterioRangos[2] + " ut)</li>"+
				"</ul>"+
				"<p>Un nivel tiene en total 20s = 525 Unidades de Tiempo</p>"+
				"<h2 class='title-center'>Modos de Juego</h2>"+
				"<p>Hay dos modos de juego (Jugador Pakete) y (Player Chalenger). El primero empieza siempre desde el ultimo nivel no superado. El segundo empieza siempre desde el nivel 1</p>"+
				"<h2 class='title-center'>Ganador del Juego</h2>"+
				"<p>Es el jugador que haya superado todos los niveles, que más partidas haya ganado y haya conseguido el rango HeroMath</p>";
	document.getElementById("display2").innerHTML = info;
	winclick.play();
}
