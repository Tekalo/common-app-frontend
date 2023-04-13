export interface ITermsAndConditions {}

const TermsAndConditions: React.FC<ITermsAndConditions> = () => {
  const h4Mobile = 'mb-4 text-h4-mobile lg:text-h4-desktop';
  const lightBlueBox = 'bg-light-blue p-3 md:p-4';
  const p2Mobile = 'text-p2-mobile mb-8 lg:text-p2-desktop';
  const largeCaption =
    'text-large-caption-mobile uppercase lg:text-large-caption-desktop';

  return (
    <div className="m-auto max-w-content-area px-6 pb-32 pt-8 md:pt-10 lg:pb-44">
      <div className="mb-14 text-center text-h2-mobile md:mb-20 lg:mb-24 lg:text-h2-desktop">
        [Name] Terms of Use
      </div>
      <div className="mb-8 text-large-caption-mobile uppercase text-gray-1 lg:text-large-caption-desktop">
        Last Updated: April __, 2023
      </div>
      <div className={h4Mobile}>About This Document</div>
      <div className={`${lightBlueBox} mb-7 text-p2-desktop`}>
        Summary: This is a binding agreement, and it includes an arbitration
        clause.{' '}
      </div>
      <div className={`mb-8 space-y-4 ${largeCaption}`}>
        <p>
          THESE TERMS SET FORTH A LEGALLY BINDING AGREEMENT BETWEEN YOU AND
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
          APPLICABLE, TO THESE TERMS).
        </p>
        <p>
          IF YOU DO NOT AGREE TO THESE TERMS, YOU ARE NOT PERMITTED TO ACCESS OR
          USE THE SERVICES.
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
        Summary: You must be 18 or older to use CommonApp.
      </div>
      <div className={p2Mobile}>
        You represent that you are at least 18 years of age (or the age of
        majority in the jurisdiction in which you reside). The Services are not
        intended for anyone under 18, and you may not use the Services if you
        are under 18.
      </div>
      <div className={h4Mobile}>Privacy Notice</div>
      <div className={p2Mobile}>
        Please view our{' '}
        <a
          target="_blank"
          className="text-blue-1 underline underline-offset-4"
          href="./privacy-info"
        >
          Privacy Information
        </a>
        , which applies to personal information processed about you in
        connection with the Services.
      </div>
      <div className={h4Mobile}>Your Account</div>
      <div className={`${lightBlueBox} mb-7 text-p2-mobile`}>
        Summary: Do not share your login credentials. We may disable your
        account.
      </div>
      <div className={`${p2Mobile} space-y-4`}>
        <p>
          You may be required to create an account to access certain portions of
          the Services. You are not permitted to share, sell, distribute or
          otherwise transfer your account information or allow your login
          credentials to be used by any other person.
        </p>
        <p>
          {' '}
          We may terminate your account and/or suspend your use of the Services
          without notice if we suspect that your account is being used in an
          unauthorized manner or if you violate these Terms.
        </p>
      </div>
      <div className={h4Mobile}>Common App Content</div>
      <div className={`${lightBlueBox} mb-7 text-p2-mobile`}>
        Summary: CommonApp content belongs to others; don&apos;t steal it.
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
        opportunities on the Services.
        <a
          target="_blank"
          className="text-blue-1 underline underline-offset-4"
          href="#"
        >
          Read more
        </a>
        . We may remove User Material from CommonApp in our discretion. Submit
        your User Material at your own risk. If you give us any Feedback, we can
        use it for any purpose.{' '}
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
          Services.
        </p>
        <p>
          You represent and warrant that you own or have the necessary rights
          and permissions to provide your User Material to us, and to authorize
          us to use such User Material in the manner contemplated by these
          Terms. Applying to CommonApp requires you to submit your User Material
          for review by us, third-party Matchmakers and Organizations offering
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
          disclosure of your personal information as set forth in our{' '}
          <a
            target="_blank"
            className="text-blue-1 underline underline-offset-4"
            href="./privacy-info"
          >
            Privacy Information
          </a>
          . While we may not review or monitor User Material, we reserve the
          right to block, refuse, delete, remove or edit, in whole or in part,
          any User Material that violates these Terms or is otherwise
          objectionable, as determined in our sole discretion. You are solely
          responsible and assume all risks associated with any User Material you
          submit or that is submitted through your account. We assume no
          liability in connection with any damage, loss, or harm you may suffer
          from submitting, viewing, or using any User Material.
        </p>
        <p>
          If you provide or disclose to us any suggestions, ideas, or feedback
          (collectively, “Feedback”) with respect to the Services or other
          potential products and services, you hereby grant us and our
          affiliates, a worldwide, perpetual, irrevocable, transferable,
          nonexclusive, royalty-free license, with the right to sublicense, to
          use and exploit the Feedback for any purpose.{' '}
        </p>
      </div>
      <div className={h4Mobile}>Submission Guidelines</div>
      <div className={`${lightBlueBox} mb-7 text-p2-mobile`}>
        Summary: Your application must comply with the guidelines below, and if
        they do not, we can reject or remove them.{' '}
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
          or liability relating to, any loss or damage to your Submission.
        </p>
        <p>
          We may, in our sole and absolute discretion, reject Submissions or
          parts of Submissions that: (i) fail to meet any Submission Guideline,
          (ii) are not reasonably pertinent to the subject matter of CommonApp,
          (iii) are illegible, incomplete, forged, altered or mechanically
          produced or reproduced, or (iv) are otherwise in violation of or
          non-compliance with these Terms of Use.
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
        application.{' '}
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
          website or any combination thereof.{' '}
        </p>
        <p>
          We are not responsible for any typographical or other error in the
          Services.
        </p>
      </div>
      <div className={h4Mobile}>Other Services and Features</div>
      <div className={`${lightBlueBox} mb-4 text-p2-mobile`}>
        Summary: We are not responsible for third-party services that we may
        invite you to use in connection with CommonApp.
      </div>
      <div className={`${p2Mobile}`}>
        For your convenience and information, the Services may provide links to
        other services and features, including apps, tools, widgets, activities
        and plugins, which may be operated by entities not affiliated with us.
        We make no representations or warranties regarding any such service or
        feature. If you choose to access any link to other services or features,
        you understand that you are connecting directly to that service or
        feature and will be subject to any terms of use, policies and privacy
        practices of the party that operates the service or feature.
      </div>
      <div className={h4Mobile}>Digital Millennium Copyright Act</div>
      <div className={`${lightBlueBox} mb-4 text-p2-mobile`}>
        Summary: If you have a copyright infringement complaint, please follow
        the procedures below.
      </div>
      <div className={`${p2Mobile} space-y-4`}>
        <p>
          We endeavor to observe the requirements of the Digital Millennium
          Copyright Act. In the event you believe that any Content or User
          Material (defined below) infringes your copyright or other
          intellectual property right, you may notify our designated agent by
          email at dmca@schmidtfutures.com or by mail to 155 W. 23rd St., 5th
          Floor, New York, NY 10011, Attn: CommonApp.
        </p>
        <p>You must include the following information in your complaint:</p>
        <ul className="list-disc pl-4">
          <li>
            a description of the copyrighted work or other intellectual property
            that you claim has been infringed;
          </li>
          <li>
            {' '}
            a description of the material that you claim is infringing with
            respect to the Services;
          </li>
          <li> your email address, mailing address and telephone number;</li>
          <li>
            {' '}
            a statement by you that you have a good faith belief that the use of
            the material on the Services is not authorized by the copyright
            owner, the copyright owner&apos;s agent or law;
          </li>
          <li>
            {' '}
            a statement by you that the above information in your notice is
            accurate and, under penalty of perjury, that you are the copyright
            owner or authorized to act on the copyright owner&apos;s behalf; and
          </li>
          <li>
            {' '}
            an electronic or physical signature of the copyright owner or person
            authorized to act on behalf of the copyright owner.
          </li>
        </ul>
      </div>
      <div className={h4Mobile}>Warranty Disclaimer</div>
      <div className={`${lightBlueBox} mb-4 text-p2-mobile`}>
        Summary: We don&apos;t make any promises that the Services are perfect
        or will help you achieve any particular result.
      </div>
      <div className={`space-y-4 ${largeCaption} mb-8`}>
        <p>
          THE SERVICES ARE PROVIDED ON AN &quot;AS IS&quot; AND “AS AVAILABLE”
          BASIS. WE MAKE NO REPRESENTATIONS OR WARRANTIES OF ANY KIND THAT THE
          SERVICES WILL: MEET YOUR REQUIREMENTS, BE TIMELY, SECURE, ERROR FREE
          OR UNINTERRUPTED, BE FREE OF MALWARE OR OTHER HARMFUL CODE, OR BE
          ACCURATE, COMPLETE, OR RELIABLE.
        </p>
        <p>
          WE AND OUR AFFILIATES AND LICENSORS DISCLAIM ALL WARRANTIES, EXPRESS
          OR IMPLIED, STATUTORY OR OTHERWISE, INCLUDING BUT NOT LIMITED TO THE
          IMPLIED WARRANTIES OF MERCHANTABILITY, NON-INFRINGEMENT AND FITNESS
          FOR A PARTICULAR PURPOSE.
        </p>
        <p>
          CERTAIN JURISDICTIONS DO NOT ALLOW LIMITATIONS ON IMPLIED WARRANTIES
          AND, ACCORDINGLY, THE LIMITATIONS IN THIS SECTION MAY NOT APPLY TO
          YOU. IF YOU ARE A CONSUMER, ANY STATUTORY RIGHTS THAT CANNOT BE WAIVED
          BY YOU ARE UNAFFECTED BY THIS SECTION.
        </p>
      </div>
      <div className={h4Mobile}>Limitation of Liability</div>
      <div className={`${lightBlueBox} mb-4 text-p2-mobile`}>
        {' '}
        Summary: We will not be responsible for certain extra damages that are
        typically excluded from consumer agreements.
      </div>
      <div className={`space-y-4 ${largeCaption} mb-8`}>
        <p>
          TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT WILL WE
          OR OUR AFFILIATES OR LICENSORS BE LIABLE TO YOU OR ANY THIRD PARTY FOR
          ANY DIRECT, INCIDENTAL, INDIRECT, EXEMPLARY, PUNITIVE, SPECIAL, OR
          CONSEQUENTIAL DAMAGES, OR LOST REVENUES, PROFITS CAPITAL OR OVERHEAD,
          ARISING OUT OF OR RELATED TO YOUR ACCESS TO OR USE OF THE SERVICES,
          WHETHER BASED ON WARRANTY, CONTRACT, TORT (INCLUDING NEGLIGENCE),
          DELICT OR ANY OTHER LEGAL THEORY AND WHETHER OR NOT WE HAVE BEEN
          ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.{' '}
        </p>
        <p>
          BECAUSE SOME JURISDICTIONS DO NOT ALLOW FOR THE EXCLUSION OF DAMAGES,
          OUR LIABILITY IN SUCH JURISDICTIONS SHALL BE LIMITED TO THE MAXIMUM
          EXTENT PERMITTED BY THE LAWS OF SUCH JURISDICTION.
        </p>
      </div>
      <div className={h4Mobile}>Indemnity</div>
      <div className={`${lightBlueBox} mb-4 text-p2-mobile`}>
        Summary: If we face claims or liabilities based on actions or omissions
        within your control, you will defend us and cover any resulting damages.{' '}
      </div>
      <div className={`${p2Mobile} space-y-4`}>
        <p>
          You agree to indemnify, defend and hold harmless us and our
          affiliates, successors and assigns, and each of their respective
          trustees, officers, directors, employees, agents, suppliers and
          representatives, from and against all claims, liabilities, actions,
          suits, proceedings, assessments, judgments, decrees, losses, expenses,
          damages, settlement funds, fines, penalties and associated costs and
          expenses, including reasonable attorneys&apos; fees, arising out of or
          related to (1) your use or misuse of the Services (which for the sake
          of clarity includes your application to or participation in
          CommonApp); (2) your breach of these Terms; (3) any User Materials
          submitted or provided to us; or (4) our use of your User Materials
          and/or the exercise of any rights granted to us, including without
          limitation claims based on rights of privacy, rights of publicity,
          false light, defamation, copyright, patent and/or trademark
          infringement relating to your User Material. We reserve the right to
          assume the exclusive defense and control of any matter that is subject
          to indemnification under this section, in which event you agree to
          cooperate with any reasonable requests assisting our defense of such
          matter.
        </p>
      </div>
      <div className={h4Mobile}>Release of Claims</div>
      <div className={`${lightBlueBox} mb-4 text-p2-mobile`}>
        Summary: You will not bring claims against us if we exercise the rights
        you&apos;ve granted us under this agreement.
      </div>
      <div className={`${p2Mobile} space-y-4`}>
        <p>
          You hereby release us and our affiliates, successors and assigns, and
          each of their respective trustees, officers, directors, employees,
          agents, suppliers and representatives from and against the full amount
          of all claims, liabilities, actions, suits, proceedings, assessments,
          judgments, decrees, losses, fees, damages, settlement funds, and
          associated costs and expenses including attorney&apos;s fees arising
          from or in connection with your use of the Services (including
          application to or participation in CommonApp), any use of User
          Material, and/or the exercise of any rights granted to us, including
          without limitation claims based on rights of privacy, rights of
          publicity, false light, defamation, copyright, patent and/or trademark
          infringement relating to your User Material.
        </p>
      </div>
      <div className={h4Mobile}>Governing Law</div>
      <div className={`${lightBlueBox} mb-4 text-p2-mobile`}>
        Summary: New York law applies to this agreement.
      </div>
      <div className={`${p2Mobile} space-y-4`}>
        <p>
          All questions concerning the construction, validity, enforcement and
          interpretation of these Terms shall be governed by and construed in
          accordance with the domestic laws of the State of New York, without
          giving effect to any choice of law or conflict of law.
        </p>
      </div>
      <div className={h4Mobile}>
        Binding Arbitration and Class Action Waiver
      </div>
      <div className={`${lightBlueBox} mb-4 text-p2-mobile`}>
        Summary: We are agreeing to use arbitration, instead of litigation in
        court, to resolve any legal disputes that may arise.{' '}
      </div>
      <div className={`space-y-4 ${largeCaption} mb-8`}>
        <p>
          TO THE FULLEST EXTENT PERMITTED BY LAW, YOU AND WE AGREE TO ARBITRATE
          ANY CONTROVERSY, CLAIM OR DISPUTE ARISING OUT OF OR IN ANY WAY RELATED
          TO YOUR USE OF THE SERVICES (INCLUDING FOR THE SAKE OF CLARITY YOUR
          APPLICATION TO OR PARTICIPATION IN COMMONAPP), INCLUDING BUT NOT
          LIMITED TO CLAIMS BASED ON CONTRACT, TORT, NEGLIGENCE, STATUTORY OR
          REGULATORY PROVISIONS. EACH PARTY IS GIVING UP ITS RIGHT TO SUE IN
          COURT AND TO HAVE ANY CONTROVERSY, CLAIM OR DISPUTE HEARD BY A JUDGE
          OR JURY.
        </p>
        <p>
          THIS AGREEMENT TO ARBITRATE ALSO APPLIES TO THRESHOLD ARBITRABILITY
          ISSUES, INCLUDING ISSUES RELATED TO WHETHER THIS AGREEMENT TO
          ARBITRATE IS UNCONSCIONABLE OR ILLUSORY AND ANY DEFENSE TO
          ARBITRATION. YOU ALSO AGREE THAT ANY ARBITRATION MAY ONLY BE BROUGHT
          IN YOUR AND OUR INDIVIDUAL CAPACITIES, NOT AS A CLASS, PURPORTED CLASS
          OR REPRESENTATIVE ACTION. THE ARBITRATOR MAY NOT CONSOLIDATE MORE THAN
          ONE INDIVIDUAL OR ENTITY&apos;S CLAIMS, AND MAY NOT OTHERWISE PRESIDE
          OVER ANY FORM OF A REPRESENTATIVE OR CLASS PROCEEDING.
        </p>
        <p className={`${p2Mobile} normal-case`}>
          The mutual promise by you and us to arbitrate any and all disputes,
          and to do so on an individual basis, rather than to litigate before
          the courts or other bodies, provides the mutual consideration for this
          agreement to arbitrate.
        </p>
        <p className={`${p2Mobile} normal-case`}>
          Either party may exercise the right to arbitrate by providing the
          other party with written notice of any and all claims forming the
          basis of such right in sufficient detail to inform the other party of
          the substance of such claims. In no event shall the request for
          arbitration be made after the date when institution of legal or
          equitable proceedings based on such claims would be barred by the
          applicable statute of limitations.
        </p>
        <p className={`${p2Mobile} normal-case`}>
          Unless you and we otherwise agree, the arbitration will be conducted
          in the county where you reside by a single neutral arbitrator and in
          accordance with the then-current rules for resolution of disputes of
          the American Arbitration Association (AAA) (available online at{' '}
          <a
            rel="noreferrer"
            target="_blank"
            className="text-blue-1 underline underline-offset-4"
            href="http://www.adr.org"
          >
            www.adr.org
          </a>{' '}
          or by calling 1-800-778-7879). The parties are entitled to
          representation by an attorney or other representative of their
          choosing. The parties agree to abide by and perform any award rendered
          by the arbitrator. The arbitrator shall issue the award in writing and
          therein state the essential findings and conclusions on which the
          award is based. Judgment on the award may be entered in any court
          having jurisdiction thereof. Payment of all filing, administration and
          arbitrator fees will be governed by the AAA&apos;s rules.
        </p>
        <p className={`${p2Mobile} normal-case`}>
          If this arbitration clause is held unenforceable or arbitration is for
          any other reason not available, any disputes under this Agreement
          shall be heard in a court of competent jurisdiction in New York, New
          York.
        </p>
      </div>
      <div className={h4Mobile}>General</div>
      <div className={`${lightBlueBox} mb-4 text-p2-mobile`}>
        Summary: This clause contains common general provisions, such as how the
        contract will be interpreted and enforced, and whether it can be
        assigned.{' '}
      </div>
      <div className={`${p2Mobile} space-y-4`}>
        <p>
          You shall be deemed an independent contractor and nothing contained
          herein shall constitute this arrangement to be employment, a joint
          venture, or a partnership. You will not represent yourself to be or
          hold yourself out as our employee. You further acknowledge that, other
          than the Services, no goods or services are, have been, or will be
          exchanged under these Terms and therefore no consideration other than
          your ability to access and use the Services is due to you. No failure
          to enforce these Terms shall constitute a waiver of any provision
          contained herein. To the extent any portion of these Terms is
          determined to be unenforceable by a court of competent jurisdiction,
          such portion will be modified solely to the extent necessary to cause
          such portion to be enforceable, and these Terms, as modified, will
          remain in full force and effect. This is the entire agreement between
          you and us relating to the subject matter herein and shall supersede
          all prior discussions, agreements and understandings of any kind
          between us. We may assign our rights and obligations under these Terms
          without your consent in the event of a reorganization, consolidation,
          or merger, or a transfer of all or substantially all of our assets or
          business operations to a successor entity. This Agreement shall inure
          to the benefit of and be binding upon you, us, and our successors and
          assigns. The word “including” as used in these Terms shall be read to
          mean “including but not limited to.”
        </p>
      </div>
      <div className={h4Mobile}>Modifications</div>
      <div className={`${lightBlueBox} mb-4 text-p2-mobile`}>
        Summary: We may make changes to the Services and to this agreement.
      </div>
      <div className={`${p2Mobile} space-y-4`}>
        <p>
          We reserve the right to modify and update any aspect of the Services,
          at any time in our sole discretion. These Terms may be updated
          periodically for clarity or to reflect changes in the Services. We
          indicate at the top of this document when it was most recently
          updated. We encourage you to check this page frequently to review any
          changes. If we make changes, we will notify you via the change log
          below. In some cases, we may provide additional notice such as a
          statement on our homepage or an email. Your continued access to or use
          of the Services will constitute your acceptance of any modifications
          or updates.
        </p>
        <p>Change log</p>
        <ul className="list-disc pl-4">
          <li>April __, 2023 - Terms of Use first published.</li>
        </ul>
      </div>
      <div className={h4Mobile}>Electronic Communications</div>
      <div className={`${lightBlueBox} mb-4 text-p2-mobile`}>
        Summary: We are agreeing to communicate and enter into this contract via
        electronic means (i.e. there will be no signed paper copy).
      </div>
      <div className={`${p2Mobile} space-y-4`}>
        <p>
          These Terms and any other documentation, agreements, notices, or
          communications between you and us may be provided to you
          electronically to the extent permissible by law. Please print or
          otherwise save a copy of all documentation, agreements, notices, and
          other communications for your reference.
        </p>
      </div>
      <div className={h4Mobile}>How To Contact Us</div>
      <div className={`${p2Mobile} space-y-4`}>
        <p>
          If you have any questions about these Terms, please email us at
          info@commonapp.org. You also may write to: 155 W. 23rd St., 5th Floor,
          New York, NY 10011, Attn: CommonApp.
        </p>
      </div>
    </div>
  );
};

export default TermsAndConditions;
