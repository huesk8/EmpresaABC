namespace EmpresaABC.FronEnd.Models.ViewModels
{
    using System.ComponentModel.DataAnnotations.Schema;
    using Model.Models;
    using System.Collections.Generic;

    [NotMapped]
    public class ProfileViewModel : Profile
    {
        public string BeforeProfile { get; set; }
        public List<Profile> Profiles { get; set; }

    }
}