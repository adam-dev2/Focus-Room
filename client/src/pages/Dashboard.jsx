import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'
import RichTextEditor from '../components/RichTextEditor';
import CodeEditor from '../components/CodeEditor';
import PomodoroTimer from '../components/PomodoroTimer';
import Whiteboard from '../components/Whiteboard';
import { RiArrowGoBackLine } from "react-icons/ri";

const Dashboard = () => {

    const navigate = useNavigate();
    const [codeEditor,setCodeEditor] = useState(false);
    const [textEditor,setTextEditor] = useState(false);
    const [whiteboard,setWhiteboard] = useState(false);
    const [promodora,setPromodora] = useState(false);

    const handleCodeEditor = () => {
        setCodeEditor(true)
        if(textEditor) setTextEditor(!textEditor)
        if(whiteboard) setWhiteboard(!whiteboard)
        if(promodora) setPromodora(!promodora)
    }
    const handleTextEditor = () => {
        setTextEditor(true)
        if(codeEditor) setCodeEditor(!codeEditor)
        if(whiteboard) setWhiteboard(!whiteboard)
        if(promodora) setPromodora(!promodora)
    }
    const handleWhiteboard = () => {
        setWhiteboard(true)
        if(textEditor) {
            setTextEditor(!textEditor)
        }
        if(codeEditor) {
            setCodeEditor(!codeEditor)
        }
        if(promodora){
            setPromodora(!promodora)
        }
    }
    const handlePromodora = () => {
        setPromodora(true)
        if(textEditor) {
            setTextEditor(!textEditor)
        }
        if(codeEditor) {
            setCodeEditor(!codeEditor)
        }
        if(whiteboard) {
            setWhiteboard(!whiteboard)
        }
    }

    const handleBack = () => {
      navigate('/')
    }

  return (
      <>
          <section className="w-3/4 h-3/4 border border-zinc-300  shadow-2xl rounded-xl overflow-auto flex justify-between">
            <div className="w-full h-full flex flex-col">
              <navbar  className="flex max-w-3xl w-xl justify-between mt-4 bg-zinc-200/30 text-white font-sans rounded-2xl shadow-lg px-5 py-2 gap-3 m-auto text-center">
                <h1 className="font-sans font-light text-md hover:text-zinc-900 cursor-pointer hover:scale-110 transition text-gray-700" onClick={handleWhiteboard}>
                  Sketchboard
                </h1>
                <h1 className="font-sans font-light text-md hover:text-zinc-900 cursor-pointer hover:scale-110 transition text-gray-700" onClick={handleTextEditor}>
                  Quick Note
                </h1>
                <h1 className="font-sans font-light text-md hover:text-zinc-900 cursor-pointer hover:scale-110 transition text-gray-700" onClick={handleCodeEditor}>
                  Code Blocks
                </h1>
                <h1 className="font-sans font-light text-md hover:text-zinc-900 cursor-pointer hover:scale-110 transition text-gray-700" onClick={handlePromodora}>
                  Promodora
                </h1>
              </navbar>


              <div className="flex-1 flex items-center justify-center">
                { textEditor && <RichTextEditor />}
                {codeEditor && <CodeEditor />}
                {promodora && <PomodoroTimer />}
                {whiteboard && <Whiteboard />}
                {!codeEditor && !textEditor && !whiteboard && !promodora && <div><h1>Hey !!</h1> <p>Navigate to the suitable sections</p> </div>}
              </div>
            </div>
            <div className='relative right-7 top-6 h-fit' onClick={handleBack}>
                <button className='flex bg-violet-200 cursor-pointer items-center p-4 rounded-2xl text-sm font-semibold gap-2 hover:bg-violet-300 transition'>
                    <RiArrowGoBackLine color='gray' className='hover:scale-102' size={16}/>
                </button>
            </div>
          </section>
      </>
  )
}

export default Dashboard
