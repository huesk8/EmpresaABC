namespace EmpresaABC.FronEnd.Models.ViewModels
{
    using System.ComponentModel.DataAnnotations.Schema;
    using Model.Models;
    using System.Collections.Generic;

    [NotMapped]
    public class ProductViewModel: Product
    {
        public List<Product> Products { get; set; }
    }
}