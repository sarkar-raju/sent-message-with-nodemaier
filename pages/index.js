import { useState } from "react";
import { sendContactForm } from "../lib/api";

const initValues = { name: "", email: "", subject: "", message: "", extra: "" };


const initState = { isLoading: false, error: "", values: initValues };

export default function Home() {
  const [state, setState] = useState(initState);
  const [touched, setTouched] = useState({});

  const { values, isLoading, error } = state;

  const onBlur = ({ target }) =>
    setTouched((prev) => ({ ...prev, [target.name]: true }));

  const handleChange = ({ target }) =>
    setState((prev) => ({
      ...prev,
      values: {
        ...prev.values,
        [target.name]: target.value,
      },
    }));

  const onSubmit =  () => {
    setState((prev) => ({
      ...prev,
      isLoading: true,
    }));
    try {
       sendContactForm(values);
      
      setState(initState);

      window.alert("Message Sent Thankyou")
    } catch (error) {
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: error.message,
      }));
    }
  };

  return (
    <div>
      <h1>Contact</h1>
      {error && (
        <p>
          {error}
        </p>
      )}

      <div >
        <label>Name</label>
        <input
          type="text"
          name="name"
          
          value={values.name}
          onChange={handleChange}
          onBlur={onBlur}
        />
        <div>Required</div>
      </div>

      <div>
        <div>Email</div>
        <input
          type="email"
          name="email"
         
          value={values.email}
          onChange={handleChange}
          onBlur={onBlur}
        />
        <div>Required</div>
      </div>

      <div
      
       
      >
        <div>Subject</div>
        <input
          type="text"
          name="subject"
          
          value={values.subject}
          onChange={handleChange}
          onBlur={onBlur}
        />
        <div>Required</div>
      </div>

      <div
        
      
      >
        <div>Message</div>
        <textarea
          type="text"
          name="message"
          rows={4}
        
          value={values.message}
          onChange={handleChange}
          onBlur={onBlur}
        />
        <div>Required</div>
      </div>

      <div
       
      >
        <div>Extra</div>
        <textarea
          type="text"
          name="extra"
          rows={4}
          
          value={values.extra}
          onChange={handleChange}
          onBlur={onBlur}
        />
        <div>Required</div>
      </div>

      <button
      
       
      
        disabled={
          !values.name || !values.email || !values.subject || !values.message
        }
        onClick={onSubmit}
      >
        Submit
      </button>
    </div>
  );
}
