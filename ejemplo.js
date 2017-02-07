//Creamos a la red

x1 = new Perceptron("x1");
x2 = new Perceptron("x2");

h1 = new Perceptron("h1", .35);
h2 = new Perceptron("h2", .35);

o1 = new Perceptron("o1", .60);
o2 = new Perceptron("o2", .60);

conexion0 = new Conexion("wx1", 1, null, x1);
conexion1 = new Conexion("wx2", 1, null, x2);

conexion2 = new Conexion("w1", .15, x1, h1);
conexion3 = new Conexion("w2", .25, x1, h2);
conexion4 = new Conexion("w3", .20, x2, h1);
conexion5 = new Conexion("w4", .30, x2, h2);

conexion6 = new Conexion("w5", .40, h1, o1);
conexion7 = new Conexion("w6", .50, h1, o2);
conexion8 = new Conexion("w7", .45, h2, o1);
conexion9 = new Conexion("w8", .55, h2, o2);

conexion10  = new Conexion("wo1", 1, o1, null)
conexion11 = new Conexion("wo2", 1, o2, null);

capa1 = [x1, x2];
capa2 = [h1, h2];
capa3 = [o1, o2];

red = new RedNeuronal();
red.getCapas().push(capa1);
red.getCapas().push(capa2);
red.getCapas().push(capa3);

entradas = [0.05, 0.10];
salidas  = [0.01, 0.99];

red.clasificar(entradas);

for (i = 0; i < capa3.length; i++)
{
	console.log(capa3[i].getSalidas()[0].getValor());
}