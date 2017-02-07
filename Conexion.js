function Conexion(nombreR = "", pesoR = 1, origenR = null, destinoR = null)
{
	/* Atributos */

	var nombre     = nombreR;
	var peso       = pesoR;
	var origen     = origenR;
	var destino    = destinoR;
	var valor      = 1;
	var acumulador = 0;
	var historicoAcumuladores = [];
	var historicoValores      = [];

	if (origenR !== null)
	{
		origenR.getSalidas().push(this);
	}

	if (destinoR !== null)
	{
		destinoR.getEntradas().push(this);
	}

	/* Getters */

	this.getNombre = function()
	{	
		return nombre;
	};

	this.getPeso = function()
	{	
		return peso;
	};

	this.getOrigen = function()
	{
		return origen;
	};

	this.getDestino = function()
	{
		return destino;
	};

	this.getValor = function()
	{
		return valor;
	};

	this.getAcumulador = function()
	{
		return acumulador;
	};

	this.getHistoricoAcumuladores = function()
	{
		return historicoAcumuladores;
	};

	this.getHistoricoValores = function()
	{
		return historicoValores;
	};

	/* Setters */

	this.setNombre = function(x = "")
	{
		peso = x;
	};

	this.setPeso = function(x = 1)
	{
		peso = x;
	};

	this.setOrigen = function(x = null)
	{
		origen = x;
	};

	this.setDestino = function(x = null)
	{
		destino = x;
	};

	this.setValor = function(x = 0)
	{
		if (x !== valor)
		{
			historicoValores.push(valor);
			valor = x;
		}
	};

	this.setAcumulador = function(x = 0)
	{
		if (x !== acumulador)
		{
			historicoAcumuladores.push(acumulador);
			acumulador = x;
		}
	};

	this.setHistorioAcumuladores = function(x = [])
	{
		historicoAcumuladores = x;
	};

	this.setHistoricoValores = function(x = [])
	{
		historicoValores = x;
	};

	this.toString = function()
	{
		return this.getNombre() + "|" + this.getPeso() + "|" + this.getValor() + "|" + this.getOrigen() + this.getDestino();
	};
}