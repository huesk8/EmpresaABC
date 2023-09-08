namespace EmpresaABC.FronEnd.Bussines
{
    using System.Data.Entity.Validation;
    using Models.Response;
    using Models;
    using System;
    using System.Threading.Tasks;
    using System.Collections.Generic;
    using System.Linq;

    public class DbHelper
    {

        /// <summary>
        /// Metodo para guardar cambios en la base de datos
        /// </summary>
        /// <param name="db">Contexto que se utiliza en el aplicativo</param>
        /// <returns>Objeto DbResponse</returns>
        public static async Task<DbResponse> SaveChanges(DataContextLocal db)
        {
            using (var transaction = db.Database.BeginTransaction())
            {
                var lst = new List<ErrorEntry>();
                try
                {
                    await db.SaveChangesAsync();
                    transaction.Commit();
                    return new DbResponse
                    {
                        Succeeded = true,
                    };
                }
                catch (DbEntityValidationException ex)
                {
                    var res = new DbResponse();
                    foreach (var eve in ex.EntityValidationErrors)
                    {
                        res.Message =
                            $"La entidad de tipo {eve.Entry.Entity.GetType().Name} es el estado {eve.Entry.State} tiene los siguientes errores: ";
                        lst.AddRange(eve.ValidationErrors.Select(ve => new ErrorEntry
                        {
                            Property = ve.PropertyName,
                            ErrorMessage = ve.ErrorMessage
                        }));
                    }

                    return new DbResponse
                    {
                        ErrorEntries = lst,
                        Message = res.Message,
                        Succeeded = false,
                    };
                }
                catch (Exception ex)
                {
                    var response = new DbResponse { Succeeded = false, };
                    if (ex.InnerException?.InnerException != null &&
                        ex.InnerException.InnerException.Message.Contains("_Index"))
                    {
                        response.Message = "Ya existe un registro con este mismo nombre";
                    }
                    else if (ex.InnerException?.InnerException != null &&
                             ex.InnerException.InnerException.Message.Contains("REFERENCE"))
                    {
                        response.Message = "No puedes borrar este registro porque tiene datos relacionados";
                    }
                    else
                    {
                        response.Message = ex.Message;
                    }
                    transaction.Rollback();
                    return response;
                }
            }
        }
    }
}