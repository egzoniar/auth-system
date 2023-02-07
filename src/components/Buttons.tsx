import { IconType } from "react-icons";
import { BsArrowRightShort } from "react-icons/bs";
import { NavLink } from "react-router-dom";

enum ButtonColors {
  Primary = "bg-blue-600 hover:bg-blue-700",
  Secondary = "bg-gray-500 hover:bg-gray-700",
  Danger = "bg-orange-700 active:bg-orange-800",
}

interface IButtonProps {
  title: string;
  color?: ButtonColors;
  icon?: any;
  type?: "button" | "submit" | "reset" | undefined;
  onClick?: () => void;
}

interface INavLinkProps extends IButtonProps {
  to: string;
}

const renderClasses = (color: ButtonColors, icon?: IconType) => {
  const inlineFlex = icon ? "inline-flex items-center pr-5" : "";
  return `
    ${color} ${inlineFlex} 
    text-white font-bold py-2 px-3 
    rounded-md text-sm drop-shadow-md 
    transition-colors
  `;
}

export const MButton = ({ title, icon, color = ButtonColors.Primary, ...rest }: IButtonProps) => { 

  return (
    <button {...rest} className={renderClasses(color, icon)}>
      <>{icon && icon} {title}</>
    </button>
  )
}

export const MNavLink = ({ title, icon, color = ButtonColors.Primary, ...rest }: INavLinkProps) => {

  return (
    <NavLink {...rest} className={renderClasses(color, icon)}>
      <>{icon && icon} {title}</>
    </NavLink>
  )
}

export const HomeItemLink = ({ to, title }: { to: string, title: string }) => {
  return (
    <NavLink to={to} className="inline-flex w-full justify-between items-center hover:bg-blue-600 hover:text-white p-2 rounded-[5px] transition-colors">
      {title} <BsArrowRightShort size={20} />
    </NavLink>
  );
}