namespace EmpresaABC.FronEnd.Bussines
{
    using EmpresaABC.FronEnd.Models;
    using EmpresaABC.Model.Models;
    using Microsoft.AspNet.Identity;
    using Microsoft.AspNet.Identity.EntityFramework;
    using System;
    using System.Linq;
    using System.Web.Configuration;

    public class UserHelper : IDisposable
    {
        private static readonly ApplicationDbContext _userContext = new ApplicationDbContext();
        private static readonly DataContextLocal _db = new DataContextLocal();

        internal static void CheckRol(string RoleName)
        {
            var rolmanager = new RoleManager<IdentityRole>(new RoleStore<IdentityRole>(_userContext));

            if (!rolmanager.RoleExists(RoleName))
            {
                var result = rolmanager.Create(new IdentityRole(RoleName));
                if (result.Succeeded)
                {
                    addProfileDataBase(RoleName);
                }
            }
        }

        internal static void CheckSuperUser()
        {

            var username = WebConfigurationManager.AppSettings["UserName"];
            var uservalidate = _db.Users.Where(x => x.UserName.Equals(username)).FirstOrDefault();

            if (uservalidate == null)
            {
                var userManager = new ApplicationUserManager(new UserStore<ApplicationUser>(_userContext));
                userManager.UserValidator = new UserValidator<ApplicationUser>(userManager)
                {
                    AllowOnlyAlphanumericUserNames = false,
                    RequireUniqueEmail = true,
                };
                var email = WebConfigurationManager.AppSettings["AdminEmail"];
                var password = "AdminABC.";
                var user = username;
                var userAsp = userManager.FindByName(user);
                if (userAsp == null)
                {
                    CreateUserAsp(username, email, "Administrador", password);
                    AddDatabase(user, email, "Administrador");
                    return;
                }

                //userManager.AddToRole(userAsp.Id, "Administrador");
            }
        }


        private static void addProfileDataBase(string profileName)
        {
            var profile = _db.Profiles.FirstOrDefault(x => x.Description.Equals(profileName));
            if (profile != null)
                return;

            var addProfile = new Profile
            {
                Description = profileName
            };

            _db.Profiles.Add(addProfile);
            _db.SaveChanges();

        }


        /// <summary>
        /// Crea un usuario en la biblioteca de Identity
        /// </summary>
        /// <param name="user">Nombre de usuario</param>
        /// <param name="email">Email</param>
        /// <param name="roleName">Rol para asignar</param>
        /// <param name="password">Contraseña</param>
        /// <param name="manager">Adminsitrador de usuarios</param>
        public static void CreateUserAsp(string user, string email, string roleName, string password)
        {
            var userManager = new ApplicationUserManager(new UserStore<ApplicationUser>(_userContext));


            var userAsp = new ApplicationUser
            {

                Email = email,
                UserName = user,
            };

            userManager.UserValidator = new UserValidator<ApplicationUser>(userManager)
            {
                AllowOnlyAlphanumericUserNames = false,
                RequireUniqueEmail = true,
            };

            var result = userManager.Create(userAsp, password);

            if (result.Succeeded)
            {
                userManager.AddToRole(userAsp.Id, roleName);
            }
        }

        /// <summary> 
        /// Agregar el super usuario a la adminsitracion de usuarios local.
        /// </summary>
        /// <param name="user">Nombre de Usuario</param>
        /// <param name="email">Email</param>
        /// <param name="rol">Para Asignar</param>
        private static void AddDatabase(string user, string email, string rol)
        {
            var mail = WebConfigurationManager.AppSettings["AdminEmail"];
            var username = WebConfigurationManager.AppSettings["UserName"];



            var newuser = new User
            {
                Name = "Admin",
                FirtName = " principal",
                Mail = mail,
                ProfileId = GetRolId(rol),
                UserName = username,
                Gender = "M"
            };

            _db.Users.Add(newuser);

            _db.SaveChanges();
        }


        /// <summary>
        /// Obtiene el id de un rol en especifico
        /// </summary>
        /// <param name="roleName">Nombre del rol</param>
        /// <returns>Id del rol</returns>
        public static int GetRolId(string roleName)
        {
            var id = 0;
            var role = _db.Profiles.FirstOrDefault(x => x.Description == roleName);

            if (role == null)
            {
                id = AddRol(roleName);
            }

            return role?.ProfileId ?? id;
        }


        /// <summary>
        /// Agrega un rol a la base de datos
        /// </summary>
        /// <param name="roleName">Nombre del rol</param>
        /// <returns>Id del rol creado</returns>
        private static int AddRol(string roleName)
        {
            var rol = new Profile { Description = roleName };

            _db.Profiles.Add(rol);

            _db.SaveChanges();

            return rol.ProfileId;
        }

        /// <summary>
        /// Libera los recursos de Base de Datos.
        /// </summary>
        public void Dispose()
        {
            _userContext.Dispose();
            _db.Dispose();
        }
    }
}