import { NextPageWithLayout } from '@/lib/types';
import HomeLayout from '@/modules/layouts/home/HomeLayout';

const TermsConditions: NextPageWithLayout = () => {
  const h4Mobile = 'mb-4 text-h4-mobile lg:text-h4-desktop';
  const lightBlueBox = 'bg-light-blue p-3 md:p-4';
  const p2Mobile = 'text-p2-mobile mb-8 lg:text-p2-desktop';

  return (
    <div className="m-auto max-w-content-area px-6 pb-32 pt-8 md:pt-10 lg:pb-44">
      <div className="mb-14 text-center text-h2-mobile md:mb-20 lg:mb-24 lg:text-h2-desktop">
        Terms of use
      </div>
      <div className="mb-8 text-large-caption-mobile uppercase text-gray-1 lg:text-large-caption-desktop">
        Last updated on [Month] [Day], 2023
      </div>
      <div className={h4Mobile}>About This Document</div>
      <div className={`${lightBlueBox} mb-7 text-p2-desktop`}>
        Summary: This is a binding agreement, and it includes an arbitration
        clause.{' '}
      </div>
      <div className="mb-8 space-y-4 text-large-caption-mobile uppercase lg:text-large-caption-desktop">
        <p>
          these terms SET FORTH A LEGALLY BINDING AGREEMENT BETWEEN YOU AND
          ____________, LLC THAT GOVERNS YOUR ACCESS TO AND USE OF ALL
          INFORMATION, WEBSITES, SERVICES, EVENTS AND CONTENT (COLLECTIVELY,
          “SERVICES”) PROVIDED IN CONNECTION WITH COMMONAPP. BY ACCEPTING THESE
          TERMS, ACCESSING AND USING SERVICES, OR OTHERWISE INTERACTING WITH US
          IN CONNECTION THEREWITH, YOU:
        </p>
        <p>
          (1) AGREE TO THESE TERMS PERSONALLY AND ON BEHALF OF ANY COMPANY OR
          OTHER LEGAL ENTITY (“ORGANIZATION”) THAT YOU REPRESENT WHEN USING THE
          SERVICES, AND
        </p>
        <p>
          (2) YOU REPRESENT AND WARRANT THAT YOU HAVE THE RIGHT, AUTHORITY, AND
          CAPACITY TO ENTER INTO THESE TERMS (AND TO BIND YOUR ORGANIZATION, IF
          APPLICABLE, TO THESE TERMS). IF YOU DO NOT AGREE TO THESE TERMS, YOU
          ARE NOT PERMITTED TO ACCESS OR USE THE SERVICES.
        </p>
        <p>
          ARBITRATION NOTICE: THESE TERMS CONTAIN A BINDING ARBITRATION
          AGREEMENT INCLUDING A WAIVER OF ANY RIGHT TO PARTICIPATE IN A CLASS
          ACTION LAWSUIT OR CLASS-WIDE ARBITRATION. PLEASE SEE THE ARBITRATION
          AGREEMENT AND CLASS ACTION WAIVER SECTION BELOW FOR ADDITIONAL
          DETAILS.
        </p>
      </div>

      <div className={h4Mobile}>Minimum Age</div>
      <div className={`${lightBlueBox} mb-4 text-p2-mobile`}>
        Summary: You must be 18 or older to use Common App.{' '}
      </div>
      <div className={p2Mobile}>
        You represent that you are at least 18 years of age (or the age of
        majority in the jurisdiction in which you reside). The Services are not
        intended for anyone under 18, and you may not use the Services if you
        are under 18.
      </div>
      <div className={h4Mobile}>Privacy Notice</div>
      <div className={p2Mobile}>
        Please view our Privacy Information, which applies to personal
        information processed about you in connection with the Services.
      </div>
      <div className={h4Mobile}>Your Account</div>
      <div className={`${lightBlueBox} mb-7 text-p2-mobile`}>
        Summary: Do not share your login credentials. We may disable your
        account.
      </div>
      <div className={p2Mobile}>
        You may be required to create an account to access certain portions of
        the Services. You are not permitted to share, sell, distribute or
        otherwise transfer your account information or allow your login
        credentials to be used by any other person. We may terminate your
        account and/or suspend your use of the Services without notice if we
        suspect that your account is being used in an unauthorized manner or if
        you violate these Terms.
      </div>
      <div className={h4Mobile}>Common App Content</div>
      <div className={`${lightBlueBox} mb-7 text-p2-mobile`}>
        Summary: CommonApp content belongs to others; don’t steal it.
      </div>
      <div className={p2Mobile}>
        All information, content, images, logos, trademarks, graphics, software,
        and other materials made available by us in connection with CommonApp
        (collectively, the “Content”) are the sole property of the owners or
        licensors of such Content, and are protected by copyright, trademark,
        and other laws. You may not reproduce, modify, republish, distribute,
        resell, broadcast, reverse-engineer, create derivative works from or
        otherwise exploit in any manner, in whole or in part, the Content,
        except to the extent expressly permitted by us. We do not convey any
        interest in or to the Content. All rights not expressly granted herein
        are reserved by the owners or licensors of the Content. For the sake of
        clarity, the Services include the Content.
      </div>
      <div className={h4Mobile}>User Material</div>
      <div className={`${lightBlueBox} mb-7 text-p2-mobile`}>
        Summary: You own your User Material, but you permit us to use it in
        connection with providing the Services. Your information is not
        confidential; it will be seen by Matchmakers and Organizations who post
        opportunities on the Services. Read more. We may remove User Material
        from CommonApp in our discretion. Submit your User Material at your own
        risk. If you give us any Feedback, we can use it for any purpose.
      </div>
      <div className={`${p2Mobile} space-y-4`}>
        <p>
          We may allow you to submit content, including but not limited to your
          application responses, answers, comments, ideas, and other information
          and materials (collectively, “User Material”).
        </p>
        <p>
          As between you and us, you retain ownership of any and all
          intellectual property rights you may hold in your User Material. You
          grant us the following license to your User Material: the
          non-exclusive, royalty-free, worldwide, sublicensable, transferable,
          perpetual and irrevocable right to store, host, modify, translate,
          publish, transmit, copy, display, disseminate, and use your User
          Material, in all media and formats now known or hereafter invented,
          solely for the purposes of providing, supporting, and promoting the
          Services. You represent and warrant that you own or have the necessary
          rights and permissions to provide your User Material to us, and to
          authorize us to use such User Material in the manner contemplated by
          these Terms.
        </p>
        <p>
          Applying to CommonApp requires you to submit your User Material for
          review by us, third-party Matchmakers and Organizations offering
          opportunities. Under no circumstances will we be required to treat
          your User Material as confidential. For the avoidance of doubt, we
          will not be liable to you or any other person as a result of any
          similarities to the User Material that may appear in any future
          products or services of us or our affiliates.
        </p>
        <p>
          Please note that the license you grant us to your User Material and
          the statement above regarding non-confidentiality apply to
          intellectual property only, and do not expand or alter our use or
          disclosure of your personal information as set forth in our Privacy
          Information. While we may not review or monitor User Material, we
          reserve the right to block, refuse, delete, remove or edit, in whole
          or in part, any User Material that violates these Terms or is
          otherwise objectionable, as determined in our sole discretion. You are
          solely responsible and assume all risks associated with any User
          Material you submit or that is submitted through your account. We
          assume no liability in connection with any damage, loss, or harm you
          may suffer from submitting, viewing, or using any User Material.
        </p>
        <p>
          If you provide or disclose to us any suggestions, ideas, or feedback
          (collectively, “Feedback”) with respect to the Services or other
          potential products and services, you hereby grant us and our
          affiliates, a worldwide, perpetual, irrevocable, transferable,
          nonexclusive, royalty-free license, with the right to sublicense, to
          use and exploit the Feedback for any purpose.
        </p>
      </div>
      <div className={h4Mobile}>Submission Guidelines</div>
      <div className={`${lightBlueBox} mb-7 text-p2-mobile`}>
        Summary: Your application must comply with the guidelines below, and if
        they do not, we can reject or remove them.
      </div>
      <div className={`${p2Mobile} space-y-4`}>
        <p>
          All information and content submitted in support of your application
          (“Submissions”) must adhere to the following guidelines (collectively
          the “Submission Guidelines”):
        </p>
        <ol className="list-decimal pl-4">
          <li>The Submission must be in the English language;</li>
          <li>
            The Submission and all components thereof, including all ideas,
            creative elements and any other materials and information contained
            in the Submission must be wholly original and created by you alone,
            and must not duplicate any previous Submission;
          </li>
          <li>
            The Submission must not contain material that is unlawful or that
            violates or infringes another&apos;s rights, including but not
            limited to privacy, publicity, confidentiality, copyright,
            trademark, patent, or other proprietary intellectual property
            rights;
          </li>
          <li>
            The Submission must not contain material that is derogatory,
            disparaging, hateful, obscene, inappropriate, indecent, tortious,
            defamatory, slanderous or libelous, as determined in our sole
            discretion;
          </li>
          <li>
            The Submission must not contain material that promotes bigotry,
            racism, hatred or harm against any group or individual, or that
            promotes discrimination based on race, gender, religion,
            nationality, disability, sexual orientation or age; and
          </li>
          <li>
            The Submission must not contain personal information pertaining to
            any third party unless you have obtained their prior written
            permission.
          </li>
        </ol>
        <p>
          We reserve the right to make such changes to any Submission as are
          necessary to make it compliant, or to require you to do so.
        </p>
        <p>
          You should retain a copy of all portions of your Submission. We are
          not responsible for, and you specifically release us from, any claims
          or liability relating to, any loss or damage to your Submission. We
          may, in our sole and absolute discretion, reject Submissions or parts
          of Submissions that: (i) fail to meet any Submission Guideline, (ii)
          are not reasonably pertinent to the subject matter of CommonApp, (iii)
          are illegible, incomplete, forged, altered or mechanically produced or
          reproduced, or (iv) are otherwise in violation of or non-compliance
          with these Terms of Use.
        </p>
      </div>
      <div className={h4Mobile}>Representations and Warranties</div>
      <div className={`${lightBlueBox} mb-4 text-p2-mobile`}>
        Summary: You confirm that your Submission is your original work,
        accurate and truthful, and does not violate any law, these Terms, or any
        other person&apos;s rights.
      </div>
      <div className={`${p2Mobile} space-y-4`}>
        <p>By submitting an application, you represent and warrant that:</p>

        <ol className="list-decimal pl-4">
          <li>Your Submission complies with the Submission Guidelines;</li>
          <li>
            No other party has any actual or potential right, title, claim or
            interest in your Submission (including intellectual property
            rights), or if they do, you have secured all rights and permissions
            necessary to submit such materials to us;
          </li>
          <li>
            You have the unconditional right and authority to submit the
            Submission to us and to grant the rights set forth herein;
          </li>
          <li>
            Your Submission is accurate and truthful to the best of your
            knowledge;
          </li>
          <li>
            Your Submission does not violate any applicable law, rule or
            regulation, and your use of the Services is not prohibited by any
            applicable law, rule or regulation in the country in which you
            reside;
          </li>
          <li>
            Our use of your Submission will not infringe or involve the
            misappropriation of any third-party rights, and you agree to
            indemnify and hold harmless us and our affiliates from and against
            any breach of this representation and warranty;
          </li>
          <li>
            You have the right to make the Submission as contemplated hereunder
            without the need of any consent of any third party or if you do need
            such consent, you have obtained it;
          </li>
          <li>
            You and your Submission do and will comply with these Terms of Use
            and all applicable laws and regulations; and
          </li>
          <li>
            You are under no obligation or disability, created by law or
            otherwise, which would in any manner or to any extent prevent or
            restrict making a Submission.
          </li>
        </ol>
      </div>
      <div className={h4Mobile}>Termination of Services; Disclaimers</div>
      <div className={`${lightBlueBox} mb-4 text-p2-mobile`}>
        Summary: We may terminate or modify the Services for any reason,
        including if you violate these Terms. We are not responsible for errors
        that may affect the Services or the processing and review of your
        application.
      </div>
      <div className={`${p2Mobile} space-y-4`}>
        <p>
          We reserve the right at our sole discretion and at any time to
          terminate this agreement and your right to use the Services if you
          violate or fail to comply with the Terms, tamper with the application
          process, and/or act in any way that would, in any way, discredit or
          harm the reputation of us or our affiliates or partners, and/or to
          cancel, modify or suspend the Services should fraud or misconduct or
          other causes beyond our control corrupt the administration, integrity,
          security or proper operation of the Services.
        </p>
        <p>
          Notwithstanding anything contained herein to the contrary, we reserve
          the right, in our sole discretion, at any future time to terminate,
          modify or suspend the Services for any reason, including any of the
          following: act of God; unavoidable accident; epidemic; fire; blackout;
          act of public enemy; war, riot or civil commotion; enactment, rule,
          order or act of government or governmental instrumentality or
          tribunal; strike, lockout or other labor dispute; inclement weather;
          failure, malfunction, or other issues with technology, software,
          networks, connectivity or technical facilities; failure of essential
          production or technical personnel to appear or be available; or other
          cause beyond our control.
        </p>
        <p>
          We are not responsible for lost, late, illegible, incomplete, damaged,
          mutilated, misdirected, misdelivered, or delayed Submissions, or for
          technical or human errors or failures of any kind in connection with
          Submissions, transmission, processing or review of Submissions,
          including without limitation any malfunctions or failures of computer
          hardware, computer software, networks or telephone equipment or any
          technical problems or traffic congestion on the Internet or at any
          website or any combination thereof. We are not responsible for any
          typographical or other error in the Services.
        </p>
      </div>
      <div className={h4Mobile}>Other Services and Features</div>
      <div className={`${lightBlueBox} mb-4 text-p2-mobile`}>
        Summary: We are not responsible for third-party services that we may
        invite you to use in connection with CommonApp.
      </div>
      <div className={`${p2Mobile} space-y-4`}>
        For your convenience and information, the Services may provide links to
        other services and features, including apps, tools, widgets, activities
        and plugins, which may be operated by entities not affiliated with us.
        We make no representations or warranties regarding any such service or
        feature. If you choose to access any link to other services or features,
        you understand that you are connecting directly to that service or
        feature and will be subject to any terms of use, policies and privacy
        practices of the party that operates the service or feature.
      </div>
    </div>
  );
};

export default TermsConditions;

TermsConditions.getLayout = (page) => {
  return <HomeLayout>{page}</HomeLayout>;
};
