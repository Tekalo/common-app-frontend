import { mockSkillsResponse } from '@/cypress/fixtures/mocks';
import { skillsEndpoint } from '@/lib/helpers/api/endpoints';
import SkillsSearchProvider, {
  ISkillSearchResults,
  SkillsSearchContext,
} from '@/lib/providers/skillsSearchProvider';
import { useContext, useEffect, useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

export interface IMockComponent {
  query: string;
  value: string[];
}

const MockComponent: React.FC<IMockComponent> = ({ query, value }) => {
  const searchCtx = useContext(SkillsSearchContext);
  const { data, error, isLoading } = searchCtx.useSkills();
  searchCtx.getSkills();
  const [skills, setSkills] = useState<ISkillSearchResults>({
    queryMatches: false,
    results: [],
  });

  useEffect(() => {
    searchCtx.getSkills();
  }, []);

  useEffect(() => {
    if ((data || error) && !isLoading) {
      setSkills(searchCtx.searchWithQuery(query, value));
    }
  }, [data, error, isLoading, query, searchCtx, value]);

  return (
    <div data-name="results">
      {skills.results.map((skill) => (
        <div key={skill.canonical}>{skill.canonical}</div>
      ))}
      <div data-name="query-matches">
        {skills.queryMatches ? 'true' : 'false'}
      </div>
    </div>
  );
};

Cypress.Commands.add('mountSkillsSearchProvider', (props: IMockComponent) => {
  cy.mount(
    <QueryClientProvider client={new QueryClient()}>
      <SkillsSearchProvider>
        <MockComponent query={props.query} value={props.value} />
      </SkillsSearchProvider>
    </QueryClientProvider>
  );
});

describe('SkillsSearchProvider', () => {
  let props: IMockComponent;

  beforeEach(() => {
    cy.intercept(
      {
        method: 'GET',
        url: skillsEndpoint,
      },
      mockSkillsResponse
    );

    props = {
      query: 's',
      value: [],
    };
  });

  it('should fetch results', () => {
    cy.mountSkillsSearchProvider(props);

    cy.get('div[data-name=results]').children().should('have.length', 5);
    cy.get('div[data-name="query-matches"]').should('have.text', 'false');
  });

  it('should not include a result if it has already been added', () => {
    props.value = ['Javascript'];
    cy.mountSkillsSearchProvider(props);

    cy.get('div[data-name=results]').children().should('have.length', 4);
    cy.get('div[data-name="query-matches"]').should('have.text', 'false');
  });

  it('should set flag for query match', () => {
    props.query = 'Javascript';

    cy.mountSkillsSearchProvider(props);

    cy.get('div[data-name=results]').children().should('have.length', 3);
    cy.get('div[data-name="query-matches"]').should('have.text', 'true');
  });
});
