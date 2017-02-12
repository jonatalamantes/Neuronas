var id;

for (var i=1; i<36; i++) {
    var id = "#";
    var res = id.concat(i);
    $(res).click(function() {
        $(this).toggleClass('noSeleccionado');
        $(this).toggleClass('seleccionado');
    });
}



