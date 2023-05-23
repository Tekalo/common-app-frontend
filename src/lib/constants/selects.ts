import {
  COMMITMENT_TEXT,
  PAID_TEXT,
  ROLE_TEXT,
  VISA_SPONSOR_TEXT,
  YES_NO_TEXT,
  YOE_OPTION_TEXT,
} from '@/lang/en';
import {
  Causes,
  CommitmentType,
  EmploymentType,
  GovtJobType,
  OpenToRelocate,
  OpenToRemote,
  OrgSize,
  OrgType,
  PreferredContact,
  ReferenceAttribution,
  Roles,
  SearchStatus,
  Skills,
  VisaSponsorship,
  WorkAuthorization,
  YOE,
  YOE_RANGE,
} from '@/lib/enums';
import { capitalizeFirstLetter } from '@/lib/helpers/formHelpers';
import { IBoolItem, ISelectItem } from '@/lib/types';

const YOEOptions: Array<ISelectItem> = YOE.options.map((option) => {
  if (option === '<1') {
    return {
      value: option,
      displayText: YOE_OPTION_TEXT.lt1,
    };
  } else if (option === '>11') {
    return {
      value: option,
      displayText: YOE_OPTION_TEXT.gt11,
    };
  } else {
    return {
      value: option,
      displayText: option,
    };
  }
});

const YOERangeOptions: Array<ISelectItem> = YOE_RANGE.options.map((option) => ({
  value: option,
  displayText: option,
}));

const VisaSponsorshipOptions: Array<ISelectItem> = VisaSponsorship.options.map(
  (option) => {
    if (option === 'yes') {
      return {
        value: option,
        displayText: VISA_SPONSOR_TEXT.yes,
      };
    } else if (option === 'no') {
      return {
        value: option,
        displayText: VISA_SPONSOR_TEXT.no,
      };
    } else if (option === 'sometimes') {
      return {
        value: option,
        displayText: VISA_SPONSOR_TEXT.sometimes,
      };
    } else {
      return {
        value: option,
        displayText: option,
      };
    }
  }
);

const SkillOptions: Array<ISelectItem> = Skills.options.map((option) => ({
  value: option,
  displayText: capitalizeFirstLetter(option),
}));

const CommitmentOptions: Array<ISelectItem> = CommitmentType.options.map(
  (option) => {
    if (option === 'full') {
      return {
        value: option,
        displayText: COMMITMENT_TEXT.fullTime,
      };
    } else if (option === 'part') {
      return {
        value: option,
        displayText: COMMITMENT_TEXT.partTime,
      };
    } else {
      return {
        value: option,
        displayText: option,
      };
    }
  }
);

const EmploymentOptions: Array<ISelectItem> = EmploymentType.options.map(
  (option) => ({
    value: option,
    displayText: capitalizeFirstLetter(option),
  })
);

const RoleOptions: Array<ISelectItem> = Roles.options.map((option) => {
  if (option === 'ux researcher') {
    return {
      value: option,
      displayText: ROLE_TEXT.uxResearcher,
    };
  } else if (option === 'ux/ui designer') {
    return {
      value: option,
      displayText: ROLE_TEXT.uxDesigner,
    };
  } else {
    return {
      value: option,
      displayText: capitalizeFirstLetter(option),
    };
  }
});

const CauseOptions: Array<ISelectItem> = Causes.options.map((option) => ({
  value: option,
  displayText: capitalizeFirstLetter(option),
}));

const YesNoOptions: Array<ISelectItem> = [
  {
    value: 'false',
    displayText: YES_NO_TEXT.no,
  },
  {
    value: 'true',
    displayText: YES_NO_TEXT.yes,
  },
];

const PaidOptions: Array<ISelectItem> = [
  {
    value: 'true',
    displayText: PAID_TEXT.paid,
  },
  {
    value: 'false',
    displayText: PAID_TEXT.unpaid,
  },
];

const TrueFalseOptions: Array<IBoolItem> = [
  {
    value: false,
    displayText: YES_NO_TEXT.no,
  },
  {
    value: true,
    displayText: YES_NO_TEXT.yes,
  },
];

const USDROptions: Array<ISelectItem> = GovtJobType.options.map((option) => {
  if (option === 'paid') {
    return {
      value: option,
      displayText: 'Paid government jobs with local & state governments',
    };
  } else if (option === 'unpaid') {
    return {
      value: option,
      displayText:
        'Volunteer (unpaid) roles with USDR to support government partners',
    };
  } else {
    return {
      value: option,
      displayText: option,
    };
  }
});

const AuthorizationOptions: Array<ISelectItem> = WorkAuthorization.options.map(
  (option) => {
    if (option === 'authorized') {
      return {
        value: option,
        displayText: 'I am authorized to work in the U.S.',
      };
    } else if (option === 'sponsorship') {
      return {
        value: option,
        displayText:
          'I will now or in the future require sponsorship to work in the U.S.',
      };
    } else {
      return {
        value: option,
        displayText: option,
      };
    }
  }
);

const SearchStatusOptions = SearchStatus.options.map((option) => {
  if (option === 'active') {
    return {
      value: option,
      displayText: "I'm actively looking for a new role",
    };
  } else if (option === 'passive') {
    return {
      value: option,
      displayText: "I'm flexible, casually looking for opportunities",
    };
  } else if (option === 'future') {
    return {
      value: option,
      displayText: 'I want to stay in touch for opportunities in the future',
    };
  } else {
    return {
      value: option,
      displayText: option,
    };
  }
});

const PreferredContactOptions = PreferredContact.options.map((option) => {
  if (option === 'email') {
    return {
      value: option,
      displayText: 'Email',
    };
  } else if (option === 'sms') {
    return {
      value: option,
      displayText: 'Text message',
    };
  } else if (option === 'whatsapp') {
    return {
      value: option,
      displayText: 'WhatsApp message',
    };
  } else {
    return {
      value: option,
      displayText: option,
    };
  }
});

const RelocationOptions = OpenToRelocate.options.map((option) => ({
  value: option,
  displayText: capitalizeFirstLetter(option),
}));

const RemoteOptions = OpenToRemote.options.map((option) => {
  if (option === 'only remote') {
    return {
      value: option,
      displayText: 'Only open to remote',
    };
  } else if (option === 'no remote') {
    return {
      value: option,
      displayText: 'Not open to remote',
    };
  } else if (option === 'both') {
    return {
      value: option,
      displayText: 'Open to in-person or remote',
    };
  } else {
    return {
      value: option,
      displayText: capitalizeFirstLetter(option),
    };
  }
});

const AttributionOtpions = ReferenceAttribution.options.map((option) => ({
  value: option,
  displayText: capitalizeFirstLetter(option),
}));

const OrgTypeOptions = OrgType.options.map((option) => ({
  value: option,
  displayText: capitalizeFirstLetter(option),
}));

const OrgSizeOptions = OrgSize.options.map((option) => ({
  value: option,
  displayText: option + ' employees',
}));

export {
  YOEOptions,
  YOERangeOptions,
  VisaSponsorshipOptions,
  SkillOptions,
  CommitmentOptions,
  EmploymentOptions,
  RoleOptions,
  CauseOptions,
  YesNoOptions,
  PaidOptions,
  TrueFalseOptions,
  USDROptions,
  AuthorizationOptions,
  SearchStatusOptions,
  PreferredContactOptions,
  RelocationOptions,
  RemoteOptions,
  AttributionOtpions,
  OrgTypeOptions,
  OrgSizeOptions,
};
