import { GetStaticProps } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import Head from 'next/head'
import { format, parseISO } from 'date-fns'
import { ptBR } from 'date-fns/locale'

import { convertDurationToTimeString } from '../utils/convertDurationToTimeString'
import { usePlayer } from '../contexts/PlayerContext'

import {
  Homepage,
  LatestEpisodes,
  EpisodeDetails,
  AllEpisodes,
} from './styles/home'
import db from '../services/api'

type Episode = {
  id: string
  title: string
  thumbnail: string
  members: string
  duration: number
  durationAsString: string
  url: string
  publishedAt: string
}

type HomeProps = {
  latestEpisodes: Episode[]
  allEpisodes: Episode[]
}

export default function Home({ latestEpisodes, allEpisodes }: HomeProps) {
  const { playList } = usePlayer()

  const episodeList = [...latestEpisodes, ...allEpisodes]

  return (
    <Homepage>
      <Head>
        <title>Podcastr | Home</title>
      </Head>
      <LatestEpisodes>
        <h2>Últimos lançamentos</h2>

        <ul>
          {latestEpisodes.map((episode, index) => {
            return (
              <li key={episode.id}>
                <Image
                  width={192}
                  height={192}
                  src={episode.thumbnail}
                  alt={episode.title}
                />

                <EpisodeDetails>
                  <Link href={`/episodes/${episode.id}`}>
                    {episode.title}
                  </Link>
                  <p>{episode.members}</p>
                  <span>{episode.publishedAt}</span>
                  <span>{episode.durationAsString}</span>
                </EpisodeDetails>

                <button
                  type="button"
                  onClick={() => {
                    playList(episodeList, index)
                  }}
                >
                  <img src="/play-green.svg" alt="Play episode" />
                </button>
              </li>
            )
          })}
        </ul>
      </LatestEpisodes>

      <AllEpisodes>
        <h2>Todos episódios</h2>

        <table cellSpacing={0}>
          <thead>
            <tr>
              <th></th>
              <th>Podcast</th>
              <th>Integrantes</th>
              <th>Data</th>
              <th>Duração</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {allEpisodes.map((episode, index) => {
              return (
                <tr key={episode.id}>
                  <td style={{ width: 72 }}>
                    <Image
                      width={120}
                      height={120}
                      src={episode.thumbnail}
                      alt={episode.title}
                    />
                  </td>
                  <td>
                    <Link href={`/episodes/${episode.id}`}>
                      {episode.title}
                    </Link>
                  </td>
                  <td>{episode.members}</td>
                  <td style={{ width: 100 }}>{episode.publishedAt}</td>
                  <td>{episode.durationAsString}</td>
                  <td>
                    <button
                      type="button"
                      onClick={() =>
                        playList(episodeList, index + latestEpisodes.length)
                      }
                    >
                      <img src="/play-green.svg" alt="Play episode" />
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </AllEpisodes>
    </Homepage>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const collection = db.collection('episodes')

  const data = [];
  const querySnapshot = await collection.orderBy('published_at', 'desc').get();

  querySnapshot.forEach((doc) => {
    data.push(doc.data());
  });

  const episodes = data.map((episode) => {
    return {
      id: episode.id,
      title: episode.title,
      thumbnail: episode.thumbnail,
      members: episode.members,
      publishedAt: format(parseISO(episode.published_at), 'd MMM yy', {
        locale: ptBR,
      }),
      duration: Number(episode.file.duration),
      durationAsString: convertDurationToTimeString(
        Number(episode.file.duration)
      ),
      url: episode.file.url,
    }
  })

  const latestEpisodes = episodes.slice(0, 2)
  const allEpisodes = episodes.slice(2, episodes.length)

  return {
    props: {
      latestEpisodes,
      allEpisodes,
    },
    revalidate: 60 * 60 * 8, // 8 hours
  }
}
