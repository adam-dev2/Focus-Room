import React from 'react'
import Editor from '@monaco-editor/react'
import axios from 'axios';


const CodeEditor = () => {
  const codeString = `console.log("Hi!!")`

  const handleSave = async () => {
    const response = await axios.post('http://locahost:5000/api/code-snippet',
      {
        name,
        code,
        language,
      },
      {
        headers:{
          'Content-Type':'application/json',
          'Authorization': 'Bearer heehheheheheh'
        }
      }
    )
  } 

  return (
    // <div className="w-full h-[60vh] bg-red-50 flex flex-col m-auto mt-0 mb-0 pb-0 rounded-2xl overflow-hidden border-1 border-gray-300">
      <div className="w-full h-[60vh] bg-gray-50 flex flex-col p-0 m-[3%] mt-0 mb-0 rounded-2xl overflow-hidden border-1 border-gray-300">
        <div className="bg-gray-900 px-6 py-4">
          <h1 className="text-white text-2xl font-bold">Code Blocks</h1>
          <p className="text-blue-100 text-sm">Code some mindfull content with our VS-style code editor</p>
        </div>
        <Editor 
          height="100vh"
          defaultLanguage="javascript"
          defaultValue={codeString}
          theme="vs-dark"
        />
      </div>
    // </div>
  )
}

export default CodeEditor