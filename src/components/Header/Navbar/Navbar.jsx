import React, { useState } from 'react';
import AsakaLogo from '../../../assets/images/asakalogo.png';
import { Link, NavLink } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

const Navbar = ({ onLanguageChange }) => {
  const { t, i18n } = useTranslation('common');
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLanguageChange = (lang) => {
    i18n.changeLanguage(lang);
    onLanguageChange(lang);
  };

  return (
    <div>
      <div className="container mx-auto p-4">
        <div className="flex items-center justify-between p-2">
          <div>
            <Link className="inline-block" to={'/'}>
              <img
                className="logo"
                src={AsakaLogo}
                alt={t('logoAlt')} // Add translation for logo alt text if needed
                width={228}
                height={28}
              />
            </Link>
          </div>
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-800 focus:outline-none"
            >
              {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
          <ul
            className={`flex-col md:flex-row md:flex items-center space-x-0 md:space-x-[28px] text-[16px] font-medium absolute md:static bg-white w-full md:w-auto transition-all duration-300 ease-in-out ${
              isOpen
                ? 'top-16 left-0 opacity-100'
                : 'top-[-490px] left-0 opacity-0 md:opacity-100'
            }`}
          >
            <NavLink
              className={({ isActive }) =>
                `block relative md:inline-block px-4 py-2 md:p-0 animation ${
                  isActive ? 'text-red-500' : ''
                }`
              }
              to="/vacancies"
              onClick={() => setIsOpen(false)}
            >
              {t('vacancies')}
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                `block relative md:inline-block px-4 py-2 md:p-0 animation ${
                  isActive ? 'text-red-500' : ''
                }`
              }
              to="/digital"
              onClick={() => setIsOpen(false)}
            >
              {t('it-vacancies')}
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                `block relative md:inline-block px-4 py-2 md:p-0 animation ${
                  isActive ? 'text-red-500' : ''
                }`
              }
              to="/career"
              onClick={() => setIsOpen(false)}
            >
              {t('career')}
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                `block relative md:inline-block px-4 py-2 md:p-0 animation ${
                  isActive ? 'text-red-500' : ''
                }`
              }
              to="/blogs"
              onClick={() => setIsOpen(false)}
            >
              {t('blogs')}
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                `block relative md:inline-block px-4 py-2 md:p-0 animation ${
                  isActive ? 'text-red-500' : ''
                }`
              }
              to="/about"
              onClick={() => setIsOpen(false)}
            >
              {t('about')}
            </NavLink>
            <div className="flex space-x-2 mt-2 md:mt-0">
              <button
                onClick={() => handleLanguageChange('ru')}
                className="text-gray-800 focus:outline-none"
              >
                RU
              </button>
              <button
                onClick={() => handleLanguageChange('uz')}
                className="text-gray-800 focus:outline-none"
              >
                UZ
              </button>
            </div>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
