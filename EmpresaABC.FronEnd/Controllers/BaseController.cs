namespace EmpresaABC.FronEnd.Controllers
{
    using Models.Response;
    using Models.Alerts;
    using System.Collections.Generic;
    using System.Web.Mvc;

    [Authorize]
    public class BaseController : Controller
    {
        public void succes(string message, string title, bool dismissable = false, List<ErrorEntry> errorEntries = null)
        {
            AddAlert(AlertStyle.Success, message, title, dismissable, errorEntries);
        }
        public void success(string message, string title = "Operación Correcta", bool dismissable = false, List<ErrorEntry> errorEntries = null)
        {
            AddAlert(AlertStyle.Success, message, title, dismissable, errorEntries);
        }

        public void Exito(string message, string title = "Operación Correcta", bool dismissable = false, List<ErrorEntry> errorEntries = null)
        {
            AddAlert(AlertStyle.Success, message, title, dismissable, errorEntries);
        }
        public void Information(string message, string title, bool dismissable = false, List<ErrorEntry> errorEntries = null)
        {
            AddAlert(AlertStyle.Information, message, title, dismissable, errorEntries);
        }

        public void Warning(string message, string title, bool dismissable = false, List<ErrorEntry> errorEntries = null)
        {
            AddAlert(AlertStyle.Warning, message, title, dismissable, errorEntries);
        }

        public void Danger(string message, string title, bool dismissable = false, List<ErrorEntry> errorEntries = null)
        {
            AddAlert(AlertStyle.Danger, message, title, dismissable, errorEntries);
        }

        private void AddAlert(string alertStyle, string message, string title, bool dismissable, List<ErrorEntry> errorEntries)
        {
            var alerts = TempData.ContainsKey(Alert.TempDataKey)
                ? (List<Alert>)TempData[Alert.TempDataKey]
                : new List<Alert>();

            alerts.Add(new Alert
            {
                AlertStyle = alertStyle,
                Message = message,
                AlertTitle = title,
                Dismissable = dismissable,
                ErrorEntries = errorEntries
            });

            TempData[Alert.TempDataKey] = alerts;

        }

    }
}
