import { useState, useEffect, useRef } from "react";
import { useAuthContext } from "../../../context/authContext";
import { useNavigate } from "react-router-dom";

export const useHeader = () => {
  const navigate = useNavigate();
  const { currentUser, invalidateToken } = useAuthContext();
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

  const logOut = () => {
    invalidateToken();
    navigate("/login");
  };

  const goToAccount = () => {
    navigate("/profile");
    setShowUserMenu(false);
  };

  return {
    showUserMenu,
    toggleUserMenu,
    menuRef,
    currentUser,
    logOut,
    goToAccount,
  };
};
