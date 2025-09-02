import CodeEditor from './components/CodeEditor'
import RichTextEditor from './components/RichTextEditor'
import TextEditor from './components/TextEditor'
import Tiptap from './components/Tiptap'
import Whiteboard from './components/Whiteboard'
import CentralBoard from './pages/CentralBoard'
import Dashboard from './pages/Dashboard'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'

const App = () => {
  return (
    <>
      {/* <div className='bg-gray-100 text-black h-screen w-screen flex items-center justify-center'>
        <div className="w-full max-w-2xl">
          <h1 className="text-2xl font-bold mb-4 text-center">Rich Text Editor</h1>
          <TextEditor />
        </div>
      </div> */}
      <div className="h-screen w-screen flex items-center justify-center">
      <Router>
        <Routes>
          <Route path='/' element={<CentralBoard />} />
          <Route path='/focus-room' element={<Dashboard />} />
          <Route path='/text' element={<RichTextEditor />} />
          <Route path='/code' element={<CodeEditor />} />
        </Routes>
      </Router>
      </div>
      {/* <Whiteboard /> */}
      {/* <Tiptap /> */}
      {/* <div className='flex justify-between gap-10 bg-zinc-900 w-screen h-screen'>
         <RichTextEditor />
        <CodeEditor />
      </div> */}
    </>
  )
}

export default App