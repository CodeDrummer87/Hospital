using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using InternalAPI.DBContexts;
using InternalAPI.Modules.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace InternalAPI.Controllers
{
    [Route("api/patient")]
    [ApiController]
    public class PatientController : ControllerBase
    {
        IPatientDataTransfer buffer;

        public PatientController(IPatientDataTransfer _buffer)
        {
            buffer = _buffer;
        }

        [Route("create")]
        [HttpPost]
        public string Post([FromBody]object data)
        {
            return buffer.SaveNewPatient(data);
        }

        [Route("loadPatientsList")]
        [HttpGet]
        public string Get()
        {
            return buffer.LoadPatientsList();
        }
    }
}