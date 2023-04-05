import React from 'react';
import Layout from "@components/Layout";
import {API_URL} from "@config/index";
import styles from '@styles/Event.module.css';
import Image from "next/image";
import Link from "next/link";
import { FaPencilAlt, FaTimes } from 'react-icons/fa'
import { EventType } from '@/types';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router';

const EventPage:React.FC<{evt: EventType}> = ({
  evt
 }) => {
  const router = useRouter();
  const imageUrl = evt?.image?.medium?.url || evt?.image?.thumbnail?.url;
  console.log(evt);

  const deleteEvent = async () => {
    if (confirm("Are you sure ?")){
      const res: Response = await fetch(`${API_URL}/api/events/${evt.id}`, {
        method: 'DELETE'
      });
      const data = await res.json();
      if(!res.ok) {
        toast.error('Something went wrong!')
      } else {
        await router.push('/events')
      }
    }
  };

  return (
    <Layout>
      <div className={styles.event}>
        <div className={styles.event}>
          <div className={styles.controls}>
            <Link href={`/events/edit/${evt.slug}`}>
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
          <ToastContainer />
          <div className={styles.image}>
              <Image
                src={imageUrl ? imageUrl : '/images/event-default.png'}
                width={960}
                height={600}
                alt={evt.description}
              />
            </div>

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

  const res = await fetch(`${API_URL}/api/events/${slug}?populate=image`);
  const event = await res.json();
  const normalizeEvent = {
    ...event.data.attributes,
    id: event.data.id,
    image: event.data.attributes.image?.data?.attributes.formats || null,
  }

  return {
    props: { evt: normalizeEvent },
    revalidate: 1
  }
}