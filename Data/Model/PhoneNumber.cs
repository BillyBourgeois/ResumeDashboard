using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;
using static Data.Enums;

namespace Data
{
    public class PhoneNumber
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public PhoneNumberType Type { get; set; }

        [Required]
        [MaxLength(64)]
        public string Number { get; set; }

        public bool Preferred { get; set; }

    }
}