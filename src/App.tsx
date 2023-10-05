import React from 'react';
import algoliasearch from 'algoliasearch/lite';
import {
  Configure,
  Highlight,
  Hits,
  InstantSearch,
  Pagination,
  RefinementList,
  SearchBox,
} from 'react-instantsearch';

import './App.css';

const searchClient = algoliasearch(
// removed API key / app info
);

export function App() {
  return (
    <div>
      <header className="header">
        <img src="http://www.jbcole.com/temp/mockbuster2.png" />
      </header>

      <div className="container">
        <InstantSearch searchClient={searchClient} indexName="dev_mockbuster">
          <Configure
            hitsPerPage={10}
            attributesToSnippet={['extract:20']}
          />
          <div className="search-panel">
            <div className="search-panel__filters">
              <p><strong>Browse and Filter</strong></p>
              <p>Movie Genres</p>
              <RefinementList attribute="genres" />
            </div>

            <div className="search-panel__results">
              <SearchBox placeholder="Find your next favorite movie..." className="searchbox" />
              <Hits hitComponent={Hit} />
              <div className="pagination">
                <Pagination />
              </div>
            </div>
          </div>
        </InstantSearch>
      </div>
      <footer className="footer">Algolia-Powered Search  |  Jacob Cole</footer>
    </div>
  );
}

type HitProps = {
  hit: any;
};

function Hit({ hit }: HitProps) {
  return (
    <div className="card-array">
      <article className="hit-card">
        <div className="hit-card__image">
        {hit.thumbnail ? (
            <img src={hit.thumbnail} alt={hit.title} />
          ) : (
            <img src="http://www.jbcole.com/temp/nophoto.png" alt="No Photo" />
          )}
        </div>
        <div className="hit-card__content">
          <h2>
            <Highlight attribute="title" hit={hit} />
          </h2>
          <p>
            <strong>Rating:</strong> {hit.rating} 
          </p>
          <p>
            <strong>Genres:</strong> {hit.genres.join(', ')}
          </p>
          <p>
            <strong>Cast:</strong> {hit.cast.join(', ')}
          </p>
          <p>
            <strong>Summary:</strong>{' '}
            <Highlight attribute="extract" hit={hit} />
          </p>
        </div>
      </article>
    </div>
  );
}
