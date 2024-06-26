import styled from 'styled-components'

export const Homepage = styled.div`
  padding: 0 4rem;
  height: calc(100vh - 6.5rem);
  overflow-y: scroll;

  h2 {
    margin-top: 3rem;
    margin-bottom: 1.5rem;
  }

  @media screen and (max-width: 1442px) {
    overflow-y: unset;
  }
`
export const LatestEpisodes = styled.section`
  ul {
    list-style: none;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;

    li {
      background: ${(props) => props.theme.colors.default};
      border: 1px solid ${(props) => props.theme.colors.secondary100};
      padding: 1.25rem;
      border-radius: 1.5rem;
      position: relative;

      display: flex;
      align-items: center;
      transition: all 0.5s linear;
    }

    img {
      width: 6rem;
      height: 6rem;
      object-fit: cover;
      border-radius: 1rem;
    }

    button {
      position: absolute;
      right: 2rem;
      bottom: 2rem;

      width: 2.5rem;
      height: 2.5rem;

      background-color: ${(props) => props.theme.colors.default};
      border: 2px solid ${(props) => props.theme.colors.secondary100};
      border-radius: 0.675rem;
      font-size: 0;

      transition: filter 0.2s;
      transition: all 0.5s linear;

      img {
        width: 1.5rem;
        height: 1.5rem;
      }

      &:hover {
        filter: brightness(0.95);
      }
    }
  }

  @media screen and (max-width: 1240px) {
    ul {
      grid-template-columns: 1fr;
    }
  }
`

export const EpisodeDetails = styled(LatestEpisodes)`
  flex: 1;
  margin-left: 1rem;

  a {
    display: block;
    color: ${(props) => props.theme.colors.secondary800};
    font-family: Lexend, sans-serif;
    font-weight: 600;
    text-decoration: none;
    line-height: 1.4rem;

    &:hover {
      text-decoration: underline;
    }
  }

  p {
    font-size: 0.875rem;
    margin-top: 0.5rem;
    max-width: 70%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  span {
    display: inline-block;
    margin-top: 0.5rem;
    font-size: 0.875rem;

    &:last-child {
      margin-left: 0.5rem;
      padding-left: 0.5rem;
      position: relative;

      &::before {
        content: '';
        width: 4px;
        height: 4px;
        border-radius: 50%;
        background: #ddd;
        position: absolute;
        left: 0;
        top: 50%;
        transform: translate(-50%, -50%);
      }
    }
  }
`

export const AllEpisodes = styled.div`
  padding-bottom: 2rem;

  table {
    width: 100%;

    th,
    td {
      padding: 0.75rem 1rem;
      border-bottom: 1px solid ${(props) => props.theme.colors.secondary100};
    }

    th {
      color: ${(props) => props.theme.colors.secondary200};
      text-transform: uppercase;
      font: 500 0.75rem Lexend, sans-serif;
      text-align: left;
    }

    td {
      font-size: 0.875rem;

      img {
        width: 2.5rem;
        height: 2.5rem;
        object-fit: cover;
        border-radius: 0.5rem;
      }

      a {
        color: ${(props) => props.theme.colors.secondary800};
        font-family: Lexend, sans-serif;
        font-weight: 600;
        text-decoration: none;
        line-height: 1.4rem;
        font-size: 1rem;

        &:hover {
          text-decoration: underline;
        }
      }

      button {
        width: 2rem;
        height: 2rem;

        background-color: ${(props) => props.theme.colors.default};
        border: 1px solid ${(props) => props.theme.colors.secondary100};
        border-radius: 0.5rem;
        font-size: 0;

        transition: filter 0.2s;
        transition: all 0.5s linear;

        img {
          width: 1.25rem;
          height: 1.25rem;
        }

        &:hover {
          filter: brightness(0.95);
        }
      }
    }
  }
`
