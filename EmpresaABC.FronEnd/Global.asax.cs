using EmpresaABC.FronEnd.Bussines;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;

namespace EmpresaABC.FronEnd
{
    public class MvcApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            Database.SetInitializer(new MigrateDatabaseToLatestVersion<Models.DataContextLocal, Migrations.Configuration>());
            checkRoles();
            CheckUser();

            AreaRegistration.RegisterAllAreas();
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            BundleConfig.RegisterBundles(BundleTable.Bundles);
        }


        private void checkRoles()
        {
            UserHelper.CheckRol("Administrador");


        }

        private void CheckUser()
        {
            UserHelper.CheckSuperUser();
        }


    }
}