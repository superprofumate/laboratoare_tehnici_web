"use client"

import styles from "./header.module.scss";
import Image from "next/image";
import Link from "next/link";
import { RiArrowDropRightLine } from "react-icons/ri";
import { CiSearch } from "react-icons/ci";
import Button from "@/components/ui/button/button.jsx";
import { useState } from "react";

const labs = [
  {
    id: 2,
    name: "lab2",
    items: [
      {
        name: "8-bit World",
        link: "/lab2/8bitWorld"
      },
      {
        name: "Mario",
        link: "/lab2/mario"
      }
    ]
  },
  {
    id: 3,
    name: "lab3",
    link: "/lab3"
  },
  {
    id: 4,
    name: "lab4",
    link: "/lab4"
  },
  {
    id: 5,
    name: "lab5",
    link: "/lab5"
  },
  {
    id: 6,
    name: "lab6",
    link: "/lab6"
  },
  {
    id: 7,
    name: "lab7",
    link: "/lab7"
  },
  {
    id: 8,
    name: "lab8",
    link: "/lab8"
  },
  {
    id: 9,
    name: "lab9",
    link: "/lab9"
  },
]

export default function Header() {
  const [openDropdown, setOpenDropdown] = useState(false);

  const handleDropdown = (id) => {
    openDropdown === id ? setOpenDropdown(false) : setOpenDropdown(id);
  }

  return (
    <header className={`text ${styles.header}`}>
      <div className={styles.logoWrapper}>
        <Link href="/">
          <Image
            width={300}
            height={100}
            alt="logo"
            src="/logo/tehnici-web-logo.png"
          />
        </Link>
      </div>

      <nav className={styles.navBar}>
        {
          labs.map((lab, idx) => {
            const isOpenDropdown = lab.id === openDropdown;

            return (
              <div key={idx} className={styles.navItem}>
                {
                  lab?.items ? (
                    <>
                      <span className={`${styles.arrowDropdown} text--label`} onClick={() => { handleDropdown(lab.id); }}>
                        {lab.name} <RiArrowDropRightLine size={20} style={{ transform: isOpenDropdown ? "rotate(90deg)" : null, transition: "transform 0.2s ease"}} />
                      </span>
                      {
                        isOpenDropdown && (
                          <div className={styles.dropdown}>
                            {
                              lab.items.map((child, idx) => {
                                return(
                                  <span key={idx} className="text text--label">
                                    <Link href={child.link}>
                                      {child.name}
                                    </Link>
                                  </span>
                                );
                              })
                            }
                          </div>
                        )
                      }
                    </>
                  ) : (
                    <span className="text--label">
                      <Link href={lab.link}>
                        {lab.name}
                      </Link>
                    </span>
                  )
                }
              </div>
            );
          })
        }
      </nav>

      <div className={styles.rightSection}>
        <CiSearch size={30} />
        <Button design={"primary"} label={"Search Engine"} />
      </div>
    </header >
  );
}