import { Link, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import "./EmployeeTable.css";
import { Checkbox } from "@mui/material";

const EmployeeTable = ({ employees, onDelete, onUpdate }) => {
  const { sortByProp, sortByOrder } = useParams();
  const [searchByLevel, setSearchByLevel] = useState("");
  const [searchByPosition, setSearchByPosition] = useState("");
  const navigate = useNavigate();

  const onChangeLevelHandler = (e) => {
    setSearchByLevel(e.target.value);
  };

  const onChangePositionHandler = (e) => {
    setSearchByPosition(e.target.value);
  };

  const getFirstname = (fullname) => {
    return fullname.split(" ")[0];
  };

  const getMiddlename = (fullname) => {
    if (fullname.split(" ").length > 2) {
      return fullname.split(" ")[1];
    }
    return "";
  };

  const getLastname = (fullname) => {
    if (getMiddlename(fullname) === "") {
      return fullname.split(" ")[1];
    }
    return fullname.split(" ")[2];
  };

  const employeesToDisplay = [...employees]
    .map((employee) => ({
      ...employee,
      firstname: getFirstname(employee.name),
      middlename: getMiddlename(employee.name),
      lastname: getLastname(employee.name),
    }))
    .filter((employee) =>
      employee.level.toLowerCase().startsWith(searchByLevel.toLowerCase())
    )
    .filter((employee) =>
      employee.position.toLowerCase().startsWith(searchByPosition.toLowerCase())
    );

  if (sortByProp !== undefined) {
    employeesToDisplay.sort((a, b) => {
      if (a[sortByProp] > b[sortByProp]) {
        return sortByOrder === "asc" ? 1 : -1;
      } else if (a[sortByProp] < b[sortByProp]) {
        return sortByOrder === "asc" ? -1 : 1;
      }
      return 0;
    });
  }

  console.log(employeesToDisplay)

  return (
    <div className="EmployeeTable">
      <div className="sort">
        <h4>Arrange by</h4>
        <button onClick={() => navigate("/employees/firstname/asc")}>
          First name
        </button>
        <button onClick={() => navigate("/employees/middlename/asc")}>
          Middle name
        </button>
        <button onClick={() => navigate("/employees/lastname/asc")}>
          Last name
        </button>
        <button onClick={() => navigate("/employees/level/asc")}>Level</button>
        <button onClick={() => navigate("/employees/position/asc")}>
          Position
        </button>
      </div>
      <ul className="filter">
        <li className="searchbox">
          <input
            onChange={onChangeLevelHandler}
            value={searchByLevel}
            autoFocus
            type="search"
            placeholder="Search by level"
          ></input>
        </li>
        <li>
          <input
            onChange={onChangePositionHandler}
            value={searchByPosition}
            autoFocus
            type="search"
            placeholder="Search by position"
          ></input>
        </li>
      </ul>
      <table>
        <thead>
          <tr>
            <th
              onClick={() => {
                if (sortByOrder === undefined) {
                  navigate("/employees/firstname/asc");
                } else if (sortByOrder === "asc") {
                  navigate("/employees/firstname/dsc");
                } else if (sortByOrder === "dsc") {
                  navigate("/employees");
                }
              }}
            >
              First name
            </th>
            <th>Middle name</th>
            <th>Last name</th>
            <th>Favourite color</th>
            <th>Books</th>
            <th>Level</th>
            <th>Position</th>
            <th>Present</th>
          </tr>
        </thead>
        <tbody>
          {employeesToDisplay.map((employee) => (
            <tr key={employee._id}>
              <td>{employee.firstname}</td>
              <td>{employee.middlename}</td>
              <td>{employee.lastname}</td>
              <td>{employee.color}</td>
              <td>{employee.readBooks.map((book) => `"` + book.title + `" `)}</td>
              <td>{employee.level}</td>
              <td>{employee.position}</td>
              <td>
                <Checkbox
                  color="secondary"
                  onClick={(e) => {
                    onUpdate({ ...employee, ispresent: e.target.checked });
                  }}
                  checked={!!employee.ispresent}
                />
              </td>
              <td>
                <Link to={`/update/${employee._id}`}>
                  <button type="button">Update</button>
                </Link>
                <button type="button" onClick={() => onDelete(employee._id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeTable;
