using EntityLibrary;
using InternalAPI.DBContexts;
using InternalAPI.Modules.Interfaces;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
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

            if (data != null)
            {
                db.Patients.Add(patient);
                db.SaveChanges();

                return "Ok";
            }

            return "Error";
        }
    }
}
