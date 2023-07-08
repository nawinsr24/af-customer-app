import React from 'react';

const MenuDropdown = ({ source }) => {
    return (
        <li className="menu-item-has-children dropdown">
            {
                <a href={source.url}>
                   {source.text}
                </a>
            }
            {source.subMenu && (
                <ul className={source.subClass}>
                    {source.subMenu.map((subMenuItem, index) => (
                        <MenuDropdown source={subMenuItem} key={index} />
                    ))}
                </ul>
            )}
        </li>
    );
};

export default MenuDropdown;
