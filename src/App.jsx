import { useCallback, useEffect, useState ,useRef} from "react";

function App() {
  const [num, setNum] = useState(8);
  const [numAllowed, setNumAllowed] = useState(true);
  const [spCharAllowed, setcharAllowed] = useState(true);
  const [password, setPassword] = useState("");

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numAllowed) str += "0123456789";

    if (spCharAllowed) str += "~!@#$%^&*(){}[]";

    for (let i = 1; i <= num; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }

    setPassword(pass);

  }, [num, numAllowed, spCharAllowed, setPassword]);
  useEffect(()=> {
    passwordGenerator()
  },[num,numAllowed,spCharAllowed,passwordGenerator])

  //useRef method
    const passwordRef = useRef(null);
    const copyPasswordToClipboard = useCallback(()=>{
      passwordRef.current?.select()
      passwordRef.current?.setSelectionRange(0,100)
      window.navigator.clipboard.writeText(password)
    },[password])

  return (
    <>
      <div className="w-full h-screen bg-blue-950 flex justify-center ">
        <h1 className="text-center text-white m-2 text-xl  ">Password Generator</h1>
        <div className="container  flex-col w-1/2 h-28 shadow-lg rounded-md bg-gray-500 transition-transform flex justify-center  mt-16 fixed">
          <div className="flex justify-center">
            <input
              placeholder="password"
              value={password}
              readOnly
              ref={passwordRef}
              className="w-4/5 px-3 py-2 hover:shadow-lg hover:bg-emerald-300 hover:text-white hover:font-bold outline-none border-none rounded-l-lg"
              type="text"
              name="input"
            />
            <button 
            onClick={copyPasswordToClipboard}
            className="bg-blue-700 transition ease-linear hover:bg-rose-500  duration-200 shadow-md rounded-r-lg px-3 py-3 text-white ">
              copy
            </button>
          </div>
          <div className="flex flex-wrap justify-center w-4/5 mt-2">
            <input
              min={8}
              max={100}
              value={num}
              onChange={(e) => setNum(e.target.value)}
              type="range"
              name="range"
            />
            <p className="text-red-600 transition ease-linear animate-pulse transform hover:bg-slate-300 rounded shadow-xl hover:text-blue-600 cursor-pointer ml-1">Length ({num})</p>
            <input
              defaultChecked={numAllowed}
              id="numberInput"
              onChange={() => setNumAllowed((prev) => !prev)}
              className="ml-3 text-blue-800"
              type="checkbox"
              name="number"
            />
            <label className="text-red-600 transition ease-linear animate-pulse transform hover:bg-slate-300 rounded shadow-xl hover:text-blue-600 mx-1" htmlFor="number">
              Number
            </label>
            <input
              defaultChecked={spCharAllowed}
              id="charInput"
              onChange={() => setcharAllowed((prev) => !prev)}
              type="checkbox"
              name="char"
            />
            <label className="text-red-600 transition ease-linear animate-pulse transform hover:bg-slate-300 rounded shadow-xl hover:text-blue-600 mx-1" htmlFor="char">
              Characters
            </label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
