//Jonathan Elias Sandoval Talamanets
//Perceptron.js
//Clase: Clasificación Inteligente de Datos
//Proyecto 2

function Perceptron(nombreR = "", nombref = 'sigmoidal', biasR = 0, logR = false)
{
    /* Atributos */

    var nombre        = nombreR;
    var bias          = biasR;
    var log           = logR;
    var entradas      = [];
    var salidas       = [];
    var error         = 0;
    var nombrefuncion = nombref;

    /* Getters */

    this.getNombre = function()
    {
        return nombre;
    };

    this.getBias = function()
    {
        return bias;
    };

    this.getLog = function()
    {
        return log;
    };

    this.getEntradas = function()
    {
        return entradas;
    };

    this.getSalidas = function()
    {
        return salidas;
    };

    this.getError = function()
    {
        return error;
    };

    this.getNombreFuncionActivacion = function()
    {
        return nombrefuncion;
    };

    /* Setters */

    this.setNombre = function(x = "")
    {
        nombre = x;
    };

    this.setBias = function(x = 0)
    {
        bias = x;
    };

    this.setLog = function(x = false)
    {
        log = x;
    };

    this.setEntradas = function(x = [])
    {
        entradas = x;
    };

    this.setValors = function(x = [])
    {
        salidas = x;
    };

    this.setError = function(x = 0)
    {
        error = x;
    };

    this.setNombreFuncionActivacion = function(x = 'sigmoidal')
    {
        nombrefuncion = x;
    };

    /* Metodos de la Clase */

    this.logMsj = function(msj = "")
    {
        if (log)
        {
            console.log(msj);
        }
    }

    this.entrenar = function(inputs, outputs)
    {
        //La ponemos a clasificar y a reajustarse
        for (j = 0; j < inputs.length; j++)
        {
            this.clasificarEntrada(inputs[j]);
            this.setError(parseFloat(outputs[j] - this.getSalidas()[0].getValor()));
            this.ajustarPesos(inputs[j]);
        }
    };

    this.ajustarPesos = function(input)
    {
        this.logMsj("* Ajustando Pesos *");
        this.logMsj(" Entrada: " + input);
        this.logMsj(" Error: " + this.getError());
        this.logMsj(" Bias Antiguo: " + this.getBias());

        cad = "";
        for (i = 0; i < this.getEntradas().length; i++)
        {
            cad += " " + this.getEntradas()[i].getPeso() + ",";
        }

        this.logMsj(" Pesos Antiguos: " + cad);

        //Sumamos los vectores para conseguir los nuevos pesos
        for (k = 0; k < input.length; k++)
        {
            this.getEntradas()[k].setPeso(parseFloat(this.getEntradas()[k].getPeso() + input[k] * this.getError()));
        }

        //Hacemos lo mismo con el bias
        this.setBias(parseFloat(this.getBias() + this.getError()));

        this.logMsj(" Bias Nuevo: " + this.getBias());
        cad = "";
        for (i = 0; i < this.getEntradas().length; i++)
        {
            cad += " " + this.getEntradas()[i].getPeso() + ",";
        }

        this.logMsj(" Pesos Nuevos: " + cad);        
    };

    this.clasificarEntrada = function(input)
    {
        //Si no coinciden el numero de pesos con el numero de elementos en las entradas, reajustamos
        if (this.getEntradas() == undefined || this.getEntradas().length != input.length)
        {
            this.setBias(0);
            this.setEntradas([]);
            this.setValors([]);

            for (i = 0; i < input.length; i++)
            {
                c = new Conexion();
                c.setValor(input[i]);
                c.setDestino(this);
                c.setPeso(1);

                this.getEntradas().push(c);
            }

            c = new Conexion();
            c.setValor(0);
            c.setOrigen(this);
            c.setPeso(1);

            this.getSalidas().push(c);
        }

        //Acumulamos con la funcion de delta
        var acumuladorTemp = 0;

        for (var i = 0; i < input.length; i++)
        {
            this.getEntradas()[i].setValor(input[i]);
            acumuladorTemp += parseFloat(input[i] * this.getEntradas()[i].getPeso());
        }

        acumuladorTemp += this.getBias();

        for (var i = 0; i < this.getSalidas().length; i++)
        {
            this.getSalidas()[i].setValor(this.activacion(acumuladorTemp));
            this.getSalidas()[i].setAcumulador(acumuladorTemp);
        }

        this.logMsj(" * Realizando clasificacion sobre " + input);
        this.logMsj("Resultado Acumulador : " + acumuladorTemp);
        this.logMsj("Resultado Funcion Activicacion: " + this.getSalidas()[0].getValor());

        return this.getSalidas()[0].getValor();
    };

    this.clasificar = function()
    {
        //Acumulamos con la funcion de delta
        var acumuladorTemp = 0;

        for (var i = 0; i < this.getEntradas().length; i++)
        {
            acumuladorTemp += parseFloat(this.getEntradas()[i].getValor() * this.getEntradas()[i].getPeso());
        }

        acumuladorTemp += this.getBias();

        for (var i = 0; i < this.getSalidas().length; i++)
        {
            this.getSalidas()[i].setValor(this.activacion(acumuladorTemp));
            this.getSalidas()[i].setAcumulador(acumuladorTemp);
        }

        this.logMsj(" * Realizando clasificacion sobre " + this.getEntradas());
        this.logMsj("Resultado Acumulador : " + acumuladorTemp);
        this.logMsj("Resultado Funcion Activicacion: " + this.getSalidas()[0].getValor());
    };

    this.activacion = function(numero)
    {
        if (nombrefuncion == 'sigmoidal')
        {
            return this.sigmoidal(numero);
        }
        else
        {
            return this.signo(numero);
        }
    }

    this.sigmoidal = function(numero)
    {
        //Funcion Sigmoidal
        return 1/(1+(Math.exp(-numero)));
    }

    this.signo = function(numero)
    {
        //Función Signo
        if (numero >= 0)
        {
            return 1;
        }
        else
        {
            return -1;
        }
    }

    this.toString = function()
    {
        return "Nombre{" + this.getNombre() + "} Bias{" + this.getBias() + "}";
    }
}
