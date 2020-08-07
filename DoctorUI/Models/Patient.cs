using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace DoctorUI.Models
{
    public class Patient
    {
        [Key]
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string MiddleName { get; set; }
        public string Sex { get; set; }
        public DateTime Birthday { get; set; }
        public string AddressOfficial { get; set; }
        public string AddressCurrent { get; set; }
        public string State { get; set; }
        public string Phone { get; set; }
        public string Work { get; set; }
        public string InsurancePolicy { get; set; }
        public string RetirementInsurance { get; set; }       
    }
}
