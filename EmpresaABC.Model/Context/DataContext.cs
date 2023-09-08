namespace EmpresaABC.Model.Context
{
    using System.Data.Entity.ModelConfiguration;
    using EmpresaABC.Model.Models;
    using System.Data.Entity;
    using System.Data.Entity.ModelConfiguration.Conventions;

    public class DataContext : DbContext
    {
        //constructor 
        public DataContext() : base("DefaultConnection")
        {
            this.Configuration.ProxyCreationEnabled = false;
            this.Configuration.LazyLoadingEnabled = false;
        }

        #region Metodos
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            //deshabilitar la opcion de eliminacion en cascada
            modelBuilder.Conventions.Remove<OneToManyCascadeDeleteConvention>();

            //Mapear tablas 
            modelBuilder.Configurations.Add(new UserMap());
            modelBuilder.Configurations.Add(new ProductMap());
           


        }
        #endregion

        #region Propiedades
        public DbSet<User> Users { get; set; }
        public DbSet<Profile> Profiles { get; set; }
        public DbSet<Stowage> Stowages { get; set; }
        public DbSet<Product> Products { get; set; }


        #endregion

        internal class UserMap : EntityTypeConfiguration<User>
        {
            //costructor
            public UserMap()
            {
                HasRequired(x => x.Profile)
                    .WithMany(x => x.Users)
                    .HasForeignKey(x => x.ProfileId);
            }
        }

        internal class ProductMap : EntityTypeConfiguration<Product> 
        {
            public ProductMap()
            {
                HasRequired(x => x.Stowage)
                    .WithMany(x => x.Products)
                    .HasForeignKey(x => x.StowageId);
            }

        }

    }
}
