import React, { useEffect, useState } from "react";

const generateRandomPass = (length, options) => {
  const lowercase = "abcdefghijklmnopqrstuvwxyz";
  const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numbers = "0123456789";
  const specialChars = "!@#$%^&*()_+-=[]{}|;:,.<>?";

  let characters = lowercase + uppercase;
  if (options.numbers) characters += numbers;
  if (options.specialChars) characters += specialChars;

  let password = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    password += characters[randomIndex];
  }

  return password;
};

const handleCopy = (password) => {
  navigator.clipboard
    .writeText(password)
    .catch((err) => console.error("Failed to copy text: ", err));
};

function App() {
  const [length, setLength] = useState(10);
  const [checkbox, setCheckBox] = useState({
    isNumbers: true,
    isCharacter: false,
  });
  const [password, setPassword] = useState("randomvalue");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setPassword(() => {
      let pass = generateRandomPass(length, {
        numbers: checkbox.isNumbers,
        specialChars: checkbox.isCharacter,
      });
      return pass;
    });
  }, [length, checkbox]);

  return (
    <div className="bg-black w-full h-full p-[100px]">
      <div className="mx-auto w-fit bg-gray-600 rounded-lg px-5 py-4">
        <h2 className="text-white text-center font-bold">Password Generator</h2>
        <div className="flex my-5">
          <input
            type="text"
            placeholder="Password"
            className="h-[2.4rem] w-[22rem] rounded-lg rounded-r-none px-3"
            value={password}
            readOnly
          />
          <button
            className="bg-blue-600 rounded-lg rounded-l-none px-[15px] text-white font-semibold hover:bg-blue-700"
            onClick={(e) => {handleCopy(password)}}
          >
            copy
          </button>
        </div>
        <div className="flex gap-2">
          <input
            type="range"
            min={1}
            max={20}
            value={length}
            onChange={(e) => {
              setLength(e.target.value);
            }}
          />
          <span>Length:{length}</span>
          <div>
            <input
              type="checkbox"
              id="Numbers"
              checked={checkbox.isNumbers}
              onChange={(e) => {
                setCheckBox((prv) => ({ ...prv, isNumbers: e.target.checked }));
              }}
            />
            <label htmlFor="Numbers">Numbers</label>
          </div>
          <div>
            <input
              type="checkbox"
              onChange={(e) => {
                setCheckBox((prv) => ({
                  ...prv,
                  isCharacter: e.target.checked,
                }));
              }}
            />
            <label htmlFor="Characters">Characters</label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;