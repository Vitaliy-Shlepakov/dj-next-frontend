import { Inter } from 'next/font/google'
import Link from "next/link";
import Layout from "@components/Layout";
import {API_URL} from "@config/index";
import {useCallback} from "react";
import EventItem from "@components/EventItem";
import { EventType } from '@/types';

const inter = Inter({ subsets: ['latin'] })

const HomePage: React.FC<{events:EventType[]}> = ({events}) => {
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

export default HomePage;

export async function getStaticProps() {
  const res = await fetch(`${API_URL}/api/events?populate=image`);
  const events = await res.json();

  return {
    props: { events: events.data.map((evt: any) => ({
        ...evt.attributes,
        id: evt.id,
        image: evt.attributes?.image?.data?.attributes.formats || null})) },
    revalidate: 1
  }
}
