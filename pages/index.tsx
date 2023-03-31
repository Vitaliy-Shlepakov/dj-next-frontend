import { Inter } from 'next/font/google'
import Link from "next/link";
import Layout from "@components/Layout";
import {API_URL} from "@config/index";
import {useCallback} from "react";
import EventItem from "@components/EventItem";

const inter = Inter({ subsets: ['latin'] })

export default function HomePage({events}) {
  const renderEvents = useCallback(() => {
    return events.map(evt => <EventItem key={evt.id} evt={evt}/>)
  }, [])

  return (
    <Layout>
      <h1>HOME</h1>
      {
        events.length
          ? renderEvents()
          : <h3>Empty list</h3>
      }

      {
        events.length > 0 && (
          <Link
            className="btn-secondary"
            href='/events'>Show All events</Link>
        )
      }
    </Layout>
  )
}

export async function getStaticProps() {
  const res = await fetch(`${API_URL}/api/events?populate=image`);
  const events = await res.json();

  return {
    props: { events: events.data.map(evt => ({
        ...evt.attributes,
        id: evt.id,
        image: evt.attributes?.image?.data?.attributes.formats})) },
    revalidate: 1
  }
}
