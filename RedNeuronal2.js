//https://mattmazur.com/2015/03/17/a-step-by-step-backpropagation-example/

function RedNeuronal()
{
	var capas       = [];
	var aprendizaje = 1;

	/* Getters */

	this.getCapas = function()
	{
		return capas;
	}

	this.getAprendizaje = function()
	{
		return aprendizaje;
	}

	/* Setters */

	this.setCapas = function(x = [])
	{
		capas = x;
	}

	this.setApredizaje = function(x = 1)
	{
		aprendizaje = x;
	}

	/* Metodos de la clase */

	this.construir = function(arregloCantidades = [])
	{

	}

	this.entrenar = function(inputs = [], outputs = [])
	{
		// FORWARD PASS 

		this.clasificar(inputs);

		//Calculamos el error total

	}

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
					this.getCapas()[i][j].clasificar(inputs);
				}
			}
		}
	}
}