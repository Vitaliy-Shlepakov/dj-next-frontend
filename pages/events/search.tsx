import { Inter } from 'next/font/google'
import Link from "next/link";
import Layout from "@components/Layout";
import {API_URL} from "@config/index";
import {useCallback} from "react";
import EventItem from "@components/EventItem";
const qs = require('qs');
import {useRouter} from "next/router";

export default function SearchPage ({events}) {
  const router = useRouter();

  const renderEvents = useCallback(() => {
    return events.map(evt => <EventItem key={evt.id} evt={evt}/>)
  }, [])

  return (
    <Layout>
      <h1>Search Results for {router.query.term}</h1>
      {
        events.length
          ? renderEvents()
          : <h3>Empty list</h3>
      }
      <Link href="/events">Go back to events</Link>
    </Layout>
  )
}

export async function getServerSideProps({query: {term}}) {

  const query = qs.stringify({
    filters: {
      $or: [
        { name: { $contains: term } },
        { description: { $contains: term } },
        { venue: { $contains: term } }
      ]
    },
  })
  const res = await fetch(`${API_URL}/api/events?${query}&populate=image`);
  const events = await res.json();


  return {
    props: { events: events.data.map(evt => ({
        ...evt.attributes,
        id: evt.id,
        image: evt.attributes?.image?.data?.attributes.formats || null})
      )},
  }
}
