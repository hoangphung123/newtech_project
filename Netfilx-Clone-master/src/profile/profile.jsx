import React, { useState } from "react";
import { Col, Row, Card, Form, Button, InputGroup} from '@themesberg/react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import moment from "moment-timezone";
import {  useSelector , useDispatch} from 'react-redux';
import Datetime from "react-datetime";
import "../profile/profile.scss"
import {updateUser} from "../services/userStore";

import Profile1 from "../login/sharing.jpg";
import ProfileCover from "../register/sharing2.jpg";
import "react-datetime/css/react-datetime.css";



function Profile() {
  const [birthday, setBirthday] = useState("");
  const user = useSelector((state) => state.user)
  const [updatedData, setFormData] = useState ({
    name: "",
    cccd: "",
    gender: 0,
    phone: 0,
    address: "",
});

  const handleInputChange = (e) => {
    setFormData({ ...updatedData, [e.target.name]: e.target.value });
  };

  function handleSaveClick() {
    const user = JSON.parse(localStorage.getItem("user"));
    
    // Make the API call to update the user data
    updateUser(user.id, updatedData, user.access_token)
      .then((response) => {
        // Handle the API response here (e.g., show a success message)
        console.log('User data updated successfully:', response);
      })
      .catch((error) => {
        // Handle API call errors (e.g., show an error message)
        console.error('Error updating user data:', error);
      });
  }
  

  return (
    <div className="profile">
      <div className="profile_form">
        <Card border="light" className="bg-white shadow-sm mb-4">
        <Card.Body>
        <h5 className="mb-4">General information</h5>
        <Form>
          <Row>
            <Col md={6} className="mb-3">
            <Form.Group id="firstName">
              <Form.Label>Full Name</Form.Label>
                <Form.Control required type="text" value={user.name} name="name" onChange={handleInputChange}/>
            </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group id="lastName">
                <Form.Label>CCCD</Form.Label>
                <Form.Control required type="text" value={user.cccd} name="cccd" onChange={handleInputChange} />
              </Form.Group>
            </Col>
          </Row>
          <Row className="align-items-center">
            <Col md={6} className="mb-3">
              <Form.Group id="birthday">
                <Form.Label>Birthday</Form.Label>
                <Datetime
                  timeFormat={false}
                  onChange={setBirthday}
                  renderInput={(props, openCalendar) => (
                    <InputGroup>
                      <Form.Control
                        required
                        type="text"
                        value={birthday ? moment(birthday).format("MM/DD/YYYY") : ""}
                        placeholder="mm/dd/yyyy"
                        onFocus={openCalendar}
                        onChange={() => { }} />
                    </InputGroup>
                  )} />
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group id="gender">
                <Form.Label>Gender</Form.Label>
                <Form.Select defaultValue="0">
                  <option value="0">Gender</option>
                  <option value="1">Female</option>
                  <option value="2">Male</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6} className="mb-3">
              <Form.Group id="emal">
                <Form.Label>Email</Form.Label>
                <Form.Control required type="email" value={user.email} name="email" onChange={handleInputChange} />
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group id="phone">
                <Form.Label>Phone</Form.Label>
                <Form.Control required type="number" value={user.phone} name="phone" onChange={handleInputChange}/>
              </Form.Group>
            </Col>
          </Row>

          <h5 className="my-4">Address</h5>
          <Row>
            <Col sm={9} className="mb-3">
              <Form.Group id="address">
                <Form.Label>Address</Form.Label>
                <Form.Control required type="text" value={user.address} name="address" onChange={handleInputChange} />
              </Form.Group>
            </Col>
            <Col sm={3} className="mb-3">
              <Form.Group id="addressNumber">
                <Form.Label>Number</Form.Label>
                <Form.Control required type="number" placeholder="No." />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col sm={4} className="mb-3">
              <Form.Group id="city">
                <Form.Label>City</Form.Label>
                <Form.Control required type="text" placeholder="City" />
              </Form.Group>
            </Col>
            <Col sm={4} className="mb-3">
              <Form.Group className="mb-2">
                <Form.Label>Select state</Form.Label>
                <Form.Select id="state" defaultValue="0">
                  <option value="0">State</option>
                  <option value="AL">Alabama</option>
                  <option value="AK">Alaska</option>
                  <option value="AZ">Arizona</option>
                  <option value="AR">Arkansas</option>
                  <option value="CA">California</option>
                  <option value="CO">Colorado</option>
                  <option value="CT">Connecticut</option>
                  <option value="DE">Delaware</option>
                  <option value="DC">District Of Columbia</option>
                  <option value="FL">Florida</option>
                  <option value="GA">Georgia</option>
                  <option value="HI">Hawaii</option>
                  <option value="ID">Idaho</option>
                  <option value="IL">Illinois</option>
                  <option value="IN">Indiana</option>
                  <option value="IA">Iowa</option>
                  <option value="KS">Kansas</option>
                  <option value="KY">Kentucky</option>
                  <option value="LA">Louisiana</option>
                  <option value="ME">Maine</option>
                  <option value="MD">Maryland</option>
                  <option value="MA">Massachusetts</option>
                  <option value="MI">Michigan</option>
                  <option value="MN">Minnesota</option>
                  <option value="MS">Mississippi</option>
                  <option value="MO">Missouri</option>
                  <option value="MT">Montana</option>
                  <option value="NE">Nebraska</option>
                  <option value="NV">Nevada</option>
                  <option value="NH">New Hampshire</option>
                  <option value="NJ">New Jersey</option>
                  <option value="NM">New Mexico</option>
                  <option value="NY">New York</option>
                  <option value="NC">North Carolina</option>
                  <option value="ND">North Dakota</option>
                  <option value="OH">Ohio</option>
                  <option value="OK">Oklahoma</option>
                  <option value="OR">Oregon</option>
                  <option value="PA">Pennsylvania</option>
                  <option value="RI">Rhode Island</option>
                  <option value="SC">South Carolina</option>
                  <option value="SD">South Dakota</option>
                  <option value="TN">Tennessee</option>
                  <option value="TX">Texas</option>
                  <option value="UT">Utah</option>
                  <option value="VT">Vermont</option>
                  <option value="VA">Virginia</option>
                  <option value="WA">Washington</option>
                  <option value="WV">West Virginia</option>
                  <option value="WI">Wisconsin</option>
                  <option value="WY">Wyoming</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
          <div className="mt-3">
            <Button variant="primary" type="button"  onClick={handleSaveClick}>Save All</Button>
          </div>
        </Form>
      </Card.Body>
        </Card>
      </div>
      <div className="profile_image">
      <Card border="light" className="text-center p-0 mb-4">
      <div style={{ backgroundImage: `url(${ProfileCover})` }} className="profile-cover rounded-top" />
      <Card.Body className="pb-5">
        <Card.Img src={Profile1} alt="Neil Portrait" className="user-avatar mt-n7" />
        <Card.Title>Neil Sims</Card.Title>
        <Card.Subtitle className="fw-normal">Senior Software Engineer</Card.Subtitle>
        <Card.Text className="text-gray mb-4">New York, USA</Card.Text>

        <Button variant="primary" size="sm" className="me-2">
          <FontAwesomeIcon className="me-1" /> Avatar
        </Button>
      </Card.Body>
    </Card>
      </div>
    </div>
  );
}

export default Profile;
