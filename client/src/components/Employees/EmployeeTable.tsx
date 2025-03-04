import React from "react";
import { Employee } from "../../types/employee.type";

interface EmployeeTableProps {
  employees: Employee[];
}

const EmployeeTable: React.FC<EmployeeTableProps> = ({ employees }) => {
  return (
    <div className="overflow-x-auto">
      <table className="table-fixed min-w-full bg-white shadow-lg rounded-lg">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">ID</th>
            <th className="py-2 px-4 border-b">Name</th>
            <th className="py-2 px-4 border-b">Role</th>
            <th className="py-2 px-4 border-b">Salary</th>
            <th className="py-2 px-4 border-b">Level</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id}>
              <td className="py-2 px-4 border-b text-center">{employee.id}</td>
              <td className="py-2 px-4 border-b  text-center">
                {employee.name}
              </td>
              <td className="py-2 px-4 border-b  text-center">
                {employee.role}
              </td>
              <td className="py-2 px-4 border-b text-center">
                {employee.salary}
              </td>
              <td className="py-2 px-4 border-b text-center">
                {employee.salary >= 50000 ? "Senior" : "Entry Level"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeTable;
