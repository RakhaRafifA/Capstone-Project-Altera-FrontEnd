import React, { useState } from "react";

/** GraphQL */
import { gql, useQuery } from "@apollo/client";

/** Styles */
import styles from "./style.module.css";

/** Components */
import TitleLogo from "../TitleLogo";
import NavItem from "../NavItem";

/** Icons */
import {
  MdVerifiedUser,
  MdAddToPhotos,
  MdEventAvailable,
  MdDashboardCustomize,
  MdVpnKey
} from "react-icons/md";
import { IoIosPeople } from "react-icons/io";
import { TiNews } from "react-icons/ti";
import { FiLogOut } from "react-icons/fi";
import { FaUserCircle } from "react-icons/fa";

const Navbar = ({ withMember }) => {

  const logo = [
    <MdDashboardCustomize />,
    <FaUserCircle />,
    <MdVerifiedUser />,
    <IoIosPeople />,
    <MdEventAvailable />,
    <TiNews />,
    <MdAddToPhotos />,
    <MdVpnKey />,
    <FiLogOut />
  ];

  const [navItems, setNavItems] = useState(null);

  const GET_NAVIGATION_ITEMS = gql`
    query getNavigationItems {
      navigation_items {
        id
        link
        name
      }
    } 
  `;

  const { loading } = useQuery(GET_NAVIGATION_ITEMS, {
    onCompleted: (data) => {
      const temp = data?.navigation_items?.map((item, itemIdx) => {
        return {
          id: item.id,
          name: item.name,
          logo: logo[itemIdx],
          link: item.link
        }
      })
      setNavItems(temp);
    }
  });

  return (
    <div className={styles.container}>
      {
        !loading && navItems ?
          <>
            <TitleLogo className={styles.logo} />
            {
              withMember ?
                navItems.map((item) => {
                  return (
                    <NavItem
                      key={item.id}
                      id={item.id}
                      logo={item.logo}
                      name={item.name}
                      link={item.link}
                    />
                  );
                })
                :
                navItems.map((item) => {
                  return (
                    <>
                      {item.name !== "Manage Admin" ? (
                        <NavItem
                          id={item.id}
                          logo={item.logo}
                          name={item.name}
                          link={item.link}
                        />
                      ) : (
                        ""
                      )}
                    </>
                  );
                })
            }
          </>
          :
          <></>
      }
    </div>
  );
};

export default Navbar;
