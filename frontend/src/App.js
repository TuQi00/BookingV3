import React, { Suspense, lazy } from "react";
import "./styles.css";
const BookingForm = lazy(() =>
  import("./components/BookingForm/BookingForm.js")
);

const App = () => {
  return (
    <div className="App">
      <Suspense fallback={<div>Loading...</div>}>
        <BookingForm />
      </Suspense>
    </div>
  );
};

export default App;
