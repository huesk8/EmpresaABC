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
    public class ProductController : BaseController
    {
        private readonly DataContextLocal _db = new DataContextLocal();
        private static readonly ApplicationDbContext _userContext = new ApplicationDbContext();
        private static ApplicationUserManager _userManager;

        public async Task<ActionResult> GetProduct()
        {

            var Products = await _db.Products.Include(x => x.Stowage).ToListAsync();
            LoadSelectList();

            var model = new ProductViewModel
            {
                Products = Products
            };

            return View(model);
        }


        public ActionResult CreateProduct()
        {
            var model = new ProductViewModel();
            LoadSelectList();

            return View(model);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> CreateProduct(ProductViewModel model)
        {

            var data = new Product();

            data.Description = model.Description;
            data.Amount = model.Amount;
            data.RetailPrice = model.RetailPrice;
            data.HigherPrice = model.HigherPrice;
            data.StowageId = model.StowageId;


            _db.Products.Add(data);
            var response = await DbHelper.SaveChanges(_db);
            if (!response.Succeeded)
            {
                Danger("Operacion Incorrecta", response.Message, true, response.ErrorEntries);
                return RedirectToAction("GetProduct", "Product");
            }

            succes("Operacion Correcta", " Se Creo el producto Correctamente", true, null);//Succes
            return RedirectToAction("GetProduct", "Product");
        }

        public async Task<ActionResult> EditProduct(int id)
        {

            var model = new ProductViewModel();


            var data = await _db.Products.Where(x => x.ProductId == id).FirstOrDefaultAsync();
             var ltsStowage = _db.Stowages.Where(x => x.IsActive).ToList();

            model.ProductId = data.ProductId;
            model.Description = data.Description;
            model.Amount = data.Amount;
            model.RetailPrice = data.RetailPrice;
            model.HigherPrice = data.HigherPrice;

            ViewBag.StowageId = new SelectList(ltsStowage, "StowageId", "StowageNo", data.StowageId);

            return PartialView("_EditProduct", model);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> EditProduct(ProductViewModel model)
        {
            try
            {

                var data = await _db.Products.Where(x => x.ProductId == model.ProductId).FirstOrDefaultAsync();

                model.Description = data.Description;
                model.Amount = data.Amount;
                model.RetailPrice = data.RetailPrice;
                model.HigherPrice = data.HigherPrice;
                model.StowageId = data.StowageId;


                _db.Entry(data).State = EntityState.Modified;
                var response = await DbHelper.SaveChanges(_db);

                if (!response.Succeeded)
                    Danger("Operacion Incorrecta", response.Message, true, response.ErrorEntries);

                succes("Operacion Correcta", "Se actualizo el producto", true, null);
                return RedirectToAction("GetProduct");

            }
            catch (Exception ex)
            {
                Danger("Error", ex.Message, true);

                return RedirectToAction("GetProduct");
            }

        }

        public async Task<ActionResult> DeactivateProduct(int id)
        {
            try
            {
                var data = await _db.Products.FirstOrDefaultAsync(x => x.ProductId == id);

                data.IsActive = false;
                _db.Entry(data).State = EntityState.Modified;

                var response = await DbHelper.SaveChanges(_db);

                if (!response.Succeeded)
                {
                    Danger("Operacion Incorrecta", response.Message, true, response.ErrorEntries);
                    return RedirectToAction("GetProduct");
                }

                succes("Operacion Correcta", " Se Desactivo el producto Correctamente", true, null);//Succes

                return RedirectToAction("GetProduct");
            }
            catch (Exception ex)
            {
                Danger("Error", ex.Message, true);
                return RedirectToAction("GetProduct");
            }

        }

        public async Task<ActionResult> ActiveProduct(int id)
        {
            try
            {
                var data = await _db.Products.FirstOrDefaultAsync(x => x.ProductId == id);

                data.IsActive = true;
                _db.Entry(data).State = EntityState.Modified;

                var response = await DbHelper.SaveChanges(_db);

                if (!response.Succeeded)
                {
                    Danger("Operacion Incorrecta", response.Message, true, response.ErrorEntries);
                    return RedirectToAction("GetProduct");
                }

                succes("Operacion Correcta", " Se Activo el producto Correctamente", true, null);//Succes

                return RedirectToAction("GetProduct");
            }
            catch (Exception ex)
            {
                Danger("Error", ex.Message, true);
                return RedirectToAction("GetProduct");
            }

        }




        private void LoadSelectList()
        {
            var ltsStowage = _db.Stowages.Where(x => x.IsActive).ToList();

            ViewBag.StowageId= new SelectList(ltsStowage, "StowageId", "StowageNo", "Seleccione");

        }

    }
}