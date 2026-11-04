import React, { useEffect, useRef } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import styled from 'styled-components';
import { srConfig } from '@config';
import sr from '@utils/sr';
import { Icon } from '@components/icons';
import { usePrefersReducedMotion } from '@hooks';

const StyledNotesSection = styled.section`
  max-width: 900px;
  padding-top: 0;

  h3 {
    margin: 0 0 24px;
    color: var(--green);
    font-family: var(--font-mono);
    font-size: var(--fz-sm);
    font-weight: 400;
  }
`;

const StyledList = styled.ul`
  ${({ theme }) => theme.mixins.resetList};
`;

const StyledNote = styled.li`
  display: grid;
  grid-template-columns: 72px minmax(0, 1fr) auto;
  gap: 8px 20px;
  align-items: baseline;
  padding: 16px 0;
  border-bottom: 1px solid var(--lightest-navy);

  &:first-of-type {
    border-top: 1px solid var(--lightest-navy);
  }

  .year {
    color: var(--green);
    font-family: var(--font-mono);
    font-size: var(--fz-xs);
  }

  .content {
    min-width: 0;
  }

  .title {
    margin: 0;
    color: var(--lightest-slate);
    font-size: var(--fz-lg);
    font-weight: 600;
    line-height: 1.3;
    overflow-wrap: anywhere;
  }

  .description {
    margin: 6px 0 0;
    color: var(--slate);
    font-size: var(--fz-sm);

    p {
      margin: 0;
    }

    a {
      ${({ theme }) => theme.mixins.inlineLink};
    }
  }

  .links {
    display: flex;
    gap: 8px;
    flex-shrink: 0;

    a {
      ${({ theme }) => theme.mixins.flexCenter};
      width: 22px;
      height: 22px;
      color: var(--light-slate);

      svg {
        width: 18px;
        height: 18px;
      }
    }
  }

  @media (max-width: 600px) {
    grid-template-columns: minmax(0, 1fr) auto;
    gap: 4px 12px;

    .year {
      grid-column: 1;
      grid-row: 1;
    }

    .links {
      grid-column: 2;
      grid-row: 1;
      align-self: start;
    }

    .content {
      grid-column: 1 / -1;
      grid-row: 2;
    }

    .title {
      font-size: var(--fz-md);
    }
  }
`;

const Projects = () => {
  const data = useStaticQuery(graphql`
    query {
      projects: allMarkdownRemark(
        filter: {
          fileAbsolutePath: { regex: "/content/projects/" }
          frontmatter: { showInProjects: { ne: false } }
        }
        sort: { fields: [frontmatter___date], order: DESC }
      ) {
        edges {
          node {
            frontmatter {
              date
              title
              github
              external
            }
            html
          }
        }
      }
      talks: allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/content/talks/" } }
        sort: { fields: [frontmatter___date], order: DESC }
      ) {
        edges {
          node {
            frontmatter {
              date
              title
              event
              location
              url
            }
          }
        }
      }
    }
  `);

  const projectNotes = data.projects.edges.map(({ node }) => {
    const { date, title, github, external } = node.frontmatter;
    return {
      date,
      title,
      github,
      external,
      html: node.html,
    };
  });

  const talkNotes = data.talks.edges.map(({ node }) => {
    const { date, title, event, location, url } = node.frontmatter;
    const meta = [event, location].filter(Boolean).join(', ');
    return {
      date,
      title,
      github: '',
      external: url || '',
      html: meta ? `<p>${meta}</p>` : '',
    };
  });

  const notes = [...projectNotes, ...talkNotes].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
  const revealContainer = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    sr.reveal(revealContainer.current, srConfig());
  }, [prefersReducedMotion]);

  if (!notes.length) {
    return null;
  }

  return (
    <StyledNotesSection ref={revealContainer}>
      <h3>Selected earlier work</h3>
      <StyledList>
        {notes.map((note, i) => {
          const { date, title, github, external, html } = note;
          const year = date ? new Date(date).getFullYear() : '';
          const url = external || github;

          return (
            <StyledNote key={i}>
              <span className="year">{year}</span>
              <div className="content">
                <h4 className="title">
                  {url ? (
                    <a href={url} target="_blank" rel="noreferrer">
                      {title}
                    </a>
                  ) : (
                    title
                  )}
                </h4>
                {html && <div className="description" dangerouslySetInnerHTML={{ __html: html }} />}
              </div>
              <div className="links">
                {github && (
                  <a href={github} aria-label="GitHub Link" target="_blank" rel="noreferrer">
                    <Icon name="GitHub" />
                  </a>
                )}
                {external && (
                  <a href={external} aria-label="External Link" target="_blank" rel="noreferrer">
                    <Icon name="External" />
                  </a>
                )}
              </div>
            </StyledNote>
          );
        })}
      </StyledList>
    </StyledNotesSection>
  );
};

export default Projects;
