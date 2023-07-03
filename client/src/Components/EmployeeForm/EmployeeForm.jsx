import { useEffect, useState } from "react";
import "./EmployeeForm.css";

const EmployeeForm = ({ onSave, disabled, employee, onCancel }) => {
  const [level, setLevel] = useState("");

  const [companies, setCompanies] = useState([]);
  const [colors, setColors] = useState([]);
  const [books, setBooks] = useState([]);

  const [readBooks, setReadBooks] = useState([]);

  useEffect(() => {
    fetch("/api/company")
      .then((res) => res.json())
      .then((data) => setCompanies(data));

    fetch("/api/colors")
      .then((res) => res.json())
      .then((data) => setColors(data));

    fetch("/api/books")
      .then((res) => res.json())
      .then((data) => setBooks(data));
  }, []);

  useEffect(() => {
    if (employee !== undefined) {
      setReadBooks(employee.readBooks);
    } else {
      setReadBooks([]);
    }
  }, [employee]);

  const onSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const entries = [...formData.entries()];

    const employee = entries.reduce((acc, entry) => {
      const [k, v] = entry;
      acc[k] = v;
      return acc;
    }, {});

    employee.readBooks = readBooks;
    return onSave(employee);
  };

  return (
    <form className="EmployeeForm" onSubmit={onSubmit}>
      {employee && (
        <input type="hidden" name="_id" defaultValue={employee._id} />
      )}

      <div className="control">
        <label htmlFor="name">Name:</label>
        <input
          defaultValue={employee ? employee.name : null}
          name="name"
          id="name"
        />
      </div>

      <div className="control">
        <label htmlFor="level">Level:</label>
        <input defaultValue={level} name="level" id="level" readOnly />
      </div>

      <div className="control">
        <label htmlFor="salary">Salary:</label>
        <input
          defaultValue={employee ? employee.salary : null}
          onChange={(e) => {
            if ((e.target.value >= 0) & (e.target.value <= 100)) {
              setLevel("Junior");
            }
            if ((e.target.value >= 101) & (e.target.value <= 300)) {
              setLevel("Medior");
            }
            if ((e.target.value >= 301) & (e.target.value <= 400)) {
              setLevel("Senior");
            }
            if ((e.target.value >= 401) & (e.target.value <= 800)) {
              setLevel("Expert");
            }
            if (e.target.value >= 801) {
              setLevel("Godlike");
            }
          }}
          name="salary"
          id="salary"
        />
      </div>

      <div className="control">
        <label htmlFor="position">Position:</label>
        <input
          defaultValue={employee ? employee.position : null}
          name="position"
          id="position"
        />
      </div>

      <div className="control">
        <label htmlFor="color">Preferred color:</label>
        <select
          defaultValue={employee ? employee.color : null}
          name="color"
          id="color"
        >
          {colors.map((color) => {
            return (
              <option key={color._id} value={color._id}>
                {color.name}
              </option>
            );
          })}
        </select>
      </div>

      <div className="control">
        <label htmlFor="company">Company:</label>
        <select defaultValue={null} name="company" id="company">
          {companies.map((company) => {
            return (
              <option key={company._id} value={company._id}>
                {company.name}
              </option>
            );
          })}
        </select>
      </div>

      <div className="control">
        <label htmlFor="books">Books:</label>
        <select
          defaultValue={null}
          name="readBooks"
          id="breadBooks"
          onChange={(e) => {
            const bookId = e.target.value;
            const book = books.find((book) => book._id === bookId);

            setReadBooks([...readBooks, book]);
          }}
        >
          {books
            .filter(
              (book) =>
                !readBooks.find((readBook) => readBook.title === book.title)
            )
            .map((book) => {
              return (
                <option key={book._id} value={book._id}>
                  {book.title}
                </option>
              );
            })}
        </select>
        <div className="book-container">
          {readBooks.map((readBook, idx) => (
            <div key={idx}>
              <p>{readBook.title}</p>
              <button
                onClick={(e) => {
                  e.preventDefault();

                  const readBooksCopy = [...readBooks];
                  readBooksCopy.splice(idx, 1);

                  setReadBooks(readBooksCopy);
                }}
              >
                X
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="buttons">
        <button type="submit" disabled={disabled}>
          {employee ? "Update Employee" : "Create Employee"}
        </button>

        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default EmployeeForm;
