import { EEOC_URL } from '../externalLinks';

export const ORG_SIGNUP_FORM_TEXT = {
  BUTTONS: {
    submit: {
      label: 'Next',
    },
  },
  FIELDS: {
    orgName: {
      label: 'Organization name',
      placeholder: "Organization's legal name",
    },
    orgType: {
      label: 'Organization type',
      placeholder: 'Choose one',
      tooltipText:
        'We accept applications from 501(c)(3) organizations. Other types of impact-driven organizations are welcome to submit opportunities and will be considered on a case by case basis.',
    },
    orgSize: {
      label: 'Organization size',
      placeholder: 'Choose one',
      tooltipText: '',
    },
    orgImpactAreas: {
      label: 'Impact area(s) the organization works on',
      placeholder: 'Choose all that apply',
      selectionLabelSingle: ' Area selected',
      selectionLabelMulti: ' Areas selected',
    },
    orgImpactAreasOther: {
      label: 'If you chose other, please specify (optional)',
      placeholder: 'Additional impact areas separated by commas',
    },
    orgContactName: {
      label: 'Contact name',
      placeholder: 'Full name',
      tooltipText: '',
    },
    orgContactEmail: {
      label: 'Contact email',
      placeholder: 'Email address',
      tooltipText: '',
    },
    orgContactPhone: {
      label: 'Contact phone (optional)',
      placeholder: '+1 (555) 555-5555',
      tooltipText:
        "If provided, your number will be used to contact you about your application. It won't be used for marketing.",
    },
    orgEmploymentTypes: {
      label:
        'What type(s) of positions are you looking to fill? Choose all that apply.',
      placeholder: '',
      helperText:
        'Part-time/short-term opportunities may include paid or unpaid positions such as contract, advisory, volunteering roles or internships.',
    },
    orgEOE: {
      label: (
        <>
          <div className="space-y-2">
            <div className="w-[103%] text-left text-p3-mobile text-black-text">
              {
                'Please confirm that you are an Equal Opportunity Employer as defined by the '
              }
              <a
                href={EEOC_URL}
                target="_blank"
                rel="noreferrer"
                className="underline underline-offset-4"
              >
                {'EEOC'}
              </a>
            </div>
          </div>
        </>
      ),
      placeholder: 'Choose one',
    },
    referenceAttribution: {
      label: 'How did you hear about Tekalo? (optional)',
      placeholder: 'Choose one',
    },
    referenceOptional: {
      label: 'If you chose other, please specify (optional)',
      placeholder: 'How did you hear about Tekalo?',
    },
  },
};
