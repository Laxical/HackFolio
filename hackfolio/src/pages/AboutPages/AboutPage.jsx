import React from 'react';
import './AboutPage.css'; 
import { Link } from 'react-router-dom';
import Footer from '../../components/Footer'

import janeImg from '../../Assets/janeImg.jpg';
import mikeImg from '../../Assets/mike.jpg';
import johnImg from '../../Assets/john.jpg';
import jennieImg from '../../Assets/jennie.jpeg';
import jennieferImg from '../../Assets/jenniefer.jpeg';
import ranjithImg from '../../Assets/Ranjith.jpeg';
import christinaImg from '../../Assets/christina.jpeg';
import suhasImg from '../../Assets/Suhas.jpeg';
import RichardImg from '../../Assets/Richard.jpeg';

const teamMembers = [
  {
    name: 'Jane Doe',
    title: 'CEO',
    description: 'Jane is a visionary leader with over 15 years of experience in technology innovation and growth.',
    email: 'jane.doe@example.com',
    img: janeImg,
  },
  {
    name: 'Mike Ross',
    title: 'Art Director',
    description: 'Mike is an accomplished art director known for his creative campaigns and design leadership. ',
    email: 'mike.ross@example.com',
    img: mikeImg,
  },
  {
    name: 'John Doe',
    title: 'Designer',
    description: 'John is a talented UI/UX designer with a passion for creating intuitive and beautiful user experiences.',
    email: 'john.doe@example.com',
    img: johnImg,
  },
  {
    name: 'Jennie Richards',
    title: 'Operations',
    description: 'Jennie oversees the smooth operation of events and projects, ensuring everything runs efficiently. She has a background in project management.',
    email: 'jennie.richards@example.com',
    img: jennieImg,
  },
  {
    name: 'Jenniefer Curls',
    title: 'Marketing',
    description: 'Jenniefer is a creative designer with a strong focus on branding and product design. She brings ideas to life with her innovative designs and attention to detail.',
    email: 'jenniefer.curls@example.com',
    img: jennieferImg,
  },
  {
    name: 'Ranjith',
    title: 'Designer',
    description: 'Ranjith is a dynamic designer specializing in motion graphics and digital animation. He’s passionate about creating engaging visual content that tells a story.',
    email: 'ranjith@example.com',
    img: ranjithImg,
  },
];


const advisors = [
  {
    name: 'Christina Kate',
    title: 'Senior Technical Advisor',
    description: 'Christina is a senior techie in the IT field solved many complex cases.',
    email: 'christina.kate@example.com',
    img: christinaImg,
  },
  {
    name: 'Suhas',
    title: 'Business Strategy Advisor',
    description: 'Suhas is experienced stratergist Advisor in the Business World.',
    email: 'suhas@example.com',
    img: suhasImg,
  },
];

const memorySection = [
  {
    name: 'Richard Charles',
    title: 'Founder',
    description: 'Remembering Richard for his dedication and contribution.',
    img: RichardImg,
  },
];

const AboutSection = () => {
  return (
    <div className="about-section">
      <div className="home-redirect">
        <Link to="/">
          <button className="animated-button">Homepage</button>
        </Link>
      </div>
      <h1>Welcome to Our HackQuest!!!</h1>
      <p>We are dedicated to empowering innovators, developers, and creators by providing a platform to participate in hackathons, collaborate on projects, and showcase their skills.</p>
      <p>Join us and be part of a dynamic community where learning meets creativity, and ideas turn into reality. Discover, build, and grow with us.</p>
    </div>
  );
};

const TeamSection = ({ title, members }) => {
  return (
    <section className="team-section">
      <h2 className="text-3xl font-bold text-center mb-6">{title}</h2>
      <div className="row">
        {members.map((member) => (
          <div className="column" key={member.name}>
            <div className="card">
              <img src={member.img} alt={member.name} className="team-img" />
              <div className="container">
                <h2>{member.name}</h2>
                <p className="title">{member.title}</p>
                <p>{member.description}</p>
                {member.email && (
                  <p>
                    <a href={`mailto:${member.email}`} className="animated-button">
                      Contact via Email
                    </a>
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

const AboutPage = () => {
  return (
    <div>
      <AboutSection />
      <TeamSection title="Our Team" members={teamMembers} />
      <TeamSection title="Advisors" members={advisors} />
      <TeamSection title="In Memory Of" members={memorySection} />
      {/* Add Footer at the end of the page */}
      <Footer />
    </div>
  );
};

export default AboutPage;
