import React, { useState } from "react";
import { Container, Form, Col, Row, Button, Image } from "react-bootstrap";

const DynamicFrom = ({ fields }) => {
  const [formData, setFormData] = useState({});
  const [formErrors, setFormErrors] = useState({});

  const handleInputChange = (event) => {
    const { name, value, type, checked, files } = event.target;
    const inputValue =
      type === "checkbox" || type === "radio"
        ? checked
        : type === "file"
        ? files[0]
        : value;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    setFormErrors((prevErrors) => ({
      ...prevErrors,
      [name]:
        inputValue || type !== "checkbox" ? null : "This field is required",
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const errors = {};
    fields.forEach((field) => {
      if (!formData[field.name] && field.type !== "checkbox") {
        errors[field.name] = `${field.label} field is required`;
      }
    });

    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      console.log(formData);
      // You can perform further actions, like submitting the data to a server.
    }
  };
  console.log(formErrors);
  return (
    <>
      <div className="bg-gradient w-100 p-2">
        <Container>
          <h1 className="display-6">Dynamic Form</h1>
          <hr className="my-4" />
          <Row>
            <Col md="11" className="mx-auto">
              <Row>
                <Form onSubmit={handleSubmit}>
                  {fields.map((field, index) => (
                    <Col key={index} xs="12" md="6" className="mb-3">
                      {field.type === "text" ||
                      field.type === "email" ||
                      field.type === "textarea" ? (
                        <Form.FloatingLabel
                          controlId={field.name}
                          label={field.label}
                        >
                          <Form.Control
                            as={
                              field.type === "textarea" ? "textarea" : undefined
                            }
                            type={field.type}
                            name={field.name}
                            value={formData[field.name] || ""}
                            onChange={handleInputChange}
                            isInvalid={!!formErrors[field.name]}
                          />
                          <Form.Control.Feedback type="invalid">
                            {formErrors[field.name]}
                          </Form.Control.Feedback>
                        </Form.FloatingLabel>
                      ) : field.type === "radio" ? (
                        <div>
                          {field.options.map((option, optionIndex) => (
                            <Form.Check
                              inline
                              key={optionIndex}
                              type={field.type}
                              label={option}
                              name={field.name}
                              value={option}
                              className="form-switch"
                              checked={formData[field.name] === option}
                              onChange={handleInputChange}
                            />
                          ))}
                        </div>
                      ) : field.type === "checkbox" ? (
                        <></>
                      ) : field.type === "select" ? (
                        <Form.FloatingLabel
                          controlId={field.name}
                          label={field.label}
                        >
                          <Form.Control
                            as="select"
                            name={field.name}
                            value={formData[field.name] || ""}
                            onChange={handleInputChange}
                            isInvalid={!!formErrors[field.name]}
                          >
                            <option value="">Select {field.label}</option>
                            {field.options.map((option, optionIndex) => (
                              <option key={optionIndex} value={option}>
                                {option}
                              </option>
                            ))}
                          </Form.Control>
                          <Form.Control.Feedback type="invalid">
                            {formErrors[field.name]}
                          </Form.Control.Feedback>
                        </Form.FloatingLabel>
                      ) : null}
                      <Form.Control.Feedback type="invalid">
                        {formErrors[field.name]}
                      </Form.Control.Feedback>
                    </Col>
                  ))}
                  <Button type="submit">Submit</Button>
                </Form>
              </Row>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default DynamicFrom;
