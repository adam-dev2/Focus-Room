import TextEditor from './components/TextEditor'
import Dashboard from './pages/Dashboard'

const App = () => {
  return (
    <>
      {/* <div className='bg-gray-100 text-black h-screen w-screen flex items-center justify-center'>
        <div className="w-full max-w-2xl">
          <h1 className="text-2xl font-bold mb-4 text-center">Rich Text Editor</h1>
          <TextEditor />
        </div>
      </div> */}
      <Dashboard />
    </>
  )
}

export default App