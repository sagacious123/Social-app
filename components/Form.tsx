// User A/B form component
import React, { FC, useState } from "react";

interface FormProps {
  user: any;
}

const Form: FC<FormProps> = ({ user }) => {
  const [companyName, setCompanyName] = useState("");
  const [numUsers, setNumUsers] = useState(0);
  const [numProducts, setNumProducts] = useState(0);

  const handleSubmit = () => {
    // Submit form data to the database (PostgreSQL) using API requests
  };

  // Generate percentage based on numUsers and numProducts

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={companyName}
        onChange={(e) => setCompanyName(e.target.value)}
      />
      <input
        type="number"
        value={numUsers}
        onChange={(e) => setNumUsers(parseInt(e.target.value))}
      />
      <input
        type="number"
        value={numProducts}
        onChange={(e) => setNumProducts(parseInt(e.target.value))}
      />
      {/* Display generated percentage */}
      <button type="submit">Submit</button>
    </form>
  );
};

export default Form;
