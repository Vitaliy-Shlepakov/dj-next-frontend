import React, {Fragment} from 'react';
import Link from "next/link";

const Pagination = ({
  events,
  page,
  total,
  perPage,
}) => {
  const lastPage = Math.ceil(total / perPage);

  return (
    <Fragment>
      {
        page > 1 && (
          <Link href={`/events?page=${page - 1}`} className="btn pagination">
            Prev
          </Link>
        )
      }
      {
        page < lastPage && (
          <Link href={`/events?page=${page + 1}`} className="btn pagination">
            Next
          </Link>
        )
      }
    </Fragment>
  );
};

export default Pagination;