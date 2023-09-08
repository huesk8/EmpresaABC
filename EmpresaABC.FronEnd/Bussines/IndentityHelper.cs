
namespace EmpresaABC.FronEnd.Bussines
{
    using Models;
    using System.Collections.Generic;
    using System.Data.Entity;
    using System.Linq;
    using System.Security.Principal;

    public static class IndentityHelper
    {

        public static string FullName(this IIdentity identity)
        {
            var _db = new DataContextLocal();
            var userName = _db.Users.FirstOrDefault(x => x.UserName == identity.Name);

            return userName == null ? "No Autenticado" : userName.FullName;
        }

        public static string Email(this IIdentity identity)
        {
            var _db = new DataContextLocal();
            var email = _db.Users.FirstOrDefault(x => x.UserName == identity.Name);

            return email == null ? "No Autenticado" : email.Mail;
        }

        public static string Position(this IIdentity identity)
        {
            var _db = new DataContextLocal();
            var position = _db.Users.Include(x => x.Profile)
                .FirstOrDefault(x => x.UserName == identity.Name);

            return position == null ? "No Autenticado" : position.Profile.Description;
        }


    }
}