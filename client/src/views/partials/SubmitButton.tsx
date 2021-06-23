interface IProps {
  text: String;
}

const SubmitButton = ({ text }: IProps) => {
  return (
    <button
      className="bg-blue hover:bg-blue-dark text-black font-bold py-2 px-4 rounded"
      type="submit"
    >
      {text}
    </button>
  );
};

export default SubmitButton;
