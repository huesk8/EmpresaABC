namespace EmpresaABC.Model.Models
{
    using Newtonsoft.Json;
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.Linq;
    using System.Text;
    using System.Threading.Tasks;

    public class User
    {

        public User()
        {
            UserKey = Guid.NewGuid();
            IsActive = true;
            DateCreate = DateTime.Now;
        }


        [Key]
        public int UserId { get; set; }
        public Guid UserKey { get; set; }
        public string Name { get; set; }
        public string FirtName { get; set; }
        public string LastName { get; set; }
        public string FullName => $"{Name} {FirtName} {LastName}";
        public string Gender { get; set; }
        public string Mail { get; set; }
        public int ProfileId { get; set; }
        public string UserName { get; set; }
        public DateTime DateCreate { get; set; }
        public string CellPhone { get; set; }
        public bool IsActive { get; set; }
        public virtual Profile Profile { get; set; }
    

    }
}
