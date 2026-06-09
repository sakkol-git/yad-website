import type { TeamMember, MemberCategory } from "@/types/member.types";

export const TEAM_MEMBERS: TeamMember[] = [
  // FOUNDER
  {
    id: "f-1",
    slug: "sophea-morn",
    category: "founder",
    name: "Sophea Morn",
    role: "Visionary Founder",
    description: "Leading the mission to empower the next generation of Cambodian leaders.",
    image: "https://lh3.googleusercontent.com/aida/AP1WRLs8Q0usmeJVsBiKDW3C7Hme3YvVUoajVOrSYe3nYJ4D7uBbzZ2v3EE51aY8YdGGhhjoaGXhnmxkODK69MYfU-Y53oPKzB7AanmWQ1BKdTfCjsQq9KD07eoUTKH4xYxNkPtYqDtPVW5937s-fgwezmS0x98xXSEyd67SPVhpHG0PQzDBBrKwD-4HoJhlsRApWjZwZn5rTuDZcJMMMDTIGLpT2PdN1RxHF4AKdiELnoi7T9CyXDC8QA7KIo4",
    profile: {
      quote: "True leadership is not about being in charge. It's about taking care of those in your charge.",
      biography: "Sophea's journey from a rural village in Kampong Cham to becoming a community leader is the foundational story of YAD. Recognizing the systemic barriers facing Cambodian youth, she established YAD as a platform for empowerment, education, and sustainable development.",
      vision: "To see every Cambodian youth empowered with the skills, confidence, and opportunities to lead their communities towards a sustainable future.",
      education: [
        "Master of Public Administration, Royal University of Phnom Penh",
        "B.A. in International Relations, Pannasastra University",
      ],
      experience: [
        "Founder & Executive Director, YAD Cambodia (2018 - Present)",
        "Project Coordinator, NGO Education Partnership (2015 - 2018)",
        "Community Organizer, Rural Development Initiative (2012 - 2015)",
      ],
      achievements: [
        "ASEAN Youth Leadership Award (2021)",
        "Featured in 'Women Shaping Cambodia's Future' Documentary (2020)",
        "Successfully expanded YAD programs to 5 provinces, reaching over 2,000 youth",
      ],
      socialLinks: {
        linkedin: "https://linkedin.com/in/sopheamorn",
        twitter: "https://twitter.com/sopheamorn",
      },
    },
  },
  // CO-FOUNDERS
  {
    id: "cf-1",
    slug: "channary-sok",
    category: "co-founder",
    name: "Channary Sok",
    role: "Co-Founder & Operations",
    description: "Ensuring sustainable growth and community impact across all programs.",
    image: "https://lh3.googleusercontent.com/aida/AP1WRLvrrzBuVQNhS_XAypEHmozmqlpc6Z3ueWIY6PUco7Y8I9v0mpbtNrbwvypRG5GQKWhsNMdAkgSuW2TBqpEEvvXHOOJRXB-70OPnh02nJgv1228jI07fnHNlNGedaHUDihMrL4C0ojIYodsi6wTByOwx2QOqrrzLMqhe4xjrbaHphuagxnWzHuFzKd7r9KvXMaXSi7q9dKQZTjiCda52Qbgdg5EBFSv8xCzSoon-yPVPNSDaZtod5_dusw",
    profile: {
      quote: "Operations is the invisible thread that turns dreams into community realities.",
      biography: "Channary is the operational backbone of YAD, translating high-level vision into actionable community programs. With over 8 years of experience in NGO operations and project administration in Southeast Asia, she ensures that every donor dollar directly impacts the youth we serve.",
      vision: "To build a transparent, highly efficient, and self-sustaining NGO infrastructure that serves as a blueprint for grassroots development.",
      education: [
        "B.S. in Business Administration, Pannasastra University of Cambodia",
        "Executive Certificate in NGO Management, Mekong Institute",
      ],
      experience: [
        "Co-Founder & Chief Operations Officer, YAD (2018 - Present)",
        "Senior Operations Officer, Save the Children Cambodia (2014 - 2018)",
        "Project Assistant, Cambodia Youth Federation (2011 - 2014)",
      ],
      achievements: [
        "Standardized YAD's project management framework, reducing overhead by 15%",
        "Established a partnership with 12 local universities for student housing",
        "Recipient of the Cambodian Women in Social Leadership Award (2023)",
      ],
      socialLinks: {
        linkedin: "https://linkedin.com/in/channarysok",
      },
    },
  },
  {
    id: "cf-2",
    slug: "vannak-reach",
    category: "co-founder",
    name: "Vannak Reach",
    role: "Co-Founder & Strategy",
    description: "Developing strategic partnerships to expand our reach and resources.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCpjHZrjPqkgI5YLUpscle8-us3LScJiJAJwM6ufcZc2_YRd0OztcPYKG_bha_OEqi8Mx0f2QGPqe7QfHn8rKstExoMuZL-I4Wj0mfV54Tcg6Ev_PJmuYj5EunfNE6voIPJNaN-ZE17bBWt7iDUw2k0xDdjWCqSRa5N5f4xd6mmLQ7HlwM0GxlqxrDnonbyk-UiBFWyi9Ns3AZgl3N5OZmcJ4HU9HgEZ8qB98e4r6xVezwutD45Zt0lVUZoR-sUMmpoUsQaWIsgcTQ",
    profile: {
      quote: "Strategic collaboration is the catalyst for scalable social impact.",
      biography: "Vannak leads our strategic initiatives, building partnerships with international organizations to fund local development. He has spent the last decade working at the intersection of international policy, public administration, and community empowerment.",
      vision: "To bridge the gap between rural Cambodian youth and global opportunities through strategic international alliances and educational program funding.",
      education: [
        "M.A. in International Development, University of Tokyo",
        "B.A. in Political Science, Royal University of Law and Economics",
      ],
      experience: [
        "Co-Founder & Strategy Director, YAD (2018 - Present)",
        "Policy Consultant, Ministry of Education, Youth and Sport (2016 - 2018)",
        "Research Fellow, Cambodia Development Resource Institute (CDRI) (2013 - 2016)",
      ],
      achievements: [
        "Secured $1.2M in international grants from global foundations over the past 3 years",
        "Designed and launched the YAD Strategic Roadmap 2025-2030",
        "Authored a landmark paper on 'Education and Youth Migration in Rural Cambodia'",
      ],
      socialLinks: {
        linkedin: "https://linkedin.com/in/vannakreach",
        twitter: "https://twitter.com/vannakreach",
      },
    },
  },
  // RESIDENTS
  {
    id: "r-1",
    slug: "resident-1",
    category: "resident",
    name: "Sokha Heng",
    role: "IT Student",
    description: "Supported by YAD to pursue Computer Science at Royal University of Phnom Penh.",
    image: "https://lh3.googleusercontent.com/aida/AP1WRLued1tpKdl7b03phdhUPWHrmgPf23PHqoE6CpZ5lZCiMd9--dJAJG8Gda9jP33UbVTXe-tY3Qc8fIdPJwgN35Dmcm-GiZh4M5QIclYWCKTjieoN3gN0lujmKZ4ukKy3f1F9JwMTCNBOzpNmVATaqky1BboNG3DYC8iCvuUTrmWFeLfvB84c8ULSZbUVN-8x6q5Tc8cc746B47xWllKG4dzmoC3zyccQ7ojoeqyeHsc5ghFG5upE82Dcng",
    profile: {
      quote: "Technology is the ultimate equalizer for rural communities.",
      biography: "Sokha Heng joined the YAD residential program in 2023. Coming from a farming family in Prey Veng, he is now pursuing his dream of becoming a software developer to build digital solutions for agricultural tracking in Cambodia.",
      vision: "To digitize agricultural supply chains in Cambodia, helping smallholder farmers get fair pricing.",
      education: [
        "B.S. in Computer Science (Junior), Royal University of Phnom Penh",
        "YAD Resident Leadership Program (2023 - Present)",
      ],
      experience: [
        "Full-stack Web Development Intern, SabaiCode (2024 - Present)",
        "IT Coordinator for YAD Dormitory (2023 - Present)",
      ],
      achievements: [
        "1st Place Winner at the National Youth Hackathon (2024)",
        "Maintained a 3.9 GPA at RUPP while mentoring junior peers in coding",
        "Developed a custom dormitory inventory manager app",
      ],
      socialLinks: {
        linkedin: "https://linkedin.com/in/sokhaheng",
        github: "https://github.com/sokhaheng",
      },
    },
  },
  {
    id: "r-2",
    slug: "resident-2",
    category: "resident",
    name: "Borey Roth",
    role: "Agriculture Student",
    description: "Developing modern organic farming methods to empower small-scale rural farmers.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBrmll8Ox4yLR_A96EtrVfUjXG303n5S9p0Vd8uBWxu2uncOy03Y6Sl5-OP0HDRl6ypNwB4veePc3teSn8cGXn6UQpNQgOjOiRayXPbOTT-Ckp1Blfs843OJ92NAkiAvaUgsYHABPJzMgNH7o_8t5-36xdzgNNdoN_WhbZLBxVhYw8a9GqkTN08LHwLIlQSdWoCjDkAs0pfWjSAiljtSsZxfM5V-famwTHS7C939LuM1dClWTJGjVO0unT1c2SptWZyXIkYDZ1LPDY",
    profile: {
      quote: "Sustainable agriculture is the foundation of Cambodia's food security and future.",
      biography: "Borey grew up in Battambang, witnessing the impacts of climate change on rice farming. Through the support of YAD, he is studying modern agroecology to bring sustainable farming techniques back to his home province.",
      vision: "To implement climate-resilient farming techniques across rural Cambodia to secure family livelihoods.",
      education: [
        "B.S. in Agronomy (Senior), Royal University of Agriculture",
        "Permaculture Design Course, YAD Eco-Hub",
      ],
      experience: [
        "Research Assistant, RUA Soil Science Lab (2023 - Present)",
        "Lead Organizer, YAD Community Garden Initiative (2022 - Present)",
      ],
      achievements: [
        "Developed an organic fertilizer formula adopted by 50 Battambang households",
        "Represented Cambodia at the ASEAN Youth Forum on Sustainable Farming (2023)",
      ],
    },
  },
  {
    id: "r-3",
    slug: "resident-3",
    category: "resident",
    name: "Serey Vong",
    role: "Law Student",
    description: "Focusing on civic education, human rights law, and labor advocacy.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCZ2VPV_SuqYIeYFDMOEBPtY0Xf9DBRzRJNx98guhouC6p5KRnWcQl9cr3Uu6cKuRAVMqCkcUkAfb3Bz6U_cGMUnRLu5xxT4Lnf5eeZCFtxuaP4fIM5p31HPaVwZFmp2MGKCPVt5h52NJ4NqGLan1khIF9KqY4Ytu20MrVvqV4ZPxqg57cc5xXb_Owia7v54Pu5SYJiXlJa4L3VPf4C2cjdj8zSqR4DJ79xi0teNc8oZ_YDYE5IQhzbnr-Cvr5qCoAfQqG3lHxE_z8",
    profile: {
      quote: "Access to justice and legal literacy are the pillars of a fair society.",
      biography: "Serey is a passionate advocate for labor rights and civic education. Born in Siem Reap, she aims to provide free legal advice to garment workers and underrepresented communities.",
      vision: "To establish legal aid clinics in rural provinces that empower citizens with legal education.",
      education: [
        "Bachelor of Laws (Junior), Royal University of Law and Economics",
        "Human Rights Law Advocacy Program, YAD Legal Incubator",
      ],
      experience: [
        "Legal Intern, Community Legal Education Center (CLEC) (2024)",
        "Coordinator, YAD Legal Literacy Workshops (2023 - Present)",
      ],
      achievements: [
        "Led legal education workshops for over 500 factory workers in Phnom Penh outskirts",
        "Outstanding Advocate Award at RULE Moot Court Competition (2024)",
      ],
    },
  },
  {
    id: "r-4",
    slug: "resident-4",
    category: "resident",
    name: "Nika Sam",
    role: "Engineering Student",
    description: "Designing low-cost, sustainable water systems for rural provinces.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAlF9B0TBi5UtAqpT3DTsRJ5LvQIVNjcMObcMRdIPMPH-hz1OZu6HyWjoo7oLgFxMw5sgF36YRxQ7_xgkbpLZ7Sj5mbrGXur0Nw91lad8Wrm0wDuH5kK9ebVVb7ff-UzGPuDR5UCmlL8DJvIZE3jFqsfGJ1j5Gd8_GHoFSBwIjyjlljQ3h21X4Y8EdrzUme5pmnPVM1i-CgmanYEQ70TiQupUhDuTl5Eb-ZlY1qEg62OsFcmwpSwWVyj3a2ZaubStI7faIyKx7CrLQ",
    profile: {
      quote: "Engineering is about building safe, resilient spaces for communities to grow.",
      biography: "Nika joined YAD from Kampong Speu. She is studying civil engineering to design sustainable clean water infrastructure for communities facing seasonal droughts.",
      vision: "To design and implement zero-waste water purification systems in Cambodia's floating villages.",
      education: [
        "B.E. in Civil Engineering (Senior), Institute of Technology of Cambodia",
        "YAD Smart Infrastructure Fellowship",
      ],
      experience: [
        "Engineering Intern, Cambodia Water Supply Association (2023)",
        "Project Lead, YAD Clean Water Initiative (2024)",
      ],
      achievements: [
        "Designed and constructed a low-cost rainwater harvesting filter for YAD's rural learning center",
        "Top 5 Graduate Project nominee at ITC (2024)",
      ],
    },
  },
  {
    id: "r-5",
    slug: "resident-5",
    category: "resident",
    name: "Dara Phoung",
    role: "Medical Student",
    description: "Aspiring doctor volunteering in community outreach and rural clinics.",
    image: "https://lh3.googleusercontent.com/aida/AP1WRLued1tpKdl7b03phdhUPWHrmgPf23PHqoE6CpZ5lZCiMd9--dJAJG8Gda9jP33UbVTXe-tY3Qc8fIdPJwgN35Dmcm-GiZh4M5QIclYWCKTjieoN3gN0lujmKZ4ukKy3f1F9JwMTCNBOzpNmVATaqky1BboNG3DYC8iCvuUTrmWFeLfvB84c8ULSZbUVN-8x6q5Tc8cc746B47xWllKG4dzmoC3zyccQ7ojoeqyeHsc5ghFG5upE82Dcng",
    profile: {
      quote: "Healthcare should not be a privilege; it is a fundamental human right.",
      biography: "Dara is studying medicine to bridge the healthcare gap in remote areas. Supported by YAD, he volunteers in medical missions providing primary care to villages without local clinics.",
      vision: "To establish mobile health clinics that travel to the most remote areas of Cambodia.",
      education: [
        "Doctor of Medicine (Year 5), University of Health Sciences",
        "First Responder Trainer Certification, YAD Safety Program",
      ],
      experience: [
        "Clinical Rotation, Calmette Hospital (2023 - Present)",
        "First Aid Instructor & Health Advocate, YAD (2021 - Present)",
      ],
      achievements: [
        "Organized and led 6 rural health checkup missions, serving over 1,200 villagers",
        "Awarded University of Health Sciences Humanitarian Service Medal (2024)",
      ],
    },
  },
  {
    id: "r-6",
    slug: "resident-6",
    category: "resident",
    name: "Vanneth Keo",
    role: "Business Student",
    description: "Combining entrepreneurship with social impact to launch green ventures.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBrmll8Ox4yLR_A96EtrVfUjXG303n5S9p0Vd8uBWxu2uncOy03Y6Sl5-OP0HDRl6ypNwB4veePc3teSn8cGXn6UQpNQgOjOiRayXPbOTT-Ckp1Blfs843OJ92NAkiAvaUgsYHABPJzMgNH7o_8t5-36xdzgNNdoN_WhbZLBxVhYw8a9GqkTN08LHwLIlQSdWoCjDkAs0pfWjSAiljtSsZxfM5V-famwTHS7C939LuM1dClWTJGjVO0unT1c2SptWZyXIkYDZ1LPDY",
    profile: {
      quote: "Business has the power to drive positive social change.",
      biography: "Vanneth is a business administration major from Kampot. He joined the YAD community to learn how to combine entrepreneurship with social impact, aiming to run clean-energy social enterprises.",
      vision: "To launch a network of green social enterprises that employ underprivileged youth.",
      education: [
        "B.B.A. in Entrepreneurship (Senior), National University of Management",
        "Social Enterprise Fellow, YAD Business Hub",
      ],
      experience: [
        "Marketing Intern, Eco-Energy Cambodia (2024)",
        "Manager, YAD Student Store & Micro-Grant Committee (2023 - Present)",
      ],
      achievements: [
        "Launched a student-run recycled crafts store, generating $5,000 for local scholarships",
        "Winner, Cambodia Green Business Idea Competition (2023)",
      ],
    },
  },
  {
    id: "r-7",
    slug: "resident-7",
    category: "resident",
    name: "Chanthou Lida",
    role: "Arts Student",
    description: "Using illustration, photography, and painting for environmental advocacy.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCZ2VPV_SuqYIeYFDMOEBPtY0Xf9DBRzRJNx98guhouC6p5KRnWcQl9cr3Uu6cKuRAVMqCkcUkAfb3Bz6U_cGMUnRLu5xxT4Lnf5eeZCFtxuaP4fIM5p31HPaVwZFmp2MGKCPVt5h52NJ4NqGLan1khIF9KqY4Ytu20MrVvqV4ZPxqg57cc5xXb_Owia7v54Pu5SYJiXlJa4L3VPf4C2cjdj8zSqR4DJ79xi0teNc8oZ_YDYE5IQhzbnr-Cvr5qCoAfQqG3lHxE_z8",
    profile: {
      quote: "Art is a reflection of our culture and a voice for our struggles.",
      biography: "Chanthou is a visual arts student who uses painting and photography to tell stories of environmental conservation and cultural heritage. Her work is inspired by her upbringing near Tonle Sap.",
      vision: "To use visual arts to champion environmental protection and preserve traditional Khmer storytelling.",
      education: [
        "B.A. in Fine Arts (Junior), Royal University of Fine Arts",
        "Creative Expression Mentor, YAD Youth Center",
      ],
      experience: [
        "Freelance Illustrator (2022 - Present)",
        "Art Instructor for underprivileged children, YAD Community Program (2023 - Present)",
      ],
      achievements: [
        "Muralist for Phnom Penh Urban Art Festival (2024)",
        "Exhibited 'Whispers of Tonle Sap' at the National Museum of Cambodia (2023)",
      ],
    },
  },
  {
    id: "r-8",
    slug: "resident-8",
    category: "resident",
    name: "Pisey Chan",
    role: "Education Student",
    description: "Designing modern English and literacy curricula for rural community centers.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAlF9B0TBi5UtAqpT3DTsRJ5LvQIVNjcMObcMRdIPMPH-hz1OZu6HyWjoo7oLgFxMw5sgF36YRxQ7_xgkbpLZ7Sj5mbrGXur0Nw91lad8Wrm0wDuH5kK9ebVVb7ff-UzGPuDR5UCmlL8DJvIZE3jFqsfGJ1j5Gd8_GHoFSBwIjyjlljQ3h21X4Y8EdrzUme5pmnPVM1i-CgmanYEQ70TiQupUhDuTl5Eb-ZlY1qEg62OsFcmwpSwWVyj3a2ZaubStI7faIyKx7CrLQ",
    profile: {
      quote: "Education is the key to unlocking every child's full potential.",
      biography: "Pisey believes that quality primary education in rural areas can break the cycle of poverty. She is studying educational science and designs literacy programs for rural schools.",
      vision: "To train rural primary school teachers in interactive, modern pedagogy.",
      education: [
        "B.Ed. in English & Education (Senior), Royal University of Phnom Penh",
        "Curriculum Development Certification, YAD Education Dept",
      ],
      experience: [
        "Volunteer Teacher, YAD English for All Program (2022 - Present)",
        "Curriculum Intern, Krousar Thmey NGO (2023)",
      ],
      achievements: [
        "Designed a phonics curriculum that increased reading test scores by 30% in YAD learning centers",
        "Named YAD Volunteer Educator of the Year (2023)",
      ],
    },
  },
  {
    id: "r-9",
    slug: "resident-9",
    category: "resident",
    name: "Thida Lim",
    role: "Environmental Science",
    description: "Leading community waste management and plastic reduction initiatives.",
    image: "https://lh3.googleusercontent.com/aida/AP1WRLued1tpKdl7b03phdhUPWHrmgPf23PHqoE6CpZ5lZCiMd9--dJAJG8Gda9jP33UbVTXe-tY3Qc8fIdPJwgN35Dmcm-GiZh4M5QIclYWCKTjieoN3gN0lujmKZ4ukKy3f1F9JwMTCNBOzpNmVATaqky1BboNG3DYC8iCvuUTrmWFeLfvB84c8ULSZbUVN-8x6q5Tc8cc746B47xWllKG4dzmoC3zyccQ7ojoeqyeHsc5ghFG5upE82Dcng",
    profile: {
      quote: "We do not inherit the earth from our ancestors; we borrow it from our children.",
      biography: "Thida is an environmental science major from Koh Kong. She joined YAD to study plastic waste pollution in coastal areas and leads eco-workshops for local communities.",
      vision: "To implement effective waste segregation systems in every coastal municipality of Cambodia.",
      education: [
        "B.S. in Environmental Science (Senior), Royal University of Phnom Penh",
        "YAD Coastal Conservation Fellow",
      ],
      experience: [
        "Research Assistant, Ministry of Environment Waste Study (2024)",
        "Leader, YAD Green Campus Initiative (2022 - Present)",
      ],
      achievements: [
        "Co-authored research on microplastics in the Mekong River, published in local science journal",
        "Organized cleanups collecting over 10 tons of plastic waste along Kampot beaches",
      ],
    },
  },
  {
    id: "r-10",
    slug: "resident-10",
    category: "resident",
    name: "Sophoan Rim",
    role: "Social Work Student",
    description: "Advocating for youth mental health and organizing peer counseling groups.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBrmll8Ox4yLR_A96EtrVfUjXG303n5S9p0Vd8uBWxu2uncOy03Y6Sl5-OP0HDRl6ypNwB4veePc3teSn8cGXn6UQpNQgOjOiRayXPbOTT-Ckp1Blfs843OJ92NAkiAvaUgsYHABPJzMgNH7o_8t5-36xdzgNNdoN_WhbZLBxVhYw8a9GqkTN08LHwLIlQSdWoCjDkAs0pfWjSAiljtSsZxfM5V-famwTHS7C939LuM1dClWTJGjVO0unT1c2SptWZyXIkYDZ1LPDY",
    profile: {
      quote: "Empowering communities means listening to their voices and building their capacity.",
      biography: "Sophoan grew up in a resettlement community in Phnom Penh. Her personal experiences drove her to study social work, specializing in youth mentorship and community organizing.",
      vision: "To create a national network of community youth centers offering mental health and career counseling.",
      education: [
        "B.A. in Social Work (Senior), Royal University of Phnom Penh",
        "Crisis Intervention Training, YAD Counselling Center",
      ],
      experience: [
        "Caseworker Intern, Pour un Sourire d'Enfant (PSE) (2023)",
        "Lead Counselor & Resident Advisor, YAD Dormitory (2022 - Present)",
      ],
      achievements: [
        "Developed a mental health support group for YAD residential students",
        "Recognized for outstanding youth leadership in Phnom Penh community development (2023)",
      ],
    },
  },
  // ALUMNI
  {
    id: "a-1",
    slug: "kalyan-pich",
    category: "alumni",
    name: "Kalyan Pich",
    role: "Alumni Leader",
    description: "Class of 2020. Media Communications Manager and YAD Mentor.",
    image: "https://lh3.googleusercontent.com/aida/AP1WRLt-51_1-tg_iVfmYFfW6FCtSH-oDlsEkxfaB8uGRUNQyRXknNTtDYUKzT8HXcJNvJBQGReRIfYcGM6RnsLuXrmvQaiZ-ISMQgJoD58UfvO2Zm8j35qZnGwOBdW45YZ2Qme8xD8E82worDzz2pzx1cnkNvYpdBLhdhUVYLZffUQXAelSJ2b9MVYt2PX_BSpLi7bMXdr1-DNcOz2cw_zZEbbJAO97px2u6X2ous4S7LlmspWisZwea5sp_kM",
    profile: {
      quote: "Leadership is not a title; it is a lifetime commitment to uplift others.",
      biography: "Kalyan was one of YAD's earliest residential students. After graduating with a degree in Public Relations, she returned to serve as the Alumni Leader, organizing support networks for current students.",
      vision: "To build a strong, supportive global network of YAD alumni who fund and mentor the next generation.",
      education: [
        "B.A. in Media & Communication, Royal University of Phnom Penh",
        "YAD Scholar & Resident Alumni (Class of 2020)",
      ],
      experience: [
        "Communications Manager, Cambodia Youth Association (2021 - Present)",
        "YAD Alumni Association Chair (2022 - Present)",
      ],
      achievements: [
        "Launched the YAD Alumni Mentorship Network, connecting 150+ students with professional mentors",
        "Organized the annual YAD Alumni Gala, raising $15,000 for student scholarships",
      ],
      socialLinks: {
        linkedin: "https://linkedin.com/in/kalyanpich",
      },
    },
  },
  {
    id: "a-2",
    slug: "dara-sam",
    category: "alumni",
    name: "Dara Sam",
    role: "Social Entrepreneur",
    description: "Class of 2019. Founder of EcoPack, producing biodegradable packaging.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCZ2VPV_SuqYIeYFDMOEBPtY0Xf9DBRzRJNx98guhouC6p5KRnWcQl9cr3Uu6cKuRAVMqCkcUkAfb3Bz6U_cGMUnRLu5xxT4Lnf5eeZCFtxuaP4fIM5p31HPaVwZFmp2MGKCPVt5h52NJ4NqGLan1khIF9KqY4Ytu20MrVvqV4ZPxqg57cc5xXb_Owia7v54Pu5SYJiXlJa4L3VPf4C2cjdj8zSqR4DJ79xi0teNc8oZ_YDYE5IQhzbnr-Cvr5qCoAfQqG3lHxE_z8",
    profile: {
      quote: "Sustainable business models are the key to long-term community development.",
      biography: "Dara Sam is a former YAD resident who founded a social enterprise producing eco-friendly packaging from agricultural waste. His business now employs several YAD graduates.",
      vision: "To eliminate single-use plastics in Cambodia's food industry through biodegradable alternatives.",
      education: [
        "B.B.A. in International Business, National University of Management",
        "YAD Scholar & Resident Alumni (Class of 2019)",
      ],
      experience: [
        "Founder & CEO, EcoPack Cambodia (2020 - Present)",
        "Business Analyst, Smart Axiata (2019 - 2020)",
      ],
      achievements: [
        "Grew EcoPack to supply over 100 restaurants in Phnom Penh",
        "Received the ASEAN Social Enterprise Award (2022)",
      ],
      socialLinks: {
        linkedin: "https://linkedin.com/in/darasam",
      },
    },
  },
  {
    id: "a-3",
    slug: "bopha-keo",
    category: "alumni",
    name: "Bopha Keo",
    role: "Policy Advisor",
    description: "Class of 2018. Research advisor for policy and social protection frameworks.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBrmll8Ox4yLR_A96EtrVfUjXG303n5S9p0Vd8uBWxu2uncOy03Y6Sl5-OP0HDRl6ypNwB4veePc3teSn8cGXn6UQpNQgOjOiRayXPbOTT-Ckp1Blfs843OJ92NAkiAvaUgsYHABPJzMgNH7o_8t5-36xdzgNNdoN_WhbZLBxVhYw8a9GqkTN08LHwLIlQSdWoCjDkAs0pfWjSAiljtSsZxfM5V-famwTHS7C939LuM1dClWTJGjVO0unT1c2SptWZyXIkYDZ1LPDY",
    profile: {
      quote: "Good policies are built from understanding the real lives of community citizens.",
      biography: "Bopha Keo studied political science as a YAD resident. She now works as a policy researcher advising government departments on youth employment and social protection programs.",
      vision: "To shape policies that provide equal educational opportunities to all rural youths.",
      education: [
        "M.A. in Public Policy, National University of Singapore",
        "B.A. in International Relations, Pannasastra University (YAD Scholar Class of 2018)",
      ],
      experience: [
        "Policy Advisor, Ministry of Planning (2022 - Present)",
        "Policy Researcher, CDRI (2018 - 2021)",
      ],
      achievements: [
        "Contributed to the draft of the National Youth Development Policy 2024-2030",
        "Recipient of the Lee Kuan Yew Fellowship (2021)",
      ],
    },
  },
  {
    id: "a-4",
    slug: "serey-roth",
    category: "alumni",
    name: "Serey Roth",
    role: "Tech Lead",
    description: "Class of 2019. Software Architecture Lead and YAD Coding Instructor.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAlF9B0TBi5UtAqpT3DTsRJ5LvQIVNjcMObcMRdIPMPH-hz1OZu6HyWjoo7oLgFxMw5sgF36YRxQ7_xgkbpLZ7Sj5mbrGXur0Nw91lad8Wrm0wDuH5kK9ebVVb7ff-UzGPuDR5UCmlL8DJvIZE3jFqsfGJ1j5Gd8_GHoFSBwIjyjlljQ3h21X4Y8EdrzUme5pmnPVM1i-CgmanYEQ70TiQupUhDuTl5Eb-ZlY1qEg62OsFcmwpSwWVyj3a2ZaubStI7faIyKx7CrLQ",
    profile: {
      quote: "Innovation is finding simple solutions to complex real-world problems.",
      biography: "Serey Roth is a software engineer who led the development of YAD's original student tracking portal. He now works as a Tech Lead at a prominent fintech firm in Phnom Penh.",
      vision: "To make technology education accessible to every school child in rural Cambodia.",
      education: [
        "B.S. in Software Engineering, Royal University of Phnom Penh (Class of 2019)",
        "Advanced Web Architect Course, Vercel Academy",
      ],
      experience: [
        "Tech Lead, ABA Bank Digital Hub (2022 - Present)",
        "Senior Frontend Developer, Codingate (2019 - 2022)",
      ],
      achievements: [
        "Led the redesign of Cambodia's leading banking application, improving user flow by 40%",
        "Volunteers 10 hours a week teaching coding workshops at YAD learning centers",
      ],
      socialLinks: {
        linkedin: "https://linkedin.com/in/sereyroth",
        github: "https://github.com/sereyroth",
      },
    },
  },
  {
    id: "a-5",
    slug: "piseth-chan",
    category: "alumni",
    name: "Piseth Chan",
    role: "Community Organizer",
    description: "Class of 2018. Rural water cooperative manager and activist.",
    image: "https://lh3.googleusercontent.com/aida/AP1WRLued1tpKdl7b03phdhUPWHrmgPf23PHqoE6CpZ5lZCiMd9--dJAJG8Gda9jP33UbVTXe-tY3Qc8fIdPJwgN35Dmcm-GiZh4M5QIclYWCKTjieoN3gN0lujmKZ4ukKy3f1F9JwMTCNBOzpNmVATaqky1BboNG3DYC8iCvuUTrmWFeLfvB84c8ULSZbUVN-8x6q5Tc8cc746B47xWllKG4dzmoC3zyccQ7ojoeqyeHsc5ghFG5upE82Dcng",
    profile: {
      quote: "Change does not start from the top; it grows from the roots of the community.",
      biography: "Piseth Chan is a dedicated community activist. Since graduating from YAD, he has worked in rural provinces organizing local water cooperatives and youth leadership clubs.",
      vision: "To empower rural villages to manage their resources sustainably and independently.",
      education: [
        "B.A. in Sociology, Royal University of Phnom Penh (Class of 2018)",
        "Leadership in Community Development Certificate, Asian Institute of the Technology",
      ],
      experience: [
        "Program Manager, Rural Water Initiative (2019 - Present)",
        "Community Outreach Lead, YAD Battambang Office (2018 - 2019)",
      ],
      achievements: [
        "Helped establish 15 rural water management committees, ensuring clean water access for 3,000 households",
        "Recognized with the provincial Community Service Excellence Award (2023)",
      ],
    },
  },
];

export function getMembersByCategory(category: MemberCategory): TeamMember[] {
  return TEAM_MEMBERS.filter((member) => member.category === category);
}

export function getMemberBySlug(slug: string): TeamMember | undefined {
  return TEAM_MEMBERS.find((member) => member.slug === slug);
}
