﻿using EntityLibrary;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace InternalAPI.Modules.Interfaces
{
    public interface IPatientDataTransfer
    {
        string SaveNewPatient(object data);
        string LoadPatientsList(int page);
        int GetPatientsCount();
        string GetPatientInfo(string id);
    }
}
