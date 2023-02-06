

const MainBanner = () => {
  return (
    <div 
    style={{backgroundImage: 'url("/images/montanha.jpg")'}}
    className='flex p-10 justify-between items-center bg-cover bg-center  '
    >
        <div className=' flex flex-col justify-between items-center column my-10 px-10 py-10 space-y-5'>
        <h1 className='text-6xl text-center text-white max-w-xl font-serif'>
          <span className='underline decoration-white decoration-4'> Lorem ipsum</span> dolor sit, amet consectetur adipisicing elit!
        </h1>
        <h2 className="text-white mx-auto w-full md:w-1/2
        ">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Est quis ex quam nisi porro delectus odio doloribus ipsa at amet nihil perspiciatis repudiandae hic optio officia, obcaecati, corporis suscipit aliquam.
        </h2>
        </div>
        
    </div>
  )
}

export default MainBanner