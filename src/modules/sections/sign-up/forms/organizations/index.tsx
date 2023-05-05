import Breadcrumb from '@/components/navigation/Breadcrumb/Breadcrumb';
import NavTitle from '@/components/navigation/NavTitle/NavTitle';
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
    <div className="flex min-h-screen min-w-full flex-col items-center">
      <NavTitle
        title={'Recruit qualified candidates from the Tekalo network'}
        navawayText={'If you’re a candidate looking for opportunities, '}
        navLink={'/sign-up/applicants'}
        navText={'sign up here'}
      />
      <div className="m-auto mb-8 max-w-[344px] sm:mb-28 md:mb-36 md:mt-10 lg:mb-44 lg:mt-8">
        {/* If activeIndex is -1 show the RoleForm otherwise render OrgSignupForm and breadcrum*/}
        {activeIndex === -1 ? (
          <OrgSignupForm
            handleSubmit={handleOrgSignup}
            previousForm={orgInfo}
          />
        ) : (
          <>
            <div className="mb-8 mt-8 flex flex-row justify-center sm:space-x-2">
              <div
                className="cursor-pointer text-component-medium text-blue-1"
                onClick={() => setActiveIndex(-1)}
              >
                {'Contact'}
              </div>
              <Breadcrumb
                label="Role"
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
              isLastRole={activeIndex === orgRoles.length - 1}
            />
            {/* If orgRoles.length is greater than 1 render the delete link */}
            {orgRoles.length > 1 && (
              <div
                className="mt-6 cursor-pointer text-center text-component-medium text-red-error"
                onClick={() => handleDeleteRole(activeIndex)}
              >
                {'Delete this role'}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default OrgForms;
