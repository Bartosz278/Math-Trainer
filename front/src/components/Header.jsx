function Header() {
  return (
    <div className="relative p-10 text-center shadow-lg overflow-hidden">
      <div className="flex items-center justify-center space-x-4 animate-fade-in">
        <img src="./src/assets/logo.png" className="w-20 animate-bounce" alt="Logo" />
        <h1 className="text-6xl font-Sriracha text-blue-900 tracking-wider">Mathify</h1>
      </div>
      <p className="mt-5 text-2xl text-gray-700">Train Your Math Skills</p>
      <div className="absolute inset-0 pointer-events-none z-[-1] bg-gradient-to-r from-gray-300/50 via-transparent to-gray-300/50"></div>
    </div>
  );
}

export default Header;
