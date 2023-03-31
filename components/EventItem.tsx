import React from 'react';
import Link from "next/link";
import Image from "next/image";

import styles from '@styles/EventItem.module.css';


const EventItem = ({
 evt,
}) => {
  return (
    <div className={styles.event}>
      <div className={styles.img}>
        <Image
          src={evt.image ? evt.image.thumbnail.url: '/images/event-default.png'}
          width="170"
          height="100"
          alt={evt.description}
        />
      </div>
      <div className={styles.info}>
        <span>
          {new Date(evt.date).toLocaleDateString()} at {evt.time}
        </span>
        <h3>{evt.name}</h3>
      </div>

      <div>
        <Link href={`/events/${evt.slug}`} className={styles.btn}>
          details
        </Link>
      </div>
    </div>
  );
};

export default EventItem;