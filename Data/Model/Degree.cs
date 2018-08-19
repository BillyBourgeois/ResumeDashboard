using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;
using static Data.Enums;

namespace Data
{
    public class Degree
    {
        [Key]
        public int Id { get; set; }

        [ForeignKey("School")]
        public int School_Id { get; set; }

        public virtual School School { get; set; }

        [Required]
        public DateTime StartDate { get; set; }

        public DateTime? EndDate { get; set; }

        [Required]
        public EducationLevel Level { get; set; }
    }
}