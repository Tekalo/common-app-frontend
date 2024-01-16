import { US_DIGITAL_RESPONSE_URL } from '../externalLinks';

export const INTEREST_FORM_TEXT = {
  BUTTONS: {
    save: {
      label: 'Save your progress',
    },
    submit: {
      label: 'Submit',
    },
  },
  FIELDS: {
    interestEmploymentType: {
      label:
        'What type(s) of opportunities are you interested in? Choose all that apply',
      helperText:
        'Part-time/short-term opportunities may include paid or unpaid positions such as contract, advisory, volunteering roles or internships.',
    },
    interestWorkArrangement: {
      label:
        'What type of part-time or short-term opportunities are you interested in?',
      placeholder: 'Choose all that apply',
      selectionLabelMulti: ' Types selected',
      selectionLabelSingle: ' Type selected',
    },
    interestRoles: {
      label: 'What role(s) are you interested in?',
      placeholder: 'Choose all that apply',
      selectionLabelMulti: ' Roles selected',
      selectionLabelSingle: ' Role selected',
    },
    hoursPerWeek: {
      label: 'Hours per week you are able to commit (optional)',
      placeholder: 'Approximate number of hours',
    },
    currentLocation: {
      label: 'Current location',
      placeholder: 'City, state and/or country',
    },
    openToRelocate: {
      label: 'Open to relocating?',
      placeholder: 'Choose one',
    },
    openToRemoteMulti: {
      label: 'Prefer to be remote or in person?',
      placeholder: 'Choose one',
      selectionLabelMulti: ' Options selected',
      selectionLabelSingle: ' Option selected',
    },
    desiredSalary: {
      label: 'Desired salary (optional)',
      placeholder: 'Enter a range',
    },
    interestCauses: {
      selectLabel:
        'Which causes are you interested in hearing opportunities for? Add up to 5 causes',
      rankLabel:
        'Rank the causes you would be interested in working on with 1 being the highest.',
      placeholder: 'Type your own or choose from the list',
      selectionLabelMulti: ' Causes selected',
      selectionLabelSingle: ' Cause selected',
      maxCausesSelected: 'You can choose up to 5 causes',
    },
    otherCauses: {
      label: 'Other causes (optional)',
      placeholder: 'Additional causes separated by commas',
    },
    workAuthorization: {
      label: 'Work authorization (optional)',
      placeholder: 'Choose one',
      tooltipText:
        'If you require U.S. visa sponsorship now or in the future, we can do our best to match you with opportunities that sponsor visas',
    },
    interestGovt: {
      label:
        'Are you interested in U.S. state or local government opportunities?',
      helperText: (
        <>
          <div className="space-y-2">
            <div className="w-[103%] text-left text-p3-mobile text-black-text">
              {'By choosing “yes,” you consent to '}
              <a
                href={US_DIGITAL_RESPONSE_URL}
                target="_blank"
                rel="noreferrer"
                className="underline underline-offset-4"
              >
                {'U.S. Digital Response'}
              </a>
              {
                ' saving a copy of your Tekalo profile in its own database and sending you electronic communications. USDR may contact you about opportunities in state and local governments, and add you to their newsletter which contains government job opportunities.'
              }
            </div>
          </div>
        </>
      ),
    },
    interestGovtEmplTypes: {
      label: 'Which opportunities from USDR are you interested in?',
      placeholder: 'Choose all that apply',
      selectionLabelMulti: ' Opportunity selected',
      selectionLabelSingle: ' Opportunities selected',
    },
    previousImpactExperience: {
      label:
        'Do you have previous experience working at a nonprofit or public service organization?',
      placeholder: '',
    },
    essayResponse: {
      label:
        'If you had unlimited resources what problem would you choose to solve and why?',
      placeholder: "Write as much as you'd like, suggested up to 250 words.",
      tooltipText:
        'This response will only be reviewed by Tekalo recruiters and will help them learn more about your interests.',
    },
    referenceAttribution: {
      label: 'How did you hear about Tekalo? (optional)',
      placeholder: 'Choose one',
    },
  },
};
