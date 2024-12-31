import React, { Suspense, lazy } from "react";
import "./index.css";

const BookingForm = lazy(() => import("./components/BookingForm"));

const App = () => {
  return (
    <div className="App">
      <h1>Booking System</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <BookingForm />
      </Suspense>
    </div>
  );
};

export default App;
