import React, { useEffect, useRef } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import styled from 'styled-components';
import { srConfig } from '@config';
import sr from '@utils/sr';
import { Icon } from '@components/icons';
import { usePrefersReducedMotion } from '@hooks';

const StyledTalksSection = styled.section`
  max-width: 900px;
`;

const StyledList = styled.ol`
  ${({ theme }) => theme.mixins.resetList};
  margin-top: 10px;
`;

const StyledTalk = styled.li`
  display: grid;
  grid-template-columns: 72px 1fr auto;
  gap: 12px 20px;
  align-items: baseline;
  padding: 18px 0;
  border-bottom: 1px solid var(--lightest-navy);

  &:first-of-type {
    border-top: 1px solid var(--lightest-navy);
  }

  .year {
    color: var(--green);
    font-family: var(--font-mono);
    font-size: var(--fz-xs);
  }

  .title {
    margin: 0;
    color: var(--lightest-slate);
    font-size: var(--fz-xl);
    font-weight: 600;
    line-height: 1.3;
  }

  .meta {
    margin: 6px 0 0;
    color: var(--slate);
    font-size: var(--fz-sm);
  }

  .link {
    ${({ theme }) => theme.mixins.flexCenter};
    width: 22px;
    height: 22px;
    color: var(--light-slate);

    svg {
      width: 20px;
      height: 20px;
    }
  }

  @media (max-width: 600px) {
    grid-template-columns: 56px 1fr auto;
    gap: 8px 12px;

    .title {
      font-size: var(--fz-lg);
    }
  }
`;

const Talks = () => {
  const data = useStaticQuery(graphql`
    query {
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

  const talks = data.talks.edges;
  const revealContainer = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    sr.reveal(revealContainer.current, srConfig());
  }, [prefersReducedMotion]);

  return (
    <StyledTalksSection id="talks" ref={revealContainer}>
      <h2 className="numbered-heading">Talks</h2>

      <StyledList>
        {talks.map(({ node }, i) => {
          const { date, title, event, location, url } = node.frontmatter;
          const year = date ? new Date(date).getFullYear() : '';
          const meta = [event, location].filter(Boolean).join(', ');

          return (
            <StyledTalk key={i}>
              <span className="year">{year}</span>
              <div>
                <h3 className="title">{title}</h3>
                {meta && <p className="meta">{meta}</p>}
              </div>
              {url ? (
                <a className="link" href={url} aria-label={`${title} link`}>
                  <Icon name="External" />
                </a>
              ) : (
                <span />
              )}
            </StyledTalk>
          );
        })}
      </StyledList>
    </StyledTalksSection>
  );
};

export default Talks;
