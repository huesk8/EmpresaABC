namespace EmpresaABC.Model.Models
{

    using Newtonsoft.Json;
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.Linq;
    using System.Text;
    using System.Threading.Tasks;
    public class Product
    {
        public Product()
        {
            ProductKey = Guid.NewGuid();
            IsActive = true;
            DateCreate = DateTime.Now;
        }


        [Key]
        public int ProductId { get; set; }
        public Guid ProductKey { get; set; }
        public bool IsActive { get; set; }
        public DateTime DateCreate { get; set; }
        public string Description { get; set; }
        public int Amount { get; set; }
        public double RetailPrice { get; set; }
        public double HigherPrice { get; set; }
        public int StowageId { get; set; }
        public virtual Stowage Stowage { get; set; }
    }
}
