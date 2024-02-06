import Logo from "@components/Logo";
import menu from "@config/menu.json";
import socical from "@config/social.json";
import Social from "@layouts/components/Social";
import ThemeSwitcher from "@layouts/components/ThemeSwitcher";
import SearchModal from "@partials/SearchModal";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";
import Search from "./Search";


const Header = () => {
  // distructuring the main menu from menu object
  const { main } = menu;

  // states declaration
  const [searchModal, setSearchModal] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  ///categories
  const [selectMenu,setSelectMenu] = useState("All")
  

  //passing const to global Scope/variable
  // cate.search = search;
  // cate.menu = selectMenu;
  // const getSearchValue = () =>{
  //   return search,selectMenu;
  // }

  // Router
  const router = useRouter();

  // console.log(search,"selcet")


  //stop scrolling when nav is open
  useEffect(() => {
    if (showMenu) {
      document.body.classList.add("menu-open");
    } else {
      document.body.classList.remove("menu-open");
    }
    // router.replace(`/?search=${search}`)
  }, [showMenu]);

  return (
    <header className="header">
      <nav className="navbar container px-1 sm:px-8">
        <div className="order-0">
          <Logo />
        </div>
        <div className="flex items-center space-x-4 xl:space-x-8">
          <div
            className={`collapse-menu ${
              !showMenu && "translate-x-full"
            } lg:flex lg:translate-x-0`}
          >
            <button
              className="absolute right-6 top-11 lg:hidden"
              onClick={() => setShowMenu(false)}
            >
              <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20">
                <title>Menu Close</title>
                <polygon
                  points="11 9 22 9 22 11 11 11 11 22 9 22 9 11 -2 11 -2 9 9 9 9 -2 11 -2"
                  transform="rotate(45 10 10)"
                />
              </svg>
            </button>
            <Search Menu={selectMenu}/>
            {/* <div class="flex relative w-full">
              <div class="absolute inset-y-0 end-0 flex items-center ps-3 pr-3 pointer-events-none">
                <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                </svg>
              </div>
              <input type="search" onChange={(e)=>{setSearch(e.target.value)}} id="default-search" class="w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-full bg-gray-50 focus:ring-red-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Tags..(namaz..etc)" required/>
            </div> */}
            {/* <ul className="navbar-nav w-full md:w-auto md:space-x-1 lg:flex xl:space-x-2">
              <li className="nav-item ">
                {menuArray.map(item=>{
                  return(
                  <span key={item} className="nav-link inline-flex items-center">
                    {item}
                  </span>
                  )
                })}
              </li>
            </ul> */}
            <ul
              id="nav-menu"
              className="navbar-nav w-full md:w-auto md:space-x-1 lg:flex xl:space-x-2 cursor-pointer"
            >
              {main.map((menu, i) => (
                <React.Fragment key={`menu-${i}`}>
                  {menu.hasChildren ? (
                    <li className="nav-item nav-dropdown group relative">
                      <span
                        className={`nav-link ${
                          menu.children
                            .map((c)=> c.name)
                            .includes(selectMenu) && "active"
                            
                            // .map((c) => c.url)
                            // .includes(router.asPath) && "active"
                        } inline-flex items-center`}
                      >
                        {menu.name}
                        <svg
                          className="h-4 w-4 fill-current"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                        </svg>
                      </span>
                      <ul className="nav-dropdown-list hidden transition-all duration-300 group-hover:top-[46px] group-hover:block md:invisible md:absolute md:top-[60px] md:block md:opacity-0 md:group-hover:visible md:group-hover:opacity-100">
                        {menu.children.map((child, i) => (
                          <li
                            className="nav-dropdown-item"
                            key={`children-${i}`}
                            onClick={()=>setSelectMenu(child.name)}
                          >
                            <span className={`nav-link block`}>
                              {child.name}
                            </span>
                            {/* <Link
                              href={child.url}
                              className={`nav-dropdown-link block ${
                                router.asPath === child.url && "active"
                              }`}
                            >
                              {child.name}
                            </Link> */}
                          </li>
                        ))}
                      </ul>
                    </li>
                  ) : (
                    <li onClick={()=>setSelectMenu(menu.name)} className="nav-item cursor-pointer">
                      <span className={`nav-link block ${selectMenu === menu.name && "active"}`}>
                        {menu.name}
                      </span>
                      {/* <Link
                        href={`/?category=${selectMenu}?search=${search}`}
                        className={`nav-link block ${
                          selectMenu === menu.name && "active"
                        }`}
                      >
                        {menu.name}
                      </Link> */}
                    </li>
                  )}
                </React.Fragment>
              ))}
            </ul>
            {/* FAQS Button */}
            <button className="bg-transparent hover:bg-#2ba283-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded-full">
              FAQs
            </button>
          </div>
          <ThemeSwitcher />
          {/* Header search */}
          {/* <div
            className="search-icon"
            onClick={() => {
              setSearchModal(true);
            }}
          >
            <IoSearch />
          </div> */}
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white lg:hidden"
          >
            {showMenu ? (
              <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20">
                <title>Menu Close</title>
                <polygon
                  points="11 9 22 9 22 11 11 11 11 22 9 22 9 11 -2 11 -2 9 9 9 9 -2 11 -2"
                  transform="rotate(45 10 10)"
                />
              </svg>
            ) : (
              <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20">
                <title>Menu Open</title>
                <path d="M0 3h20v2H0V3z m0 6h20v2H0V9z m0 6h20v2H0V0z" />
              </svg>
            )}
          </button>
        </div>

        <SearchModal
          searchModal={searchModal}
          setSearchModal={setSearchModal}
        />
      </nav>
      {showMenu && (
        <div className="header-backdrop absolute top-0 left-0 h-[100vh] w-full bg-black/50 lg:hidden"></div>
      )}
    </header>
  );
};

export default Header;

// export const getSearchValue = ()=>{
//   return cate;
// }