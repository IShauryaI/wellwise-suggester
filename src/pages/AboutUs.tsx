import { useEffect } from "react";
import { Heart, Award, BookOpen, Beaker, Lightbulb, Users } from "lucide-react";
import { motion } from "framer-motion";

const AboutUs = () => {
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  const staggerItems = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <div className="container mx-auto px-4 py-16 max-w-6xl">
      {/* Hero Section */}
      <section className="mb-20">
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="text-center mb-10"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6 leading-tight">
            WellBeing: Advancing AI in Healthcare Research
          </h1>
          <p className="text-xl text-gray mb-8 max-w-3xl mx-auto">
            A Scholarly Initiative in Digital Health Innovation
          </p>
          <div className="flex justify-center">
            <div className="w-32 h-1 bg-gradient-to-r from-primary to-secondary rounded-full"></div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          className="relative rounded-2xl overflow-hidden shadow-xl mb-16"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 z-10"></div>
          <img 
            src="https://images.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&fit=crop&q=80&w=1200"
            alt="Healthcare AI Research"
            className="w-full h-[500px] object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-center z-20">
            <div className="glassmorphism p-8 md:p-12 rounded-xl max-w-3xl text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-dark">Welcome to WellBeing</h2>
              <p className="text-gray">
                This platform represents an academic research project exploring the potential of 
                artificial intelligence in healthcare. The AI-generated insights provided here are intended 
                for educational and research purposes only and should not be considered medical advice. 
                We strongly encourage users to consult qualified healthcare professionals for personal medical needs.
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Our Purpose Section */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
        className="mb-20"
      >
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <div className="md:w-1/2">
            <img 
              src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=600"
              alt="Healthcare Innovation"
              className="rounded-2xl shadow-lg hover-lift-effect"
            />
          </div>
          <div className="md:w-1/2">
            <h2 className="text-3xl font-bold text-dark mb-6 flex items-center">
              <BookOpen className="text-primary mr-3 h-8 w-8" />
              Our Purpose
            </h2>
            <p className="text-gray mb-6">
              WellBeing serves as a research initiative to examine how artificial intelligence can enhance 
              healthcare understanding. By leveraging data-driven approaches, we aim to:
            </p>
            <motion.ul 
              variants={staggerItems}
              className="space-y-4 mb-8"
            >
              <motion.li variants={fadeIn} className="flex items-start">
                <div className="bg-primary-light p-2 rounded-full mr-3 mt-0.5">
                  <Lightbulb className="h-5 w-5 text-primary" />
                </div>
                <span className="text-gray">Demonstrate AI's capacity to analyze health information</span>
              </motion.li>
              <motion.li variants={fadeIn} className="flex items-start">
                <div className="bg-primary-light p-2 rounded-full mr-3 mt-0.5">
                  <Lightbulb className="h-5 w-5 text-primary" />
                </div>
                <span className="text-gray">Improve public awareness of health technologies</span>
              </motion.li>
              <motion.li variants={fadeIn} className="flex items-start">
                <div className="bg-primary-light p-2 rounded-full mr-3 mt-0.5">
                  <Lightbulb className="h-5 w-5 text-primary" />
                </div>
                <span className="text-gray">Highlight the continued importance of professional medical judgment</span>
              </motion.li>
            </motion.ul>
          </div>
        </div>
      </motion.section>

      {/* Research Objectives Section */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
        className="mb-20"
      >
        <h2 className="text-3xl font-bold text-dark mb-10 text-center">
          Dual Research Objectives
        </h2>
        
        <div className="grid md:grid-cols-2 gap-10">
          {/* Academic Exploration */}
          <motion.div 
            variants={fadeIn}
            className="bg-white rounded-xl shadow-md p-8 hover:shadow-lg transition-shadow border border-slate-100"
          >
            <div className="feature-icon mb-6">
              <Beaker className="h-8 w-8" />
            </div>
            <h3 className="text-2xl font-bold text-dark mb-4">Academic Exploration</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <div className="rounded-full bg-primary/10 p-1 mr-3 mt-1">
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                </div>
                <span className="text-gray">Examine artificial intelligence applications in health data analysis</span>
              </li>
              <li className="flex items-start">
                <div className="rounded-full bg-primary/10 p-1 mr-3 mt-1">
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                </div>
                <span className="text-gray">Develop transparent, privacy-conscious analytical models</span>
              </li>
              <li className="flex items-start">
                <div className="rounded-full bg-primary/10 p-1 mr-3 mt-1">
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                </div>
                <span className="text-gray">Promote responsible AI adoption in healthcare settings</span>
              </li>
            </ul>
          </motion.div>
          
          {/* Pharmaceutical Research */}
          <motion.div 
            variants={fadeIn}
            className="bg-white rounded-xl shadow-md p-8 hover:shadow-lg transition-shadow border border-slate-100"
          >
            <div className="feature-icon mb-6">
              <Beaker className="h-8 w-8" />
            </div>
            <h3 className="text-2xl font-bold text-dark mb-4">Pharmaceutical Research Applications</h3>
            <p className="text-gray mb-4">Our platform provides valuable insights for medication research by:</p>
            <ol className="space-y-3 list-decimal pl-5">
              <li className="text-gray">Assessing real-world medication performance</li>
              <li className="text-gray">Documenting prevalent side effect patterns</li>
              <li className="text-gray">Identifying patient experience trends to inform engagement strategies</li>
              <li className="text-gray">Generating supplementary evidence for healthcare providers</li>
            </ol>
          </motion.div>
        </div>
      </motion.section>

      {/* Project Team Section */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
        className="mb-20"
      >
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-dark mb-4 flex items-center justify-center">
            <Users className="text-primary mr-3 h-7 w-7" />
            Project Team
          </h2>
          <p className="text-gray max-w-3xl mx-auto">
            This project was developed by the students at the University of Windsor, Ontario,
            as part of the Advanced Software Engineering Course.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { name: "Shaurya Parshad", image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=300" },
            { name: "Debalina Barua", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=300" },
            { name: "Neela Priya Das", image: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&q=80&w=300" },
            { name: "Aiswarya Ramachandran", image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=300" }
          ].map((researcher, index) => (
            <motion.div 
              key={index}
              variants={fadeIn}
              className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-2"
            >
              <div className="h-48 overflow-hidden">
                <img 
                  src={researcher.image} 
                  alt={researcher.name}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>
              <div className="p-4 text-center">
                <h3 className="font-bold text-lg text-dark">{researcher.name}</h3>
                <p className="text-gray text-sm">University of Windsor</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Forward-Looking Section */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
        className="relative overflow-hidden rounded-2xl mb-16"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary opacity-90 z-10"></div>
        <img 
          src="https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=1200" 
          alt="Future of AI"
          className="w-full h-[400px] object-cover"
        />
        <div className="absolute inset-0 flex items-center z-20 p-8">
          <div className="max-w-3xl mx-auto text-white">
            <h2 className="text-3xl font-bold mb-6 flex items-center">
              <Award className="mr-3 h-8 w-8" />
              Forward-Looking Perspective
            </h2>
            <p className="mb-6 text-white/90">
              WellBeing represents an ongoing exploration into the responsible application of AI in healthcare. 
              We welcome collaboration and discussion from the academic and medical communities.
            </p>
            <div className="text-center mt-8">
              <p className="text-2xl font-light italic">Explore. Learn. Innovate.</p>
            </div>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default AboutUs;
