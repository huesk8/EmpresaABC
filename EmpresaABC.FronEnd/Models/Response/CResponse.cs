namespace EmpresaABC.FronEnd.Models.Response
{
    using System;
    public class CResponse
    {
        public bool Success { get; set; }
        public String Message { get; set; }
        public bool NotifyUser { get; set; }
    }
}