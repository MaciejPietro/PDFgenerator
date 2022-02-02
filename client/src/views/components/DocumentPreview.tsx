interface IProps {
  url: string;
  closePreview: () => void;
}

const DocumentPreview: React.FC<IProps> = ({ url, closePreview }) => {
  return (
    <div
      onClick={closePreview}
      className={`fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-80 z-30 ${
        url || "hidden"
      }`}
    >
      <div className="w-2/3 max-w-4xl h-4/5">
        {url && (
          <embed
            className="w-full h-full"
            type="application/pdf"
            src={`${url}`}

            // src={`${url}#toolbar=0`}
          />
        )}
      </div>
    </div>
  );
};

export default DocumentPreview;
