export type EventType = {
  id: string;
  name: string;
  slug: string;
  venue: string;
  performers: string;
  address: string;
  date: string;
  time: string;
  description: string;
  createdAt?: string;
  updatedAt?: string;
  publishedAt?: string;
  image?: ImageNormalizeType;
}

type ImageRawType = {
  data: {
    id: string;
    attributes: {
      formats: {
        thumbnail: {
          src: string;
        },
        small: {
          src: string;
        },
        large: {
          src: string;
        },
        medium: {
          src: string;
        },
      }
    }
  }
}
type ImageNormalizeType = {
  thumbnail: {
    url: string;
  },
  small: {
    url: string;
  },
  large: {
    url: string;
  },
  medium: {
    url: string;
  },
}