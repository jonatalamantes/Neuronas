//Jonathan Elias Sandoval Talamanets
//RedNeuronal.js
//Clase: Clasificación Inteligente de Datos
//Proyecto 2
//doc: https://mattmazur.com/2015/03/17/a-step-by-step-backpropagation-example/

function RedNeuronal(aprendizaje = 1, logR = true)
{
	var capas       = [];
	var aprendizaje = aprendizaje;
	var ultimaCapa  = [];
	var primeraCapa = [];
	var error       = 1;
	var log         = logR;

	/* Getters */

	this.getCapas = function()
	{
		return capas;
	};

	this.getAprendizaje = function()
	{
		return aprendizaje;
	};

	this.getError = function()
	{
		return error;
	};

	this.getLog = function()
	{
	    return log;
	};

	this.getPrimeraCapa = function()
	{
	    return primeraCapa;
	};

	this.getUltimaCapa = function()
	{
	    return ultimaCapa;
	};

	/* Setters */

	this.setCapas = function(x = [])
	{
		capas = x;
	};

	this.setApredizaje = function(x = 1)
	{
		aprendizaje = x;
	};

	this.setError = function(x = 1)
	{
		error = x;
	};

	this.setLog = function(x = false)
	{
	    log = x;
	};

	this.setUltimaCapa = function(x = false)
	{
	    ultimaCapa = x;
	};

	this.setPrimeraCapa = function(x = false)
	{
	    primeraCapa = x;
	};

	this.logMsj = function(msj = "")
	{
	    if (log)
	    {
	        console.log(msj);
	    }
	};

	/* Metodos de la clase */

	this.construir = function(arregloCantidades = [], pesoNeurona = 1)
	{
		if (arregloCantidades !== undefined && arregloCantidades.length != 0)
		{
			this.setCapas([]);

			//comenzamos por crear cada una de las capas
			for (i = 0; i < arregloCantidades.length; i++)
			{
				var capaActual = [];

				for (var j = 0; j < parseInt(arregloCantidades[i]); j++)
				{
					neurona = new Perceptron("Capa" + i + "Neurona" + j, 'sigmoidal', pesoNeurona);
					capaActual.push(neurona);
				}

				if (i == 0) //Primera Capa
				{
					for (var j = 0; j < parseInt(arregloCantidades[i]); j++)
					{
						conexion = new Conexion("Capa" + i + "Neurona" + j, 'random', null, capaActual[j]);
					}
				}
				else if (i == arregloCantidades.length-1) //Ultima capa
				{
					for (var j = 0; j < parseInt(arregloCantidades[i]); j++)
					{
						for (var k = 0; k < this.getCapas()[i-1].length; k++)
						{
							neuronaEntrada = this.getCapas()[i-1][k];
							neuronaSalida  = capaActual[j];

							conexion = new Conexion("Capa" + i + "Neurona" + j, 'random', neuronaEntrada, neuronaSalida);
						}
					}

					for (var j = 0; j < parseInt(arregloCantidades[i]); j++)
					{
						conexion = new Conexion("Capa" + (i+1) + "Neurona" + j, 'random', capaActual[j], null);
					}
				}
				else //Capa oculta
				{
					for (var j = 0; j < parseInt(arregloCantidades[i]); j++)
					{
						for (var k = 0; k < this.getCapas()[i-1].length; k++)
						{
							neuronaEntrada = this.getCapas()[i-1][k];
							neuronaSalida  = capaActual[j];

							conexion = new Conexion("Capa" + i + "Neurona" + j, 'random', neuronaEntrada, neuronaSalida);
						}
					}
				}

				this.getCapas().push(capaActual);
			}

			this.setUltimaCapa(this.getCapas()[this.getCapas().length-1]);
			this.setPrimeraCapa(this.getCapas()[0]);
		}
	};

	this.toString = function()
	{
		cad = "";

		for (var i = 0; i < this.getCapas().length; i++)
		{
			cad += "Capa: " + i + "*\n";

			for (var j = 0; j < this.getCapas()[i].length; j++)
			{
				cad += "  Neurona: " + this.getCapas()[i][j].toString() + "#\n";

				for (var k = 0; k < this.getCapas()[i][j].getEntradas().length; k++)
				{
					cad += "    Entrada: " + this.getCapas()[i][j].getEntradas()[k].toString() + "$\n";
				}

				for (var k = 0; k < this.getCapas()[i][j].getSalidas().length; k++)
				{
					cad += "    Salidas: " + this.getCapas()[i][j].getSalidas()[k].toString() + "$\n";
				}
			}
		}

		return cad;
	}

	this.logString = function()
	{
		for (var i = 0; i < this.getCapas().length; i++)
		{
			console.log("Capa: " + i + "*");

			for (var j = 0; j < this.getCapas()[i].length; j++)
			{
				console.log("  Neurona: " + this.getCapas()[i][j].toString() + "#");

				for (var k = 0; k < this.getCapas()[i][j].getEntradas().length; k++)
				{
					console.log("    Entrada: " + this.getCapas()[i][j].getEntradas()[k].toString() + "$");
				}

				for (var k = 0; k < this.getCapas()[i][j].getSalidas().length; k++)
				{
					console.log("    Salidas: " + this.getCapas()[i][j].getSalidas()[k].toString() + "$");
				}
			}
		}
	}

	this.entrenar = function(inputs = [], outputs = [])
	{
		/* FORWARD PASS */

		this.logMsj("/* FORWARD PASS */");

		this.setUltimaCapa(this.getCapas()[this.getCapas().length-1]);
		this.setPrimeraCapa(this.getCapas()[0]);

		if (this.getUltimaCapa().length !== outputs.length)
		{
			throw "Error no coinciden la cantidad salidas con la capa de salida";
		}

		this.clasificar(inputs);

		//Calculamos el error total de la capa de salida
		errorNet = 0;
		for (var i = 0; i < this.getUltimaCapa().length; i++)
		{
			errorNet += Math.pow(outputs[i] - this.getUltimaCapa()[i].getSalidas()[0].getValor(),2)/2;
		}

		this.setError(errorNet);
		this.logMsj("Error total: " + this.getError());

		/* BACKWARD PASS */

		this.logMsj("/* BACKWARD PASS */");

		//Actualizamos los pesos en la capa de salida
		for (var i = 0; i < this.getUltimaCapa().length; i++)
		{
			for (var j = 0; j < this.getUltimaCapa()[i].getEntradas().length; j++)
			{
				conexion    = this.getUltimaCapa()[i].getEntradas()[j];
				valorSalida = this.getUltimaCapa()[i].getSalidas()[0].getValor();

				errorGeneral = -(outputs[i] - valorSalida);
				errorSalida  = valorSalida * (1 - valorSalida);
				errorRed     = conexion.getValor();
				errorTotal   = errorGeneral * errorSalida * errorRed;

				this.logMsj("ECCS: " + errorGeneral + " * " + errorSalida + " * " + errorRed + " = " + errorTotal);
				this.logMsj(conexion.toString());

				//Actualizamos lo pesos de la conexion
				conexion.setPeso(conexion.getPeso() - this.getAprendizaje() * errorTotal);
				conexion.setError(errorTotal);
				conexion.setErrorParcial(errorGeneral*errorSalida);
				conexion.getOrigen().setError();

				this.logMsj(conexion.toString());
			}
		}

		//Actualizamos las capas ocultas
		for (var i = this.getCapas().length-2; i >= 1; i--)
		{
			capaActual = this.getCapas()[i];

			for (var k = 0; k < capaActual.length; k++)
			{
				neurona = capaActual[k];
				errorGeneral = 0;
				errorSalida  = 0;

				//Sacamos el error de la neurona
				for (var j = 0; j < neurona.getSalidas().length; j++)
				{
					conexion = neurona.getSalidas()[j];					
					errorGeneral += conexion.getErrorParcial() * conexion.getHistoricoPesos()[0];
					errorSalida  = conexion.getValor();
				}

				errorSalida = errorSalida * (1 - errorSalida);

				//Calculamos el error de cada conexion entrante y actualizamos los pesos
				for (var j = 0; j < neurona.getEntradas().length; j++)
				{
					conexion   = neurona.getEntradas()[j];
					errorRed   = conexion.getValor();
					errorTotal = errorRed * errorGeneral * errorSalida;

					this.logMsj("ECE: " + errorGeneral + " * " + errorSalida + " * " + errorRed + " = " + errorTotal);
					this.logMsj(conexion.toString());

					//Actualizamos lo pesos de la conexion
					conexion.setPeso(conexion.getPeso() - this.getAprendizaje() * errorTotal);
					conexion.setError(errorTotal);
					conexion.setErrorParcial(errorGeneral*errorSalida);
					conexion.getOrigen().setError();

					this.logMsj(conexion.toString());
				}
			}
		}
	};

	this.clasificar = function(inputs = [])
	{
		if (this.getCapas() == undefined || this.getCapas().length == 0 || this.getCapas()[0].length != inputs.length)
		{
			throw "Error no coinciden las entradas con la capa";
		}
		else
		{
			//Asignamos las entradas al vector de la capa de entrada
			for (var i = 0; i < this.getCapas()[0].length; i++)
			{
				neurona = this.getCapas()[0][i];

				for (var j = 0; j < neurona.getEntradas().length; j++)
				{
					neurona.getEntradas()[j].setValor(inputs[i]);
				}

				for (var j = 0; j < neurona.getSalidas().length; j++)
				{
					neurona.getSalidas()[j].setValor(inputs[i]);
				}
			}

			//Comenzamos la clasificacion
			for (var i = 1; i < this.getCapas().length; i++)
			{
				for (var j = 0; j < this.getCapas()[i].length; j++)
				{
					this.getCapas()[i][j].clasificar();
				}
			}
		}
	};
}