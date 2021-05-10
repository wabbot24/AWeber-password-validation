import { useState } from "react";
import { usePasswordValidation } from "./hooks/usePasswordValidation";
import './App.css';

function App() {

  // password states
  const [password, setPassword] = useState({
    firstPassword: "",
    secondPassword: ""
  });

  // state variables for conditionally rendering submission messages
  const [readySubmit, setReadySubmit] = useState(false);
  const [noMatch, setNoMatch] = useState(false);
  const [missingRequirements, setMissingRequirements] = useState(false);

  //validation that runs on every keystroke - allows us to give users feedback on password viability in real time
  const [
    validLength,
    hasNumber,
    upperCase,
    lowerCase,
    specialChar,
    match,
  ] = usePasswordValidation({
    firstPassword: password.firstPassword,
    secondPassword: password.secondPassword,
  });

  const validEntry = validLength && hasNumber && upperCase && lowerCase && specialChar;

  // handles form submission, toggles feedback message state variables, resets input form if valid submission
  const handleSubmit = () => {
    resetFeedback();
    event.preventDefault();
    if (validEntry && match) {
      setPassword({
        firstPassword: "",
        secondPassword: ""
      });
      setReadySubmit(true);
    } else if (!validEntry) {
      setMissingRequirements(true);
    } else {
      setNoMatch(true);
    }
  }

  // so we will never print multiple feedback messages
  const resetFeedback = () => {
    setReadySubmit(false);
    setMissingRequirements(false);
    setNoMatch(false);
  }

  // sets password states
  const setFirst = (event) => {
    setPassword({ ...password, firstPassword: event.target.value });
  };
  const setSecond = (event) => {
    setPassword({ ...password, secondPassword: event.target.value });
  };

  // toggles colors of listed password requirements and submit button to show user progress toward valid password as they type
  let checkColors = {
    length: {
      color: validLength ? 'green' : 'red'
    },
    number: {
      color: hasNumber ? 'green' : 'red'
    },
    upperCase: {
      color: upperCase ? 'green' : 'red'
    },
    lowerCase: {
      color: lowerCase ? 'green' : 'red'
    },
    specialChar: {
      color: specialChar ? 'green' : 'red'
    },
    readySubmit: {
      backgroundColor: validEntry && match ? 'green' : 'whitesmoke',
      color: validEntry && match ? 'white' : 'lightgray'
    }
  };

  return (
    <div className='parent'>
      <div className='left'>
        <div className='choosePassword'>
          Select a Password!
        </div>
        <div className='passwordRules'>
          Password must:
          <ul>
            <li style={checkColors.length}>Be at least 6 characters </li>
            <li style={checkColors.upperCase}>Have at least 1 Upper Case character</li>
            <li style={checkColors.lowerCase}>Have at least 1 Lower Case character</li>
            <li style={checkColors.number}>Have at least 1 Number</li>
            <li style={checkColors.specialChar}>Have at least 1 Special Character</li>
          </ul>
        </div>
      </div>

      <div className='right'>
        <form onSubmit={handleSubmit}>
          <div>
            <input onChange={setFirst} type='text' placeholder='Password' value={password.firstPassword} />
          </div>
          <div>
            <input onChange={setSecond} type='text' placeholder='Confirm Password' value={password.secondPassword} />
          </div>
          <div className='submitParent'>
            <input type='submit' className='submit' style={checkColors.readySubmit} />
          </div>
        </form>
        {readySubmit && <span className='feedback feedbackSuccess'>Congrats, you've created your password!</span>}
        {noMatch && <span className='feedback feedbackMatchFailure'>Uh Oh! Passwords don't match!</span>}
        {missingRequirements && <span className='feedback feedbackRequirementsFailure'>Uh Oh! Missing requirements!</span>}
      </div>
    </div>
  );
}

export default App;