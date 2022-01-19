import React, { Component } from "react";
import { Container, FormGroup, Col, Button, Form } from "react-bootstrap";

class AddLawyer extends Component {
 
  render() {
    return (
      <Container fluid>
        <br />
        <Form>
          <Form.Label>Add Lawyer</Form.Label>
          <hr />
          <Form.Row>
            <Col>
              <Form.Label>Name</Form.Label>
            </Col>
            <Col>
              <Form.Control
                type="text"
                placeholder="Enter Name"
                name="name"
              />
            </Col>
          </Form.Row>
          <Form.Row>
            <Col>
              <Form.Label>Age</Form.Label>
            </Col>
            <Col>
              <Form.Control
                type="text"
                placeholder="Enter age"
                name="age"
              />
            </Col>
          </Form.Row>
          <Form.Row>
            <Col>
              <Form.Label>Qualification</Form.Label>
            </Col>
            <Col>
              <Form.Control
                type="text"
                placeholder="Enter qualification"
                name="qualification"
              />
            </Col>
          </Form.Row>
          <Form.Row>
            <Col>
              <Form.Label>Expertise</Form.Label>
            </Col>
            <Col>
              <Form.Control
                type="text"
                placeholder="Enter expertise"
                name="expertise"
              />
            </Col>
          </Form.Row>
          <FormGroup>
            <Button type="submit">
              Add
            </Button>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <Button type="reset">Reset</Button>
          </FormGroup>
        </Form>
      </Container>
    );
  }
}

export default AddLawyer;
