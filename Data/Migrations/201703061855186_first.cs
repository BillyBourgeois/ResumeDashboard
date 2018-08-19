namespace Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class first : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Addresses",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        AddressLine1 = c.String(),
                        AddressLine2 = c.String(),
                        City = c.String(nullable: false),
                        State = c.Int(nullable: false),
                        ZipCode = c.String(),
                        Preferred = c.Boolean(nullable: false),
                        User_Id = c.Int(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Users", t => t.User_Id)
                .Index(t => t.User_Id);
            
            CreateTable(
                "dbo.Companies",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(nullable: false),
                        Address_Id = c.Int(),
                        PhoneNumber_Id = c.Int(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Addresses", t => t.Address_Id)
                .ForeignKey("dbo.PhoneNumbers", t => t.PhoneNumber_Id)
                .Index(t => t.Address_Id)
                .Index(t => t.PhoneNumber_Id);
            
            CreateTable(
                "dbo.PhoneNumbers",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Type = c.Int(nullable: false),
                        Number = c.String(nullable: false, maxLength: 64),
                        Preferred = c.Boolean(nullable: false),
                        User_Id = c.Int(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Users", t => t.User_Id)
                .Index(t => t.User_Id);
            
            CreateTable(
                "dbo.Degrees",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        School_Id = c.Int(nullable: false),
                        StartDate = c.DateTime(nullable: false),
                        EndDate = c.DateTime(),
                        Level = c.Int(nullable: false),
                        User_Id = c.Int(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Schools", t => t.School_Id, cascadeDelete: true)
                .ForeignKey("dbo.Users", t => t.User_Id)
                .Index(t => t.School_Id)
                .Index(t => t.User_Id);
            
            CreateTable(
                "dbo.Schools",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(nullable: false),
                        Address_Id = c.Int(),
                        PhoneNumber_Id = c.Int(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Addresses", t => t.Address_Id)
                .ForeignKey("dbo.PhoneNumbers", t => t.PhoneNumber_Id)
                .Index(t => t.Address_Id)
                .Index(t => t.PhoneNumber_Id);
            
            CreateTable(
                "dbo.Hobbies",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(nullable: false),
                        Description = c.String(),
                        Years = c.Int(nullable: false),
                        Proficiency = c.Int(nullable: false),
                        User_Id = c.Int(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Users", t => t.User_Id)
                .Index(t => t.User_Id);
            
            CreateTable(
                "dbo.Jobs",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Company_Id = c.Int(nullable: false),
                        StartDate = c.DateTime(nullable: false),
                        EndDate = c.DateTime(),
                        Description = c.String(),
                        User_Id = c.Int(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Companies", t => t.Company_Id, cascadeDelete: true)
                .ForeignKey("dbo.Users", t => t.User_Id)
                .Index(t => t.Company_Id)
                .Index(t => t.User_Id);
            
            CreateTable(
                "dbo.Responsibilities",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(nullable: false),
                        Description = c.String(),
                        StartDate = c.DateTime(nullable: false),
                        EndDate = c.DateTime(),
                        Job_Id = c.Int(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Jobs", t => t.Job_Id)
                .Index(t => t.Job_Id);
            
            CreateTable(
                "dbo.Skills",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(nullable: false),
                        Description = c.String(),
                        Years = c.Int(nullable: false),
                        Proficiency = c.Int(nullable: false),
                        User_Id = c.Int(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Users", t => t.User_Id)
                .Index(t => t.User_Id);
            
            CreateTable(
                "dbo.Users",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        FirstName = c.String(nullable: false),
                        MiddleName = c.String(),
                        LastName = c.String(nullable: false),
                        NickName = c.String(),
                        EmailAddress = c.String(),
                        Objective = c.String(nullable: false),
                        WebSite = c.String(),
                    })
                .PrimaryKey(t => t.Id);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Skills", "User_Id", "dbo.Users");
            DropForeignKey("dbo.PhoneNumbers", "User_Id", "dbo.Users");
            DropForeignKey("dbo.Jobs", "User_Id", "dbo.Users");
            DropForeignKey("dbo.Hobbies", "User_Id", "dbo.Users");
            DropForeignKey("dbo.Degrees", "User_Id", "dbo.Users");
            DropForeignKey("dbo.Addresses", "User_Id", "dbo.Users");
            DropForeignKey("dbo.Responsibilities", "Job_Id", "dbo.Jobs");
            DropForeignKey("dbo.Jobs", "Company_Id", "dbo.Companies");
            DropForeignKey("dbo.Degrees", "School_Id", "dbo.Schools");
            DropForeignKey("dbo.Schools", "PhoneNumber_Id", "dbo.PhoneNumbers");
            DropForeignKey("dbo.Schools", "Address_Id", "dbo.Addresses");
            DropForeignKey("dbo.Companies", "PhoneNumber_Id", "dbo.PhoneNumbers");
            DropForeignKey("dbo.Companies", "Address_Id", "dbo.Addresses");
            DropIndex("dbo.Skills", new[] { "User_Id" });
            DropIndex("dbo.Responsibilities", new[] { "Job_Id" });
            DropIndex("dbo.Jobs", new[] { "User_Id" });
            DropIndex("dbo.Jobs", new[] { "Company_Id" });
            DropIndex("dbo.Hobbies", new[] { "User_Id" });
            DropIndex("dbo.Schools", new[] { "PhoneNumber_Id" });
            DropIndex("dbo.Schools", new[] { "Address_Id" });
            DropIndex("dbo.Degrees", new[] { "User_Id" });
            DropIndex("dbo.Degrees", new[] { "School_Id" });
            DropIndex("dbo.PhoneNumbers", new[] { "User_Id" });
            DropIndex("dbo.Companies", new[] { "PhoneNumber_Id" });
            DropIndex("dbo.Companies", new[] { "Address_Id" });
            DropIndex("dbo.Addresses", new[] { "User_Id" });
            DropTable("dbo.Users");
            DropTable("dbo.Skills");
            DropTable("dbo.Responsibilities");
            DropTable("dbo.Jobs");
            DropTable("dbo.Hobbies");
            DropTable("dbo.Schools");
            DropTable("dbo.Degrees");
            DropTable("dbo.PhoneNumbers");
            DropTable("dbo.Companies");
            DropTable("dbo.Addresses");
        }
    }
}
