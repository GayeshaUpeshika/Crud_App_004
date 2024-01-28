using ReactAPI.Demo.Data.Entities;
using ReactAPI.Demo.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Microsoft.Data.SqlClient;
using System.Data;
using System.Reflection;



namespace ReactAPI.Controllers
{

    [ApiController]
    [Route("[controller]")]
    public class EmployeeController : Controller
    {
          string ConnectionInformation ="server=DESKTOP-K473IDT\\SQLEXPRESS;database=GayeshaHR;" +
               "Integrated Security=true;TrustServerCertificate=true;";

            public SqlConnection MainConnection;

            public EmployeeController()
            {
                MainConnection = new SqlConnection(ConnectionInformation);
                MainConnection.Open();
            }

           [HttpGet]

         public IActionResult GetAllEmployee()
        {

            DataTable dt = new DataTable();
            string MyCommand = "Select * from Employee";
            SqlCommand myCommand = new SqlCommand(MyCommand, MainConnection);
            SqlDataAdapter da = new SqlDataAdapter(myCommand);
            da.Fill(dt);

            List<Employee> entities = new List<Employee>(dt.Rows.Count);
            if (dt.Rows.Count > 0)
            {
                foreach (DataRow record in dt.Rows)
                {
                    Employee item = GetItem<Employee>(record);
                    entities.Add(item);
                }

            }
            return Ok(entities);
        }


        private static Employee GetItem<T>(DataRow dr)
        {
            Type temp = typeof(Employee);
            Employee obj = Activator.CreateInstance<Employee>();

            foreach (DataColumn column in dr.Table.Columns)
            {
                foreach (PropertyInfo pro in temp.GetProperties())
                {
                    if (pro.Name == column.ColumnName)
                        pro.SetValue(obj, dr[column.ColumnName], null);
                    else
                        continue;
                }
            }
            return obj;
        }
           
        
        
        
    
        [HttpGet]
         [Route("{id}")]
        public IActionResult GetAEmployeeById(int id)
        {
            DataTable dt = new DataTable();
            string MyCommand = "Select * from Employee where id=" + id;
            SqlCommand myCommand = new SqlCommand(MyCommand, MainConnection);
            SqlDataAdapter da = new SqlDataAdapter(myCommand);
            da.Fill(dt);

            List<Employee> entities = new List<Employee>(dt.Rows.Count);
            if (dt.Rows.Count > 0)
            {
                Employee item = GetItem<Employee>(dt.Rows[0]);
                entities.Add(item);
            }
            else return null;

            return Ok(entities);
        }



         [HttpPost]
        public IActionResult Add([FromBody]Employee employee)
        {
            string InsertCommand = "INSERT INTO Employee(EmployeeFirstName, EmployeeLastName,Department,EmailId,DOJ,DOB,Age,Salary,ImageUrl) VALUES(@EmployeeFirstName, @EmployeeLastName,@Department,@EmailId,@DOJ,@DOB,@Age,@Salary,@ImageUrl)";
            try
            {
                SqlCommand insertCommand = new SqlCommand(InsertCommand, MainConnection);
                insertCommand.Parameters.AddWithValue("@EmployeeFirstName", employee.EmployeeFirstName);
                insertCommand.Parameters.AddWithValue("@EmployeeLastName", employee.EmployeeLastName);
                insertCommand.Parameters.AddWithValue("@Department", employee.Department);
                insertCommand.Parameters.AddWithValue("@EmailId", employee.EmailId);
                insertCommand.Parameters.AddWithValue("@DOJ", employee.DOJ);
                insertCommand.Parameters.AddWithValue("@DOB", employee.DOB);
                insertCommand.Parameters.AddWithValue("@Age", employee.Age);
                insertCommand.Parameters.AddWithValue("@Salary", employee.Salary);
                insertCommand.Parameters.AddWithValue("@ImageUrl", employee.ImageUrl);

                var result = insertCommand.ExecuteNonQuery();
                if (result > 0)
                    return Ok(employee);
                else
                    return BadRequest();
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
                return BadRequest();
            }
        }


        [HttpPut]
        public IActionResult Update([FromBody]Employee employee)
        {
            string InsertCommand = "UPDATE Employee SET EmployeeFirstName = @EmployeeFirstName,EmployeeLastName = @EmployeeLastName,Department = @Department,EmailId = @EmailId,DOJ = @DOJ,DOB = @DOB,Age = @Age, Salary = @Salary,ImageUrl = @ImageUrl WHERE id=" + employee.Id;
            try
            {
                SqlCommand insertCommand = new SqlCommand(InsertCommand,MainConnection);
                insertCommand.Parameters.AddWithValue("@EmployeeFirstName", employee.EmployeeFirstName);
                insertCommand.Parameters.AddWithValue("@EmployeeLastName", employee.EmployeeLastName);
                insertCommand.Parameters.AddWithValue("@Department", employee.Department);
                insertCommand.Parameters.AddWithValue("@EmailId", employee.EmailId);
                insertCommand.Parameters.AddWithValue("@DOJ", employee.DOJ);
                insertCommand.Parameters.AddWithValue("@DOB", employee.DOB);
                insertCommand.Parameters.AddWithValue("@Age", employee.Age);
                insertCommand.Parameters.AddWithValue("@Salary", employee.Salary);
                insertCommand.Parameters.AddWithValue("@ImageUrl", employee.ImageUrl);

                var result = insertCommand.ExecuteNonQuery();
                if (result > 0)
                    return Ok(employee);
                else
                    return BadRequest();
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
                return BadRequest();
            }
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            string myCommandText = "Delete from Employee where Id=" + id;
            
            
            using (SqlCommand myCommand = new SqlCommand(myCommandText, MainConnection))
            {
                myCommand.Parameters.AddWithValue("@Id", id);
                
                try
                {
                    var result = myCommand.ExecuteNonQuery();
                    if (result != 0)
                        return Ok();
                    else
                        return BadRequest("Record Not Deleted");
                }
                catch (Exception e)
                {
                    Console.WriteLine(e.Message);
                    return BadRequest("Record Not Deleted");
                }
            }
        }


        
           

            
    }

}