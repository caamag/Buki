import { useState, useEffect, useRef } from "react";

export const useHeader = () => {
  const [showUserMenu, setShowUserMenu] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleUserMenu = () => {
    setShowUserMenu(!showUserMenu);
  };

  useEffect(() => {
    if (!showUserMenu) return;
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        toggleUserMenu();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showUserMenu, toggleUserMenu]);

  return {
    showUserMenu,
    toggleUserMenu,
    menuRef,
  };
};
