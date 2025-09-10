

const GoogleLogin = () => {

    const handleLogin = () => {
        window.location.href = 'http://localhost:5000/auth/google'
        console.log('logging button clicked')
    }

  return (
    <>
        <div className='items-center w-fit h-fit p-4'>
            <button className='bg-gray-300 p-4 rounded-2xl cursor-pointer hover:scale-105 transition' onClick={handleLogin}>Login via Google</button>
        </div>
    </>
  )
}

export default GoogleLogin