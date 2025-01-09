import {
  User,
  CaretDown,
  ShoppingCart,
  SignOut,
  MapPin,
} from "@phosphor-icons/react";
import { Link } from "react-router-dom";
import { useCart } from "../../hooks/useCart";
import logoImg from "../../assets/images/logo.svg";
import { useState, useEffect, useRef } from "react";
import {
  Actions,
  Cart,
  CartItems,
  HeaderContainer,
  Location,
  DropdownMenu,
  DropdownItem,
} from "./styles";

export function Header() {
  const { cartTotalItems } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const userData = localStorage.getItem("username");

  const toggleMenu = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <HeaderContainer>
      <Link to="/">
        <img src={logoImg} alt="Logo" />
      </Link>

      <Actions>
        <Location>
          <MapPin size={22} weight="fill" />
          <div style={{ marginRight: "20px" }}>
            <h4 style={{ marginTop: "2px" }}>{userData} </h4>
          </div>
        </Location>

        <Cart to="/checkout">
          <ShoppingCart size={22} weight="fill" />
          {cartTotalItems > 0 && <CartItems>{cartTotalItems}</CartItems>}
        </Cart>

        <div style={{ position: "relative" }} ref={menuRef}>
          {/* Button để bật/tắt menu */}
          <button
            onClick={toggleMenu}
            style={{
              display: "flex",
              alignItems: "center",
              background: "none",
              border: "none",
              cursor: "pointer",
              position: "relative",
              top: "5px",
            }}
          >
            <User size={25} style={{ marginRight: "5px" }} />
            <CaretDown size={22} />
          </button>

          {/* Dropdown Menu */}
          {isMenuOpen && (
            <DropdownMenu>
              {localStorage.getItem("username") ? (
                <>
                  <DropdownItem>
                    <Link to="/edit-account">
                      <span>
                        <SignOut size={22} style={{ marginRight: "8px" }} />
                        Tài khoản
                      </span>
                    </Link>
                  </DropdownItem>
                  <DropdownItem>
                    <Link to="/infoOrder">
                      <span>
                        <SignOut size={22} style={{ marginRight: "8px" }} />
                        Đơn hàng
                      </span>
                    </Link>
                  </DropdownItem>
                  <DropdownItem
                    onClick={() => {
                      localStorage.clear(); // Xóa toàn bộ dữ liệu trong localStorage
                    }}
                  >
                    <Link to="/login">
                      <span>
                        <SignOut size={22} style={{ marginRight: "8px" }} />
                        Đăng xuất
                      </span>
                    </Link>
                  </DropdownItem>
                </>
              ) : (
                <>
                  <DropdownItem>
                    <Link to="/register">
                      <span>
                        <SignOut size={22} style={{ marginRight: "8px" }} />
                        Đăng ký
                      </span>
                    </Link>
                  </DropdownItem>
                  <DropdownItem>
                    <Link to="/login">
                      <span>
                        <SignOut size={22} style={{ marginRight: "8px" }} />
                        Đăng nhập
                      </span>
                    </Link>
                  </DropdownItem>
                </>
              )}
            </DropdownMenu>
          )}
        </div>
      </Actions>
    </HeaderContainer>
  );
}
