import { useEffect, useState } from "react";
import Loading from "../Components/Loading";
import EmployeeTable from "../Components/EmployeeTable";

const fetchEmployees = (signal) => {
  return fetch("/api/employees", { signal }).then((res) => res.json());
};
const fetchColors = (signal) => {
  return fetch("/api/colors", { signal }).then((res) => res.json());
};
const deleteEmployee = (id) => {
  return fetch(`/api/employees/${id}`, { method: "DELETE" }).then((res) =>
    res.json()
  );
};

const updateEmployee = (employee) => {
  return fetch(`/api/employees/${employee._id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(employee),
  }).then((res) => res.json());
};

const EmployeeList = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  const handleDelete = (id) => {
    deleteEmployee(id).catch((err) => {
      console.log(err);
    });

    setData((employees) => {
      return employees.filter((employee) => employee._id !== id);
    });
  };

  const handleUpdate = (employee) => {
    updateEmployee(employee);

    setData((employees) => {
      return employees.map((outdatedEmployee) => {
        if (outdatedEmployee._id === employee._id) {
          return employee;
        } else {
          return outdatedEmployee;
        }
      });
    });
  };

  useEffect(() => {
    const controller = new AbortController();

    const fetchFunction = async () => {
      let employees = await fetchEmployees(controller.signal);
      const colors = await fetchColors(controller.signal);
      const colorIdToColorName = {};
      colors.forEach((color) => {colorIdToColorName[color._id] = color.name});

      employees = employees.map((employee) => ({...employee, color: colorIdToColorName[employee.color]}));
      setLoading(false);
      setData(employees);
    }

    fetchFunction();
    return () => controller.abort();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (

    <EmployeeTable
      employees={data}
      onDelete={handleDelete}
      onUpdate={handleUpdate}
    />
  );
};

export default EmployeeList;
