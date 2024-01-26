using Microsoft.EntityFrameworkCore;
using ReactAPI.Demo.Data.Entities;

namespace ReactAPI.Demo.Data;

    public class ReactJSDemoYTContext : DbContext
    {
        public ReactJSDemoYTContext(DbContextOptions<ReactJSDemoYTContext> options) : base(options) { }
        
       

       public DbSet<Department> Department{get;set;}

       public DbSet<Employee> Employee{get;set;}
       

       
    }

