function RedNeuronal(factorAprendizaje)
{
	this.primeraCapa   = [];
	this.ultimaCapa    = [];
	this.cantidadCapas = 0;
	this.factorAprendizaje = factorAprendizaje;

	this.entrenar = function(entradas, salidas)
	{
		//Revisamos que los tamaños de la red sean los adecuados
		if (entradas.length !== this.capas[0].length)
		{
			throw "Error al entrenar; Longitud de entradas y la primera capa son distintas: " + 
				   entradas + "|" + this.capas[0];
		}

		if (salidas.length !== this.capas[this.capas.length-1].length)
		{
			throw "Error al entrenar; Longitud de salida y la ultima capa son distintas: " + 
				   entradas + "|" + this.capas[this.capas.length-1];
		}

		//Entrenamos con el método de Back Propagation
		
		/* Paso Hacia Adelante */
		
		//Calculamos el valor esperado y el valor actual
		actual         = salidas;
		predicion      = [];
		acumuladores   = [];
		salidasLocales = entradas;

		for (var i = 0; i < this.capas.length; i++)
		{
			entradasLocales  = salidasLocales;
			salidasLocales   = [];
			acumuladoresTemp = [];

			for (var j = 0; j < this.capas[i].length; j++)
			{
				p = new Perceptron();
				capaTemp = this.capas[i];
				res      = capaTemp[j].clasificarSinActivar(entradasLocales);

				salidasLocales.push(p.funcionActivacion(res));
				acumuladoresTemp.push(res);
			}

			predicion.push(salidasLocales);
			acumuladores.push(acumuladoresTemp);
		}

		//Calculamos el error total de la ultima capa
		error = 0;

		for (var i = 0; i < predicion[predicion.length-1].length; i++)
		{
			error += (Math.pow((actual[i] - predicion[[predicion.length-1]][i]), 2)/2);
		}

		/* Paso Hacia Atras */

		//Calculamos los gradientes para cada uno de los nodos de salida
		gradientes = [];
		gradientesError  = [];
		gradientesSalida = [];
		gradientesRed    = [];
		pesosAnteriores  = [];

		for (var i = predicion.length-1; i >= 1; i--)
		{
			perceptronS = new Perceptron();

			for (var j = 0; j < predicion[i].length; j++)
			{
				gradienteError  = -(actual[j]-predicion[i][j]);
				gradienteSalida = predicion[i][j] * (1-predicion[i][j]);
				gradienteRed    = predicion[i-1][j];
				gradientePeso   = gradienteError * gradienteSalida * gradienteRed;

				gradientes.push(gradientePeso);
				gradientesError.push(gradienteError);
				gradientesSalida.push(gradienteSalida);
				gradientesRed.push(gradienteRed);

				console.log("gradienteError: " + "-(" + actual[j] + " - " + predicion[i][j] + ")" + "|" + gradienteError)
				console.log("gradienteSalida: " + predicion[i][j] + " * " + "(1-" + predicion[i][j] + ")" + "|" + gradienteSalida)
				console.log("gradienteRed: " + gradienteRed + "|" + gradienteRed)
				console.log("gradienteTotal: " + gradienteError + " * " + gradienteSalida + " * " + gradienteRed + "|" + gradientePeso)
			}
		}

		//Actualiamos los pesos de la última capa
		for (var i = 0; i < this.capas[this.capas.length-1].length; i++)
		{
			capaTemp = 	this.capas[this.capas.length-1];
			pesosAnteriores.push(capaTemp[i].pesos.slice());

			for (var j = 0; j < capaTemp[i].pesos.length; j++)
			{
				capaTemp[i].pesos[j] = (capaTemp[i].pesos[j] - (this.factorAprendizaje * gradientes[i]));
					
				console.log(capaTemp[i].pesos[j] + " - " + "(" + this.factorAprendizaje + " * " + gradientes[i] + ")");
				console.log(capaTemp[i].pesos[j]);
			}
		}

		console.log(pesosAnteriores);

		//Actualizamos las capas ocultas
		for (var i = this.capas.length-2; i >= 0; i--) //Por cada una de las capas ocultas
		{
			for (var j = 0; j < this.capas[i].length; j++) //Sacamos el numero de neuronas en cada capa
			{
				for (var k = 0; k < this.capas[i+1].length; k++) //Sacamos el numero de neuronas de la siguiente capa a la oculta
				{
					errorGradienteO = gradientesError
				}

				errorGradienteO = gradientesError[j]

				gradiente1 = gradientesError[this.capas.length-2-i] * gradientesSalida[this.capas.length-2-i];
				peso       = pesosAnteriores[j];
				producto   = gradiente1 * peso;

				//console.log(gradiente1);
				//console.log(peso);
				//console.log(producto);
			}
		}
	};

	this.clasificar = function(entradas)
	{
		salidasLocales = entradas;

		for (var i = 0; i < this.capas.length; i++)
		{
			entradasLocales = salidasLocales;
			salidasLocales  = [];

			for (var j = 0; j < this.capas[i].length; j++)
			{
				capaTemp = this.capas[i];
				res      = capaTemp[j].clasificar(entradasLocales);

				salidasLocales.push(res);
			}
		}

		return salidasLocales;
	}

	this.crearCapa = function(cantidadNeuronas = 1, capaAnterior = null, capaSiguiente = null)
	{
		capaNueva = [];

		for (i = 0; i < cantidadNeuronas; i++)
		{
			neurona = new Perceptron();
			capaNueva.push(neurona);

			neurona.capaAnterior  = capaAnterior;
			neurona.capaSiguiente = capaSiguiente;
		}

		return capaNueva;
	}

	//Se especificar un arreglo con la cantidad de capas que tendra, 
	//Ejemplo [3,2,1] tendra 3 capaz con 3,2,1 en cada capa
	this.crear = function(arregloCantidadCapas)
	{
		if (arregloCantidadCapas != undefined && arregloCantidadCapas.length != 0)
		{
			var cantidadC = 0;
			for (var i = 0; i < arregloCantidadCapas.length; i++)
			{
				if (parseInt(arregloCantidadCapas[i]) !== NaN)
				{
					capaCreada = [];

					if (i == 0)
					{

					}
					else if (i == arregloCantidadCapas.)
					{

					}

					for (var j = 0; j < arregloCantidadCapas[i]; j++)
					{
						perceptron = new Perceptron();
						capaCreada.push(perceptron);
					}

					this.capas.push(capaCreada);
					cantidadC++;
				}
			}

			this.cantidadCapas = cantidadC;
		}
	};
}