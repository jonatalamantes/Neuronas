//Jonathan Elias Sandoval Talamanets
//proceso.js
//Clase: Administración Inteligente de Datos
//Proyecto 1

//Funciones para graficar
function coordenada400xToCoordenada4x(posicionPunto)
{
    x = (posicionPunto[0]/tamCuadroIndividual)-(cantidadCuadros/2);
    y = (((cantidadCuadros/2)*tamCuadroIndividual) - posicionPunto[1])/tamCuadroIndividual;

    puntoX = [x,y];

    return puntoX;
}

function coordenada4xToCoordenada400x(posicionPunto)
{
    x = ((posicionPunto[0]+(cantidadCuadros/2))*tamCuadroIndividual);
    y = ((cantidadCuadros/2)*tamCuadroIndividual) - (posicionPunto[1]*(tamCuadroIndividual));

    puntoX = [x,y];

    return puntoX;
}

//Declaracion de los grupos
var entradasGrupo1 = [[0.5,1.4],
                      [0.7,1.8],
                      [0.8,1.6]];

var entradasGrupo2 = [[1.5,0.8],
                      [2.0,1.0]];

var entradasGrupo3 = [[0.3,0.5],
                      [0.0,0.2],
                      [-0.3,0.8]];

var entradasGrupo4 = [[-0.5,-1.5],
                      [-1.5,-2.2]];

//Declaracion de las salidas y entradas de los perceptrones
var salida1 = [1,1,1, -1,-1];    //Grupo1 con Grupo2
var salida2 = [1,1,1, -1,-1,-1]; //Grupo1 con Grupo3
var salida3 = [1,1,1, -1,-1];    //Grupo1 con Grupo4
var salida4 = [1,1,   -1,-1,-1]; //Grupo2 con Grupo3
var salida5 = [1,1,   -1,-1];    //Grupo2 con Grupo4
var salida6 = [1,1,1, -1,-1];    //Grupo3 con Grupo4

var entradas1 = entradasGrupo1.slice().concat(entradasGrupo2);
var entradas2 = entradasGrupo1.slice().concat(entradasGrupo3);
var entradas3 = entradasGrupo1.slice().concat(entradasGrupo4);
var entradas4 = entradasGrupo2.slice().concat(entradasGrupo3);
var entradas5 = entradasGrupo2.slice().concat(entradasGrupo4);
var entradas6 = entradasGrupo3.slice().concat(entradasGrupo4);

//Creacion de los perceptrones
perceptron1 = new Perceptron("P1", 'signo', 1);
conexion    = new Conexion("", 1, perceptron1, null);
conexion    = new Conexion("", 1, null, perceptron1);
conexion    = new Conexion("", 1, null, perceptron1);

perceptron2 = new Perceptron("P2", 'signo', 1);
conexion    = new Conexion("", 1, perceptron2, null);
conexion    = new Conexion("", 1, null, perceptron2);
conexion    = new Conexion("", 1, null, perceptron2);

perceptron3 = new Perceptron("P3", 'signo', 1);
conexion    = new Conexion("", 1, perceptron3, null);
conexion    = new Conexion("", 1, null, perceptron3);
conexion    = new Conexion("", 1, null, perceptron3);

perceptron4 = new Perceptron("P4", 'signo', 1);
conexion    = new Conexion("", 1, perceptron4, null);
conexion    = new Conexion("", 1, null, perceptron4);
conexion    = new Conexion("", 1, null, perceptron4);

perceptron5 = new Perceptron("P5", 'signo', 1);
conexion    = new Conexion("", 1, perceptron5, null);
conexion    = new Conexion("", 1, null, perceptron5);
conexion    = new Conexion("", 1, null, perceptron5);

perceptron6 = new Perceptron("P6", 'signo', 1);
conexion    = new Conexion("", 1, perceptron6, null);
conexion    = new Conexion("", 1, null, perceptron6);
conexion    = new Conexion("", 1, null, perceptron6);

