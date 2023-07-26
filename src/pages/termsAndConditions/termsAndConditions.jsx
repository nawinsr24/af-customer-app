import React from 'react';
import PageContainer from '../../components/layouts/PageContainer';
import BreadCrumb from '../../components/BreadCrumb';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';

const TermsAndConditions = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);

    // Access query parameters
    const div_id = queryParams.get('id');
    const breadCrumb = [
        {
            text: 'Home',
            url: '/',
        },
        {
            text: 'Terms and conditions',
        },
    ];
    const scrollFn = () => {
        var divElement = document.getElementById(div_id);
        if (divElement) {
            divElement.scrollIntoView({ behavior: 'smooth' });
        } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };
    useEffect(() => {
        scrollFn();
    }, [div_id]);

    return (
        <PageContainer>
            <div className="ps-page--single">
                <BreadCrumb breacrumb={breadCrumb} layout="fullwidth" />
                <div className="ps-section--custom">
                    <div className="container">
                        <div className="ps-section__header">
                            <h1>Who Are We?</h1>
                        </div>
                        <div className="ps-section__content">
                            <h3>About AMIRTHA FASHION</h3>
                            <p style={{ textAlign: "justify" }}>
                                What happens when an indelible idea of democratizing the long-forgotten Indian traditional wear dashes an engineering graduate's mind? Yeah, Amirtha Fashion is a cheeky team with a soul that scouts, designs, and manufactures scores of Indian ethnic wear such as Pattu Pavadai, Silk Lehenga Choli, Cotton, and Silk Dhoti, and much more. Infused with the spirit to celebrate what our makkals used to wear and make them mainstream again, we culminate our product research and production efforts to provide a striking collection of ethnic wear that invokes a sense of awe. Selling across multiple eCommerce channels and also through our website. Lead and run mostly by guys in our early 20s. Let's make authentic Indian wear great again:)

                            </p>
                            <p style={{ textAlign: "justify" }}>
                                What do Young Parents have to say about our collections?
                                A celebration of any kind- be it a wedding, a party, a house-warming function or even a simple temple visit isn't fulfilled without our culture-based ethnic wear. Young parents, mostly in their 20s and 30s may have grown in an era dominated by western influence, but their heart yearns to see their cute little one glitter in unique Indian desi ethnic wear. But there seems to be a problem. A confusion of sorts pertaining to the search for authentic ethnic wear, that's made of supreme quality with an eye-catching design scheme too. Hurray! Your search ends here. Check out the heart-warming words of parents who tried AMIRTHA FASHION’s range of ethnic wear and here’s that they had to say:
                                <p></p>
                                <p>“Super quality product. Looks good on the baby. And comfortable”</p>
                                <p>“So pretty dress must buy 🥰”</p>
                                <p>“Wanted a traditional dress for my son's Annaprashana, cloth was good and the child looked good in the dress, the add ons were handy too.”
                                </p>
                                <p>“well stitched and fitted well for my daughter.”</p>
                                <p>“Impressed with the material. Worth the money”</p>
                                <p>“Paisa vasool product ...please go for it ...such a fantastic ...happyy”</p>
                                <p>“Value for the money. Shirts & Dhothi's quality, Worth for the Price. Fashionable accessories enclosed alongwith the package will be attractive to the kids. Thanks Amirtha Fashion”</p>
                            </p>

                            <h4>Careers</h4>
                            <p style={{ textAlign: "justify" }}>
                                AMIRTHA FASHION is one of the most recognized new-age ethnic wear brand, operating on ecommerce marketplaces and wholesale distribution chain. We design, scout, manufacture, and bring out eye-catching varieties of Indian native wear like Lehenga Choli, Pattu Pavadai and Kids Dhoti to our legion of customers and fashion aficionados. Join our vibrant team and take part in our certain success story. Mail your job requirement and resume to <a style={{ color: "#fcb800" }} href='mailto:info@amirthafashion.com'>info@amirthafashion.com.</a>

                            </p>

                        </div>

                        <div className="ps-section__header">
                            <h1>Customer Support Centre</h1>
                        </div>
                        <div className="ps-section__content">
                            <h3>Whatsapp Chat Button</h3>
                            <p style={{ textAlign: "justify" }}>
                                Click on the Whatsapp Icon to directly connect with our customer service team, who’ll assist you to resolve any kind of queries.

                            </p>


                            <h4>Raise a Query</h4>
                            <p style={{ textAlign: "justify" }}>
                                (There would be a box where the user can type the query. The box is accompanied with a Send button, which fires the response to our official email address)

                            </p>

                        </div>
                        <div className="ps-section__content">
                            <h4>Contact Us</h4>
                            <p style={{ textAlign: "justify" }}>
                                AMIRTHA FASHION <br />
                                No: 275, Pycrofts Road, Triplicane, Chennai - 600005,<br />
                                Email: <a style={{ color: "#fcb800" }} href='mailto:info@amirthafashion.com'>info@amirthafashion.com.</a> <br />
                                Connect with the Chief Customer Service Lead: <a style={{ color: "#fcb800" }} href='mailto:renithkumar@amirthafashion.com'>renithkumar@amirthafashion.com.</a>  <br />
                                Whatsapp/ Mobile: <a style={{ color: "#fcb800" }} href='tel:+91 8608707354'>+91 8608707354.</a> <br />


                            </p>
                        </div>

                        <div className="ps-section__header">
                            <h1>What are our Ethics?</h1>
                        </div>
                        <div className="ps-section__content">
                            <h3 id='policy'>PRIVACY POLICY</h3>
                            <p style={{ textAlign: "justify" }}>
                                This Privacy Policy outlines AMIRTHA FASHION's approach to Data Protection and Privacy to fulfil its obligations under the applicable laws and regulations. This Privacy Policy applies to your Personal Data which is processed by us, whether in physical or electronic mode.
                                While you may be able to browse the platform (Website and App collectively referred to as “Platform”) from countries outside of India, however please note we do not offer any product/service under this Platform outside India. By visiting the platform or providing your information, you expressly agree to be bound by this Privacy Policy and agree to be governed by the laws of India including but not limited to the laws applicable to data protection and privacy. If you do not agree please do not use or access our Platform.
                                In this Privacy Policy, the expressions ‘Personal Data’, ‘Data Subject’, ‘Controller’, ‘Processor’ and ‘Processing’ shall have the meanings given to them in the applicable privacy laws. .
                                We are committed to treating data privacy seriously. It is important that you know exactly what we do with your Personal Data.
                                Throughout this document, “we”, “us”, “our”, “ours” refer to AMIRTHA FASHION PRIVATE LIMITED . Wherever we have said ‘you’ or ‘your’, this means YOU.


                            </p>


                            <h4>WHO WE ARE
                            </h4>
                            <p style={{ textAlign: "justify" }}>
                                AMIRTHA FASHION is a D2C ethnic wear brand and company, having its registered office at 275, Pycrofts Road, Triplicane, Chennai - 600005. AMIRTHA FASHION is engaged in the business of facilitating selling, marketing and retailing clothes / garments (“Business”) through the e-commerce websites and mobile applications (“App”) both developed and owned by AMIRTHA FASHION and its affiliates (Website and App collectively referred to as “Platform”) or offline stores / events to conduct its Business

                            </p>
                            <h4>ROLES WE PLAY

                            </h4>
                            <p style={{ textAlign: "justify" }}>
                                We play the role of a Data Controller when we collect and process Personal Data about you.
                                We play the role of a Data Processor when we collect and process Personal Data on behalf of another Data Controller


                            </p>


                            <h4>OUR COMMITMENT</h4>
                            <p style={{ textAlign: "justify" }}>
                                We commit to protecting your privacy and hence our Personal Data handling practices are continually reviewed to ensure compliance with the applicable Privacy laws and regulations
                            </p>
                            <h4> PERSONAL INFORMATION GATHERED BY AMIRTHA FASHION</h4>
                            <p style={{ textAlign: "justify" }}>
                                The information we learn and gather from you, personal or otherwise, is used to register you, verify your identity to permit you to use the app, undertake transactions (including to facilitate and process payments), communicate with you,convey any promotional offers, services or updates associated with AMIRTHA FASHION and generally maintain your accounts with us. We also use this information to customize your experience and improve.
                                Information You Give Us:<br />
                                We receive and store any information you provide while using AMIRTHA FASHION, or give us in any other way. You can choose not to provide certain information, but then you might not be able to use AMIRTHA FASHION. We use the information that you provide for such purposes as opening your account, processing your transactions, responding to your requests, and communicating with you.
                                Information We Collect About You:<br />
                                We receive and store certain types of information whenever you interact with us. For example, like many websites, we use “cookies,” and we obtain certain types of information when your web browser accesses our Services. We may also receive/store information about your location and your mobile device, including a unique identifier for your device. We may use this information for internal analysis and to provide you with location-based services, such as advertising, search results, and other personalized content.
                                Information From Other Sources:<br />
                                We might receive information about you from other sources, such as updated delivery and address information from our carriers, which we use to correct our records and deliver your next purchase more easily.

                            </p>
                            <h4> CATEGORIES OF PERSONAL DATA</h4>
                            <p style={{ textAlign: "justify" }}>
                                Categories of Personal Data collected and processed by us are as follows;
                                Demographic & Identity data<br />
                                <ul>
                                    <li>Contact details such as Name, email address, contact number, shipping address, country,date of birth, profile picture
                                    </li>
                                    <li>Open data and public records such as information about YOU that is openly available on the internet
                                    </li>
                                    <li>
                                        Details such as Transaction amount, bank name, card number, card type.
                                        Online Identifiers and other Technical Data

                                    </li>
                                    <li>
                                        Location details such as data we get about your location, IP address, logs, or from where you connect a computer to the internet
                                    </li>
                                    <li>
                                        Technical details such as device information, location and network carrier when you use our mobile applications

                                    </li>
                                    <li>
                                        Communications details such as the Metadata and other Personal Data we get from communications done through e-mails, SMS, instant messages and calls
                                    </li>
                                    <li>
                                        Usage data details such as data about how you use our website or web-based properties, pages viewed, etc.

                                    </li>
                                </ul>

                            </p>
                            <h4>CONSENT</h4>
                            <p style={{ textAlign: "justify" }}>
                                By using the Website and/ or by providing your information, you consent to the collection and use of the information you disclose on the Website in accordance with this Privacy Policy, including but not limited to your consent for sharing your information as per this privacy policy.

                            </p>
                            <h4>LAWFUL BASES OF PROCESSING YOUR PERSONAL DATA</h4>
                            <p style={{ textAlign: "justify" }}>
                                We are permitted to process your Personal Data in compliance with applicable laws and regulations by relying on one or more of the following lawful bases:
                                <ul>
                                    <li>
                                        You have explicitly agreed to us processing your Personal Data for a specific reason

                                    </li>
                                    <li>
                                        The processing is necessary to perform the agreement we have with you or to take steps to enter into an agreement with you
                                    </li>
                                    <li>
                                        The processing is necessary to be in compliance with our Legal Obligations

                                    </li>
                                    <li>
                                        The processing is necessary for the purposes of a legitimate interest (“Legitimate Interest”) pursued by us, such as
                                    </li>
                                    <li>
                                        to provide services to you,

                                    </li>
                                    <li>
                                        to evaluate, develop or improve our products and services
                                    </li>
                                </ul>
                                Where the processing is based on your consent, you have a right to withdraw your consent at any time. You may withdraw consent by contacting us. Upon receipt of your written request to withdraw your consent, consequences of withdrawal will be communicated to you and, upon your agreement, your request for withdrawal will be processed.
                            </p>
                            <h4>COOKIES AND OTHER TRACKERS USED BY OUR DIGITAL PROPERTIES
                            </h4>
                            <p style={{ textAlign: "justify" }}>
                                Cookies are small text files that are placed on your computer by websites that you visit. Similarly, there are other types of trackers used. Likewise, Mobile Apps use requisite permissions and SDKs. These are used to make Websites & Apps work, or work more efficiently, as well as to provide information to the owners of the website/ App.
                                We use cookies, permissions and other trackers in our website, web-based properties and mobile applications that are used to collect and process data about you so we can provide you a better online experience as well as improve our services
                                Below are the categories of cookies used on our website along with a description of what they are used for
                                <h5>Strictly Necessary </h5>
                                <p style={{ textAlign: "justify" }}>These cookies are needed to run our website, to keep it secure if you are logged on and to obey regulations that apply to us.
                                    If you are a customer, they help us know who you are so that you can log on and manage your accounts. They also help us keep your details safe and private.
                                </p>
                                <h5>Functional </h5>
                                <p style={{ textAlign: "justify" }}>
                                    These cookies are used for remembering things like:
                                    <ul>
                                        <li>
                                            Your user ID on the log on page
                                        </li>
                                        <li>
                                            Your region or country

                                        </li>
                                        <li>
                                            Your preferred language
                                        </li>
                                        <li>
                                            Accessibility options like large font or high contrast pages
                                        </li>

                                    </ul>
                                </p>
                                <h5>
                                    Performance
                                </h5>
                                <p style={{ textAlign: "justify" }}>
                                    These cookies tell us how you and our other customers use our website. We combine all this data together and study it. This helps us to:
                                    <ul>
                                        <li>
                                            Improve the performance of our services

                                        </li>
                                        <li>
                                            Improve the products we provide

                                        </li>

                                    </ul>
                                    Most web browsers allow some control of most cookies through the browser settings. Please note disabling the ‘Strictly Necessary’ cookies may cause certain parts of our website to remain inaccessible to you.<br />
                                    We use other tracking mechanisms in addition to the above
                                    <ul>
                                        <li>
                                            Pixel Tags

                                        </li>
                                        <li>
                                            Log Files

                                        </li>
                                        <li>
                                            Clickstream analytics

                                        </li>
                                    </ul>

                                </p>

                                <h5>
                                    DO NOT TRACK

                                </h5>
                                <p>
                                    Some web browsers have a “Do Not Track” feature. This feature lets you tell websites you visit that you do not want to have your online activity tracked. These features are not yet uniform across browsers. Our sites are not currently set up to respond to those signals.
                                </p>
                                <h5>
                                    PERSONAL DATA DISCLOSURE

                                </h5>
                                <p>
                                    Amirtha Fashion app contains third party SDKs that collect personally identifiable information (PII). They use this information to better target users or provide elements of our products & services on behalf of us. These third-party sites have separate and independent privacy policies.

                                </p>
                                <h5>AMIRTHA FASHION USES THREE TYPES OF SDKS:</h5>
                                <p>
                                    <div className="table-responsive">
                                        <table className="table ps-table--shopping-cart">
                                            <thead>
                                                <tr>
                                                    <th>SDKs</th>
                                                    <th>Purpose</th>

                                                </tr>
                                            </thead>
                                            <tbody>

                                                <tr >
                                                    <td style={{ textAlign: "left", borderBottom: " 1px solid #dee2e6" }}>
                                                        Analytics
                                                    </td>
                                                    <td style={{ textAlign: "left", borderBottom: " 1px solid #dee2e6" }}>
                                                        <ul>
                                                            <li>
                                                                Analyze in-depth detail about the visitors on our app
                                                            </li>
                                                            <li>
                                                                Settle errors

                                                            </li>
                                                            <li>
                                                                Better target users and
                                                            </li>
                                                            <li>
                                                                Provide push notifications and digital ads to the users

                                                            </li>
                                                            <li>
                                                                Example-Clevertap,Appsflyer,Crashlytics, Gamooga
                                                            </li>
                                                        </ul>
                                                    </td>


                                                </tr>

                                                <tr>
                                                    <td style={{ textAlign: "left", borderBottom: " 1px solid #dee2e6" }}>
                                                        Payment
                                                    </td>
                                                    <td style={{ textAlign: "left", borderBottom: " 1px solid #dee2e6" }}>
                                                        <ul>
                                                            <li>
                                                                Complete customers’ payment transaction

                                                            </li>
                                                            <li>
                                                                Example - PayU, Razorpay, Cashfree


                                                            </li>

                                                        </ul>
                                                    </td>


                                                </tr>
                                                <tr>
                                                    <td style={{ textAlign: "left", borderBottom: " 1px solid #dee2e6" }}>
                                                        Login
                                                    </td>
                                                    <td style={{ textAlign: "left", borderBottom: " 1px solid #dee2e6" }}>
                                                        <ul>
                                                            <li>
                                                                Help users login at Amirtha Fashion
                                                            </li>
                                                            <li>
                                                                Example - Google, Facebook.

                                                            </li>

                                                        </ul>
                                                    </td>


                                                </tr>

                                            </tbody>
                                        </table>
                                    </div>
                                </p>
                                <p>
                                    Links to the Privacy Policies of some of the third-party service providers used by our application are given below:
                                    <ul>
                                        <li><a target='_blank' href='https://firebase.google.com/support/privacy/'> Firebase Crashlytics</a></li>
                                        <li><a target='_blank' href='https://www.facebook.com/about/privacy/update/printable'> Facebook</a></li>
                                        <li><a target='_blank' href='https://policies.google.com/privacy?hl=en-US'> Google</a></li>
                                        <li><a target='_blank' href='https://www.appsflyer.com/privacy-policy/'> Appsflyer</a></li>
                                        <li><a target='_blank' href='https://gamooga.com/privacy'> Gamooga</a></li>
                                        <li><a target='_blank' href='https://razorpay.com/privacy/'> Razorpay</a></li>
                                        <li><a target='_blank' href='https://payu.in/privacy-policy'> PayU</a></li>
                                        <li><a target='_blank' href='https://clevertap.com/privacy-policy/'> Clevertap</a></li>
                                        <li><a target='_blank' href='https://www.cashfree.com/privacypolicy.html'> Cashfree</a></li>
                                        <li><a target='_blank' href='https://pages.paytm.com/privacy.html'> Paytm</a></li>
                                        <li><a target='_blank' href='https://www.axisbank.com/privacy-policy'> Axis Bank</a></li>
                                        <li><a target='_blank' href='https://olamoney.com/images/pdf/Privacy_Policy_v20150810-819b718240.pdf'> Ola Money</a></li>
                                        <li><a target='_blank' href='https://payments.billdesk.com/pb/jsp/privacypolicy_vbp.htm'> BillDesk</a></li>
                                        <li><a target='_blank' href='https://www.kapturecrm.com/ph/privacy-policy/'> Kapture CRM</a></li>
                                        <li><a target='_blank' href='https://exotel.com/privacy-policy-2018/'> Exotel</a></li>
                                        <li><a target='_blank' href='https://www.elision.eu/privacy-policy/#:~:text=You%20have%20the%20right%20to,the%20right%20to%20data%20transferability.'> Elision</a></li>
                                        <li><a target='_blank' href='https://verloopweb.com/privacy-policy/'> Verloop</a></li>
                                        <li><a target='_blank' href='https://docs.netcoresmartech.com/docs/privacy-policy'> Netcore</a></li>
                                        <li><a target='_blank' href='https://www.daffodilsw.com/privacy-policy'> Daffodil Software Ltd.</a></li>
                                        <li><a target='_blank' href='https://www.gupshup.io/developer/privacy#:~:text=Gupshup%20Services%20are%20not%20directed,steps%20to%20delete%20such%20information.'> Gupshup</a></li>
                                        <li><a target='_blank' href='https://www.whatsapp.com/legal/privacy-policy'> Whatsapp</a></li>
                                        <li><a target='_blank' href='https://mailchimp.com/legal/privacy/'> Mandrill</a></li>
                                        <li><a target='_blank' href='https://www.vinculumgroup.com/privacy-policy/'> Vinculum(eRetail)</a></li>
                                        <li><a target='_blank' href='https://www.adobe.com/in/privacy/policy.html'> Adobe</a></li>

                                    </ul>
                                </p>
                                <p>
                                    We have appropriate contracts in place with our third-party partners. This means that they cannot do anything with your Personal Data which is outside of the scope permitted by us. They hold it securely and retain it only for the period specified in our contracts with them.
                                    We might also disclose your Personal Data to appropriate authorities if we believe that it is reasonably necessary to comply with a law, regulation, legal process, to protect the safety of any person, to address fraud, security, or technical issues, or to protect our rights or the rights of those who use our products & services.

                                </p>
                                <p>
                                    Reasons for disclosing your Personal Data to other parties:<br />
                                    We may disclose your Personal Data to others where it is lawful to do so including where we or they:
                                    <ul>
                                        <li>need to provide you with products or services</li>
                                        <li>where you have initiated a payment</li>
                                        <li>have a legal obligation to do so, e.g. to assist with detecting and preventing fraud,</li>
                                        <li>have requirement in connection with regulatory reporting, litigation or asserting or defending legal rights and interests</li>
                                        <li>have a legitimate business reason for doing so</li>
                                        <li>want to send you information and promotional material regarding our products and services,</li>
                                        <li>have asked you for your consent to share it, and you’ve agreed</li>
                                        <li>Improve your online experience for using our product.</li>

                                    </ul>
                                </p>
                                <p>
                                    To whom your Personal Data may be disclosed:<br />
                                    We may disclose your Personal Data for the above purposes to other parties including:

                                    <ul>
                                        <li> Other group companies and any subcontractors, agents or service providers who work for us or provide services to us or group companies (including their employees, sub-contractors, service providers, directors and officers)</li>
                                        <li> Law Enforcement Authorities, Government Authorities, courts, dispute resolution bodies, our regulators, auditors and any party appointed or requested by our regulators to carry out investigations or audits of our activities</li>
                                        <li> Statutory and regulatory bodies and authorities (including the government) investigating agencies and entities or persons, to whom or before whom it is mandatory to disclose the Personal Data as per the applicable law, courts, judicial and quasi-judicial authorities and tribunals, arbitrators and arbitration tribunals</li>
                                        <li> Overseas regulators</li>
                                        <li> Anybody else that we’ve been instructed to share your Personal Data with by you</li>

                                    </ul>
                                </p>
                                <h5>
                                    CROSS-BORDER DATA TRANSFER

                                </h5>
                                <p>
                                    Personal Data we hold about you may be transferred to other countries outside your residential country for any of the purposes described in this Privacy Policy.
                                    You understand and accept that these countries may have differing (and potentially less stringent) laws relating to the degree of confidentiality afforded to the information it holds and that such information can become subject to the laws and disclosure requirements of such countries, including disclosure to governmental bodies, regulatory agencies and private persons, as a result of applicable governmental or regulatory inquiry, court order or other similar process. In addition, a number of countries have agreements with other countries providing for exchange of information for law enforcement, tax and other purposes.
                                    If we transfer your Personal Data to third parties for purposes stated in this Privacy Policy, we will use best endeavors to put in place appropriate controls and safeguards to ensure that your Personal Data is kept accurate, adequately protected, and processed only for specified and reasonable purposes in a manner that is fair, transparent and has a lawful basis, and is stored for no longer than is absolutely necessary.

                                </p>
                                <h5>DATA SECURITY</h5>
                                <p>We are committed to protecting your Personal Data in our custody. We take reasonable steps to ensure appropriate physical, technical and managerial safeguards are in place to protect your Personal Data from unauthorized access, alteration, transmission and deletion. We ensure that the third parties who provide services to us under appropriate contracts, take appropriate security measures to protect your Personal Data in line with our policies.</p>
                                <h5>RETENTION AND DISPOSAL OF DATA</h5>
                                <p>
                                    We keep the Personal Data we collect about you on our systems or with third parties for as long as it is required for the purposes set out in this Privacy Policy and for legal or regulatory reasons. We will only use your Personal Data for those purposes and will make sure that your Privacy is protected. We shall take reasonable steps to delete or permanently de-identify Personal Data that is no longer needed.

                                </p>
                                <h5>
                                    LINKS TO OTHER WEBSITES

                                </h5>
                                <p>
                                    Our website may contain links to websites of other organisations. This privacy policy does not cover how that organisation processes Personal Data. We encourage you to read the privacy policies on the other websites you visit.

                                </p>
                                <h5>
                                    CHILDREN’S PRIVACY

                                </h5>
                                <p>
                                    Our website is directed to be used by adults only. If you are not an adult, while you may look at our site, you should not make a purchase, register, or submit Personal Data to us. We or our associates /affiliates do not knowingly collect information from minors.

                                </p>
                                <h5>
                                    YOUR RIGHTS AS A CUSTOMER

                                </h5>
                                <p>
                                    We understand that when you interact with AMIRTHA FASHION, you have rights over your Personal Data. These rights involve providing reasonable steps to allow you to access your personal data, correct any errors among others. In the event that you are not satisfied with our response or have unresolved concerns, you can get in touch with us to resolve the issue by means of <a style={{ color: "#fcb800" }} href='mailto:info@amirthafashion.com'>info@amirthafashion.com.</a>

                                </p>
                                <h5>CONTACT US
                                </h5>
                                <p>
                                    For any further queries and complaints related to privacy under applicable laws and regulations, you could reach us at:<br />
                                    Contact Email Address: <a style={{ color: "#fcb800" }} href='mailto:info@amirthafashion.com'>info@amirthafashion.com</a><br />
                                    IN ACCORDANCE WITH INFORMATION TECHNOLOGY ACT 2000 AND RULES MADE THERE UNDER, THE NAME AND CONTACT DETAILS OF THE GRIEVANCE OFFICER ARE PROVIDED BELOW<br />

                                    GRIEVANCE/ NODAL OFFICER - CUSTOMER SERVICES<br />
                                    Name : Mr. Renith Kumar Chandrasekaran<br />
                                    Email : <a style={{ color: "#fcb800" }} href='mailto:renithkumar@amirthafashion.com'>renithkumar@amirthafashion.com</a> <br />

                                </p>
                                <h5>NOTIFICATION OF CHANGES</h5>
                                <p>
                                    We keep our Privacy Policy under regular review to make sure it is up to date and accurate. Any changes we may make to this Privacy Policy in the future will be posted on this page. We recommend that you re-visit this page regularly to check for any updates.

                                </p>
                            </p>

                        </div>


                        <div className="ps-section__header">
                            <h1>SHIPPING AND RETURN POLICY
                            </h1>
                        </div>
                        <div className="ps-section__content">
                            <h3 id='shipping'>Shipping</h3>
                            <p style={{ textAlign: "justify" }}>

                                What is the cost of shipping?<br />
                                For all orders inside India, shipping is entirely free! That’s AMIRTHA FASHION’s promise:)
                                For orders outside India (International Orders), the shipping charge varies with each country.


                            </p>
                            <h3>How long will it take for the order to reach me?
                            </h3>
                            <h4>DOMESTIC SHIPPING
                            </h4>
                            <p style={{ textAlign: "justify" }}>
                                Please refer to the product page for estimated shipping and delivery timelines for both domestic and     international orders. From the time of order placed, it takes about 1 day for Chennai, 2-3 days for the rest of the nation.<br />
                                1. Chennai, and its suburbs - 1 DAY <br />
                                2. South India - 2 to 3 days<br />
                                3. Rest of India - 3 to 4 days<br />

                            </p>
                            <h4>INTERNATIONAL SHIPPING

                            </h4>
                            <p style={{ textAlign: "justify" }}>
                                For international orders, we provide you with two delivery options: <br />
                                1. Standard Speed - 12 to 20 days from the date of dispatch<br />
                                2. Express Speed - 4 to 7 days from the date of dispatch<br />

                                If you have placed an order with multiple items, please note that your items may arrive in multiple     shipments. The estimated delivery times are indicative, and, on some occasions, there might be some unavoidable delays beyond our control. We will keep you informed in case of any delays.


                            </p>
                            <h4>What can I do if my order dispatch is delayed?

                            </h4>
                            <p style={{ textAlign: "justify" }}>
                                We will try our best to get your products to you within the estimated delivery times. If the package has not reached you by the expected delivery date, please write to us at <a style={{ color: "#fcb800" }} href="mailto: info@amirthafashion.com"> info@amirthafashion.com</a> and we will try our best to resolve your issues.

                            </p>
                            <h4>My order has been shipped. Can I track it?
                            </h4>
                            <p style={{ textAlign: "justify" }}>
                                For orders within India, once your order has been dispatched, you can track the order from the My Order section.
                                For International orders, we would share the tracking number as soon as we dispatch your order.
                                You can track the status of your package 24 hours after your order is dispatched from our warehouse.

                            </p>



                        </div>


                        <div className="ps-section__header">
                            <h1 id='return'>Returns, Refunds, Cancellations and Exchanges

                            </h1>
                        </div>
                        <div className="ps-section__content">
                            <h3>
                                What is the return policy on Amirtha Fashion?
                            </h3>
                            <p style={{ textAlign: "justify" }}>
                                Most of our products are eligible for return and replacements for domestic orders. There are some     items that are Made To order which are not eligible for returns. The return and exchange policy for every product is clearly mentioned  on the product page. Please note that international orders are not eligible for returns or exchanges.
                                If the product is eligible for return/ replacement, you can raise the return/ replacement request     from the My Order section within 7 days of delivery to request return and replacement. Only products which are unused, unworn, unwashed, undamaged, with all its labels and tags completely intact, in original packaging and eligible for return only can be returned/ replaced.

                            </p>
                            <h3>How are returns processed?
                            </h3>
                            <p style={{ textAlign: "justify" }}>Once you request to return a product, a pick up is organized for the item. Our courier partners will come to pick up the item within 3-5 business days after your return request has been received. Once pickup is done, your refund will be initiated from our end.</p>
                            <h3>Can I cancel my order?

                            </h3>
                            <p style={{ textAlign: "justify" }}>
                                You can cancel your order within 24 hours of order through My Order section or by writing to us at <a style={{ color: "#fcb800" }} href="mailto: info@amirthafashion.com"> info@amirthafashion.com.</a>
                                **Amirtha Fashion reserves the right to cancel any order without pre-confirming the customer at any time and may verify any order before shipping the same to the customer that may include having a verbal or written confirmation from the customer.

                            </p>
                            <h3>How will I receive the refund for my cancelled or returned product?</h3>
                            <p style={{ textAlign: "justify" }}>
                                In case of prepaid orders, money will be returned to the bank account/ credit/debit card where the payment was made from. For Cash on Delivery orders customers will be required to provide bank     details/UPI ID where they would like to receive the refund.

                            </p>
                            <h3>How long does it take to receive a refund for a cancelled order or returned product?
                            </h3>
                            <p style={{ textAlign: "justify" }}>
                                We will process your refund within 3 business days in case of cancellation of an order. In case of returns, we will     refund the money after the product has been picked up by our courier partner.
                            </p>
                            <h3>
                                Can I return part of my order?

                            </h3>
                            <p style={{ textAlign: "justify" }}>
                                Yes. You can return any products that are eligible for returns within 7 days of delivery. Please do note there are some items that are not returnable or exchangeable.

                            </p>
                            <h3>My garment does not fit my child. What can I do?
                            </h3>
                            <p style={{ textAlign: "justify" }}>
                                If the product does not fit and you would like a new size, please request for a size exchange through My order section or the customer service team within 7 days of receiving the product. In some cases, minor size and fit alterations might be available for orders placed within India. Our team will try its best to help you for any size exchanges, alterations subject to availability. In case the size you     have requested is not available we will offer you the option to return the product instead.
                            </p>
                        </div>
                        <div className="ps-section__header">
                            <h1 id='termsAndConditions'>Terms & Conditions

                            </h1>
                        </div>
                        <div className="ps-section__content">
                            Please read the following terms and conditions very carefully as your use of service is subject to your acceptance of and compliance with the following terms and conditions ("Terms"). By subscribing to or using any of our services you agree that you have read, understood and are bound by the Terms, regardless of how you subscribe to or use the services. If you do not want to be bound by the Terms, you must not subscribe to or use our services.
                            <h5>YOUR USE OF THE WEBSITE IMPLIES THAT YOU AGREE WITH THE TERMS OF USE.</h5>
                            <p style={{ textAlign: "justify" }}>
                                <h3>INTRODUCTION
                                </h3>
                                <p>
                                    www.amirthafashion.com ("Website") is an Internet based content and e-commerce portal.
                                    Use of the Website is offered to you conditioned on acceptance without modification of all the terms, conditions and notices contained in these Terms, as may be posted on the Website from time to time. The Website at its sole discretion reserves the right not to accept a User from registering on the Website without assigning any reason thereof.

                                </p>
                                <h3>User Account, Password, and Security
                                </h3>
                                <p>
                                    You will receive a password and account ID upon completing the Website's registration process. The Website requires you to register as a user by creating an Account in order to avail of the Services provided by the Website. You will be responsible for maintaining the confidentiality of the Account Information, and are fully responsible for all activities that occur under Your Account. You agree to (a) immediately notify the Website of any unauthorized use of Your Account Information or any other breach of security, and (b) ensure that You exit from Your Account at the end of each session. Website cannot and will not be liable for any loss or damage arising from Your failure to comply with this Section. You may be held liable for losses incurred by Website or any other user of or visitor to the Website due to authorized or unauthorized use of Your Account as a result of Your failure in keeping Your Account Information secure and confidential.
                                </p>
                                <h3>Services provided
                                </h3>
                                <p>
                                    Website provides a number of Internet-based services (all such services, collectively, the "Service"). One such Online service which permits users to purchase by offering a huge range of Ethnic Indian wear. The Products can be purchased through the Website through various methods of payments offered. The purchase of Products shall be additionally governed by specific policies of sale, like cancellation policy, return policy, etc. which are found on the following URL <a target='_blank' href="http://www.amirthafshion.com">www.amirthafshion.com</a> and all of which are incorporated here by reference. In addition, these terms and policies may be further supplemented by Product specific conditions, which may be displayed on the webpage of that Product.
                                </p>
                                <h3>Privacy Policy</h3>
                                <p>
                                    The User hereby consents, expresses and agrees that he has read and fully understands the Privacy Policy (link for privacy policy) of www.biba.in. The user further consents that the terms and contents of such Privacy Policy are acceptable to him. User Conduct and Rules You agree and undertake to use the Website and the Service only to post and upload messages and material that are proper. By way of example, and not as a limitation, you agree and undertake that when using a Service, you will not:<br />
                                    (a) defame, abuse, harass, stalk, threaten or otherwise violate the legal rights of others;<br />
                                    (b) publish, post, upload, distribute or disseminate any inappropriate, profane, defamatory, infringing, obscene, indecent or unlawful topic, name, material or information;<br />
                                    (c) upload files that contain software or other material protected by intellectual property laws unless you own or control the rights thereto or have received all necessary consents;<br />
                                    (d) upload or distribute files that contain viruses, corrupted files, or any other similar software or programs that may damage the operation of the Website or another's computer;<br />
                                    (e) conduct or forward surveys, contests, pyramid schemes or chain letters;<br />
                                    (f) download any file posted by another user of a Service that you know, or reasonably should know, cannot be legally distributed in such manner;<br />
                                    (g) falsify or delete any author attributions, legal or other proper notices or proprietary designations or labels of the origin or source of software or other material contained in a file that is uploaded;<br />
                                    (h) violate any code of conduct or other guidelines, which may be applicable for or to any particular Service;<br />
                                    (i) violate any applicable laws or regulations for the time being in force in or outside India; and<br />
                                    (j) violate, abuse, unethically manipulate or exploit, any of the terms and conditions of this Agreement or any other terms and conditions for the use of the Website contained elsewhere.<br />

                                </p>
                                <h3>Disclaimer Of Warranties & Liability
                                </h3>
                                <p>
                                    YOU EXPRESSLY UNDERSTAND AND AGREE THAT, TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW: <a href="http://www.amirthafshion.com"> www.amirthafshion.com</a> (“Website”) has endeavoured to ensure that all the information is correct, but Website neither warrants nor makes any representations regarding the quality, accuracy or completeness of any data, information, product or Service. In no event shall Website be liable for any direct, indirect, punitive, incidental, special, consequential damages or any other damages resulting from:
                                    <br />(a) the use or the inability to use the Services or Products;<br />
                                    (b) unauthorized access to or alteration of the user's transmissions or data;<br />
                                    (c) any other matter relating to the services; including, without limitation, damages for loss of use, data or profits, arising out of or in any way connected with the use or performance of the Website or Service. Neither shall Website be responsible for the delay or inability to use the Website or related services, the provision of or failure to provide Services, or for any information, software, products, services and related graphics obtained through the Website, or otherwise arising out of the use of the website, whether based on contract, tort, negligence, strict liability or otherwise. Further, Website shall not be held responsible for non-availability of the Website during periodic maintenance operations or any unplanned suspension of access to the website that may occur due to technical reasons or for any reason beyond Website’s control.<br />
                                    The user understands and agrees that any material and/or data downloaded or otherwise obtained through the Website is done entirely at their own discretion and risk and they will be solely responsible for any damage to their computer systems or loss of data that results from the download of such material and/or data.

                                </p>
                                <h3>
                                    Shipping
                                </h3>
                                <p>
                                    Title and risk of loss for all products ordered by you shall pass on to you upon Website’s shipment to the shipping carrier.

                                </p>
                                <h3>
                                    Termination
                                </h3>
                                <p>
                                    The Terms of Use will continue to apply until terminated by Website as set forth below. Website may suspend or terminate your use of the Website or any Service if it believes, in its sole and absolute discretion that you have breached, violated, abused, or unethically manipulated or exploited any term of these Terms or anyway otherwise acted unethically. If Website terminates your use of the Website or any Service, Website may delete any content or other materials relating to your use of the Service and Website will have no liability to you or any third party for doing so. You shall be liable to pay for any Service or product that you have already ordered till the time of Termination by either party whatsoever. Further, you shall be entitled to your royalty payments as per the User License Agreement that has or is legally deemed accrued to you.
                                </p>
                                <h3>
                                    Governing Law
                                </h3>
                                <p>
                                    These Terms of Use and all transactions entered into on or through the Website and the relationship between You and Website shall be governed in accordance with the laws of India without reference to conflict of laws principles. You agree that all claims, differences and disputes arising under or in connection with or in relation hereto the Website, the Terms of Use or any transactions entered into on or through the Website or the relationship between You and Website shall be subject to the exclusive jurisdiction of the courts at New Delhi, India and You hereby accede to and accept the jurisdiction of such courts

                                </p>
                                <h3>Report Abuse</h3>
                                <p>In the event You come across any abuse or violation of these Terms of Use or if You become aware of any objectionable content on the Website, please report to supports numbers. Communications
                                    You hereby expressly agree to receive communications by way of SMS, e-mails from Website relating to Services provided.
                                    A User can unsubscribe/ opt-out from receiving communications from the Website anytime via:
                                    1 Newsletters sent periodically at the registered email address, by clicking on the unsubscribe option attached at the bottom of newsletter received through e-mail
                                </p>
                                <h3>Feedback and Information</h3>
                                <p>
                                    Any feedback you provide to this Website shall be deemed to be non-confidential. Website shall be free to use such information on an unrestricted basis. Further, by submitting the feedback, You represent and warrant that (i) Your feedback does not contain confidential or proprietary information of You or of third parties; (ii) Website is not under any obligation of confidentiality, express or implied, with respect to the feedback; (iii) Website may have something similar to the feedback already under consideration or in development; and (iv) You are not entitled to any compensation or reimbursement of any kind from Website for the feedback under any circumstances.

                                </p>
                                <h3>FOLLOW US
                                </h3>
                                <p>
                                    (will update the insta ID)<br />
                                    (will update the FB ID)<br />
                                    (Will update the YouTube ID)<br />

                                </p>
                            </p>
                        </div>
                    </div>
                </div>
            </div>

        </PageContainer>

    );

};

export default TermsAndConditions;
