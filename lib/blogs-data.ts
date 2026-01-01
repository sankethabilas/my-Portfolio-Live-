/**
 * Centralized Blog Posts Data
 * Used across all pages (Home, Blogs, Projects, About, etc.)
 */

export interface BlogPost {
  id: number
  slug: string
  title: string
  date: string
  type: 'event' | 'announcement' | 'project'
  featured: boolean
  background: string
  image: string
  author?: string
  category?: string
  content: {
    type: string
    title: string
    subtitle: string
    members?: string[]
    introduction?: string
    description?: string
    hashtags?: string[]
  }
}

export const allBlogs: BlogPost[] = [
  {
    id: 1,
    slug: "presenting-ieee-cs-sliit-web-dev-team",
    title: "Presenting the IEEE CS SLIIT Web Development Team 25/26!",
    date: "2025, August 30",
    type: "announcement",
    featured: true,
    background: "linear-gradient(135deg, #1f6fff 0%, #8b5cf6 100%)",
    image: "/myblog1.webp",
    author: "Vehan Rajintha",
    category: "Announcement",
    content: {
      type: "team",
      title: "IEEE CS SLIIT Web Development Team",
      subtitle: "Driving all web-related initiatives with creativity, innovation, and technical excellence",
      members: [
        "Heshan Gimhana (Team Lead)",
        "Hesara Perera",
        "Ruvindi Randeniya",
        "Janendra Chamod Perera",
        "Dinith Navodya",
        "Amasha Prabuddi",
        "Senal Galagedara",
        "Dilshan Karunarathna",
        "Jegatheesan Risikesan",
        "Vehan Rajintha"
      ],
      introduction: "🌐✨ I'm excited to announce that I'm part of the IEEE CS SLIIT Web Development Team 25/26! This dynamic team will be driving all web-related initiatives of IEEE CS SLIIT, bringing creativity, innovation, and technical excellence together.",
      description: "Our team is dedicated to pushing the boundaries of web development, creating innovative solutions, and contributing to the growth of the IEEE Computer Society at SLIIT. We're committed to delivering excellence in every project we undertake.",
      hashtags: ["IEEE", "IEEECS", "IEEECSSLIIT", "IEEESLIIT", "WebDevTeam", "Innovation", "SLIIT"]
    }
  },
  {
    id: 2,
    slug: "google-io-extended-sri-lanka",
    title: "Google I/O Extended Sri Lanka - An Amazing Experience!",
    date: "2025, July 27",
    type: "event",
    featured: false,
    background: "linear-gradient(135deg, #ea4335 0%, #4285f4 100%)",
    image: "/googlio.webp",
    author: "Vehan Rajintha",
    category: "Event",
    content: {
      type: "event",
      title: "Google I/O Extended",
      subtitle: "Hosted by GDG Sri Lanka",
      introduction: "🎉 An incredible day at Google I/O Extended Sri Lanka hosted by GDG Sri Lanka! This event was a fantastic opportunity to dive deep into the latest innovations and technologies announced at Google I/O 2025.",
      description: "The event brought together developers, tech enthusiasts, and industry professionals to explore cutting-edge Google technologies including AI/ML advancements, Android updates, Firebase innovations, and much more. It was inspiring to connect with like-minded individuals and learn from experienced speakers who shared valuable insights about the future of technology and development.",
      hashtags: ["GoogleIO", "GoogleIOExtended", "GDGSriLanka", "TechEvent", "Developers", "AI", "Android", "Firebase", "Innovation"]
    }
  },
  {
    id: 3,
    slug: "spymic-project-attention",
    title: "My Spy Mic Project Got Attention from Researchers!",
    date: "2024, October 11",
    type: "project",
    featured: false,
    background: "linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)",
    image: "/blog3.webp",
    author: "Vehan Rajintha",
    category: "Project",
    content: {
      type: "project",
      title: "Spy Mic Project",
      subtitle: "Bluetooth-based reverse hearing technology",
      introduction: "🎙️✨ Exciting news! My Spy Mic project has garnered attention from academic researchers and tech enthusiasts! This innovative project explores Bluetooth-based reverse hearing technology with various practical applications.",
      description: "The Spy Mic project demonstrates how consumer Bluetooth technology can be repurposed for novel hearing applications. What started as a weekend project has evolved into something that caught the attention of security researchers and accessibility technology advocates. The project showcases creative problem-solving and innovative use of existing technologies to create something unique and potentially useful for various scenarios including accessibility aids and security applications.",
      hashtags: ["SpyMic", "Bluetooth", "AudioTech", "Innovation", "TechProject", "Research", "Accessibility", "Security"]
    }
  },
  {
    id: 4,
    slug: "csne-inauguration-sliit",
    title: "CSNE Batch Inauguration - Beginning My Journey at SLIIT!",
    date: "2023, October 18",
    type: "event",
    featured: true,
    background: "linear-gradient(135deg, #10b981 0%, #3b82f6 100%)",
    image: "/csne.webp",
    author: "Vehan Rajintha",
    category: "Event",
    content: {
      type: "event",
      title: "CSNE Inauguration",
      subtitle: "Computer Systems & Network Engineering at SLIIT",
      introduction: "🎓✨ A memorable milestone in my academic journey! The CSNE (Computer Systems & Network Engineering) batch inauguration at SLIIT marked the beginning of an exciting chapter in my university life.",
      description: "The inauguration ceremony brought together approximately 60-70 students, faculty members, and distinguished guests to celebrate the commencement of our Computer Systems & Network Engineering program. It was a proud moment to be part of this vibrant community at Sri Lanka Institute of Information Technology (SLIIT), embarking on a journey to explore networking technologies, system architecture, cybersecurity, and cutting-edge engineering solutions that will shape the future of technology. This ceremony symbolized the start of our collective journey towards becoming skilled engineers in computer systems and network infrastructure.",
      hashtags: ["CSNE", "SLIIT", "ComputerSystems", "NetworkEngineering", "Inauguration", "UniversityLife", "Engineering", "Networking", "TechEducation"]
    }
  }
]

// Helper functions
export const getFeaturedBlogs = () => {
  return allBlogs.filter(blog => blog.featured)
}

export const getRecentBlogs = (limit?: number) => {
  const sortedBlogs = allBlogs
    .map((post, index) => ({
      ...post,
      dateValue: new Date(post.date.replace(/(\d{4}), (\w+) (\d+)/, '$2 $3, $1'))
    }))
    .sort((a, b) => b.dateValue.getTime() - a.dateValue.getTime())
  
  return limit ? sortedBlogs.slice(0, limit) : sortedBlogs
}

export const getBlogBySlug = (slug: string) => {
  return allBlogs.find(blog => blog.slug === slug)
}

export const getAllBlogSlugs = () => {
  return allBlogs.map(blog => blog.slug)
}

