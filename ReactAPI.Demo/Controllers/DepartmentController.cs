using ReactAPI.Demo.Data.Entities;
using Microsoft.AspNetCore.Mvc;
using ReactAPI.Demo.Data;
using Microsoft.EntityFrameworkCore;

namespace ReactAPI.Controllers;


    [ApiController]
    [Route("[controller]")]
    public class DepartmentController : ControllerBase
    {
         
        
            private readonly ReactJSDemoYTContext _departmentContext;

            public DepartmentController(ReactJSDemoYTContext departmentContext)
            {
                _departmentContext = departmentContext;
            }

            [HttpGet]
            
            public async Task<IActionResult> Get()
            {
                var Departments = await _departmentContext.Department.ToListAsync();
                return Ok(Departments);
            }


            [HttpPost]

            public async Task<IActionResult> Post(Department newDepartment)
            {
                _departmentContext.Department.Add(newDepartment);
                await _departmentContext.SaveChangesAsync();
                return Ok(newDepartment);
            }

            [HttpGet]
            [Route("{id:int}")]

            public async Task<IActionResult> Get(int id){

                var departmentById = await _departmentContext.Department.FindAsync(id);
                return Ok(departmentById);
            }


            [HttpPut]
            public async Task<IActionResult> Put(Department departmentToUpdate)
            {
                _departmentContext.Department.Update(departmentToUpdate);
                await _departmentContext.SaveChangesAsync();
                return Ok(departmentToUpdate);
            }

           [HttpDelete]
           [Route("{id:int}")]

           public async Task<IActionResult> Delete(int id)
           {
              var departmentToDelete = await _departmentContext.Department.FindAsync(id);
              if( departmentToDelete == null)
              {
                  return NotFound();
              }

              _departmentContext.Department.Remove(departmentToDelete);
              await _departmentContext.SaveChangesAsync();
              return Ok();
           }



            

           

          

          

           

            
    };

