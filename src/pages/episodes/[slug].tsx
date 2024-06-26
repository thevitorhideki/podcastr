import { GetStaticPaths, GetStaticProps } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import Head from 'next/head'
import { format, parseISO } from 'date-fns'
import { ptBR } from 'date-fns/locale'

import db from '../../services/api'
import { convertDurationToTimeString } from '../../utils/convertDurationToTimeString'
import { usePlayer } from '../../contexts/PlayerContext'

import {
  Description,
  EpisodeWrapper,
  ThumbnailContainer,
  EpisodeContainer,
} from '../styles/episode'

type Episode = {
  id: string
  title: string
  description: string
  thumbnail: string
  members: string
  duration: number
  durationAsString: string
  url: string
  publishedAt: string
}

type EpisodeProps = {
  episode: Episode
}

export default function Episode({ episode }: EpisodeProps) {
  const { play } = usePlayer()
  return (
    <EpisodeWrapper>
      <Head>
        <title>Podcastr | {episode.title}</title>
      </Head>
      <EpisodeContainer>
        <ThumbnailContainer>
          <Link href={'/'}>
            <button type="button">
              <img src="/arrow-left.svg" alt="Back" />
            </button>
          </Link>
          <Image
            width={700}
            height={160}
            src={episode.thumbnail}
            alt={episode.title}
          />
          <button
            type="button"
            onClick={() => {
              play(episode)
            }}
          >
            <img src="/play.svg" alt="Play episode" />
          </button>
        </ThumbnailContainer>

        <header>
          <h1>{episode.title}</h1>
          <span>{episode.members}</span>
          <span>{episode.publishedAt}</span>
          <span>{episode.durationAsString}</span>
        </header>

        <Description
          dangerouslySetInnerHTML={{ __html: episode.description }}
        />
      </EpisodeContainer>
    </EpisodeWrapper>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const data = []
  const collection = db.collection('episodes')

  const querySnapshot = await collection.limit(2).orderBy('published_at', 'desc').get();

  querySnapshot.forEach((doc) => {
    data.push(doc.data());
  });

  const paths = data.map((episode: Episode) => {
    return {
      params: {
        slug: episode.id,
      },
    }
  })

  return {
    paths,
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { slug } = ctx.params
  const collection = db.collection('episodes').where('id', '==', slug)

  const querySnapshot = await collection.get()

  const data = querySnapshot.docs[0].data()

  const episode = {
    id: data.id,
    title: data.title,
    thumbnail: data.thumbnail,
    members: data.members,
    publishedAt: format(parseISO(data.published_at), 'd MMM yy', {
      locale: ptBR,
    }),
    duration: Number(data.file.duration),
    durationAsString: convertDurationToTimeString(Number(data.file.duration)),
    description: data.description,
    url: data.file.url,
  }

  return {
    props: { episode },
    revalidate: 60 * 60 * 24, // 24 hours
  }
}
