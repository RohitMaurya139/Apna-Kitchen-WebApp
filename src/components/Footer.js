const Footer = () => {
  return (
    <footer className="w-full bg-gray-100 text-gray-700 py-4 px-2 flex flex-wrap justify-center items-center gap-x-2 gap-y-1 text-center text-sm mt-8 border-t border-gray-200">
      <span>
        Developed by&nbsp;
        <a
          href="https://portfolio-rohit-maurya-webdev.netlify.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-800 font-medium underline"
        >
          Rohit Maurya
        </a>
      </span>
      <span className="hidden sm:inline">&nbsp;|&nbsp;</span>
      <span className="flex items-center gap-1">
        with <i className="fa-solid fa-heart text-red-500"></i>
      </span>
      <span className="hidden sm:inline">&nbsp;|&nbsp;</span>
      <span className="flex items-center gap-1">
        All rights reserved <i className="fa-solid fa-copyright"></i> 2025
      </span>
      <span className="font-bold text-gray-800 ml-2">
        Apna<span className="text-yellow-600">&nbsp;Kitchen</span>
      </span>
    </footer>
  );
};

export default Footer;
