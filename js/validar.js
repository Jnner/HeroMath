function pass(){return btoa(document.getElementById("pass").value)}
function EvalTxtJugador1(evento)
{
	var code = evento.which || evento.keyCode,
			nick = document.getElementById("nickJugador"),
			topLetters = 20,
			restOverLtrs = (topLetters - nick.value.length)-1,
			msn = document.getElementById("spnMsn");
	msn.innerHTML = "Te quedan " + restOverLtrs + " caracteres por introducir";
	ColorMs(1);
	if (code==44 || code==188) {
		return false;
	} else if (code==13) {
		InputPlayers();
	} else if (restOverLtrs > 0) {
		return true;
	} else {
		return false;
	}
}
function EvalTxtJugador2(evento)
{
	var code = evento.which || evento.keyCode,
			nick = document.getElementById("changeNick"),
			topLetters = 20,
			restOverLtrs = (topLetters - nick.value.length)-1,
			msn = document.getElementById("spnMsn");
	msn.innerHTML = "Te quedan " + restOverLtrs + " caracteres por introducir";
	ColorMs(1);
	if (code==44 || code==188) {
		return false;
	} else if (code==13) {
		CambiarNombre();
	} else if (restOverLtrs > 0) {
		return true;
	} else {
		return false;
	}
}
function BossPass()
{
	if (btoa(pass())=='WW05eWNtRnk=') {return true}
	else {return false}
}
