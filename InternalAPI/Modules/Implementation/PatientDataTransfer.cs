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

        public string LoadPatientsList()
        {
            int patientsCount = db.Patients.Count();
            IQueryable patientsList;

            if (patientsCount < 15)
            {
                patientsList = db.Patients.Select(p => new { p.LastName, p.FirstName, p.MiddleName, p.Birthday });
            }
            else
            {
                patientsList = db.Patients.
                    Select(p => new { p.LastName, p.FirstName, p.MiddleName, p.Birthday }).
                    Take(25);
            }
            
            return (patientsList == null) ? "Список пуст" : JsonConvert.SerializeObject(patientsList);
        }
    }
}