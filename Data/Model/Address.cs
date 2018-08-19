using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;
using static Data.Enums;

namespace Data
{
    public class Address
    {
        [Key]
        public int Id { get; set; }

        public string AddressLine1 { get; set; }

        public string AddressLine2 { get; set; }

        [Required]
        public string City { get; set; }

        [Required]
        public State State { get; set; }

        public string ZipCode { get; set; }

        public bool Preferred { get; set; }
    }
}