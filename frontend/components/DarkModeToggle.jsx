import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi2";
import ButtonIcon from "./ButtonIcon";
import { useDarkMode } from "../src/context/DarkModeContext";

function DarkModeToggle() {
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  return (
    <ButtonIcon onClick={toggleDarkMode}>
      {isDarkMode ? (
        <HiOutlineSun className='fs-8' />
      ) : (
        <HiOutlineMoon className='fs-8' />
      )}
    </ButtonIcon>
  );
}

export default DarkModeToggle;
