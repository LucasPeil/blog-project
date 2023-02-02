

const MainBanner = () => {
  return (
    <div className='flex justify-between items-center
    bg-yellow-400 border-y border-2 border-black py-10 lg:py-0'>
        <div className=' px-10 space-y-5'>
        <h1 className='text-6xl max-w-xl font-serif'>
          <span className='underline decoration-black decoration-4'> Lorem ipsum</span> dolor sit, amet consectetur adipisicing elit!
        </h1>
        <h2>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Est quis ex quam nisi porro delectus odio doloribus ipsa at amet nihil perspiciatis repudiandae hic optio officia, obcaecati, corporis suscipit aliquam.
        </h2>
        </div>
        <img className='hidden md:inline-flex h-32 lg:h-full' 
            src="https://accountabilitylab.org/wp-content/uploads/2020/03/Medium-logo.png" 
            alt="" />
    </div>
  )
}

export default MainBanner