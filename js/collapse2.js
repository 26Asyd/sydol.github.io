// Pour la deuxième section
$(document).ready(function() {
    $('#accordionExample2 .collapse').on('show.bs.collapse', function() {
        $('#accordionExample2 .collapse.show').not(this).collapse('hide');
    });
});
