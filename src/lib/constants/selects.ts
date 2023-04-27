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
import { IBoolItem, ISelectItem } from '@/lib/types';

const YOEOptions: Array<ISelectItem> = YOE.options.map((option) => {
  if (option === '<1') {
    return {
      value: option,
      displayText: 'Less than 1',
    };
  } else if (option === '>11') {
    return {
      value: option,
      displayText: '11+',
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
        displayText: 'Yes, we sponsor U.S. visas',
      };
    } else if (option === 'no') {
      return {
        value: option,
        displayText: 'No, we do not sponsor U.S. visas',
      };
    } else if (option === 'sometimes') {
      return {
        value: option,
        displayText: 'We sponsor U.S. visas in some cases',
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
  displayText: option.charAt(0).toUpperCase() + option.slice(1),
}));

const CommitmentOptions: Array<ISelectItem> = CommitmentType.options.map(
  (option) => {
    if (option === 'full-time') {
      return {
        value: option,
        displayText: 'Full-time employment',
      };
    } else if (option === 'part-time') {
      return {
        value: option,
        displayText: 'Part-time/short term opportunities',
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
    displayText: option.charAt(0).toUpperCase() + option.slice(1),
  })
);

const RoleOptions: Array<ISelectItem> = Roles.options.map((option) => {
  if (option === 'ux researcher') {
    return {
      value: option,
      displayText: 'UX researcher',
    };
  } else if (option === 'ux/ui designer') {
    return {
      value: option,
      displayText: 'UX/UI designer',
    };
  } else {
    return {
      value: option,
      displayText: option.charAt(0).toUpperCase() + option.slice(1),
    };
  }
});

const CauseOptions: Array<ISelectItem> = Causes.options.map((option) => ({
  value: option,
  displayText: option.charAt(0).toUpperCase() + option.slice(1),
}));

const YesNoOptions: Array<ISelectItem> = [
  {
    value: 'false',
    displayText: 'No',
  },
  {
    value: 'true',
    displayText: 'Yes',
  },
];

const PaidOptions: Array<ISelectItem> = [
  {
    value: 'true',
    displayText: 'Paid',
  },
  {
    value: 'false',
    displayText: 'Unpaid',
  },
];

const TrueFalseOptions: Array<IBoolItem> = [
  {
    value: false,
    displayText: 'No',
  },
  {
    value: true,
    displayText: 'Yes',
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
      displayText: 'Whatsapp message',
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
  displayText: option.charAt(0).toUpperCase() + option.slice(1),
}));

const RemoteOptions = OpenToRemote.options.map((option) => {
  if (option === 'yes') {
    return {
      value: option,
      displayText: 'Only open to remote',
    };
  } else if (option === 'no') {
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
      displayText: option.charAt(0).toUpperCase() + option.slice(1),
    };
  }
});

const AttributionOtpions = ReferenceAttribution.options.map((option) => ({
  value: option,
  displayText: option.charAt(0).toUpperCase() + option.slice(1),
}));

const OrgTypeOptions = OrgType.options.map((option) => ({
  value: option,
  displayText: option.charAt(0).toUpperCase() + option.slice(1),
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
