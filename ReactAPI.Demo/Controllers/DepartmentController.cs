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
    public class DepartmentController : Controller
    {
          string ConnectionInformation ="server=DESKTOP-K473IDT\\SQLEXPRESS;database=GayeshaHR;" +
               "Integrated Security=true;TrustServerCertificate=true;";

            public SqlConnection MainConnection;

            public DepartmentController()
            {
                MainConnection = new SqlConnection(ConnectionInformation);
                MainConnection.Open();
            }

           [HttpGet]

         public IActionResult GetAllDepartment()
        {

            DataTable dt = new DataTable();
            string MyCommand = "Select * from Department";
            SqlCommand myCommand = new SqlCommand(MyCommand, MainConnection);
            SqlDataAdapter da = new SqlDataAdapter(myCommand);
            da.Fill(dt);

            List<Department> entities = new List<Department>(dt.Rows.Count);
            if (dt.Rows.Count > 0)
            {
                foreach (DataRow record in dt.Rows)
                {
                    Department item = GetItem<Department>(record);
                    entities.Add(item);
                }

            }
            return Ok(entities);
        }


        private static Department GetItem<T>(DataRow dr)
        {
            Type temp = typeof(Department);
            Department obj = Activator.CreateInstance<Department>();

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
        public IActionResult GetADepartmentById(int id)
        {
            DataTable dt = new DataTable();
            string MyCommand = "Select * from Department where id=" + id;
            SqlCommand myCommand = new SqlCommand(MyCommand, MainConnection);
            SqlDataAdapter da = new SqlDataAdapter(myCommand);
            da.Fill(dt);

            List<Department> entities = new List<Department>(dt.Rows.Count);
            if (dt.Rows.Count > 0)
            {
                Department item = GetItem<Department>(dt.Rows[0]);
                entities.Add(item);
            }
            else return null;

            return Ok(entities);
        }



         [HttpPost]
        public IActionResult Add([FromBody]Department department)
        {
            string InsertCommand = "INSERT INTO Department(DepartmentName,Description,NoOFEmployees,ImageUrl) VALUES(@DepartmentName,@Description,@NoOFEmployees,@ImageUrl)";
            try
            {
                SqlCommand insertCommand = new SqlCommand(InsertCommand, MainConnection);
                insertCommand.Parameters.AddWithValue("@DepartmentName", department.DepartmentName);
                insertCommand.Parameters.AddWithValue("@Description", department.Description);
                insertCommand.Parameters.AddWithValue("@NoOFEmployees", department.NoOFEmployees);
                insertCommand.Parameters.AddWithValue("@ImageUrl", department.ImageUrl);

                var result = insertCommand.ExecuteNonQuery();
                if (result > 0)
                    return Ok(department);
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
        public IActionResult Update([FromBody]Department department)
        {
            string InsertCommand = "UPDATE Department SET DepartmentName = @DepartmentName,Description = @Description, NoOFEmployees = @NoOFEmployees, ImageUrl = @ImageUrl WHERE id=" + department.Id;
            try
            {
                SqlCommand insertCommand = new SqlCommand(InsertCommand,MainConnection);
                insertCommand.Parameters.AddWithValue("@DepartmentName", department.DepartmentName);
                insertCommand.Parameters.AddWithValue("@Description", department.Description);
                insertCommand.Parameters.AddWithValue("@NoOFEmployees", department.NoOFEmployees);
                insertCommand.Parameters.AddWithValue("@ImageUrl", department.ImageUrl);

                var result = insertCommand.ExecuteNonQuery();
                if (result > 0)
                    return Ok(department);
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
            string myCommandText = "Delete from Department where Id=" + id;
            
            
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