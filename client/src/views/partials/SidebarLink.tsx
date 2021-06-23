import { NavLink } from "react-router-dom";

interface IProps {
  name: string;
  children: any;
}

const SidebarLink = ({ name, children }: IProps) => {
  return (
    <li>
      <NavLink
        to={"/" + name}
        className="flex items-center p-3 hover:bg-gray-200 rounded transition-colors overflow-hidden"
      >
        {children}
        <span className="sidebar__link-name">
          {name[0].toUpperCase() + name.slice(1)}
        </span>
      </NavLink>
    </li>
  );
};

export default SidebarLink;
