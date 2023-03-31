import React, {ReactNode} from 'react';
import Head from "next/head";
import styles from '@styles/Layout.module.css'
import Header from "@components/Header";
import Footer from "@components/Footer";
import ShowCase from "@components/ShowCase";
import {useRouter} from "next/router";

type LayoutProps = {
  title: string;
  keywords?: string;
  description?: string;
  children: ReactNode
}

const Layout: React.FC<LayoutProps> = ({
   title= 'DJ Event | Find the hottest party',
   keywords = 'music, dj, events',
   description,
   children
 }) => {
  const route = useRouter().route;
  return (
    <>
      <Head>
        <title>{ title }</title>
        <meta name='description' content={description} />
        <meta name='keywords' content={keywords} />
      </Head>
      <Header/>
      { route === '/' && <ShowCase/> }
      <div className={styles.container}>
        { children }
      </div>
      <Footer/>
    </>

  );
};

export default Layout;