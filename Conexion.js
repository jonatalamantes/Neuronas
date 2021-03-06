//Jonathan Elias Sandoval Talamanets
//Conexion.js
//Clase: Clasificación Inteligente de Datos
//Proyecto 2

function Conexion(nombreR = "", pesoR = 1, origenR = null, destinoR = null)
{
	/* Atributos */

	var nombre       = nombreR;

	if (pesoR == 'random')
	{
		var peso = Math.random();
	}
	else
	{
		var peso = pesoR;
	}

	var origen       = origenR;
	var destino      = destinoR;
	var error        = 0;
	var errorParcial = 0;
	var valor        = 1;
	var acumulador   = 0;
	var historicoAcumuladores = [];
	var historicoValores      = [];
	var historicoPesos        = [];

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

	this.getError = function()
	{
		return error;
	};

	this.getErrorParcial = function()
	{
		return error;
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

	this.getHistoricoPesos = function()
	{
		return historicoPesos;
	};

	/* Setters */

	this.setNombre = function(x = "")
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

	this.setError = function(x = 0)
	{
		error = x;
	};


	this.setErrorParcial = function(x = 0)
	{
		error = x;
	};
		
	this.setPeso = function(x = 1)
	{
		historicoPesos = [];
		historicoPesos.unshift(peso);
		peso = x;
	};


	this.setValor = function(x = 0)
	{
		historicoValores = [];
		historicoValores.unshift(valor);
		valor = x;
	};

	this.setAcumulador = function(x = 0)
	{
		historicoAcumuladores = [];
		historicoAcumuladores.unshift(acumulador);
		acumulador = x;
	};

	this.setHistorioAcumuladores = function(x = [])
	{
		historicoAcumuladores = x;
	};

	this.setHistoricoValores = function(x = [])
	{
		historicoValores = x;
	};

	this.setHistoricoPesos = function(x = [])
	{
		historicoPesos = x;
	};

	this.toString = function()
	{
		cad = "Nombre{" + this.getNombre() + "} Peso{" + this.getPeso() + "} Valor{" + this.getValor() + "}";

		if (this.getOrigen() == null)
		{
			cad += " Origen{null}";
		}
		else
		{
			cad += " Origen{" + this.getOrigen().getNombre() + "}";
		}

		if (this.getDestino() == null)
		{
			cad += " Destino{null}";
		}
		else
		{
			cad += " Destino{" + this.getDestino().getNombre() + "}";
		}

		cad += " Error{" + this.getError() + "} ErrorParcial{" + this.getErrorParcial() + "}";

		return cad;
	};
}