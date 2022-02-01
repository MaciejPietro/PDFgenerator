const Clue: React.FC = ({ children }) => {
  return (
    <span className="clue mx-2 relative">
      <div className="clue__mark w-5 h-5 bg-gray-200 border flex items-center justify-center text-xs rounded-full cursor-help">
        ?
      </div>
      <div className="clue__answer opacity-0 invisible bg-gray-200 p-2 absolute top-0 left-0 text-sm w-36 z-10">
        {children}
      </div>
    </span>
  );
};

export default Clue;
