namespace EmpresaABC.FronEnd.Models.Alerts
{
    using Response;
    using System.Collections.Generic;

    public class Alert
    {
        public const string TempDataKey = "TempDataAlerts";

        public string AlertStyle { get; set; }

        public string AlertTitle { get; set; }

        public string Message { get; set; }

        public bool Dismissable { get; set; }

        public List<ErrorEntry> ErrorEntries { get; set; }
    }
}