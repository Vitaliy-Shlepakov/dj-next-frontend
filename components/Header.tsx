import Link from 'next/link'
import styles from '@/styles/Header.module.css'
import Search from "@components/Search";
import { FaSignInAlt, FaSignOutAlt } from 'react-icons/fa';
import {AuthContext} from '@context/AuthContext';
import {useContext} from "react";

export default function Header() {

  const {user, logout} = useContext(AuthContext);

  const renderLogInSet = () => (
    <>
      <li>
        <Link href="/add">Add</Link>
      </li>
      <li>
        <Link href="/account/dashboard">Dashboard</Link>
      </li>
      <li>
        <button className="btn account" onClick={logout}>
          <FaSignOutAlt/>
          <span>Logout</span>
        </button>
      </li>
    </>
  );

  const renderLogOutSet = () => (
    <li>
      <Link href="/account/login" className="btn account">
        <FaSignInAlt/>
        <span>Login</span>
      </Link>
    </li>
  )

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link href='/'>
          DJ Events
        </Link>
      </div>
      <Search/>
      <nav>
        <ul>
          <li>
            <Link href="/events">Events</Link>
          </li>
          <li>
            <Link href="/about">About</Link>
          </li>
          {
            user
              ? renderLogInSet()
              : renderLogOutSet()
          }
        </ul>
      </nav>
    </header>
  )
}