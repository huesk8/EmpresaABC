namespace EmpresaABC.FronEnd.Models.ViewModels
{
    using System.ComponentModel.DataAnnotations.Schema;
    using Model.Models;
    using System.Collections.Generic;

    [NotMapped]
    public class StowageViewModel : Stowage
    {
        public List<Stowage> Stowages { get; set; }
    }
}