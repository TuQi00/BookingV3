import React from "react";
import "./index.css"; // Import CSS file
import BookingForm from "./components/BookingForm";

const App = () => {
  return (
    <div className="App">
      <header className="App-header"></header>
      <main>
        <BookingForm />
      </main>
      <footer></footer>
    </div>
  );
};

export default App;
