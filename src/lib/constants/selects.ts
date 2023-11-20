import {
  COMMITMENT_TEXT,
  CONTACT_OPTION_TEXT,
  GLOBAL_TEXT,
  ORG_SIZE_LABEL_TEXT,
  PAID_TEXT,
  ROLE_ENUM_TEXT,
  SEARCH_STATUS_TEXT,
  USDR_TEXT,
  VISA_SPONSOR_TEXT,
  WORK_AUTHORIZATION_TEXT,
  YES_NO_TEXT,
  YOE_OPTION_TEXT,
} from '@/lang/en';
import {
  Causes,
  CommitmentType,
  EmploymentType,
  GovtJobType,
  OpenToRelocate,
  OrgSize,
  OrgType,
  PreferredContact,
  ReferenceAttribution,
  Roles,
  SearchStatus,
  VisaSponsorship,
  WorkAuthorization,
  YOE,
  YOE_RANGE,
  openToRemoteMulti,
} from '@/lib/enums';
import {
  capitalizeEveryWord,
  capitalizeFirstLetter,
  capitalizeFirstWord,
} from '@/lib/helpers/formHelpers';
import { IBoolItem, ISelectItem } from '@/lib/types';

const YOEOptions: Array<ISelectItem> = YOE.options.map((option) => {
  // TODO: We should move all of these options to either have the text be an
  // enum, like we do for roles, OR we should add a 'key' or 'id field
  // so that if they change, we still apply the correct transformations
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
  if (option === ROLE_ENUM_TEXT.vpProduct || option === ROLE_ENUM_TEXT.vpEng) {
    return {
      value: option,
      displayText: capitalizeFirstWord(option),
    };
  } else if (option === ROLE_ENUM_TEXT.uxResearcher) {
    return {
      value: option,
      displayText: capitalizeFirstWord(option),
    };
  } else if (option === ROLE_ENUM_TEXT.ux) {
    return {
      value: option,
      displayText: capitalizeFirstWord(option),
    };
  } else {
    return {
      value: option,
      displayText: capitalizeFirstLetter(option),
    };
  }
});

const CauseOptions: Array<ISelectItem> = Causes.options.map((option) => {
  if (option === 'lgbtqia+ rights') {
    return {
      value: option,
      displayText: capitalizeFirstWord(option),
    };
  } else {
    return {
      value: option,
      displayText: capitalizeFirstLetter(option),
    };
  }
});

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
      displayText: USDR_TEXT.paid,
    };
  } else if (option === 'unpaid') {
    return {
      value: option,
      displayText: USDR_TEXT.unpaid,
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
    if (option === '') {
      return {
        value: '',
        displayText: GLOBAL_TEXT.noOptionSelected,
      };
    } else if (option === 'authorized') {
      return {
        value: option,
        displayText: WORK_AUTHORIZATION_TEXT.authorized,
      };
    } else if (option === 'sponsorship') {
      return {
        value: option,
        displayText: WORK_AUTHORIZATION_TEXT.sponsorship,
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
      displayText: SEARCH_STATUS_TEXT.active,
    };
  } else if (option === 'passive') {
    return {
      value: option,
      displayText: SEARCH_STATUS_TEXT.passive,
    };
  } else if (option === 'future') {
    return {
      value: option,
      displayText: SEARCH_STATUS_TEXT.future,
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
      displayText: CONTACT_OPTION_TEXT.email,
    };
  } else if (option === 'sms') {
    return {
      value: option,
      displayText: CONTACT_OPTION_TEXT.sms,
    };
  } else if (option === 'whatsapp') {
    return {
      value: option,
      displayText: CONTACT_OPTION_TEXT.whatsapp,
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

const RemoteOptions = openToRemoteMulti.options.map((option) => {
  return {
    value: option,
    displayText: capitalizeFirstLetter(option),
  };
});

const AttributionOtpions = ReferenceAttribution.options.map((option) => {
  if (option === '') {
    return {
      value: '',
      displayText: GLOBAL_TEXT.noOptionSelected,
    };
  } else {
    return {
      value: option,
      displayText: capitalizeEveryWord(option),
    };
  }
});

const OrgTypeOptions = OrgType.options.map((option) => {
  switch (option) {
    case 'llc':
      return {
        value: option,
        displayText: option.toUpperCase(),
      };
    case 'b corp':
      return {
        value: option,
        displayText: capitalizeEveryWord(option),
      };
    default:
      return {
        value: option,
        displayText: capitalizeFirstLetter(option),
      };
  }
});

const OrgSizeOptions = OrgSize.options.map((option) => ({
  value: option,
  displayText: option + ORG_SIZE_LABEL_TEXT.employees,
}));

export {
  AttributionOtpions,
  AuthorizationOptions,
  CauseOptions,
  CommitmentOptions,
  EmploymentOptions,
  OrgSizeOptions,
  OrgTypeOptions,
  PaidOptions,
  PreferredContactOptions,
  RelocationOptions,
  RemoteOptions,
  RoleOptions,
  SearchStatusOptions,
  TrueFalseOptions,
  USDROptions,
  VisaSponsorshipOptions,
  YOEOptions,
  YOERangeOptions,
  YesNoOptions,
};
