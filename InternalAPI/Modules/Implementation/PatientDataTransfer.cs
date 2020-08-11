using EntityLibrary;
using InternalAPI.DBContexts;
using InternalAPI.Modules.Interfaces;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace InternalAPI.Modules.Implementation
{
    public class PatientDataTransfer : IPatientDataTransfer
    {
        HospitalContext db;

        public PatientDataTransfer(HospitalContext context)
        {
            db = context;
        }

        public string SaveNewPatient(object data)
        {
            Patient patient = JsonConvert.DeserializeObject<Patient>(data.ToString());

            if (TryValidate(patient))
            {
                db.Patients.Add(patient);
                db.SaveChanges();

                return "Ok";
            }

            return "Error";
        }

        private bool TryValidate(Patient patient)
        {
            var results = new List<ValidationResult>();
            var context = new ValidationContext(patient);

            return Validator.TryValidateObject(patient, context, results, true);
        }
    }
}
