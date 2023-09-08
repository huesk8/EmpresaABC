$(function () {
    $.extend($.fn.dataTable.defaults, {
        autoWidth: false,
        responsive: true,
        dom: '<"datatable-header"fl><"datatable-scroll-wrap"t><"datatable-footer"ip>',
        language: {
            search: '<span>Buscar:</span> _INPUT_',
            searchPlaceholder: 'Ingresa un filtro...',
            lengthMenu: '<span>Mostrar:</span> _MENU_',
            info: 'Mostrando del _START_ al _END_ de _TOTAL_ registros',
            emptyTable: 'No hay informacion disponible en la tabla',
            zeroRecords: 'No se encontraron coincidencias',
            paginate: { 'first': 'First', 'last': 'Last', 'next': '&rarr;', 'previous': '&larr;' }
        },
        drawCallback: function () {
            $(this).find('tbody tr').slice(-3).find('.dropdown, .btn-group').addClass('dropup');
        },
        preDrawCallback: function () {
            $(this).find('tbody tr').slice(-3).find('.dropdown, .btn-group').removeClass('dropup');
        }
    });

    // Styled checkboxes, radios
    $(".styled").uniform({
        radioClass: 'choice'
    });

    // Basic responsive configuration
    $('.datatable-responsive').DataTable();


    // Enable Select2 select for the length option
    $('.dataTables_length select').select2({
        minimumResultsForSearch: Infinity,
        width: 'auto'
    });

    // Select2 selects
    $(".select").select2();


    // Simple select without search
    $(".select-simple").select2({
        minimumResultsForSearch: Infinity
    });

});