namespace EmpresaABC.FronEnd.Models.Response
{
    public class ReportResponse
    {
        public bool Success { get; set; }

        public string Mensaje { get; set; }
        public string NameArchive { get; set; }

        public string ReportRoute { get; set; }

        public byte[] ReportByte { get; set; }
    }
}