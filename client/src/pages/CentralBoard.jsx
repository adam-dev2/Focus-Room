import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom';
import Notes from '../components/Notes'
import Codes from '../components/Codes.jsx'
import { IoMdAdd } from "react-icons/io";
import Timer from '../components/Timer.jsx';
import Sketches from '../components/Sketches.jsx';

const CentralBoard = () => {
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
      navigate('/focus-room')
    }
  return (
    <>
        <section className="w-3/4 h-3/4 border border-zinc-300  shadow-2xl rounded-xl overflow-auto flex justify-between">
            <div className='border-r-1 border-gray-300 w-[20%] h-full shadow-lg bg-red-50 p-6 flex flex-col justify-between gap-6'>
                <div className='h-20 w-20 rounded-full max-w-full m-auto mb-0 bg-violet-200 mt-4'>

                </div>
                <div className='flex flex-col gap-5 mb-[20%] font-sans font-light '>
                   <button className="font-sans font-light text-md hover:text-zinc-900 cursor-pointer hover:scale-115 transition text-gray-700" onClick={handleWhiteboard} >
                        Sketchboard
                    </button>
                    <button className="font-sans font-light text-md hover:text-zinc-900 cursor-pointer hover:scale-115 transition text-gray-700" onClick={handleTextEditor} >
                        Quick Note
                    </button>
                    <button className="font-sans font-light text-md hover:text-zinc-900 cursor-pointer hover:scale-115 transition text-gray-700" onClick={handleCodeEditor} >
                        Code Blocks
                    </button>
                    <button className="font-sans font-light text-md hover:text-zinc-900 cursor-pointer hover:scale-115 transition text-gray-700" onClick={handlePromodora} >
                        Promodora
                    </button>
                </div>
                <button>Back Home</button>
            </div>
            <div className="flex-1 flex items-center justify-center">
                { textEditor && <Notes />}
                {codeEditor && <Codes />}
                {promodora && <Timer />}
                {whiteboard && <Sketches />}
                {!codeEditor && !textEditor && !whiteboard && !promodora && <div><h1>Hey !!</h1> <p>Navigate to the suitable sections</p> </div>}
            </div>
            <div className='relative right-7 top-6 h-fit' onClick={handleBack}>
                <button className='flex bg-violet-200 cursor-pointer items-center p-4 rounded-2xl text-sm font-semibold gap-2 hover:bg-violet-300 transition'>
                    <IoMdAdd color='gray' className='hover:scale-102' size={20}/>
                </button>
            </div>
        </section>
    </>
  )
}

export default CentralBoard