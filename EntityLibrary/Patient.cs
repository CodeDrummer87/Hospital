using System;
using System.ComponentModel.DataAnnotations;

namespace EntityLibrary
{
    public class Patient
    {
        [Key]
        public int PatientId { get; set; }
        
        [Required]
        [StringLength(50, MinimumLength = 2)]
        public string FirstName { get; set; }

        [Required]
        [StringLength(50, MinimumLength = 2)]
        public string LastName { get; set; }

        [Required]
        [StringLength(50, MinimumLength = 2)]
        public string MiddleName { get; set; }

        [Required]
        [StringLength(10, MinimumLength = 3)]
        public string Sex { get; set; }

        [Required]
        public DateTime Birthday { get; set; }

        [Required]
        [StringLength(200, MinimumLength = 10)]
        public string AddressOfficial { get; set; }

        [Required]
        [StringLength(200, MinimumLength = 10)]
        public string AddressCurrent { get; set; }

        [Required]
        [StringLength(10, MinimumLength = 4)]
        public string Locality { get; set; }

        [Required]
        [StringLength(20, MinimumLength = 5)]
        public string PhoneBase { get; set; }
        public string PhoneAdd { get; set; }

        [Required]
        [StringLength(200, MinimumLength = 3)]
        public string Work { get; set; }

        [Required]
        [StringLength(15, MinimumLength = 10)]
        public string InsurancePolicy { get; set; }

        [Required]
        [StringLength(15, MinimumLength = 12)]
        public string RetirementInsurance { get; set; }
    }
}
