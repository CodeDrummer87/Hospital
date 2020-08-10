using System;
using System.ComponentModel.DataAnnotations;

namespace EntityLibrary
{
    public class Patient
    {
        [Key]
        public int PatientId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string MiddleName { get; set; }
        public string Sex { get; set; }
        public DateTime Birthday { get; set; }
        public string AddressOfficial { get; set; }
        public string AddressCurrent { get; set; }
        public string State { get; set; }
        public string PhoneBase { get; set; }
        public string PhoneAdd { get; set; }
        public string Work { get; set; }
        public string InsurancePolicy { get; set; }
        public string RetirementInsurance { get; set; }
    }
}
