$(function () {
    $.extend($.fn.dataTable.defaults, {
        autoWidth: false,
        responsive: true,
        "order": [[0, "desc"]],

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
            $('[data-popup=popover-custom]').popover({
                template: '<div class="popover border-warning-400"><div class="arrow"></div><h2 class="popover-title bg-oscuroRe"></h2><div class="popover-content"></div></div>'
            }),
                $(this).find('tbody tr').slice(-3).find('.dropdown, .btn-group').addClass('dropup');
        },
        preDrawCallback: function () {
            $(this).find('tbody tr').slice(-3).find('.dropdown, .btn-group').removeClass('dropup');
        }
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

function desactivar(id) {
    swal({
        title: '¿ Desea Desactivar El Perfil ?',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#096fc1',
        cancelButtonColor: '#000000',
        confirmButtonText: 'Si',
        cancelButtonText: 'Cancelar!',
        confirmButtonClass: 'btn btn-success',
        cancelButtonClass: 'btn btn-danger',
    }).then(function (result) {//(result) => {
        if (result.value) {
            window.location.href = "/User/DeactivateProfile/" + id;
        } else if (result.dismiss === 'cancel') {
            swal("Cancelado", "Se Cancelo la Desactivación", "error")
        }
    })
};

function activar(id) {
    swal({
        title: '¿ Desea Activar El Perfil ?',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#ffcc33',
        cancelButtonColor: '#000000',
        confirmButtonText: 'Si',
        cancelButtonText: 'Cancelar!',
        confirmButtonClass: 'btn btn-success',
        cancelButtonClass: 'btn btn-danger',
    }).then(function (result) {//(result) => {
        if (result.value) {
            window.location.href = "/User/ActiveProfile/" + id;
        } else if (result.dismiss === 'cancel') {
            swal("Cancelado", "Se Cancelo la Activación", "error")
        }
    })
};

function editar(id) {
    var title = "Editar Perfil"
    var options = { "backdrop": "static", keyboard: true };
    $.ajax({
        type: "GET",
        contentType: "application/json; charset=utf-8",
        url: "/User/EditProfile/" + id,
        datatype: "json",
        success: function (response) {
            debugger;
            $('#EditProfileContent').html(response);
            $('#EditProfile .modal-title').html(title);
            $('#EditProfile').modal(options);
            $('#EditProfile').modal('show');
        },
        error: function () {
            alert("Dynamic content load failed.");
        }
    })
};