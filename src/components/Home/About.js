import React from "react";
import "../css/about.css";

const teamMembers = [
  {
    name: "Dhruv Verma",
    job: "Backend",
    location: "Rohtak, Haryan",
    phone: "(+34) 648-530-981",
    email: "garabchris@gmail.com",
    linkedin: "https://www.linkedin.com/in/penchochris",
    github: "https://www.github.com/chrisgarciamrf",
    image: "../../images/dhruvverma.jpg",
  },
  {
    name: "Gaurav Grover",
    job: "Frontend",
    location: "New Delhi, India",
    phone: "(+91) 987-654-3210",
    email: "gaurav@example.com",
    linkedin: "https://www.linkedin.com/in/gauravsharma",
    github: "https://www.github.com/gauravsharma",
    image: "../../images/gauravgrover.jpg",
  },
  {
    name: "Vyom Sharma",
    job: "UI/UX Desiging",
    location: "Mumbai, India",
    phone: "(+91) 987-123-4567",
    email: "vyom@example.com",
    linkedin: "https://www.linkedin.com/in/vyomjain",
    github: "https://www.github.com/vyomjain",
    image: "../../images/vyomsharma.jpg",
  },
];

const About = () => {
  return (
    <div className="container">
      {teamMembers.map((member, index) => (
        <div className="row info" key={index}>
          <div className="profile">
            <img
              className="profile-image"
              src={member.image}
              alt={member.name}
            />
          </div>
          <div className="details">
            <div className="name">{member.name}</div>
            <div className="job">{member.job}</div>
            <div className="location">{member.location}</div>
            <div className="phone">{member.phone}</div>
          </div>
          <div className="social">
            <a href={`mailto:${member.email}`}>
              <img className="email" alt="Gmail" src="gmail.svg" />
            </a>
            <a href={member.linkedin}>
              <img alt="LinkedIn" className="linkedin" src="linkedin.svg" />
            </a>
            <a href={member.github}>
              <img alt="GitHub" className="github" src="github.svg" />
            </a>
          </div>
        </div>
      ))}
    </div>
  );
};

export default About;
