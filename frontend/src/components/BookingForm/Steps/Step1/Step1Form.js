import React, { useEffect } from "react";
import CategorySelect from "../../../CategorySelect/CategorySelect";
import ServiceSelect from "../../../ServiceSelect/ServiceSelect";
import EmployeeSelect from "../../../EmployeeSelect/EmployeeSelect";

const Step1Form = ({
  fetchDetails,
  setValue,
  watch,
  serviceDetails,
  employeeDetails,
  handleNext,
}) => {
  useEffect(() => {
    const category = watch("category");
    if (category) {
      setValue("service", "");
      setValue("employee", "");
      fetchDetails("categories", category);
    }
  }, [watch("category"), setValue, fetchDetails]);

  useEffect(() => {
    const category = watch("category");
    const service = watch("service");
    if (category && service) {
      fetchDetails("services", service, category);
    }
  }, [watch("category"), watch("service"), setValue, fetchDetails]);

  useEffect(() => {
    const employee = watch("employee");
    if (employee) {
      fetchDetails("employees", employee);
    }
  }, [watch("employee"), fetchDetails]);

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <CategorySelect
        value={watch("category")}
        onChange={(val) => setValue("category", val)}
      />
      <ServiceSelect
        value={watch("service")}
        onChange={(val) => setValue("service", val)}
        categoryId={watch("category")}
      />
      {serviceDetails && (
        <div className="service-details">
          <p>
            <strong>Service:</strong> {serviceDetails.name}
          </p>
          <p>
            <strong>Price:</strong> ${serviceDetails.price}
          </p>
          <p>
            <strong>Description:</strong> {serviceDetails.description}
          </p>
        </div>
      )}
      <EmployeeSelect
        value={watch("employee")}
        onChange={(val) => setValue("employee", val)}
        serviceId={watch("service")}
      />
      <div className="button-group">
        <button type="button" onClick={handleNext}>
          Next
        </button>
      </div>
    </form>
  );
};

export default Step1Form;
