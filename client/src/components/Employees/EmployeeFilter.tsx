import { useState, useEffect } from "react";
import { Employee } from "@/types/employee.type";
import EmployeeTable from "./EmployeeTable";

const EmployeeFilter = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [filter, setFilter] = useState<string>("All Employees");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/employees", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        const data = await response.json();
        setEmployees(data);
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };
    fetchData();
  }, []);

  const handleFilterChange = (newFilter: string) => {
    setFilter(newFilter);
  };

  const filteredEmployees = employees.filter((employee) => {
    if (filter === "All Employees") return true;
    if (employee.salary < 50000 && filter === "Entry Level") return true;
    if (employee.salary >= 50000 && filter === "Senior") return true;
    return false;
  });
  return (
    <div className="p-8  flex-wrap justify-center gap-6 w-full">
      <div className="flex flex-col gap-10">
        <div className="gap-4">
          <div className="flex jus space-x-4">
            <div className="text-2xl">Filter by:</div>
            <button
              className="bg-blue-600"
              onClick={() => handleFilterChange("All Employees")}
            >
              All
            </button>
            <button
              className="bg-blue-600"
              onClick={() => handleFilterChange("Entry Level")}
            >
              Entry Level
            </button>
            <button
              className="bg-blue-600"
              onClick={() => handleFilterChange("Senior")}
            >
              Senior
            </button>
          </div>
        </div>
        <div className="border-2">
          <div className="text-2xl text-center font-semibold p-4 bg-cyan-600">
            {filter}
          </div>
          <EmployeeTable employees={filteredEmployees} />
        </div>
      </div>
    </div>
  );
};

export default EmployeeFilter;
