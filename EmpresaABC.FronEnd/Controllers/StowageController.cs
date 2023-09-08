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
    public class StowageController : BaseController
    {

        private readonly DataContextLocal _db = new DataContextLocal();
        private static readonly ApplicationDbContext _userContext = new ApplicationDbContext();
       

        // GET: Stowage
        public async Task<ActionResult> GetStowage()
        {
            var Stowages = await _db.Stowages.ToListAsync();

            var model = new StowageViewModel
            {
                Stowages = Stowages
            };

            return View(model);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> CreateStowage(StowageViewModel model)
        {
            var data = new Stowage();
         
            data.StowageNo = model.StowageNo;
            data.Description = model.Description;

            _db.Stowages.Add(data);
            var response = await DbHelper.SaveChanges(_db);
            if (!response.Succeeded)
            {
                Danger("Operacion Incorrecta", response.Message, true, response.ErrorEntries);
                return RedirectToAction("GetStowage", "Stowage");
            }

            succes("Operacion Correcta", " Se Creo la estiba Correctamente", true, null);//Succes
            return RedirectToAction("GetStowage", "Stowage");
        }


        public async Task<ActionResult> EditStowage(int id)
        {
            var model = new StowageViewModel();
            var data = await _db.Stowages.Where(x => x.StowageId == id).FirstOrDefaultAsync();

            model.StowageNo = data.StowageNo;
            model.Description = data.Description;
            model.StowageId = data.StowageId;

            return PartialView("_EditStowage", model);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> EditStowage(StowageViewModel model)
        {
            try
            {
                var data = await _db.Stowages.Where(x => x.StowageId == model.StowageId).FirstOrDefaultAsync();

                data.StowageNo = model.StowageNo;
                data.Description = model.Description;
                _db.Entry(data).State = EntityState.Modified;
                var response = await DbHelper.SaveChanges(_db);

                if (!response.Succeeded)
                    Danger("Operacion Incorrecta", response.Message, true, response.ErrorEntries);
                else
                    succes("Operacion Correcta", "Se actualizo la estiba", true, null);


                return RedirectToAction("GetStowage");

            }
            catch (Exception ex)
            {
                Danger("Error", ex.Message, true);

                return RedirectToAction("GetStowage");
            }

        }

        public async Task<ActionResult> DeactivateStowage(int id)
        {
            try
            {
                var data = await _db.Stowages.FirstOrDefaultAsync(x => x.StowageId == id);

                data.IsActive = false;
                _db.Entry(data).State = EntityState.Modified;

                var response = await DbHelper.SaveChanges(_db);

                if (!response.Succeeded)
                {
                    Danger("Operacion Incorrecta", response.Message, true, response.ErrorEntries);
                    return RedirectToAction("GetStowage");
                }

                succes("Operacion Correcta", " Se Desactivo la estiba Correctamente", true, null);//Succes

                return RedirectToAction("GetStowage");
            }
            catch (Exception ex)
            {
                Danger("Error", ex.Message, true);
                return RedirectToAction("GetStowage");
            }

        }

        public async Task<ActionResult> ActiveStowage(int id)
        {
            try
            {
                var data = await _db.Stowages.FirstOrDefaultAsync(x => x.StowageId == id);

                data.IsActive = true;
                _db.Entry(data).State = EntityState.Modified;

                var response = await DbHelper.SaveChanges(_db);

                if (!response.Succeeded)
                {
                    Danger("Operacion Incorrecta", response.Message, true, response.ErrorEntries);
                    return RedirectToAction("GetStowage");
                }

                succes("Operacion Correcta", " Se Activo la estiba Correctamente", true, null);//Succes

                return RedirectToAction("GetStowage");
            }
            catch (Exception ex)
            {
                Danger("Error", ex.Message, true);
                return RedirectToAction("GetStowage");
            }

        }
    }
}