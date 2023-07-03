const CompanyForm = ({ onSave, disabled, company, onCancel }) => {
 const onSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const entries = [...formData.entries()];

    const company = entries.reduce((acc, entry) => {
      const [k, v] = entry;
      acc[k] = v;
      return acc;
    }, {});

    return onSave(company);
  };

  return (
    <form className="EmployeeForm" onSubmit={onSubmit}>
      {company && (
        <input type="hidden" name="_id" defaultValue={company._id} />
      )}

      <div className="control">
        <label htmlFor="name">Name:</label>
        <input
          defaultValue={company ? company.name : null}
          name="name"
          id="name"
        />
      </div>

      <div className="buttons">
        <button type="submit" disabled={disabled}>
          {company ? "Update Company" : "Create Company"}
        </button>

        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default CompanyForm;
