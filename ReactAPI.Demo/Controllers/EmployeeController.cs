using ReactAPI.Demo.Data.Entities;
using Microsoft.AspNetCore.Mvc;
using ReactAPI.Demo.Data;
using Microsoft.EntityFrameworkCore;

namespace ReactAPI.Controllers;


    [ApiController]
    [Route("[controller]")]
    public class EmployeeController : ControllerBase
    {
         
        
            private readonly ReactJSDemoYTContext _employeeContext;

            public EmployeeController(ReactJSDemoYTContext employeeContext)
            {
                _employeeContext = employeeContext;
            }



            [HttpGet]
            
            public async Task<IActionResult> Get()
            {
                var Employees = await _employeeContext.Employee.ToListAsync();
                return Ok(Employees);
            }

            [HttpPost]

            public async Task<IActionResult> Post(Employee newEmployee)
            {
                _employeeContext.Employee.Add(newEmployee);
                await _employeeContext.SaveChangesAsync();
                return Ok(newEmployee);
            }

            [HttpGet]
            [Route("{id:int}")]

            public async Task<IActionResult> Get(int id){

                var employeeById = await _employeeContext.Employee.FindAsync(id);
                return Ok(employeeById);
            }


            [HttpPut]
            public async Task<IActionResult> Put(Employee employeeToUpdate)
            {
                _employeeContext.Employee.Update(employeeToUpdate);
                await _employeeContext.SaveChangesAsync();
                return Ok(employeeToUpdate);
            }

           [HttpDelete]
           [Route("{id:int}")]

           public async Task<IActionResult> Delete(int id)
           {
              var employeeToDelete = await _employeeContext.Employee.FindAsync(id);
              if( employeeToDelete == null)
              {
                  return NotFound();
              }

              _employeeContext.Employee.Remove(employeeToDelete);
              await _employeeContext.SaveChangesAsync();
              return Ok();
           }

           

            
    }

