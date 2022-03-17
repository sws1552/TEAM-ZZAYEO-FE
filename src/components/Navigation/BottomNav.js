import React, { useState } from "react";
import "./BottomNav.css";
import { Link } from "react-router-dom";
// 사용할 아이콘 import

const BottomNav = () => {
  // 현재 선택된 아이콘을 관리하는 state
  const [activeNav, setActiveNav] = useState(1);
  console.log(activeNav);
  return (
    <nav className="wrapper">
      {/* 하단 네비게이션 최상위 태그 */}
      <Link to="/" className="nav-link" onClick={() => setActiveNav(1)}>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M10.0671 3.80718C10.5729 3.30134 11.2615 3 11.9999 3C12.7383 3 13.4269 3.30135 13.9327 3.80718L13.9402 3.81467L19.4285 9.42055L19.4284 18.2857C19.4284 19.7809 18.2093 21 16.7141 21H7.28557C5.79043 21 4.57129 19.7809 4.57129 18.2857L4.57131 9.42055L10.0671 3.80718ZM11.4843 5.21838L6.57131 10.2366L6.57129 18.2857C6.57129 18.6763 6.895 19 7.28557 19H16.7141C17.1047 19 17.4284 18.6763 17.4284 18.2857L17.4285 10.2366L12.5155 5.21838C12.3703 5.07475 12.1859 5 11.9999 5C11.8138 5 11.6294 5.07475 11.4843 5.21838Z"
            fill={activeNav === 1 ? "#4E49E2" : "#BDBDBD"}
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M10.0672 3.80718C10.573 3.30134 11.2616 3 12 3C12.7384 3 13.427 3.30134 13.9328 3.80718L13.9402 3.81451L21.7144 11.7517C22.1009 12.1462 22.0943 12.7794 21.6997 13.1658C21.3052 13.5523 20.6721 13.5457 20.2856 13.1512L12.5156 5.21844C12.3705 5.07477 12.1861 5 12 5C11.8139 5 11.6295 5.07477 11.4844 5.21844L3.7144 13.1512C3.32794 13.5457 2.69481 13.5523 2.30026 13.1658C1.90571 12.7794 1.89915 12.1462 2.2856 11.7517L10.0672 3.80718Z"
            fill={activeNav === 1 ? "#4E49E2" : "#BDBDBD"}
          />
        </svg>
      </Link>
      <Link to="/myplan" className="nav-link" onClick={() => setActiveNav(2)}>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M7 8C7 5.23858 9.23858 3 12 3C14.7614 3 17 5.23858 17 8H19C20.1046 8 21 8.89543 21 10V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V10C3 8.89543 3.89543 8 5 8H7ZM9 8H15C15 6.34315 13.6569 5 12 5C10.3431 5 9 6.34315 9 8ZM9 19V10H15V19H9ZM17 19V10H19V19H17ZM7 10H5L5 19H7V10Z"
            fill={activeNav === 2 ? "#4E49E2" : "#BDBDBD"}
          />
        </svg>
      </Link>
      <Link to="/chatlist" className="nav-link" onClick={() => setActiveNav(3)}>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M3 18.967V7C3 5.34314 4.34315 4 6 4H18C19.6569 4 21 5.34315 21 7V15C21 16.6569 19.6569 18 18 18H8.07037L6.68246 20.0819C6.68245 20.0819 6.68248 20.0818 6.68246 20.0819C5.57931 21.7366 3 20.9556 3 18.967ZM5.01832 18.9725L6.76251 16.3562C6.82552 16.2617 6.90682 16.1832 7 16.1242C7.12623 16.0442 7.27426 16 7.42815 16H18C18.5523 16 19 15.5523 19 15V7C19 6.44772 18.5523 6 18 6H6C5.44772 6 5 6.44772 5 7V18.967C5 18.9769 5.01283 18.9808 5.01832 18.9725Z"
            fill={activeNav === 3 ? "#4E49E2" : "#BDBDBD"}
          />
          <circle
            cx="8"
            cy="11"
            r="1"
            fill={activeNav === 3 ? "#4E49E2" : "#BDBDBD"}
          />
          <circle
            cx="12"
            cy="11"
            r="1"
            fill={activeNav === 3 ? "#4E49E2" : "#BDBDBD"}
          />
          <circle
            cx="16"
            cy="11"
            r="1"
            fill={activeNav === 3 ? "#4E49E2" : "#BDBDBD"}
          />
        </svg>
      </Link>
      <Link to="/login" className="nav-link" onClick={() => setActiveNav(4)}>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M17 8C17 10.7614 14.7614 13 12 13C9.23858 13 7 10.7614 7 8C7 5.23858 9.23858 3 12 3C14.7614 3 17 5.23858 17 8ZM12 11C13.6569 11 15 9.65685 15 8C15 6.34315 13.6569 5 12 5C10.3431 5 9 6.34315 9 8C9 9.65685 10.3431 11 12 11Z"
            fill={activeNav === 4 ? "#4E49E2" : "#BDBDBD"}
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12 13C8.68629 13 6 15.6863 6 19C6 19.5523 5.55228 20 5 20C4.44772 20 4 19.5523 4 19C4 14.5817 7.58172 11 12 11C16.4183 11 20 14.5817 20 19C20 19.5523 19.5523 20 19 20C18.4477 20 18 19.5523 18 19C18 15.6863 15.3137 13 12 13Z"
            fill={activeNav === 4 ? "#4E49E2" : "#BDBDBD"}
          />
        </svg>
      </Link>
    </nav>
  );
};

export default BottomNav;
