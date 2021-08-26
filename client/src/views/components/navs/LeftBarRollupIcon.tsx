import { SlideInBarsIcon, SlideOutBarsIcon } from "../../../assets/icons";

const LeftBarRollupIcon = () => (
  <div
    className="leftbar__rollup-icon"
    onClick={(e) => {
      const parent = e.currentTarget.parentNode as HTMLElement;
      parent.classList.toggle("active");
    }}
  >
    <div className="leftbar__rollup-icon__icon">
      <SlideInBarsIcon />
      <SlideOutBarsIcon className="hidden" />
    </div>
  </div>
);

export default LeftBarRollupIcon;
