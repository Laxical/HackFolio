import React from 'react';
import './code_ofconduct.css';
import { Link } from 'react-router-dom';

const CodeOfConduct = () => {
    return (
        <div className="code-of-conduct-container">
            {/* Home Button */}
            <div className="home-button-container">
                <Link to="/" className="home-button">Home</Link>
            </div>

            <h1 className="main-heading">Code of Conduct</h1>

            <section>
                <h2 className="section-heading">Applicability</h2>
                <p>This policy is applicable to all activities related to HackQuest, including the following spaces, as well as their online counterparts (if applicable):</p>
                <ul>
                    <li>Hackathons</li>
                    <li>Presentations, talks, or demos</li>
                    <li>Workshops</li>
                    <li>Social gatherings and events</li>
                    <li>Social media channels, etc.</li>
                </ul>
                <p>This Code of Conduct also applies equally to all sponsors and partners associated with HackQuest, as well as any projects submitted during hackathons.</p>
            </section>

            <section>
                <h2 className="section-heading">No plagiarism or re-using of past work</h2>
                <p>We encourage participants to submit projects developed during the hackathon timeframe. However, if your project contains reused code or has been previously submitted to other hackathons, you must disclose this information during submission.</p>
                <p>In cases where undisclosed reused code is discovered, the organizers may request participants to outline the differences between the original and new submissions. Failure to do so may result in automatic disqualification from award consideration.</p>
            </section>

            <section>
                <h2 className="section-heading">No harassment</h2>
                <p>HackQuest has a zero-tolerance policy towards harassment of any kind. This includes, but is not limited to, offensive verbal comments, public display of inappropriate or sexual content, intentional intimidation, stalking, disruptive behavior, unwanted physical contact, unsolicited sexual advances, and recording individuals without their consent.</p>
            </section>

            <section>
                <h2 className="section-heading">No recording without consent</h2>
                <p>While taking photos or videos at the event is encouraged, participants must be given an opportunity to opt-out of being photographed or filmed. If someone requests not to be recorded, their wish must be respected. Should they express disapproval after a recording has been made, kindly delete the media and, if shared online, take reasonable steps to remove it from any social media platforms.</p>
                <p>Additionally, it is inappropriate to capture photos or videos in areas where participants have an expectation of privacy, such as bathrooms or sleeping areas.</p>
            </section>

            <section>
                <h2 className="section-heading">Always report</h2>
                <p>If you notice any violation of this Code of Conduct or suspect inappropriate behavior, please inform a member of the HackQuest organizing team immediately.</p>
                <p>We are committed to assisting anyone who feels unsafe, whether by contacting local security, law enforcement, or offering support throughout the hackathon. Your safety and participation are important to us.</p>
            </section>

            <section>
                <h2 className="section-heading">Consequences of violations</h2>
                <p>If any participant violates this Code of Conduct, the organizers may take the following actions at their discretion:</p>
                <ul>
                    <li>Remove the participant from the event without any refund (if applicable)</li>
                    <li>Ban the participant from accessing HackQuest resources, including its website</li>
                    <li>Notify local law enforcement authorities of the participant's behavior</li>
                </ul>
            </section>

            <section>
                <h2 className="section-heading">Contact us</h2>
                <div className="contact-info">
                    <p>If you have experienced or witnessed any breaches of this Code of Conduct at a HackQuest event, please report it to your hackathon organizer, or reach out directly to HackQuest.</p>
                    <div className="contact-details">
                        <strong>Contact: Jane Doe</strong> <br />
                        <a href="mailto:jane@hackquest.com">jane@hackquest.com</a> <br />
                        No. 123, Innovation Street, Tech City, Silicon Valley, CA - 94043
                    </div>
                </div>
            </section>
        </div>
      
    );
};

export default CodeOfConduct;
