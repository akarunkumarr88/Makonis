using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Assignment_Makinos_Api.Models;
using Jil;
using Microsoft.AspNetCore.Http;
using System.IO;
using Microsoft.AspNetCore.Cors;

namespace Assignment_Makinos_Api.Controllers
{

    [ApiController]
    [Route("[controller]")]
    [EnableCors("mypolicy")]
    public class EmployeeController : Controller
    {
        private readonly ILogger<EmployeeController> _logger;
        private readonly IHostEnvironment _hostEnvironment;
        public EmployeeController(ILogger<EmployeeController> logger, IHostEnvironment hostEnvironment)
        {
            _logger = logger;
            _hostEnvironment = hostEnvironment;
        }

        [HttpGet]
        public IActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public ActionResult<Employee> CreateEmployee(Employee employee)
        {
            try
            {
                
                string jsondata = SerializeEmployee(employee);
                string path = _hostEnvironment.ContentRootPath;
                // Write that JSON to txt file,  
                var myUniqueFileName = $@"{DateTime.Now.Ticks}.json";
                System.IO.File.WriteAllText(path + "\\jsonfiles\\" + myUniqueFileName, jsondata);

                return StatusCode(StatusCodes.Status200OK,
                "Employee record has create");
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    "Error creating new employee record");
            }
        }

        private static string SerializeEmployee(Employee employee)
        {
            using (var output = new StringWriter())
            {
                JSON.Serialize(
                   employee,
                    output
                );
                return output.ToString();
            }
        }
    }
}
