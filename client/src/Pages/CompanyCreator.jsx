import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CompanyForm from "../Components/CompanyForm";

const createCompany = (company) => {
  return fetch("/api/company", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(company),
  }).then((res) => res.json());
};

const CompanyCreator = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleCreateEmployee = (employee) => {
    setLoading(true);

    createCompany(employee)
      .then(() => {
        navigate("/");
      })
      .catch((err) => {
        throw err;
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <CompanyForm
      onCancel={() => navigate("/")}
      disabled={loading}
      onSave={handleCreateEmployee}
    />
  );
};

export default CompanyCreator;
