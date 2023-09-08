namespace EmpresaABC.Model.Models
{
    using Newtonsoft.Json;
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.Linq;
    using System.Text;
    using System.Threading.Tasks;

    public class Profile
    {
        public Profile()
        {
            ProfileKey = Guid.NewGuid();
            IsActive = true;
        }
        
        [Key]
        public int ProfileId { get; set; }
        public Guid ProfileKey { get; set; }
        public string Description { get; set; }
        public bool IsActive { get; set; }
        public ICollection<User> Users { get; set; }

    }
}
