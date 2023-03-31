// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import {events} from './data.json'

type Data = {
  name: string
}

type evtType = {
  slug: string;
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const slug = req.query?.slug;
  const evt = events.filter((evt: evtType) => evt.slug === slug)

  if (req.method === 'GET') {
    res.status(200).json(evt)
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).json({message: `Method ${req.method} is nor allowed`})
  }
}
