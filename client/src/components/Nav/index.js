import React from "react";

function Nav(props) {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <a className="navbar-brand" href="/">
        Book Stash
      </a>
          <ul className="navbar-nav mr-auto mt-2 mt-lg-0 float-right">
          {props.menuItems.map((menuItem, index) => {
              return (
                  <li className={"nav-item"}>
                      <a className="nav-link" href={menuItem.href}>
                          {menuItem.name}
                      </a>
                  </li>

              )
              })}   
         </ul>
    </nav>
  );
}

export default Nav;
