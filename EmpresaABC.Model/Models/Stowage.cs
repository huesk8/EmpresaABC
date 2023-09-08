namespace EmpresaABC.Model.Models
{
    using Newtonsoft.Json;
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.Linq;
    using System.Text;
    using System.Threading.Tasks;
    public  class Stowage
    {

        public Stowage()
        {
            StowageKey = Guid.NewGuid();
            IsActive = true;
            DateCreate = DateTime.Now;
        }

        [Key]
        public int StowageId { get; set; }
        public Guid StowageKey { get; set; }
        public int StowageNo { get; set; }
        public string Description { get; set; }
        public bool IsActive { get; set; }
        public DateTime DateCreate { get; set; }

        public ICollection<Product> Products { get; set; }
    }
}

