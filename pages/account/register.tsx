import React, {useContext, useState} from 'react';
import {FaUser} from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Layout from "@components/Layout";
import styles from '@styles/AuthForm.module.css'
import Link from "next/link";
import {AuthContext} from "@context/AuthContext";

const RegisterPage = () => {
  const [username, setUserName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordConfirm, setPasswordConfirm] = useState<string>('');
  const {register} = useContext(AuthContext);

  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== passwordConfirm) {
        toast.error('Password do not match!');
        return;
    };
    register({
      username,
      email,
      password,
    })
  };

  return (
    <Layout title="User login">
      <div className={styles.auth}>
        <h1>
          <FaUser/>
          <span>&nbsp;Register</span>
        </h1>
        <ToastContainer />
        <form onSubmit={handleSubmitForm}>
          <div>
            <label htmlFor="username">User name</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setUserName(e.target.value)
            }
            />
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setEmail(e.target.value)
            }
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setPassword(e.target.value)
            }
            />
          </div>
          <div>
            <label htmlFor="passwordConfirm">Password confirm</label>
            <input
              type="password"
              id="passwordConfirm"
              value={passwordConfirm}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setPasswordConfirm(e.target.value)
            }
            />
          </div>

          <input type="submit" value="Login" className="btn"/>
        </form>

        <p>
          Already have an account? &nbsp;
          <Link
            href={'/account/login'}
            className="navigation"
          >
            Login
          </Link>
        </p>

      </div>
    </Layout>
  );
};

export default RegisterPage;