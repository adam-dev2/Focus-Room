import React, { useState } from 'react'
import Editor from '@monaco-editor/react'
import axios from 'axios';


const CodeEditor = () => {
  const codeString = `console.log("Hi!!")`
  const [name,setName] = useState('code-sample-4');
  const [code,setCode] = useState(codeString);
  const [language,setLanguage] = useState('JS');

  const handleSave = async () => {
    console.log('clicked handleSave')
    console.log(code,code,language)
    try{
      const response = await axios.post('http://localhost:5000/api/code-snippet',
        {
          name,
          code,
          language,
        },
        {
          headers:{
            'Content-Type':'application/json',
          }
        }
      );
      
      console.log('down the try block')
      console.log(response.data)
    }catch(err) {
      console.log(err.message)
    }
  } 

  return (
    // <div className="w-full h-[60vh] bg-red-50 flex flex-col m-auto mt-0 mb-0 pb-0 rounded-2xl overflow-hidden border-1 border-gray-300">
      <div className="w-full h-[60vh] bg-gray-50 flex flex-col p-0 m-[3%] mt-0 mb-0 rounded-2xl overflow-hidden border-1 border-gray-300">
        <div className="bg-gray-900 px-6 py-4 flex justify-between">
          <div>
            <h1 className="text-white text-2xl font-bold">Code Blocks</h1>
            <p className="text-blue-100 text-sm">Code some mindfull content with our VS-style code editor</p>
          </div>
          <button onClick={handleSave} className="bg-blue-500 text-white px-4 py-2 rounded-xl hover:bg-blue-600 cursor-pointer hover:scale-103 transition">Save</button>
        </div>
        <Editor 
          height="100vh"
          defaultLanguage="javascript"
          defaultValue={codeString}
          theme="vs-dark"
          value={code}
        />
      </div>
    // </div>
  )
}

export default CodeEditor