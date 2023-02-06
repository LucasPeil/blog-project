import Link from "next/link"


const Header = () => {
  return (
    <header className="flex justify-between p-5 max-w-7xl mx-auto">
        <div className=" flex items-center space-x-5">
            <Link href="/">
                <img className="w-44 object-contain cursor-pointer"
                 src="https://links.papareact.com/yvf" 
                 alt="" />
            </Link>
            <div className=" hidden md:inline-flex items-center space-x-5">
                <Link href="#">Sobre</Link>
                <Link href="#">Contato</Link>
                <Link href="#" className="text-white bg-green-600 px-4 py-1 rounded-full transition ease-in-out duration-300 hover:bg-green-700 cursor-pointer">
                    Seguir
                </Link>
            </div>

        </div>

        <div  className="flex items-center space-x-5 text-green-600">
            <Link href="#" className="border-green-400">Login</Link>
            <Link href="#" className="px-4 py-1 border-2 border-green-600/50  rounded-full  transition ease-in-out duration-300 hover:bg-green-600 hover:text-white">Crie sua conta!</Link>
        </div>
    </header>
  )
}

export default Header
