import React from 'react';
import './index.css'; // Import CSS file
import BookingForm from './components/BookingForm';

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Booking Application</h1>
      </header>
      <main>
        <BookingForm />
      </main>
      <footer>
        <p>&copy; 2024 Tứ Quý</p>
      </footer>
    </div>
  );
};

export default App;
