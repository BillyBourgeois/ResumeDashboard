namespace Data.Migrations
{
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;
    using System.Collections.Generic;

    internal sealed class Configuration : DbMigrationsConfiguration<Data.ResumeContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = false;
        }

        protected override void Seed(Data.ResumeContext context)
        {


            context.PhoneNumbers.AddOrUpdate(
                p => p.Id,
                //billy phone
                new PhoneNumber { Id = 1, Number = "406-868-5455", Preferred = true, Type = Enums.PhoneNumberType.Mobile },
                //Jane phone
                new PhoneNumber { Id = 2, Number = "555-555-5555", Preferred = true, Type = Enums.PhoneNumberType.Home },
                //Hank phone
                new PhoneNumber { Id = 3, Number = "666-666-6666", Preferred = true, Type = Enums.PhoneNumberType.Work },
                //LM Phone Number
                new PhoneNumber { Id = 4, Number = "800-367-5690", Preferred = true, Type = Enums.PhoneNumberType.Work },
                //Leidos Phone Number
                new PhoneNumber { Id = 5, Number = "855-953-4367", Preferred = true, Type = Enums.PhoneNumberType.Work },
                //MSU phone
                new PhoneNumber { Id = 6, Number = "406-994-0211", Preferred = true, Type = Enums.PhoneNumberType.Work },
                //GFHS phone
                new PhoneNumber { Id = 7, Number = "406-268-6250", Preferred = true, Type = Enums.PhoneNumberType.Work }
                );
            context.SaveChanges();


            context.Addresses.AddOrUpdate(
                p => p.Id,
                //billy address
                new Address { Id = 1, AddressLine1 = "2633 Quarterhorse Way", City = "Richland", State = Enums.State.Washington, ZipCode = "99352" },
                //LM address
                new Address { Id = 2, AddressLine1 = "6801 Rockledge Drive", City = "Bethesda", State = Enums.State.Maryland, ZipCode = "20817" },
                //Leidos address
                new Address { Id = 3, AddressLine1 = "11951 Freedom Dr", City = "Reston", State = Enums.State.Virginia, ZipCode = "20190" },
                //MSU address
                new Address { Id = 4, AddressLine1 = "211 Montana Hall", City = "Bozeman", State = Enums.State.Montana, ZipCode = "59717" },
                //GFHS address
                new Address { Id = 5, AddressLine1 = "1900 2nd Ave S", City = "Great Falls", State = Enums.State.Montana, ZipCode = "59405" }
                );
            context.SaveChanges();



            context.Companies.AddOrUpdate(
              c => c.Id,
              //LM
              new Company { Id = 1, Name = "Lockheed Martin", PhoneNumber_Id = 4, Address_Id = 2 },
              //Leidos
              new Company { Id = 2, Name = "Leidos", PhoneNumber_Id = 5, Address_Id = 3 }
              );
            context.SaveChanges();


            context.Schools.AddOrUpdate(
                s => s.Id,
                //MSU
                new School { Id = 1, Name = "Montana State University", Address_Id = 4, PhoneNumber_Id = 6 },
                //GFHS
                new School { Id = 2, Name = "Great Falls High School", Address_Id = 5, PhoneNumber_Id = 7 }
                );

            context.SaveChanges();

            context.Jobs.AddOrUpdate(
                j => j.Id,
                //billy LM Job
                new Job
                {
                    Id = 1,
                    Company_Id = 1,
                    StartDate = new DateTime(2014, 5, 1),
                    EndDate = new DateTime(2015, 5, 1),
                    Description = "Software Developer"
                },
                //billy Leidos Job
                new Job
                {
                    Id = 2,
                    Company_Id = 2,
                    StartDate = new DateTime(2015, 5, 1),
                    EndDate = null,
                    Description = "Software Developer"
                }
                );
            context.SaveChanges();

            context.Degrees.AddOrUpdate(
                d => d.Id,
                //billy MSU
                new Degree { Id = 1, School_Id = 1, StartDate = new DateTime(2005, 8, 1), EndDate = new DateTime(2009, 5, 1), Level = Enums.EducationLevel.Bachelors },
                //billy GFHS
                new Degree { Id = 2, School_Id = 2, StartDate = new DateTime(1996, 8, 1), EndDate = new DateTime(2000, 5, 1), Level = Enums.EducationLevel.Diploma }
                );
            context.SaveChanges();

            context.Skills.AddOrUpdate(
                s => s.Id,
                new Skill { Id = 1, Name = ".Net", Description = "Microsoft .Net Framework", Years = 7, Proficiency = Enums.Profiency.Expert },
                new Skill { Id = 2, Name = "Javascript", Description = "Client side scripting", Years = 7, Proficiency = Enums.Profiency.Expert },
                new Skill { Id = 3, Name = "angular", Description = "Client side Framework", Years = 2, Proficiency = Enums.Profiency.Expert },
                new Skill { Id = 4, Name = "Entity Framework", Description = "Data Modeling", Years = 7, Proficiency = Enums.Profiency.Expert },
                new Skill { Id = 5, Name = "SingalR", Description = "Real Time client side updates", Years = 7, Proficiency = Enums.Profiency.Expert },
                new Skill { Id = 6, Name = "Google Maps API", Description = "Google Maps API", Years = 1, Proficiency = Enums.Profiency.Beginner },
                new Skill { Id = 7, Name = "Web API", Description = "RESTful services", Years = 2, Proficiency = Enums.Profiency.Intermediate },
                new Skill { Id = 8, Name = "Odata", Description = "Advanced searching capabilities", Years = 2, Proficiency = Enums.Profiency.Intermediate },
                new Skill { Id = 9, Name = "WCF", Description = ".Net Services", Years = 5, Proficiency = Enums.Profiency.Intermediate },
                new Skill { Id = 10, Name = "d3", Description = "Client Side data display", Years = 2, Proficiency = Enums.Profiency.Intermediate },
                new Skill { Id = 11, Name = "fabric.js", Description = "Advanced canvas", Years = 2, Proficiency = Enums.Profiency.Intermediate },
                new Skill { Id = 12, Name = "Ajax", Description = "", Years = 6, Proficiency = Enums.Profiency.Expert }
                );
            context.SaveChanges();

            context.Hobbies.AddOrUpdate(
                h => h.Id,
                new Hobby { Id = 1, Name = "CrossFit", Description = "Exercise", Years = 1, Proficiency = Enums.Profiency.Intermediate },
                new Hobby { Id = 2, Name = "Wood Working", Description = "Wood Working", Years = 10, Proficiency = Enums.Profiency.Intermediate }
                );
            context.SaveChanges();

            context.Users.AddOrUpdate(
                  p => new { p.LastName, p.FirstName },

                  new User
                  {
                      Id = 1,
                      FirstName = "Billy",
                      MiddleName = "James",
                      LastName = "Bourgeois",
                      Objective = "To get a job.",
                      EmailAddress = "billy.j.bourgeois@gmail.com",
                      PhoneNumbers = new List<PhoneNumber>() { context.PhoneNumbers.Single(p => p.Id == 1) },
                      Addresses = new List<Address>() { context.Addresses.Single(p => p.Id == 1) },
                      Jobs = new List<Job>() { context.Jobs.Single(j => j.Id == 1), context.Jobs.Single(j => j.Id == 2) },
                      Degrees = new List<Degree>() { context.Degrees.Single(d => d.Id == 1), context.Degrees.Single(d => d.Id == 2) },
                      Skills = new List<Skill>() {
                          context.Skills.Single(s => s.Id == 1),
                          context.Skills.Single(s => s.Id == 2),
                          context.Skills.Single(s => s.Id == 3),
                          context.Skills.Single(s => s.Id == 4),
                          context.Skills.Single(s => s.Id == 5),
                          context.Skills.Single(s => s.Id == 6),
                          context.Skills.Single(s => s.Id == 7),
                          context.Skills.Single(s => s.Id == 8),
                          context.Skills.Single(s => s.Id == 9),
                          context.Skills.Single(s => s.Id == 10),
                          context.Skills.Single(s => s.Id == 11),
                          context.Skills.Single(s => s.Id == 12)
                      },
                      Hobbies = new List<Hobby>() {
                          context.Hobbies.Single(s => s.Id == 1),
                          context.Hobbies.Single(s => s.Id == 2),
                      }
                  },
                  new User
                  {
                      Id = 2,
                      FirstName = "Jane",
                      MiddleName = "Dean",
                      LastName = "Smith",
                      Objective = "To get a career.",
                      EmailAddress = "jane@example.com",
                      PhoneNumbers = new List<PhoneNumber>() { context.PhoneNumbers.FirstOrDefault(p => p.Id == 2) }
                  },
                  new User
                  {
                      Id = 3,
                      FirstName = "Hank",
                      MiddleName = "Ren",
                      LastName = "Turnboat",
                      Objective = "To get an internship.",
                      EmailAddress = "hank@example.com",
                      PhoneNumbers = new List<PhoneNumber>() { context.PhoneNumbers.FirstOrDefault(p => p.Id == 3) }
                  }
                );

        }
    }
}
