import React, { useState } from "react";
import { Route, RouteComponentProps } from "react-router";
import { EmailAddress } from "../../../generated/definitions/api/EmailAddress";
import { FiscalCode } from "../../../generated/definitions/api/FiscalCode";
import { UserProfile } from "../../../generated/definitions/api/UserProfile";
import { UserRole } from "../../../generated/definitions/api/UserRole";
import { AppAlert } from "../AppAlert/AppAlert";
import { CentralHeader } from "../CentralHeader/CentralHeader";
import { Dashboard } from "../Dashboard/Dashboard";
import { AddMailModal } from "../Modal/AddMailModal";
import { RegistrationContainer } from "../Registration/RegistrationContainer";
import { SlimHeader } from "../SlimHeader/SlimHeader";
import { SpidLogin } from "../SpidLogin/SpidLogin";
import { UserProfile as UserProfileComponent } from "../UserProfile/UserProfile";

/**
 * part of Default Container state responsible of user profile entity
 */
interface IDefaultContainerUserProfileState {
  email: EmailAddress;
  family_name: string;
  fiscal_code: FiscalCode;
  given_name: string;
  role: UserRole;
  work_email?: EmailAddress;
}

/**
 * Component containing slim header, central header and app body with second level routing
 */
export const DefaultContainer = () => {
  /**
   * Initial state for user profile
   */
  const initialUserProfile: UserProfile = {
    email: "" as EmailAddress,
    family_name: "",
    fiscal_code: "" as FiscalCode,
    given_name: "",
    role: "" as UserRole,
    work_email: undefined
  };

  const [userProfile, setUserProfile] = useState<
    IDefaultContainerUserProfileState
  >(initialUserProfile);

  const [isVisibleAddMailModal, setIsVisibleAddMailModal] = useState(false);

  /*
   * Handle response from getUserProfile
   * */
  const handleGetUserProfile = (newUserProfile: UserProfile) => {
    setUserProfile(newUserProfile);
  };

  /*
   * Handle work mail set from modal and profile
   * */
  const handleWorkMailSet = (newWorkMail: EmailAddress) => {
    setUserProfile((prevState: UserProfile) => {
      return { ...prevState, work_email: newWorkMail };
    });
  };

  /*
   * Function to open/close add mail modal
   * */
  const toggleAddMailModal = () => {
    setIsVisibleAddMailModal((prevState: boolean) => !prevState);
  };

  const navigateToDashboard = (props: RouteComponentProps) => (
    <Dashboard
      {...props}
      onGetUserProfile={handleGetUserProfile}
      spidMail={userProfile.email}
      onWorkMailSet={handleWorkMailSet}
      toggleAddMailModal={toggleAddMailModal}
    />
  );

  const navigateToUserProfile = (props: RouteComponentProps) => (
    <UserProfileComponent
      {...props}
      userProfile={userProfile}
      toggleAddMailModal={toggleAddMailModal}
    />
  );

  return (
    <div className="DefaultContainer">
      <SlimHeader />
      <CentralHeader
        userName={`${userProfile.given_name} ${userProfile.family_name}`}
        userRole={userProfile.role}
      />
      <div>
        <AppAlert />
        <Route path="/spid-login" component={SpidLogin} />
        <Route
          path="/sign-up/:signUpStep"
          exact={true}
          component={RegistrationContainer}
        />
        <Route path="/dashboard" render={navigateToDashboard} />
        <Route path="/profile" render={navigateToUserProfile} />
      </div>
      <AddMailModal
        isVisibleAddMailModal={isVisibleAddMailModal}
        toggleAddMailModal={toggleAddMailModal}
        spidMail={userProfile.email}
        workMail={userProfile.work_email}
        onWorkMailSet={handleWorkMailSet}
      />
    </div>
  );
};
