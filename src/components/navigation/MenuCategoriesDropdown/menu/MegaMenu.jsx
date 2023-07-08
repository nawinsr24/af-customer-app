import React from 'react';

const MegaMenu = ({ source }) => {
    let megaContentView;
    if (source) {
        megaContentView = source.megaContent.map((item) => (
            <div className="mega-menu__column" key={item.heading}>
                <h4>{item.heading}</h4>
                <ul className="mega-menu__list">
                    {item.megaItems.map((subItem) => (
                        <li key={subItem.text}>
                            <a href={subItem.url} as={subItem.url}>
                            {subItem.text}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        ));
    }
    return (
        <li className="menu-item-has-children has-mega-menu">
           
                <a href={source.url !== '' ? source.url : '/'}>
                    {source.icon && <i className={source.icon}></i>}
                    {source.text}
                </a>
           
            <div className="mega-menu">{megaContentView}</div>
        </li>
    );
};

export default MegaMenu;
