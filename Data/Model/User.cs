using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace Data
{
    public class User
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string FirstName { get; set; }

        public string MiddleName { get;  set;}

        [Required]
        public string LastName { get; set; }

        public string NickName { get; set; }

        [EmailAddress]
        public string EmailAddress { get; set; }

        [Required]
        public string Objective { get; set; }

        public string WebSite { get; set; }

        public virtual ICollection<PhoneNumber> PhoneNumbers { get; set; }

        public virtual ICollection<Address> Addresses { get; set; }

        public virtual ICollection<Job> Jobs { get; set; }

        public virtual ICollection<Degree> Degrees { get; set; }

        public virtual ICollection<Skill> Skills { get; set; }

        public virtual ICollection<Hobby> Hobbies { get; set; }
    }
}