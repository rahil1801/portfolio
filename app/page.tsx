"use client"

import { useState, useEffect } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import {
  ChevronDown,
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin,
  ExternalLink,
  Calendar,
  GraduationCap,
  Briefcase,
  Code,
  Award,
  User,
  Home,
  FolderOpen,
  Contact,
  BookOpen,
  AlignJustify,
  Book,
  Clapperboard
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Download } from "lucide-react"
import Image from "next/image"
import nibras from "../public/Nibras.png"

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import Link from "next/link"
import ContactForm from "@/components/ContactForm"

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("home")
  const { scrollYProgress } = useScroll()
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "about", "education", "experience", "projects", "skills", "blog", "contact"]
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  const navItems = [
    { id: "home", label: "Home", icon: Home },
    { id: "about", label: "About", icon: User },
    { id: "education", label: "Education", icon: GraduationCap },
    { id: "experience", label: "Experience", icon: Briefcase },
    { id: "projects", label: "Projects", icon: FolderOpen },
    { id: "skills", label: "Skills", icon: Code },
    { id: "blog", label: "Blog", icon: BookOpen },
    { id: "contact", label: "Contact", icon: Contact },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Animated Background */}
      <motion.div
        className="fixed inset-0 opacity-20"
        style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, #7c3aed 0%, transparent 50%), 
                           radial-gradient(circle at 75% 75%, #06b6d4 0%, transparent 50%)`,
          y: backgroundY,
        }}
      />

      {/* Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-md border-b border-white/10"
      >
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-2xl font-bold text-white"
            >
              <Link href="/">
                <Image 
                  src="/Nibras.png"
                  alt="Logo of Nibras"
                  width={110}
                  height={50}
                  objectFit="cover"
                />
              </Link>
            </motion.div>

            <div className="hidden md:flex items-center space-x-3 xl:space-x-8">
              {navItems.map((item, index) => {
                const Icon = item.icon
                return (
                  <motion.button
                    key={item.id}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index }}
                    onClick={() => scrollToSection(item.id)}
                    className={`flex items-center cursor-pointer space-x-2 px-3 py-2 rounded-lg transition-all duration-300 ${
                      activeSection === item.id
                        ? "bg-purple-600 text-white"
                        : "text-gray-300 hover:text-white hover:bg-white/10"
                    }`}
                  >
                    <span><Icon size={16} /></span>
                    <span className="hidden xl:block">{item.label}</span>
                  </motion.button>
                )
              })}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <Popover>
                  <PopoverTrigger>
                    <AlignJustify className="mr-3 text-white"></AlignJustify>
                  </PopoverTrigger>
                  <PopoverContent className="w-fit p-2 mr-3">
                      <div className="flex flex-col gap-3">
                        {navItems.map((item, index) => {
                          const Icon = item.icon
                          return (
                            <motion.button
                              key={item.id}
                              initial={{ opacity: 0, y: -5 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.1 * index }}
                              onClick={() => scrollToSection(item.id)}
                              className={`flex items-center cursor-pointer space-x-2 px-3 py-2 rounded-lg transition-all duration-300 ${
                                activeSection === item.id
                                  ? "bg-purple-600 text-white"
                                  : "text-gray-300 hover:text-black hover:bg-white/10"
                              }`}
                            >
                              <span><Icon size={16} /></span>
                            </motion.button>
                          )
                        })}
                      </div>
                  </PopoverContent>
              </Popover>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <div className="container mx-auto px-6 mt-24 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <motion.h1
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-5xl md:text-7xl font-bold text-white mb-6"
            >
              Hi, I'm{" "}
              <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                Rahil Alam
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl md:text-2xl text-gray-300 mb-8"
            >
              Full Stack Web Developer | Software Developer
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-lg text-gray-400 mb-12 max-w-2xl mx-auto"
            >
              Passionate about creating innovative web solutions with modern technologies. Experienced in MERN stack,
              machine learning, and building scalable applications.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Button
                onClick={() => scrollToSection("projects")}
                size="lg"
                className="cursor-pointer bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white px-8 py-3 rounded-full transition-all duration-300 transform hover:scale-105"
              >
                View My Work
              </Button>
              <Button
                onClick={() => scrollToSection("contact")}
                variant="outline"
                size="lg"
                className="cursor-pointer border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white px-8 py-3 rounded-full transition-all duration-300"
              >
                Get In Touch
              </Button>
              <Button
                onClick={() => {
                  const link = document.createElement("a")
                  link.href = "https://drive.google.com/file/d/1tkKoH6UKR8vrSJOQQU7IG__IKi8MwcIe/view?usp=sharing"
                  link.target = "_blank"
                  link.download = "CV(Rahil).pdf"
                  link.click()
                }}
                variant="outline"
                size="lg"
                className="text-black cursor-pointer hover:bg-black hover:text-white px-8 py-3 rounded-full transition-all duration-300"
              >
                <Download size={20} className="mr-2" />
                Resume
              </Button>
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <ChevronDown className="text-white/60 w-8 h-8" />
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 relative">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">About Me</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-400 to-cyan-400 mx-auto"></div>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Card className="bg-white/5 backdrop-blur-md border-white/10">
                <CardContent className="p-8">
                  <p className="text-gray-300 text-lg leading-relaxed mb-6">
                    I'm a passionate Full Stack Web Developer and Software Developer currently pursuing my Bachelor's in
                    Computer Science Engineering. With hands-on experience in the MERN stack and machine learning, I
                    love creating innovative solutions that make a difference.
                  </p>
                  <p className="text-gray-300 text-lg leading-relaxed mb-6">
                    My journey in tech has been driven by curiosity and a desire to solve real-world problems through
                    code. I've worked on various projects ranging from online auction systems to AI-powered chatbots.
                  </p>
                  <div className="flex items-center space-x-4 text-gray-400">
                    <div className="flex items-center space-x-2">
                      <MapPin size={16} />
                      <span>MP, India</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar size={16} />
                      <span>Available for opportunities</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="grid grid-cols-2 gap-4">
                <Card className="bg-gradient-to-br from-purple-600/20 to-cyan-600/20 backdrop-blur-md border-white/10">
                  <CardContent className="p-6 text-center">
                    <div className="text-3xl font-bold text-white mb-2">8.15</div>
                    <div className="text-gray-400">CGPA</div>
                  </CardContent>
                </Card>
                <Card className="bg-gradient-to-br from-cyan-600/20 to-purple-600/20 backdrop-blur-md border-white/10">
                  <CardContent className="p-6 text-center">
                    <div className="text-3xl font-bold text-white mb-2">4+</div>
                    <div className="text-gray-400">Projects</div>
                  </CardContent>
                </Card>
              </div>

              <Card className="bg-white/5 backdrop-blur-md border-white/10">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-white mb-4">Quick Facts</h3>
                  <ul className="space-y-2 text-gray-300">
                    <li>• Experienced in MERN Stack Development</li>
                    <li>• Machine Learning & AI Enthusiast</li>
                    <li>• AWS & Cloud Technologies</li>
                    <li>• Agile Development Methodologies</li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="py-20 relative">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Education</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-400 to-cyan-400 mx-auto"></div>
          </motion.div>

          <div className="max-w-4xl mx-auto space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Card className="bg-white/5 backdrop-blur-md border-white/10 hover:bg-white/10 transition-all duration-300">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-2xl text-white mb-2">Bachelor of Technology</CardTitle>
                      <CardDescription className="text-purple-400 text-lg">
                        Computer Science Engineering
                      </CardDescription>
                    </div>
                    <Badge variant="secondary" className="bg-purple-600/20 text-purple-400">
                      Sept 2021 - May 2025
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-lg font-semibold text-white">
                        Hitkarini College of Engineering and Technology
                      </h4>
                      <p className="text-gray-400">Jabalpur, MP</p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <Badge className="bg-gradient-to-r from-purple-600 to-cyan-600 text-white">CGPA: 8.15/10.0</Badge>
                    </div>
                    <div>
                      <h5 className="text-white font-medium mb-2">Relevant Coursework:</h5>
                      <div className="flex flex-wrap gap-2">
                        {[
                          "Data Analysis",
                          "Software Engineering",
                          "Operating Systems",
                          "Algorithms",
                          "Web Development",
                        ].map((course) => (
                          <Badge key={course} variant="outline" className="border-gray-600 text-gray-300">
                            {course}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="bg-white/5 backdrop-blur-md border-white/10 hover:bg-white/10 transition-all duration-300">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-2xl text-white mb-2">Diploma</CardTitle>
                      <CardDescription className="text-cyan-400 text-lg">
                        Computer Hardware Maintenance and Networking
                      </CardDescription>
                    </div>
                    <Badge variant="secondary" className="bg-cyan-600/20 text-cyan-400">
                      Jul 2021 - Jul 2022
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div>
                    <h4 className="text-lg font-semibold text-white">Aegis I-Net Pvt. Ltd.</h4>
                    <p className="text-gray-400">Jabalpur, MP</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20 relative">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Experience</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-400 to-cyan-400 mx-auto"></div>
          </motion.div>

          <div className="max-w-4xl mx-auto space-y-8">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Card className="bg-white/5 backdrop-blur-md border-white/10 hover:bg-white/10 transition-all duration-300">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-2xl text-white mb-2">Web Developer Intern | AICTE</CardTitle>
                      <CardDescription className="text-purple-400 text-lg">
                         Project: Auctioneer - Online Auction Plaform
                      </CardDescription>
                    </div>
                    <Badge variant="secondary" className="bg-purple-600/20 text-purple-400">
                      Feb 2025 - Mar 2025
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-gray-400">Jabalpur, MP</p>
                    <ul className="space-y-2 text-gray-300">
                      <li>• Developed an online auction platform supporting 100+ users using the MERN stack</li>
                      <li>• Reduced bid latency by 30% using Socket.io for real-time updates</li>
                      <li>
                        • Designed and integrated user authentication with JWT-based httpOnly cookies, enhancing
                        security
                      </li>
                      <li>• Gained hands-on experience in RESTful APIs, database design, and deployment strategies</li>
                    </ul>
                    <div className="flex flex-wrap gap-2 mt-4">
                      {["MERN Stack", "Socket.io", "JWT", "RESTful APIs"].map((tech) => (
                        <Badge key={tech} className="bg-purple-600/20 text-purple-400">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Card className="bg-white/5 backdrop-blur-md border-white/10 hover:bg-white/10 transition-all duration-300">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-2xl text-white mb-2">Machine Learning Intern | Edunet Foundation</CardTitle>
                      <CardDescription className="text-cyan-400 text-lg">Intent Based Chatbot Project</CardDescription>
                    </div>
                    <Badge variant="secondary" className="bg-cyan-600/20 text-cyan-400">
                      Dec 2024 - Jan 2025
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-gray-400">Jabalpur, MP</p>
                    <ul className="space-y-2 text-gray-300">
                      <li>
                        • Developed a chatbot using Python and Streamlit, capable of responding to user queries based on
                        intent
                      </li>
                      <li>• Improved intent classification accuracy to 85%+ using NLP techniques</li>
                      <li>• Utilized tokenization and BoV for preprocessing user inputs and improving accuracy</li>
                      <li>
                        • Deployed an interactive web interface with Streamlit, making it user-friendly and responsive
                      </li>
                    </ul>
                    <div className="flex flex-wrap gap-2 mt-4">
                      {["Python", "Streamlit", "NLP", "Machine Learning"].map((tech) => (
                        <Badge key={tech} className="bg-cyan-600/20 text-cyan-400">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 relative">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Projects</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-400 to-cyan-400 mx-auto"></div>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {[
              {
                title: "Online Auction System",
                description:
                  "Developed and deployed an online auction platform supporting 100+ users with real-time bidding capabilities",
                tech: ["MERN Stack", "Socket.io", "JWT", "Real-time"],
                date: "Apr 2025",
                link: "https://auctioneer-client.vercel.app/",
                github: "https://github.com/rahil1801/auctioneer",
                medium: "https://medium.com/@rahilalam80/building-a-real-time-online-auction-platform-with-mern-stack-socket-io-0cd6ebfb6581",
                remarks: "Live and Active",
                status: true,
                features: [
                  "Developed an online auction platform supporting 100+ users using the MERN stack",
                  "Reduced bid latency by 30% using Socket.io for real-time updates",
                  "Designed and integrated user authentication with JWT-based httpOnly cookies and Firebase Authentication, enhancing security",
                  "Gained hands-on experience in RESTful APIs, database design, and deployment strategies",
                ],
              },
              {
                title: "Intent Based Chatbot",
                description:
                  "This chatbot is built using NLP (Natural Language Processing) techniques/library and Keras (Deep learning Framework) to extract the intents from the dataset and answer user's question",
                tech: ["Python", "NLP", "Keras", "Machine Learning", "Streamlit"],
                date: "Jan 2025",
                link: "https://intent-based-chatbot-rahil1801.streamlit.app/",
                github: "https://github.com/rahil1801/chatbot",
                medium: null,
                remarks: "Live and Active",
                status: true,
                features: [
                  "Developed a chatbot using Python and Streamlit, capable of responding to user queries based on intent.",
                  "Improved intent classification accuracy to 85%+ using NLP techniques",
                  "Utilized tokenization and BoV for preprocessing user inputs and improving accuracy",
                  "Deployed an interactive web interface with Streamlit, making it user-friendly and responsive"
                ],
              },
              {
                title: "Medical Insurance Cost Predictor",
                description:
                  "Built a ML model using Python and Logistic Regression to predict medical insurance costs based on user input",
                tech: ["Python", "Scikit-learn", "Streamlit", "Machine Learning"],
                date: "Nov 2024",
                link: "https://github.com/rahil1801/MediPredict",
                github: "https://github.com/rahil1801/MediPredict",
                medium: null,
                remarks: "Deployment in progress",
                status: false,
                features: [
                  "Engineered key features such as age, BMI, smoking status, and region",
                  "Utilized Scikit-learn for model training and evaluation",
                  "Developed interactive interface for real-time predictions",
                ],
              },
              {
                title: "Blogging Application",
                description:
                  "Developed a full-stack blogging platform using MERN Stack with secure authentication and content management",
                tech: ["MERN Stack", "JWT", "Redux", "MongoDB"],
                date: "Sep 2024",
                link: "https://jeviknows.com",
                github: null,
                medium: null,
                remarks: "Suspended due to hosting",
                status: false,
                features: [
                  "Implemented JWT and httpOnly cookies for secure authentication",
                  "Enabled tag-based search and filtering for content discovery",
                  "Integrated Redux for efficient state management",
                  "Deployed on Vercel and cPanel with MongoDB",
                ],
              },
            ].map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="bg-white/5 backdrop-blur-md border-white/10 hover:bg-white/10 transition-all duration-300 h-full group">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-xl text-white mb-2 group-hover:text-purple-400 transition-colors">
                          {project.title}
                        </CardTitle>
                        <CardDescription className="text-gray-400">{project.description}</CardDescription>
                      </div>
                      <Badge variant="outline" className="border-gray-600 text-gray-400">
                        {project.date}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <ul className="space-y-1 text-sm text-gray-300">
                        {project.features.map((feature, idx) => (
                          <li key={idx}>• {feature}</li>
                        ))}
                      </ul>
                      <div className="flex flex-wrap gap-2">
                        {project.tech.map((tech) => (
                          <Badge
                            key={tech}
                            className="bg-gradient-to-r from-purple-600/20 to-cyan-600/20 text-purple-400 border-purple-400/20"
                          >
                            {tech}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex items-center flex-wrap gap-2">
                        <Button
                          onClick={() => window.open(project.link ? project.link : "", "_blank")}
                          variant="ghost"
                          size="sm"
                          className="text-purple-400 hover:text-white hover:bg-purple-600/20 p-0 cursor-pointer"
                        >
                          <ExternalLink size={16} className="mr-2" />
                          View Project
                        </Button>
                        <Button
                          onClick={() => window.open(project.github ? project.github : "", "_blank")}
                          variant="ghost"
                          size="sm"
                          className={`${`text-purple-400 hover:text-white hover:bg-purple-600/20 p-0 cursor-pointer
                            ${project.github ? "flex items-center" : "hidden"}`}`}
                        >
                          <Github size={16} className="mr-2" />
                          Github Link
                        </Button>
                        <Button
                          onClick={() => window.open(project.medium ? project.medium : "", "_blank")}
                          variant="ghost"
                          size="sm"
                          className={`${`text-purple-400 hover:text-white hover:bg-purple-600/20 p-0 cursor-pointer
                            ${project.medium ? "flex items-center" : "hidden"}`}`}
                        >
                          <Book size={16} className="mr-2" />
                          Medium Blog
                        </Button>
                        <Badge
                          key={index}
                          className={`${`text-white ${project.status == true ? "bg-green-600/80" : "bg-red-600/80"}`}`}
                        >
                          Status: {project.remarks}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-10 mt-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">More Projects Coming in Future...</h2>
          </motion.div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 relative">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Skills & Technologies</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-400 to-cyan-400 mx-auto"></div>
          </motion.div>

          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  category: "Frontend",
                  skills: ["React", "JavaScript", "Tailwind CSS", "HTML5", "CSS3"],
                  icon: "🎨",
                },
                {
                  category: "Backend",
                  skills: ["Node.js", "Express.js", "RESTful APIs", "JWT", "Socket.io"],
                  icon: "⚙️",
                },
                {
                  category: "Database & Cloud",
                  skills: ["MongoDB", "AWS", "Git", "GitHub", "Vercel", "Docker"],
                  icon: "☁️",
                },
                {
                  category: "Programming",
                  skills: ["Python", "JavaScript", "SQL", "NoSQL"],
                  icon: "💻",
                },
                {
                  category: "Machine Learning",
                  skills: ["NLP", "Streamlit", "Data Analysis", "Regression", "Classification", "Tokenization"],
                  icon: "🤖",
                },
                {
                  category: "Tools & Others",
                  skills: ["Redux", "SDLC", "Agile", "Debugging", "DBMS", "Postman", "Firebase", "CursorAI"],
                  icon: "🛠️",
                },
              ].map((skillGroup, index) => (
                <motion.div
                  key={skillGroup.category}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="bg-white/5 backdrop-blur-md border-white/10 hover:bg-white/10 transition-all duration-300 h-full">
                    <CardHeader className="text-center">
                      <div className="text-4xl mb-4">{skillGroup.icon}</div>
                      <CardTitle className="text-xl text-white">{skillGroup.category}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2 justify-center">
                        {skillGroup.skills.map((skill) => (
                          <Badge
                            key={skill}
                            className="bg-gradient-to-r from-purple-600/20 to-cyan-600/20 text-purple-400 border-purple-400/20 hover:from-purple-600/30 hover:to-cyan-600/30 transition-all duration-300"
                          >
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              viewport={{ once: true }}
              className="mt-12"
            >
              <Card className="bg-white/5 backdrop-blur-md border-white/10">
                <CardHeader>
                  <h2 className="text-4xl font-bold mb-3 text-white text-center">Certifications & Training</h2>
                  <div className="w-24 h-1 bg-gradient-to-r from-purple-400 to-cyan-400 mx-auto"></div>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col w-full gap-3 justify-center">
                    {/* {["CPCT", "CHM 'O' Level", "CCNA Trained", "AWS Trained"].map((cert) => ( */}
                    {[
                      {
                        id:"1",
                        title:"React, NodeJS, Express & MongoDB - The Fullstack Guide",
                        issuer:"Udemy",
                        link:"https://udemy-certificate.s3.amazonaws.com/pdf/UC-d081ad15-a1c9-42ec-875f-f595dc56cedc.pdf",
                        date:"July 2025",
                        desc:"Successfully completed the MERN Fullstack Guide (React, NodeJS, Express & MongoDB) on Udemy, taught by Maximilian Schwarzmüller & Manuel Lorenz (Academind)."
                      },
                      {
                        id:"2",
                        title:"Internship on Artificial Intelligence and Data Analytics",
                        issuer:"Edunet Foundation",
                        link:"https://drive.google.com/file/d/1KTgdRPTj2XhQlfMJl-osM6KjipUg4ieI/view?usp=sharing",
                        date:"Jan 2025",
                        desc:"Completed 4-week virtual internship on Artificial Intelligence and Data Analytics focused on Green Skills, organized by AICTE, Shell India Markets Private Limited and Edunet Foundation under Skills4Future program"
                      },
                    ].map((cert: any) => (
                      <Card key={cert.id} className="bg-white/5 backdrop-blur-md border-white/10 hover:bg-white/10 transition-all duration-300">
                        <CardHeader>
                          <div className="flex items-start justify-between">
                            <div>
                              <CardTitle className="text-2xl text-white mb-2">{cert.title}</CardTitle>
                              <CardDescription className="text-gray-400">
                                {cert.desc}
                              </CardDescription>
                              <Badge variant="secondary" className="bg-cyan-600/20 text-cyan-400 mt-3">
                                {cert.issuer}
                              </Badge>
                            </div>
                            <Badge variant="secondary" className="bg-purple-600/20 text-purple-400">
                              {cert.date}
                            </Badge>
                          </div>
                        </CardHeader>
                        <CardContent className="-mt-4">
                          <Button
                            onClick={() => window.open(cert.link ? cert.link : "", "_blank")}
                            variant="ghost"
                            size="sm"
                            className="text-purple-400 hover:text-white hover:bg-purple-600/20 p-0 cursor-pointer"
                          >
                            <ExternalLink size={16} className="mr-2" />
                            View Certificate
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section id="blog" className="py-20 relative">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Blog & Articles</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-400 to-cyan-400 mx-auto mb-6"></div>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              I love sharing my knowledge and experiences through writing. Check out my latest articles on web
              development, machine learning, and technology trends.
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <Card className="bg-white/5 backdrop-blur-md border-white/10 hover:bg-white/10 transition-all duration-300">
                <CardContent className="p-12">
                  <BookOpen className="w-16 h-16 text-purple-400 mx-auto mb-6" />
                  <h3 className="text-2xl font-semibold text-white mb-4">Medium Blog</h3>
                  <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
                    On Medium, I write about my experiences in web development, share tutorials, and discuss the latest
                    trends in technology. From MERN stack development to machine learning insights, you'll find valuable
                    content for developers at all levels.
                  </p>
                  <Button
                    onClick={() => {
                      window.open("https://medium.com/@rahilalam80", "_blank")
                    }}
                    size="lg"
                    className="cursor-pointer bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white px-8 py-3 rounded-full transition-all duration-300 transform hover:scale-105"
                  >
                    <BookOpen className="mr-2" size={20} />
                    Read My Articles
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="mt-12 grid md:grid-cols-3 gap-6"
            >
              {[
                {
                  title: "Building a Real-Time Online Auction Platform with MERN Stack & Socket.io",
                  description: "A full-stack auctioning website where people can browse through items, bid on them, and confirm with the results. After weeks of planning, coding, and testing, I am glad to share the MERN + Socket.io project.",
                  category: "Web Development",
                  link: "https://medium.com/@rahilalam80/building-a-real-time-online-auction-platform-with-mern-stack-socket-io-0cd6ebfb6581"
                },
                {
                  title: "Building Real-World AI Applications with Gemini & Imagen on Google Vertex AI",
                  description: "Building AI-powered applications using Google’s Vertex AI platform, integrating Gemini for natural language processing and multimodal capabilities, and Imagen for image generation.",
                  category: "Machine Learning",
                  link: "https://medium.com/@rahilalam80/building-real-world-ai-applications-with-gemini-imagen-on-google-vertex-ai-ef6b68d16552"
                },
                {
                  title: "My Experience completing the “Prompt Design in Vertex AI” Skill Badge",
                  description: "Completed the Prompt Design in Vertex AI Skill Badge by Google Cloud, and I’m thrilled to share my experience with everyone!",
                  category: "Backend Development",
                  link: "https://medium.com/@rahilalam80/my-experience-completing-the-prompt-design-in-vertex-ai-skill-badge-181a8a7ec9aa"
                },
              ].map((article, index) => (
                <Card
                  key={index}
                  className="bg-white/5 backdrop-blur-md border-white/10 hover:bg-white/10 transition-all duration-300"
                >
                  <CardContent className="p-6">
                    <Badge className="bg-purple-600/20 text-purple-400 mb-3">{article.category}</Badge>
                    <h4 className="text-lg font-semibold text-white mb-2">{article.title}</h4>
                    <p className="text-gray-400 text-sm">{article.description}</p>
                    <Button
                      onClick={() => window.open(article.link ? article.link : "", "_blank")}
                      variant="ghost"
                      size="sm"
                      className="text-purple-400 mt-3 -ml-3 hover:text-white hover:bg-purple-600/20 p-0 cursor-pointer"
                    >
                      <ExternalLink size={16} className="mr-2" />
                      View Blog
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 relative">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Get In Touch</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-400 to-cyan-400 mx-auto mb-6"></div>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              I'm always open to discussing new opportunities, interesting projects, or just having a chat about
              technology.
            </p>
          </motion.div>

          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Contact Information */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <div className="space-y-8">
                  <div>
                    <h3 className="text-2xl font-semibold text-white mb-6">Contact Information</h3>
                    <div className="space-y-6">
                      {[
                        {
                          icon: Mail,
                          title: "Email",
                          value: "rahilalam80@gmail.com",
                          href: "mailto:rahilalam80@gmail.com",
                        },
                        {
                          icon: Phone,
                          title: "Phone",
                          value: "+91 9301582948",
                          href: "tel:+919301582948",
                        },
                        {
                          icon: MapPin,
                          title: "Location",
                          value: "MP, India",
                          href: "#",
                        },
                      ].map((contact, index) => (
                        <div key={index} className="flex items-center space-x-4">
                          <div className="p-3 bg-white/5 backdrop-blur-md border border-white/10 rounded-lg">
                            <contact.icon className="w-6 h-6 text-purple-400" />
                          </div>
                          <div>
                            <h4 className="text-white font-medium">{contact.title}</h4>
                            <a href={contact.href} className="text-gray-300 hover:text-purple-400 transition-colors">
                              {contact.value}
                            </a>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex space-x-4">
                    <a
                      href="https://github.com/rahil1801"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-4 bg-white/5 backdrop-blur-md border border-white/10 rounded-full hover:bg-purple-600/20 hover:border-purple-400/50 transition-all duration-300 group"
                    >
                      <Github className="w-6 h-6 text-gray-400 group-hover:text-purple-400" />
                    </a>
                    <a
                      href="https://www.linkedin.com/in/rahil-alam-541a9b198/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-4 bg-white/5 backdrop-blur-md border border-white/10 rounded-full hover:bg-cyan-600/20 hover:border-cyan-400/50 transition-all duration-300 group"
                    >
                      <Linkedin className="w-6 h-6 text-gray-400 group-hover:text-cyan-400" />
                    </a>
                    <a
                      href="https://medium.com/@rahilalam80"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-4 bg-white/5 backdrop-blur-md border border-white/10 rounded-full hover:bg-black/20 hover:border-black/50 transition-all duration-300 group"
                    >
                      <Book className="w-6 h-6 text-gray-400 group-hover:text-black-400" />
                    </a>
                    <a
                      href="https://www.upwork.com/freelancers/~017de4d4fd56f7a391?mp_source=share"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-4 bg-white/5 backdrop-blur-md border border-white/10 rounded-full hover:bg-green-600/20 hover:border-green-400/50 transition-all duration-300 group"
                    >
                      <Clapperboard className="w-6 h-6 text-gray-400 group-hover:text-green-400" />
                    </a>
                  </div>
                </div>
              </motion.div>

              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <Card className="bg-white/5 backdrop-blur-md border-white/10">
                  <CardHeader>
                    <CardTitle className="text-2xl text-white">Send Message</CardTitle>
                    <CardDescription className="text-gray-400">
                      Fill out the form below and I'll get back to you as soon as possible. <br/>
                      Note: Due to server overload, sometimes the mails are not received. Make sure to alert me on LinkedIn too. Thank you!
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                      <ContactForm />
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Future Scope Section */}
      <section id="contact" className="py-20 relative">
        <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Future Scopes and Training</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-400 to-cyan-400 mx-auto mb-6"></div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Technology is evolving rapidly, and I believe in continuously upgrading my skills. 
            In the coming future, I plan to dive deeper into <span className="text-purple-400 font-semibold">Agentic AI </span> 
            and <span className="text-cyan-400 font-semibold">Generative AI</span>.  
            My focus will be on building intelligent, autonomous systems and leveraging modern AI to 
            create real-world solutions that combine automation, creativity, and reasoning. Some of them are:
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 text-left">
          <div className="p-6 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 hover:border-purple-400 transition-all">
            <h3 className="text-xl font-semibold text-white mb-3">1. AI Website Builder</h3>
            <p className="text-gray-300">
              A platform where users can describe their idea in plain text and the AI will 
              automatically generate a fully functional website with design, content, and deployment.
            </p>
          </div>

          <div className="p-6 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 hover:border-cyan-400 transition-all">
            <h3 className="text-xl font-semibold text-white mb-3">2. Test Case Generator</h3>
            <p className="text-gray-300">
              An AI system that reads code or requirements and intelligently generates 
              test cases to improve software quality and speed up the QA process.
            </p>
          </div>

          <div className="p-6 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 hover:border-green-400 transition-all">
            <h3 className="text-xl font-semibold text-white mb-3">3. AI-Powered Video Generator</h3>
            <p className="text-gray-300">
              A tool that takes <span className="font-medium">Manim scripts</span> and 
              automatically converts them into high-quality, animated educational videos.
            </p>
          </div>

          <div className="p-6 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 hover:border-pink-400 transition-all">
            <h3 className="text-xl font-semibold text-white mb-3">4. AI Agent – Digital Twin</h3>
            <p className="text-gray-300">
              A duplicate AI version of myself that can introduce me, talk about my skills, 
              and answer questions — acting as my intelligent virtual representative.
            </p>
          </div>
        </div>
      </div>

      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-white/10">
        <div className="container mx-auto px-6 text-center">
          <p className="text-gray-400">© 2025 | Nibras | Portfolio of Rahil Alam. Built with Next.js and Tailwind CSS.</p>
        </div>
      </footer>
    </div>
  )
}
