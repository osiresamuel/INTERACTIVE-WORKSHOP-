
import { useState } from "react";
import "./App.css";

const initialForm = {
  fullName: "",
  email: "",
  phone: "",
  workshopDate: "",
  age: "",
  portfolio: "",
  workshop: "",
};

function App() {
  const [formData, setFormData] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [registrations, setRegistrations] = useState([]);
  const [success, setSuccess] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setErrors((previous) => ({
      ...previous,
      [name]: "",
    }));

    setSuccess("");
  }
  
function validateForm() {
  const newErrors = {};

  if (!formData.fullName.trim()) {
    newErrors.fullName = "Please enter your full name.";
  }

  if (!formData.email.trim()) {
    newErrors.email = "Please enter your email address.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    newErrors.email = "Please enter a valid email address.";
  }

  if (!formData.phone.trim()) {
    newErrors.phone = "Please enter your phone number.";
  } else if (formData.phone.replace(/\D/g, "").length < 7) {
    newErrors.phone = "Please enter a valid phone number.";
  }

  if (!formData.workshopDate) {
    newErrors.workshopDate = "Please select a workshop date.";
  }

  if (!formData.age) {
    newErrors.age = "Please enter your age.";
  } else if (Number(formData.age) < 16 || Number(formData.age) > 100) {
    newErrors.age = "Age must be between 16 and 100.";
  }

  if (formData.portfolio.trim()) {
    try {
      new URL(formData.portfolio);
    } catch {
      newErrors.portfolio = "Please enter a valid portfolio URL.";
    }
  }

  if (!formData.workshop) {
    newErrors.workshop = "Please select a workshop.";
  }

  setErrors(newErrors);

  return Object.keys(newErrors).length === 0;
}


function handleSubmit(event) {
  event.preventDefault();

  const isValid = validateForm();

  if (!isValid) {
    setSuccess("");
    return;
  }

  const newRegistration = {
    ...formData,
    id: Date.now(),
  };

  setRegistrations((previous) => [
    ...previous,
    newRegistration,
  ]);

  setFormData(initialForm);
  setErrors({});
  setSuccess("Registration successful!");
}

  return (
    <main className="container">
      <h1>Workshop Registration</h1>
      <p>Register to attend an upcoming workshop.</p>

     <form onSubmit={handleSubmit} noValidate>
       
<label htmlFor="fullName">Full name</label>
<input
  id="fullName"
  name="fullName"
  type="text"
  value={formData.fullName}
  onChange={handleChange}
  required
/>
{errors.fullName && (
  <p className="error" role="alert">
    {errors.fullName}
  </p>
)}

        <label htmlFor="email">Email address</label>
        <input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <label htmlFor="phone">Phone number</label>
        <input
          id="phone"
          name="phone"
          type="tel"
          value={formData.phone}
          onChange={handleChange}
          required
        />

<label htmlFor="phone">Phone number</label>
<input
  id="phone"
  name="phone"
  type="tel"
  value={formData.phone}
  onChange={handleChange}
  required
/>

{errors.phone && (
  <p className="error" role="alert">
    {errors.phone}
  </p>
)}

        <label htmlFor="workshopDate">Workshop date</label>
        <input
          id="workshopDate"
          name="workshopDate"
          type="date"
          value={formData.workshopDate}
          onChange={handleChange}
          required
        />

<label htmlFor="workshopDate">Workshop date</label>
<input
  id="workshopDate"
  name="workshopDate"
  type="date"
  value={formData.workshopDate}
  onChange={handleChange}
  required
/>

{errors.workshopDate && (
  <p className="error" role="alert">
    {errors.workshopDate}
  </p>
)}

        <label htmlFor="age">Age</label>
        <input
          id="age"
          name="age"
          type="number"
          min="16"
          max="100"
          value={formData.age}
          onChange={handleChange}
          required
        />

<label htmlFor="age">Age</label>
<input
  id="age"
  name="age"
  type="number"
  min="16"
  max="100"
  value={formData.age}
  onChange={handleChange}
  required
/>

{errors.age && (
  <p className="error" role="alert">
    {errors.age}
  </p>
)}

        <label htmlFor="portfolio">Portfolio URL</label>
        <input
          id="portfolio"
          name="portfolio"
          type="url"
          value={formData.portfolio}
          onChange={handleChange}
          placeholder="https://example.com"
        />

<label htmlFor="portfolio">Portfolio URL</label>
<input
  id="portfolio"
  name="portfolio"
  type="url"
  value={formData.portfolio}
  onChange={handleChange}
  placeholder="https://example.com"
/>

{errors.portfolio && (
  <p className="error" role="alert">
    {errors.portfolio}
  </p>
)}

        <label htmlFor="workshop">Choose a workshop</label>
        <select
          id="workshop"
          name="workshop"
          value={formData.workshop}
          onChange={handleChange}
          required
        >
          <option value="">Select a workshop</option>
          <option value="Web Development">Web Development</option>
          <option value="Cybersecurity">Cybersecurity</option>
          <option value="UI/UX Design">UI/UX Design</option>
          <option value="Networking">Networking</option>
        </select>

<label htmlFor="workshop">Choose a workshop</label>
<select
  id="workshop"
  name="workshop"
  value={formData.workshop}
  onChange={handleChange}
  required
>
  <option value="">Select a workshop</option>
  <option value="Web Development">Web Development</option>
  <option value="Cybersecurity">Cybersecurity</option>
  <option value="UI/UX Design">UI/UX Design</option>
  <option value="Networking">Networking</option>
</select>

{errors.workshop && (
  <p className="error" role="alert">
    {errors.workshop}
  </p>
)}

        <button type="submit">Register</button>

        {success && <p role="status">{success}</p>}
      </form>

      <h2>Registered Participants ({registrations.length})</h2>

      {registrations.length === 0 ? (
        <p>No registrations yet.</p>
      ) : (
        registrations.map((participant) => (
          <div key={participant.id}>
            <h3>{participant.fullName}</h3>
            <p>{participant.email}</p>
            <p>{participant.workshop}</p>
          </div>
        ))
      )}
    </main>
  );
}

export default App;
