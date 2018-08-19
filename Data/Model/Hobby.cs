using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;
using static Data.Enums;

namespace Data
{
    public class Hobby
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }
        public string Description { get; set; }

        [Required]
        [Range(0, 75)]
        public int Years { get; set; }

        [Required]
        public Profiency Proficiency { get; set; }
    }
}