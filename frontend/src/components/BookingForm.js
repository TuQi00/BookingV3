import React, { useState } from 'react';
import axios from 'axios';
import '../index.css'; // Import CSS file
import ServiceSelect from './ServiceSelect';
import SubserviceSelect from './SubserviceSelect';
import EmployeeSelect from './EmployeeSelect';

const BookingForm = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [emailValid, setEmailValid] = useState(false);
  const [service, setService] = useState('');
  const [subservice, setSubservice] = useState('');
  const [employee, setEmployee] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  const handleEmailSubmit = async (event) => {
    event.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRegex.test(email)) {
      try {
        console.log(email,22);
        
        const response = await axios.post('http://localhost:5000/api/users/check', { email });
        console.log('Email validation response:', response.data); // Add log here
        setEmailValid(true);
        setStep(2);
      } catch (error) {                                                                                                                                                                                                 
        console.error('Error validating email:', error.response ? error.response.data : error.message);
      }
    } else {
      alert('Please enter a valid email.');
    }
  };

  const handleBookingSubmit = async (event) => {
    event.preventDefault();
    try {
      const bookingData = { email, service, subservice, employee, date, time };
      const response = await axios.post('http://localhost:5000/api/bookings', bookingData);
      console.log('Booking submitted successfully:', response.data);
      resetForm(); // Reset form after successful booking
    } catch (error) {
      console.error('Error submitting booking:', error.response ? error.response.data : error.message);
    }
  };

  const resetForm = () => {
    setEmail('');
    setService('');
    setSubservice('');
    setEmployee('');
    setDate('');
    setTime('');
    setStep(1);
  };

  return (
    <div>
      {step === 1 && (
        <form className="email-form" onSubmit={handleEmailSubmit}>
          <div>
            <label>Enter Your Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button type="submit">Next</button>
        </form>
      )}
      {step === 2 && emailValid && (
        <form className="booking-form" onSubmit={handleBookingSubmit}>
          <ServiceSelect value={service} onChange={setService} />
          <SubserviceSelect value={subservice} onChange={setSubservice} serviceId={service} />
          <EmployeeSelect value={employee} onChange={setEmployee} subserviceId={subservice} />
          <div>
            <label>Select Date:</label>
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
          </div>
          <div>
            <label>Select Time:</label>
            <input type="time" value={time} onChange={(e) => setTime(e.target.value)} required />
          </div>
          <button type="submit">Book Appointment</button>
        </form>
      )}
    </div>
  );
};

export default BookingForm;
