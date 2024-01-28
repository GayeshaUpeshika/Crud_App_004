using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using ReactAPI.Demo.Data.Entities;
using System.Data.SqlClient;
using System.Data;

namespace ReactAPI.Demo.Data;

    public class ReactJSDemoYTContext : DbContext
    {
        public ReactJSDemoYTContext(DbContextOptions<ReactJSDemoYTContext> options) : base(options) { }
        
       

       

       public DbSet<Employee> Employee{get;set;}

         public DbSet<Department> Department{get;set;}
       

       
    }



       
    

