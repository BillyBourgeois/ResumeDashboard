using System.Data.Entity;
using System.Data.Entity.Validation;
using System.Text;

namespace Data
{
    public class ResumeContext : DbContext
    {

        public ResumeContext()
            : base("name=ResumeContext")
        {
        }

        public virtual DbSet<User> Users { get; set; }
        public virtual DbSet<Address> Addresses { get; set; }
        public virtual DbSet<Company> Companies { get; set; }
        public virtual DbSet<Degree> Degrees { get; set; }
        public virtual DbSet<Job> Jobs { get; set; }
        public virtual DbSet<PhoneNumber> PhoneNumbers { get; set; }
        public virtual DbSet<Responsibility> Responsibilities { get; set; }
        public virtual DbSet<School> Schools { get; set; }
        public virtual DbSet<Skill> Skills { get; set; }
        public virtual DbSet<Hobby> Hobbies { get; set; }
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {

            //modelBuilder.Entity<Task>()
            //   .HasRequired(t => t.Project)
            //   .WithMany(p => p.Tasks)
            //   .HasForeignKey(t => t.Project_Id);
        }

        /*
        *force database back to clean 
        *Update-Database -TargetMigration $InitialDatabase -Force
        */

        /*
        *add initial migration 
        *add-migration first -Force
        */

        /*
        *update database
        *update-database
        */

        public override int SaveChanges()
        {
            try
            {
                return base.SaveChanges();
            }
            catch (DbEntityValidationException ex)
            {
                var sb = new StringBuilder();

                foreach (var failure in ex.EntityValidationErrors)
                {
                    sb.AppendFormat("{0} failed validation\n", failure.Entry.Entity.GetType());
                    foreach (var error in failure.ValidationErrors)
                    {
                        sb.AppendFormat("- {0} : {1}", error.PropertyName, error.ErrorMessage);
                        sb.AppendLine();
                    }
                }

                throw new DbEntityValidationException(
                    "Entity Validation Failed - errors follow:\n" +
                    sb.ToString(), ex
                    ); // Add the original exception as the innerException
            }
        }
    }
}