//Entrenamos a todos los perceptrones (comentar el 'for' para ver otros resultados)
for (a = 0; a < 100; a++)
{
    perceptron1.entrenar(entradas1, salida1);
    perceptron2.entrenar(entradas2, salida2);
    perceptron3.entrenar(entradas3, salida3);
    perceptron4.entrenar(entradas4, salida4);
    perceptron5.entrenar(entradas5, salida5);
    perceptron6.entrenar(entradas6, salida6);
}

//Creacion del plano cartesiano
tamCuadroIndividual = 60;
cantidadCuadros     = 8;

var svgContainer = d3.select("body").append("svg")
                                    .attr("width", tamCuadroIndividual*cantidadCuadros)
                                    .attr("height", tamCuadroIndividual*cantidadCuadros)
                                    .style("border", "1px solid black");

for (i = 0; i < cantidadCuadros; i++)
{
    var lineaEjeX = svgContainer.append("line");
    lineaEjeX.attr("x1", 0);
    lineaEjeX.attr("y1", i*tamCuadroIndividual);
    lineaEjeX.attr("x2", tamCuadroIndividual*cantidadCuadros);
    lineaEjeX.attr("y2", i*tamCuadroIndividual);
    lineaEjeX.style("stroke", "#CFCFCF");
    lineaEjeX.style("stroke-width", "3");

    var lineaEjeY = svgContainer.append("line");
    lineaEjeY.attr("x1", i*tamCuadroIndividual);
    lineaEjeY.attr("y1", 0);
    lineaEjeY.attr("x2", i*tamCuadroIndividual);
    lineaEjeY.attr("y2", tamCuadroIndividual*cantidadCuadros);
    lineaEjeY.style("stroke", "#CFCFCF");
    lineaEjeY.style("stroke-width", "3");
}

var lineaEjeX = svgContainer.append("line");
lineaEjeX.attr("x1", 0);
lineaEjeX.attr("y1", tamCuadroIndividual*cantidadCuadros/2);
lineaEjeX.attr("x2", tamCuadroIndividual*cantidadCuadros);
lineaEjeX.attr("y2", tamCuadroIndividual*cantidadCuadros/2);
lineaEjeX.style("stroke", "#000");
lineaEjeX.style("stroke-width", "3");
                         
var lineaEjeY = svgContainer.append("line");
lineaEjeY.attr("x1", tamCuadroIndividual*cantidadCuadros/2);
lineaEjeY.attr("y1", 0);
lineaEjeY.attr("x2", tamCuadroIndividual*cantidadCuadros/2);
lineaEjeY.attr("y2", tamCuadroIndividual*cantidadCuadros);
lineaEjeY.style("stroke", "#000");
lineaEjeY.style("stroke-width", "3");

//Creacion de puntos de los grupos
colores = ["red", "blue", "green", "orange", "violet", "brown"];

for (k = 1; k <= 4; k++)
{
    codigo =  "for (j = 0; j < entradasGrupo" + k + ".length; j++)";
    codigo += "{";
    codigo += "punto =  coordenada4xToCoordenada400x(entradasGrupo" + k +"[j]);";
    codigo += 'var circulo = svgContainer.append("circle");';
    codigo += 'circulo.attr("cx", punto[0]);';
    codigo += 'circulo.attr("cy", punto[1]);';
    codigo += 'circulo.attr("r", 5);';
    codigo += 'circulo.style("fill", "' + colores[k-1] + '");';
    codigo += '}';

    eval(codigo);
}
                         
