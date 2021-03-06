import { SlideInBarsIcon, SlideOutBarsIcon } from "../../../assets/icons";

const LeftBarRollupIcon = () => (
  <div
    className="icon mt-auto ml-auto mr-2"
    onClick={(e) => {
      const parent = e.currentTarget.parentNode as HTMLElement;
      parent.classList.toggle("active");
    }}
  >
    <div className="w-12 h-12 flex justify-center items-center cursor-pointer relative">
      <SlideInBarsIcon />
      <SlideOutBarsIcon className="hidden" />
    </div>
  </div>
);

export default LeftBarRollupIcon;
