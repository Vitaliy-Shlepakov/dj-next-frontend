import React, {useContext, useEffect, useState} from 'react';
import {FaUser} from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Layout from "@components/Layout";
import styles from '@styles/AuthForm.module.css'
import Link from "next/link";
import { AuthContext} from '@context/AuthContext';

const LoginPage = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const {login, error} = useContext(AuthContext);

  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    login({
      email,
      password
    });
  };

  useEffect(() => {
    if (error) {
      toast.error(error)
    }
  }, [error])

  return (
    <Layout title="User login">
      <div className={styles.auth}>
        <h1>
          <FaUser/>
          <span>&nbsp;Log In</span>
        </h1>
        <ToastContainer />
        <form onSubmit={handleSubmitForm}>
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
            />
          </div>

          <input
            type="submit"
            value="Login"
            className="btn"
          />
        </form>

        <p> Don't have an account? &nbsp;
          <Link
            href={'/account/register'}
            className="navigation"
          >
            Register
          </Link>
        </p>
      </div>
    </Layout>
  );
};

export default LoginPage;