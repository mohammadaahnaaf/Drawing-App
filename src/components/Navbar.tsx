import { Link } from 'react-router-dom';

const Navbar = () => {

    return (
        <header className='flex bg-black p-5 items-center'>
      <div className='w-full max-w-7xl mx-auto flex justify-between items-center'>
        <Link to='/' className='text-white font-mono duration-300 hover:scale-105 hover:text-purple-500 text-2xl'>Drawing App</Link>
        <Link to='/new-drawing' className='px-5 hover:text-black duration-300 hover:scale-95 text-white font-semibold from-purple-600 to-teal-600 py-1 bg-gradient-to-tr hover:from-purple-300 hover:to-teal-300 rounded-full'>Draw New</Link>
      </div>
    </header>
    );
};

export default Navbar;