//Graficamos a cada uno de los hiperplanos de separacion de los seis perceptrones
for (i = 1; i <= 6; i++)
{
    //Incluye solo al grupo1
    /*if (i != 1 && i != 2 && i != 3)
    {
        continue;
    }*/

    //Incluye solo al grupo2
    /*if (i != 1 && i != 4 && i != 5)
    {
        continue;
    }*/

    //Incluye solo al grupo3
    /*if (i != 2 && i != 4 && i != 6)
    {
        continue;
    }*/

    //Incluye solo al grupo4
    /*if (i != 3 && i != 5 && i != 6)
    {
        continue;
    }*/

    codigo = "m = perceptron"+i+".getEntradas()[1].getPeso()/perceptron"+i+".getEntradas()[0].getPeso(); ";
    codigo += "p1"+i+" = [-cantidadCuadros/2, ((-cantidadCuadros/2-perceptron"+i+".getBias())*m)];"
    codigo += "p1"+i+" = coordenada4xToCoordenada400x(p1"+i+");"
    codigo += "p2"+i+" = [cantidadCuadros/2, ((cantidadCuadros/2-perceptron"+i+".getBias())*m)];"
    codigo += "p2"+i+" = coordenada4xToCoordenada400x(p2"+i+");"

    codigo += 'var hiperplano'+i+' = svgContainer.append("line");';
    codigo += 'hiperplano'+i+'.attr("x1", p1'+i+'[0]);';
    codigo += 'hiperplano'+i+'.attr("y1", p1'+i+'[1]);';
    codigo += 'hiperplano'+i+'.attr("x2", p2'+i+'[0]);';
    codigo += 'hiperplano'+i+'.attr("y2", p2'+i+'[1]);';
    codigo += 'hiperplano'+i+'.style("stroke", "' + colores[i-1] + '");';
    codigo += 'hiperplano'+i+'.style("stroke-width", "2");';

    eval(codigo);
}

//Tratamos de clasificar unas nuevas instancias
entradasN = [[0.8,1.9],   //Se espera salida grupo 1
             [2.1, 1.1],  //Se espera salida grupo 2
             [-0.4,0.9],  //Se espera salida grupo 3
             [-1.6,-2.2]] //Se espera salida grupo 4

for (j = 0; j < entradasN.length; j++)
{
    grupo = [0,0,0,0];

    clase1 = perceptron1.clasificarEntrada(entradasN[j]);
    clase2 = perceptron2.clasificarEntrada(entradasN[j]);
    clase3 = perceptron3.clasificarEntrada(entradasN[j]);
    clase4 = perceptron4.clasificarEntrada(entradasN[j]);
    clase5 = perceptron5.clasificarEntrada(entradasN[j]);
    clase6 = perceptron6.clasificarEntrada(entradasN[j]);

    if (clase1 == 1)
    {
        grupo[0]++;
    }
    else
    {
        grupo[1]++;
    }

    if (clase2 == 1)
    {
        grupo[0]++;
    }
    else
    {
        grupo[2]++;
    }

    if (clase3 == 1)
    {
        grupo[0]++;
    }
    else
    {
        grupo[3]++;
    }

    if (clase4 == 1)
    {
        grupo[1]++;
    }
    else
    {
        grupo[2]++;
    }

    if (clase5 == 1)
    {
        grupo[1]++;
    }
    else
    {
        grupo[3]++;
    }

    if (clase6 == 1)
    {
        grupo[2]++;
    }
    else
    {
        grupo[3]++;
    }

    mayorNum   = 0;
    mayorLabel = 0; 

    for (k = 0; k < grupo.length; k++)
    {
        if (grupo[k] > mayorNum)
        {
            mayorNum = grupo[k];
            mayorLabel = k;
        }
    }

    var punto = coordenada4xToCoordenada400x(entradasN[j]);
    var cuadro = svgContainer.append("rect");
    cuadro.attr("x", punto[0]);
    cuadro.attr("y", punto[1]);
    cuadro.attr("width",  10);
    cuadro.attr("height", 10);
    cuadro.style("fill", colores[mayorLabel]);
    cuadro.style("stroke", "black");
    cuadro.style("stroke-width", "2");

    console.log("Entrada: " + entradasN[j] + " Clase: " + (mayorLabel+1));
}