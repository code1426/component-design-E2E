import EmployeeFilter from "./components/Employees/EmployeeFilter";

const Main = () => {
  return (
    <div className="bg-gray-200 w-screen h-screen">
      <div className=" bg-blue-500 text-4xl font-bold p-8 ">
        Employee Management System
      </div>
      <div className="flex flex-col w-full items-center justify-center">
        <EmployeeFilter />
      </div>
    </div>
  );
};

export default Main;
