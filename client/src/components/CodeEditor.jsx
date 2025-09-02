import React from 'react'
import Editor from '@monaco-editor/react'

const CodeEditor = () => {
  const codeString = `
import React from 'react'
import Editor from '@monaco-editor/react'

const CodeEditor = () => {
  return (
    <>
        <div className='py-10 px-10 h-full w-full'>
          
            <div className='h-fit w-full mb-10 overflow-hidden rounded-2xl'>
              <div className="bg-gray-900 px-6 py-4">
                <h1 className="text-white text-2xl font-bold">Code Blocks</h1>
                <p className="text-blue-100 text-sm">Code some mindfull content with our VS-style code editor</p>
              </div>
              <Editor 
                  height='90vh'
                  defaultLanguage='javascript'
                  defaultValue='console.log("Hi!!")'
                  theme='vs-dark' 
              />
          </div>
        </div>
    </>
  )
}

export default CodeEditor
`

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
          defaultValue='console.log("Adam")'
          theme="vs-dark"
        />
      </div>
    // </div>
  )
}

export default CodeEditor