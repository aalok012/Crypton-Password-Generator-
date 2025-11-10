import { use } from 'react';
import { useEffect } from 'react';
import { useState, useCallback, useRef } from 'react';

function App() {
  // State to store the length of the password
  const [length, setLength] = useState(8);
  // State to toggle inclusion of numbers in the password
  const [numberAllowed, setNumberAllowed] = useState(false);
  // State to toggle inclusion of special characters in the password
  const [charAllowed, setCharAllowed] = useState(true);
  // State to store the generated password
  const [password, setPassword] = useState("");

//useRef Hook
  const passwordRef = useRef(null);

  // Function to generate the password based on selected options
  const passwordGenerator = useCallback(() => { //usecallback optimizes the re renders of a function  
    let pass = ""; // Initialize an empty password
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghjklmnopqurstuvwxyz"; // Base string with alphabets

    // Add numbers to the string if allowed
    if (numberAllowed) str += "0123456789";
    // Add special characters to the string if allowed
    if (charAllowed) str += "!@#$%^&*(){}[]=";

    // Loop to generate a password of the specified length
    for (let i = 0; i < length; i++) {
      const charIndex = Math.floor(Math.random() * str.length); // Get a random index
      pass += str.charAt(charIndex); // Append the character at the random index to the password
    }

    setPassword(pass); // Update the password state
  }, [length, numberAllowed, charAllowed, setPassword]);

const copyPasswordToClipboard = useCallback(() => { //function to select the password in the input box 
  passwordRef.current?.select();
  window.navigator.clipboard.writeText(password);
}, [password]);
  


useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, passwordGeternerator]);
  return (
    <div className='w-full text-center max-w-md mx-auto shadow-md rounded-lg px-20 my-8 text-orange-300 bg-gray-600'>
      {/* Title of the application */}
      <h1 className="text-white text-center">Password Generator</h1>

      {/* Input field to display the generated password */}
      <div className="flex shadow text-center rounded-lg overflow-hidden bg-white mb-4">
        <input
          type="text"
          value={password}
          className="outline-none w-full py-1 px-3"
          placeholder="password"
          readOnly
          ref={passwordRef}
        />
        {/* Button to copy the password */}
        <button onClick= {copyPasswordToClipboard} className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'>Copy</button>
      </div>

      {/* Controls to customize the password */}
      <div className='flex text-sm gap-x-2'>
        {/* Slider to adjust the length of the password */}
        <div className='flex items-center gap-x-1'>
          <input
            type="range"
            min={6}
            max={100}
            value={length}
            className='cursor-pointer'
            onChange={(e) => setLength(e.target.value)}
          />
          <label>Length: {length}</label>
        </div>

        {/* Checkbox to include numbers in the password */}
        <div className='flex items-center gap-x-1'>
          <input
            type="checkbox"
            defaultChecked={numberAllowed}
            id="numberInput"
            onChange={() => setNumberAllowed((prev) => !prev)}
          />
          <label htmlFor="numberInput">Include Numbers</label>
        </div>

        {/* Checkbox to include special characters in the password */}
        <div className='flex items-center gap-x-1'>
          <input
            type="checkbox"
            defaultChecked={charAllowed}
            id="charInput"
            onChange={() => setCharAllowed((prev) => !prev)}
          />
          <label htmlFor="charInput">Include Special Characters</label>
        </div>
      </div>

      {/* Button to generate the password */}
      <button
        onClick={passwordGenerator}
        className="w-full py-2 px-4 bg-orange-500 text-white rounded-lg hover:bg-orange-600 mt-4"
      >
        Generate Password
      </button>
    </div>
  );
}

export default App;
