import Layout from "@components/Layout";
import {API_URL} from "@config/index";
import React, {useCallback} from "react";
import EventItem from "@components/EventItem";
import { EventType } from '@/types';
import Pagination from "@components/Pagination";
const qs = require('qs');

const PER_PAGE = 2;

type EventsPageType = {
  events: Array<EventType>;
  total: number;
  page: number;
}

const EventsPage: React.FC<EventsPageType> = ({
  events,
  total,
  page,
}) => {

  const renderEvents = useCallback(() => {
    return events.map(evt => <EventItem key={evt.id} evt={evt}/>)
  }, [])

  return (
    <Layout>
      <h1>Events Pages</h1>
      {
        events.length
          ? renderEvents()
          : <h3>Empty list</h3>
      }
      <Pagination
        page={page}
        total={total}
        perPage={PER_PAGE}
      />
    </Layout>
  )
}

export default EventsPage;

export async function getServerSideProps({query: {page}}) {
  const qsQuery = qs.stringify({
    pagination: {
      page,
      pageSize: PER_PAGE,
    },
  })
  const eventsResponse = await fetch(`${API_URL}/api/events/count`);
  const total = await eventsResponse.json();
  const eventResponse = await fetch(`${API_URL}/api/events?${qsQuery}&populate=image`);
  const event = await eventResponse.json();

  return {
    props: { events: event.data.map(evt => ({
        ...evt.attributes,
        id: evt.id,
        image: evt.attributes?.image?.data?.attributes.formats || null,
    })),
      page: Number(page),
      total,
    },
  }
}
