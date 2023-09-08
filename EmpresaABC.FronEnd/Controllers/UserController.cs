using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;
using System.Web.Mvc;
using EmpresaABC.Model.Models;
using EmpresaABC.FronEnd.Bussines;
using EmpresaABC.FronEnd.Models;
using EmpresaABC.FronEnd.Models.ViewModels;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;

namespace EmpresaABC.FronEnd.Controllers
{
    [Authorize]
    public class UserController : BaseController
    {
        private readonly DataContextLocal _db = new DataContextLocal();
        private static readonly ApplicationDbContext _userContext = new ApplicationDbContext();
        private static ApplicationUserManager _userManager;


        public async Task<ActionResult> GetUsers()
        {

            var Users = await _db.Users.Include(x => x.Profile).OrderBy(x => x.FirtName).ToListAsync();
            LoadSelectList();

            var model = new UserViewModel
            {
                Users = Users
            };

            return View(model);
        }

        public ActionResult CreateUser()
        {
            var model = new UserViewModel();
            LoadSelectList();

            return View(model);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> CreateUser(UserViewModel model)
        {

            var result = CreateUserAsp(model);
            if (!result)
            {
                Danger("Operacion Incorrecta", "Ocurrio un error al crear el usuario", true);
                return RedirectToAction("GetUsers");
            }

            var data = new User();

            data.Name = model.Name;
            data.FirtName = model.FirtName;
            data.LastName = model.LastName;
            data.Gender = model.Gender;
            data.Mail = model.Mail;
            data.ProfileId = model.ProfileId;
            data.UserName = model.UserName;
            data.CellPhone = model.CellPhone;


            _db.Users.Add(data);
            var response = await DbHelper.SaveChanges(_db);
            if (!response.Succeeded)
            {
                Danger("Operacion Incorrecta", response.Message, true, response.ErrorEntries);
                return RedirectToAction("GetUsers", "User");
            }

            succes("Operacion Correcta", " Se Creo el usuario Correctamente", true, null);//Succes
            return RedirectToAction("GetUsers", "User");
        }

        private bool CreateUserAsp(UserViewModel model)
        {

            _userManager = new ApplicationUserManager(new UserStore<ApplicationUser>(_userContext));
            var userAsp = new ApplicationUser
            {
                Email = model.Mail,
                UserName = model.UserName,
            };

            _userManager.UserValidator = new UserValidator<ApplicationUser>(_userManager)
            {
                AllowOnlyAlphanumericUserNames = false,
                RequireUniqueEmail = true,
            };


            string password = model.Name.ToUpper().Substring(0, 1) + model.Name.ToLower().Substring(1, 1) + model.FirtName.ToLower().Substring(0, 4) + "." + DateTime.Now.Year.ToString().Substring(2);


            var result = _userManager.Create(userAsp, password);

            if (result.Succeeded)
            {
                var roleName = _db.Profiles.FirstOrDefault(x => x.ProfileId == model.ProfileId);

                _userManager.AddToRole(userAsp.Id, roleName.Description);
            }

            return result.Succeeded;
        }

        private bool UpdateUserAsp(UserViewModel model)
        {
            try
            {


                if (model.beforeUserName.Equals(model.UserName) && model.beforeMail.Equals(model.Mail) && model.beforeProfileId == model.ProfileId)
                    return true;

                _userManager = new ApplicationUserManager(new UserStore<ApplicationUser>(_userContext));
                var UserM = _userManager.FindByName(model.beforeUserName);

                if (UserM != null)
                {

                    var userAsoid = UserM.Id;


                    if (!UserM.UserName.Equals(model.UserName))
                    {
                        UserM.UserName = model.UserName;
                    }

                    if (!UserM.Email.Equals(model.Mail))
                    {
                        UserM.Email = model.Mail;
                    }

                    _userManager.Update(UserM);

                    if (model.beforeProfileId != model.ProfileId)
                    {
                        var RolName = _userManager.GetRoles(userAsoid);
                        if (RolName.Count != 0)
                        {
                            foreach (var _RolName in RolName)
                            {
                                _userManager.RemoveFromRole(userAsoid, _RolName);

                            }
                        }

                        var roleName = _db.Profiles.Where(x => x.ProfileId == model.ProfileId).Select(x => x.Description).FirstOrDefault();
                        _userManager.AddToRole(userAsoid, roleName);

                    }
                }

                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }

        public async Task<ActionResult> EditUser(int id)
        {

            var model = new UserViewModel();


            var data = await _db.Users.Where(x => x.UserId == id).FirstOrDefaultAsync();
            var ltsGender = Gender();
            var ltsProfiles = _db.Profiles.Where(x => x.IsActive).ToList();

            model.UserId = data.UserId;
            model.Name = data.Name;
            model.FirtName = data.FirtName;
            model.LastName = data.LastName;
            model.Mail = data.Mail;
            model.UserName = data.UserName;
            model.CellPhone = data.CellPhone;
            model.beforeUserName = data.UserName;
            model.beforeMail = data.Mail;
            model.beforeProfileId = data.ProfileId;


            ViewBag.Gender = new SelectList(ltsGender, "Value", "Text", data.Gender);
            ViewBag.ProfileId = new SelectList(ltsProfiles, "ProfileId", "Description", data.ProfileId);

            return PartialView("_EditUser", model);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> EditUser(UserViewModel model)
        {
            try
            {

                var result = UpdateUserAsp(model);
                if (!result)
                {
                    Danger("Operacion Incorrecta", "Ocurrio un error al actualizar al usuario", true);
                    return RedirectToAction("GetUsers");
                }

                var data = await _db.Users.Where(x => x.UserId == model.UserId).FirstOrDefaultAsync();

                data.Name = model.Name;
                data.FirtName = model.FirtName;
                data.LastName = model.LastName;
                data.Gender = model.Gender;
                data.Mail = model.Mail;
                data.ProfileId = model.ProfileId;
                data.UserName = model.UserName;
                data.CellPhone = model.CellPhone;

                _db.Entry(data).State = EntityState.Modified;
                var response = await DbHelper.SaveChanges(_db);

                if (!response.Succeeded)
                    Danger("Operacion Incorrecta", response.Message, true, response.ErrorEntries);

                succes("Operacion Correcta", "Se actualizo el Usuario", true, null);
                return RedirectToAction("GetUsers");

            }
            catch (Exception ex)
            {
                Danger("Error", ex.Message, true);

                return RedirectToAction("GetUsers");
            }

        }

        public async Task<ActionResult> DeactivateUser(int id)
        {
            try
            {
                var data = await _db.Users.FirstOrDefaultAsync(x => x.UserId == id);

                data.IsActive = false;
                _db.Entry(data).State = EntityState.Modified;

                var response = await DbHelper.SaveChanges(_db);

                if (!response.Succeeded)
                {
                    Danger("Operacion Incorrecta", response.Message, true, response.ErrorEntries);
                    return RedirectToAction("GetUsers");
                }

                succes("Operacion Correcta", " Se Desactivo el usuario Correctamente", true, null);//Succes

                return RedirectToAction("GetUsers");
            }
            catch (Exception ex)
            {
                Danger("Error", ex.Message, true);
                return RedirectToAction("GetUsers");
            }

        }

        public async Task<ActionResult> ActiveUser(int id)
        {
            try
            {
                var data = await _db.Users.FirstOrDefaultAsync(x => x.UserId == id);

                data.IsActive = true;
                _db.Entry(data).State = EntityState.Modified;

                var response = await DbHelper.SaveChanges(_db);

                if (!response.Succeeded)
                {
                    Danger("Operacion Incorrecta", response.Message, true, response.ErrorEntries);
                    return RedirectToAction("GetUsers");
                }

                succes("Operacion Correcta", " Se Activo el usuario Correctamente", true, null);//Succes

                return RedirectToAction("GetUsers");
            }
            catch (Exception ex)
            {
                Danger("Error", ex.Message, true);
                return RedirectToAction("GetUsers");
            }

        }




        public async Task<ActionResult> GetProfiles()
        {
            var profiles = await _db.Profiles.ToListAsync();

            var model = new ProfileViewModel
            {
                Profiles = profiles
            };

            return View(model);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> CreateProfile(ProfileViewModel model)
        {
            var data = new Profile();

            var result = CreateProfileAsp(model.Description);
            if (!result)
            {
                Danger("Operacion Incorrecta", "Ocurrio un error al crear el perfil o ya existe el perfil", true);
                return RedirectToAction("GetProfiles");
            }


            data.Description = model.Description;

            _db.Profiles.Add(data);
            var response = await DbHelper.SaveChanges(_db);
            if (!response.Succeeded)
            {
                Danger("Operacion Incorrecta", response.Message, true, response.ErrorEntries);
                return RedirectToAction("GetProfiles", "User");
            }

            succes("Operacion Correcta", " Se Creo el perfil Correctamente", true, null);//Succes
            return RedirectToAction("GetProfiles", "User");
        }

        public async Task<ActionResult> EditProfile(int id)
        {
            var model = new ProfileViewModel();
            var data = await _db.Profiles.Where(x => x.ProfileId == id).FirstOrDefaultAsync();

            model.ProfileId = data.ProfileId;
            model.Description = data.Description;
            model.BeforeProfile = data.Description;

            return PartialView("_EditProfile", model);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> EditProfile(ProfileViewModel model)
        {
            try
            {
                var beforeprofile = model.BeforeProfile;

                var result = UpdateProfileAsp(beforeprofile, model.Description);
                if (!result)
                {
                    Danger("Operacion Incorrecta", "Ocurrio un error al actualizar el perfil", true);
                    return RedirectToAction("GetProfiles");
                }

                var data = await _db.Profiles.Where(x => x.ProfileId == model.ProfileId).FirstOrDefaultAsync();
                data.Description = model.Description;
                _db.Entry(data).State = EntityState.Modified;
                var response = await DbHelper.SaveChanges(_db);

                if (!response.Succeeded)
                    Danger("Operacion Incorrecta", response.Message, true, response.ErrorEntries);
                else
                    succes("Operacion Correcta", "Se actualizo el Perfil", true, null);


                return RedirectToAction("GetProfiles");

            }
            catch (Exception ex)
            {
                Danger("Error", ex.Message, true);

                return RedirectToAction("GetProfiles");
            }

        }

        private bool CreateProfileAsp(string newprofile)
        {

            var roleManager = new RoleManager<IdentityRole>(new RoleStore<IdentityRole>(_userContext));

            if (!roleManager.RoleExists(newprofile))
            {
                var result = roleManager.Create(new IdentityRole(newprofile));

                return result.Succeeded;
            }

            return false;
        }

        private bool UpdateProfileAsp(string beforeprofile, string newprofile)
        {
            var roleManager = new RoleManager<IdentityRole>(new RoleStore<IdentityRole>(_userContext));
            var roledit = roleManager.FindByName(beforeprofile);
            roledit.Name = newprofile;

            var result = roleManager.Update(roledit);

            return result.Succeeded;
        }

        public async Task<ActionResult> DeactivateProfile(int id)
        {
            try
            {
                var data = await _db.Profiles.FirstOrDefaultAsync(x => x.ProfileId == id);

                data.IsActive = false;
                _db.Entry(data).State = EntityState.Modified;

                var response = await DbHelper.SaveChanges(_db);

                if (!response.Succeeded)
                {
                    Danger("Operacion Incorrecta", response.Message, true, response.ErrorEntries);
                    return RedirectToAction("GetProfiles");
                }

                succes("Operacion Correcta", " Se Desactivo el perfil Correctamente", true, null);//Succes

                return RedirectToAction("GetProfiles");
            }
            catch (Exception ex)
            {
                Danger("Error", ex.Message, true);
                return RedirectToAction("GetProfiles");
            }

        }

        public async Task<ActionResult> ActiveProfile(int id)
        {
            try
            {
                var data = await _db.Profiles.FirstOrDefaultAsync(x => x.ProfileId == id);

                data.IsActive = true;
                _db.Entry(data).State = EntityState.Modified;

                var response = await DbHelper.SaveChanges(_db);

                if (!response.Succeeded)
                {
                    Danger("Operacion Incorrecta", response.Message, true, response.ErrorEntries);
                    return RedirectToAction("GetProfiles");
                }

                succes("Operacion Correcta", " Se Activo el perfil Correctamente", true, null);//Succes

                return RedirectToAction("GetProfiles");
            }
            catch (Exception ex)
            {
                Danger("Error", ex.Message, true);
                return RedirectToAction("GetProfiles");
            }

        }


        public static List<SelectListItem> Gender()
        {
            var lts = new List<SelectListItem>();

            lts.Add(new SelectListItem { Text = "Masculino", Value = "M" });
            lts.Add(new SelectListItem { Text = "Femenino", Value = "F" });

            return lts;
        }

        private void LoadSelectList()
        {
            var ltsGender = Gender();
            var ltsProfiles = _db.Profiles.Where(x => x.IsActive).ToList();

            ViewBag.Gender = new SelectList(ltsGender, "Value", "Text", "Seleccione");
            ViewBag.ProfileId = new SelectList(ltsProfiles, "ProfileId", "Description", "Seleccione");

        }
    }
}