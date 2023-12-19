import Breadcrumb from '@/components/navigation/Breadcrumb/Breadcrumb';
import NavTitle from '@/components/navigation/NavTitle/NavTitle';
import { APPLICANT_SIGNUP_LINK, ORG_FORM_TEXT } from '@/lang/en/en';
import { NewOrgType, NewRoleType } from '@/lib/types';
import RoleForm from '@/sections/sign-up/forms/organizations/roleForm/RoleForm';
import OrgSignupForm from '@/sections/sign-up/forms/organizations/signupForm/SignupForm';

export interface IOrgForms {
  activeIndex: number;
  orgInfo: NewOrgType | undefined;
  orgRoles: NewRoleType[];
  setActiveIndex: (newIdx: number) => void;
  handleNewRole: (newRole: NewRoleType) => void;
  handleEditRole: (editedRole: NewRoleType, reviewReady?: boolean) => void;
  handleOrgSignup: (values: NewOrgType, reviewReady?: boolean) => void;
  handleDeleteRole: (idx: number) => void;
}

const OrgForms: React.FC<IOrgForms> = ({
  activeIndex,
  handleOrgSignup,
  orgInfo,
  setActiveIndex,
  orgRoles,
  handleNewRole,
  handleEditRole,
  handleDeleteRole,
}) => {
  return (
    <div className="flex min-h-screen min-w-full flex-col items-center px-6 pb-28 pt-10 md:pb-32 lg:pb-44 lg:pt-16">
      <NavTitle
        navLink={APPLICANT_SIGNUP_LINK}
        navText={ORG_FORM_TEXT.NAV.navText}
        subtitle={ORG_FORM_TEXT.NAV.subtitle}
        title={ORG_FORM_TEXT.NAV.title}
      />
      <div className="m-auto max-w-[344px] lg:max-w-[352px]">
        {/* If activeIndex is -1 show the RoleForm otherwise render OrgSignupForm and breadcrum*/}
        {activeIndex === -1 ? (
          <OrgSignupForm
            handleSubmit={handleOrgSignup}
            previousForm={orgInfo}
          />
        ) : (
          <>
            <div className="mb-10 flex flex-row justify-center sm:space-x-2">
              <div
                className="cursor-pointer text-component-medium text-blue-1"
                onClick={() => setActiveIndex(-1)}
              >
                {ORG_FORM_TEXT.CONTACT}
              </div>
              <Breadcrumb
                label={ORG_FORM_TEXT.BREADCRUMB}
                items={orgRoles}
                activeIndex={activeIndex}
                setActive={setActiveIndex}
              />
            </div>
            <RoleForm
              formType={orgInfo?.commitmentTypes}
              handleNewRole={handleNewRole}
              handleEditRole={handleEditRole}
              previousForm={orgRoles[activeIndex]}
              activeIndex={activeIndex}
            />
            {/* If orgRoles.length is greater than 1 render the delete link */}
            {orgRoles.length > 1 && (
              <div
                className="mt-6 cursor-pointer text-center text-component-medium text-red-error"
                onClick={() => handleDeleteRole(activeIndex)}
              >
                {ORG_FORM_TEXT.DELETE_ROLE}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default OrgForms;
