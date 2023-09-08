
namespace EmpresaABC.FronEnd.Models.Response
{
    using System.Collections.Generic;
    public class DbResponse
    {
        public bool Succeeded { get; set; }

        public string Message { get; set; }

        public List<ErrorEntry> ErrorEntries { get; set; }

    }
}