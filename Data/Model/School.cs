using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace Data
{
    public class School
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }

        [ForeignKey("Address")]
        public int? Address_Id { get; set; }
        public virtual Address Address { get; set; }

        [ForeignKey("PhoneNumber")]
        public int? PhoneNumber_Id { get; set; }
        public virtual PhoneNumber PhoneNumber { get; set; }
    }
}