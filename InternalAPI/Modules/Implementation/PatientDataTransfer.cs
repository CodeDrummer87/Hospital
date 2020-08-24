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

        public string LoadPatientsList(int page)
        {
            int patientsCount = db.Patients.Count();

            IQueryable patientsList;
            
            if (patientsCount >= 16)
            {
                patientsList = db.Patients.
                Select(p => new { p.PatientId, p.LastName, p.FirstName, p.MiddleName, p.Birthday }).
                OrderBy(p => p.LastName).
                Skip(page * 15).Take(15);
            }
            else
            {
                patientsList = db.Patients.
                    Select(p => new { p.PatientId, p.LastName, p.FirstName, p.MiddleName, p.Birthday }).
                    OrderBy(p => p.LastName);
            }

            return (patientsList == null) ? "Список пуст" : JsonConvert.SerializeObject(patientsList);
        }

        public int GetPatientsCount()
        {
            return db.Patients.Count();
        }

        public string GetPatientInfo(string strId)
        {
            int id = (strId != null) ? Convert.ToInt32(strId) : 0;

            if (id != 0)
            {
                IQueryable patient = db.Patients.
                    Where(p => p.PatientId == id).
                    Select(p => new
                    {
                        p.PatientId,
                        p.LastName,
                        p.FirstName,
                        p.MiddleName,
                        p.Birthday,
                        p.PhoneBase,
                        p.AddressCurrent
                    });

                return JsonConvert.SerializeObject(patient);
            }

            return null;
        }
    }
}