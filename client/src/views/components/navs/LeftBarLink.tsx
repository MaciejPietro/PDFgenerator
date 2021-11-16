import { NavLink } from "react-router-dom";

interface IProps {
  name: string;
  children: any;
}

const LeftBarLink = ({ name, children }: IProps) => {
  return (
    <li>
      <NavLink to={name} className="leftbar__link">
        {children}
        <span className="leftbar__link__name">
          {name[0].toUpperCase() + name.slice(1)}
        </span>
      </NavLink>
    </li>
  );
};

export default LeftBarLink;
