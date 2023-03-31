import React from 'react';
import Layout from "@components/Layout";
import {API_URL} from "@config/index";
import styles from '@styles/Event.module.css';
import Image from "next/image";
import Link from "next/link";
import { FaPencilAlt, FaTimes } from 'react-icons/fa'

const EventPage = ({
  evt
 }) => {
  console.log(evt);
  const deleteEvent = () => {};
  return (
    <Layout>
      <div className={styles.event}>
        <div className={styles.event}>
          <div className={styles.controls}>
            <Link href={`/events/edit/${evt.id}`}>
                <FaPencilAlt /> Edit Event
            </Link>
            <a href='#' className={styles.delete} onClick={deleteEvent}>
              <FaTimes /> Delete Event
            </a>
          </div>

          <span>
          {new Date(evt.date).toLocaleDateString()} at {evt.time}
        </span>
          <h1>{evt.name}</h1>
          {evt.image.small.url && (
            <div className={styles.image}>
              <Image
                src={evt.image.small.url}
                width={960}
                height={600}
                alt={evt.description}
              />
            </div>
          )}

          <h3>Performers:</h3>
          <p>{evt.performers}</p>
          <h3>Description:</h3>
          <p>{evt.description}</p>
          <h3>Venue: {evt.venue}</h3>
          <p>{evt.address}</p>

          <Link href='/events'>
            <span className={styles.back}>{'<'} Go Back</span>
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default EventPage;

export async function getStaticPaths () {
  const res = await fetch(`${API_URL}/api/events`);
  const events = await res.json();
  const paths = events.data.map((evt) => ({
    params: {slug: evt.attributes.slug}
  }))
  return {
    paths: paths,
    fallback: false
  };
}

export async function getStaticProps({params}) {
  const {slug} = params;

  const res = await fetch(`${API_URL}/api/events?slug=${slug}&populate=image`);
  const events = await res.json();

  return {
    props: { evt: (events).data.map(evt => ({
        ...evt.attributes,
        id: evt.id,
        image: evt.attributes?.image?.data?.attributes.formats
    }))[0] },
    revalidate: 1
  }
}