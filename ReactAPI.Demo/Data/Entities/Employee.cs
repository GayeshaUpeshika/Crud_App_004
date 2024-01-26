namespace ReactAPI.Demo.Data.Entities;

public class Employee
{
    public int Id{get;set;}

    public string? EmployeeFirstName { get; set; }
    public string? EmployeeLastName { get; set; }
    public string? Department { get; set; }
    public string? EmailId { get; set; }
    public DateTime DOJ { get; set; }

    public DateTime DOB { get; set; }

    public int Age{ get; set; }

    public int Salary { get; set; }

    
    public string? ImageUrl{get;set;}

    
}