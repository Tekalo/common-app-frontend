import { skillsEndpoint } from '@/lib/helpers/api/endpoints';
import SkillsSearchProvider, {
  SkillsSearchContext,
} from '@/lib/providers/skillsSearchProvider';
import { useContext } from 'react';

export interface IMockComponent {
  query: string;
  value: string[];
}

const MockComponent: React.FC<IMockComponent> = ({ query, value }) => {
  const searchCtx = useContext(SkillsSearchContext);
  const skills = searchCtx.searchWithQuery(query, value);

  return (
    <div data-name="results">
      {skills.results.map((skill) => (
        <div key={skill.name}>{skill.name}</div>
      ))}
      <div data-name="query-matches">
        {skills.queryMatches ? 'true' : 'false'}
      </div>
    </div>
  );
};

Cypress.Commands.add('mountSkillsSearchProvider', (props: IMockComponent) => {
  cy.mount(
    <SkillsSearchProvider>
      <MockComponent query={props.query} value={props.value} />
    </SkillsSearchProvider>
  );
});

describe('SkillsSearchProvider', () => {
  let props: IMockComponent;

  beforeEach(() => {
    const mockSkillsResponse = {
      data: [
        { name: 'Agile software development' },
        { name: 'C#' },
        { name: 'Cryptography' },
        { name: 'CSS' },
        { name: 'HTML' },
        { name: 'Javascript' },
        { name: 'jQuery' },
        { name: 'Manual Automation' },
        { name: 'SQL' },
      ],
    };

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
