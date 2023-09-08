namespace EmpresaABC.FronEnd.Models.ViewModels
{
    using System.ComponentModel.DataAnnotations.Schema;
    using Model.Models;
    using System.Collections.Generic;

    [NotMapped]
    public class UserViewModel : User
    {
        public string beforeUserName { get; set; }
        public int beforeProfileId { get; set; }
        public string beforeMail { get; set; }
        public List<User> Users { get; set; }
    }
}