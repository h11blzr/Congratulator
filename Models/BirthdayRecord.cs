using System;
using System.ComponentModel.DataAnnotations;

namespace Congratulator.Models
{
    public class BirthdayRecord
    {
        public int Id { get; set; }
        
        [Required]
        public string Name { get; set; }

        [Required]
        public DateTime Date { get; set; }

        public string pictureUrl { get; set; }
    }
}
