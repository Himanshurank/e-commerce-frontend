import React from "react";
import { motion } from "framer-motion";
import Typography from "@/components/atoms/typography";
import NavigationLink from "@/components/molecules/navigation-link";
import Logo from "@/components/molecules/logo";
import { FOOTER_SECTIONS } from "@/shared/constants";

interface IFooterProps {
  className?: string;
}

const Footer = (props: IFooterProps) => {
  const { className } = props;

  const renderCompanyInfo = () => {
    const socialLinks = [
      {
        name: "Twitter",
        icon: "M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z",
      },
      {
        name: "LinkedIn",
        icon: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
      },
      {
        name: "Instagram",
        icon: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z",
      },
    ];

    return (
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <div className="mb-6">
          <Logo showText />
        </div>

        <Typography
          variant="body"
          className="text-neutral-600 mb-6 leading-relaxed"
        >
          Your trusted B2B marketplace connecting businesses with verified
          suppliers worldwide. Discover quality products, competitive prices,
          and reliable partnerships.
        </Typography>

        {/* Social Media Links */}
        <div className="flex space-x-3 mb-6">
          {socialLinks.map((social, index) => (
            <motion.a
              key={social.name}
              href={`#${social.name.toLowerCase()}`}
              className="group w-10 h-10 bg-neutral-100 hover:bg-brand-600 rounded-xl flex items-center justify-center transition-all duration-300 hover:shadow-lg hover:shadow-brand-600/25"
              aria-label={`Follow us on ${social.name}`}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                delay: 0.4 + index * 0.1,
                type: "spring",
                stiffness: 200,
              }}
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg
                className="w-5 h-5 text-neutral-600 group-hover:text-white transition-colors duration-300"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d={social.icon} />
              </svg>
            </motion.a>
          ))}
        </div>

        {/* Newsletter Signup */}
        <motion.div
          className="bg-neutral-50 rounded-xl p-4 border border-neutral-200"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <Typography
            variant="caption"
            className="text-neutral-900 font-semibold mb-2 block"
          >
            Stay Updated
          </Typography>
          <Typography variant="caption" className="text-neutral-600 text-xs">
            Get the latest industry insights and product updates.
          </Typography>
        </motion.div>
      </motion.div>
    );
  };

  const renderFooterSection = (
    section: (typeof FOOTER_SECTIONS)[0],
    index: number
  ) => {
    return (
      <motion.div
        key={section.title}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
      >
        <motion.div
          className="mb-6"
          whileHover={{ x: 2 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <Typography
            variant="body"
            className="text-neutral-900 font-bold mb-6 relative"
          >
            {section.title}
            <motion.div
              className="absolute -bottom-2 left-0 h-0.5 bg-brand-600 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: "2rem" }}
              transition={{ delay: 0.5 + index * 0.1, duration: 0.6 }}
            />
          </Typography>
        </motion.div>

        <ul className="space-y-1">
          {section.links.map((link, linkIndex) => (
            <motion.li
              key={link.href}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                delay: 0.6 + index * 0.1 + linkIndex * 0.05,
                duration: 0.4,
              }}
            >
              <motion.div
                whileHover={{ x: 4 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <NavigationLink
                  href={link.href}
                  className="text-neutral-600 hover:text-brand-600 transition-all duration-300 text-sm flex items-center group"
                >
                  <motion.span
                    className="w-1 h-1 bg-brand-600 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    whileHover={{ scale: 1.5 }}
                  />
                  {link.label}
                </NavigationLink>
              </motion.div>
            </motion.li>
          ))}
        </ul>
      </motion.div>
    );
  };

  const renderCopyright = () => {
    return (
      <motion.div
        className="border-t border-neutral-200 mt-12 pt-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.5 }}
      >
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          {/* Copyright */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.9, duration: 0.5 }}
          >
            <Typography variant="caption" className="text-neutral-600">
              © 2024 ECommerce B2B Platform. All rights reserved.
            </Typography>
          </motion.div>

          {/* Additional Links */}
          <motion.div
            className="flex space-x-4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1, duration: 0.5 }}
          >
            {["Privacy Policy", "Terms of Service", "Cookie Policy"].map(
              (item, index) => (
                <motion.a
                  key={item}
                  href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
                  className="text-neutral-600 hover:text-brand-600 transition-colors duration-300 text-sm"
                  whileHover={{ scale: 1.05, y: -1 }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.1 + index * 0.1, duration: 0.4 }}
                >
                  {item}
                </motion.a>
              )
            )}
          </motion.div>

          {/* Trust Badges */}
          <motion.div
            className="flex items-center space-x-3"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.2, duration: 0.5 }}
          >
            <div className="flex items-center space-x-2 bg-neutral-100 px-3 py-1 rounded-full border border-neutral-200">
              <motion.div
                className="w-2 h-2 bg-green-500 rounded-full"
                animate={{ opacity: [1, 0.5, 1] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <Typography
                variant="caption"
                className="text-neutral-700 text-xs"
              >
                Secure Platform
              </Typography>
            </div>
          </motion.div>
        </div>
      </motion.div>
    );
  };

  const footerVariants = {
    initial: { opacity: 0, y: 40 },
    animate: { opacity: 1, y: 0 },
  };

  const sectionVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
  };

  return (
    <motion.footer
      className={`bg-white/95 backdrop-blur-sm border-t border-neutral-200 py-20 relative overflow-hidden ${className}`}
      variants={footerVariants}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6 }}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-64 h-64 bg-brand-600 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-accent-500 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-brand-400 rounded-full blur-3xl" />
      </div>

      {/* Decorative Grid */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(139, 92, 246, 0.3) 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-4 gap-12 lg:gap-16"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          transition={{ staggerChildren: 0.1, delayChildren: 0.2 }}
        >
          {/* Company Info - Takes up more space */}
          <div className="md:col-span-1">{renderCompanyInfo()}</div>

          {/* Footer Sections */}
          {FOOTER_SECTIONS.map((section, index) => (
            <div key={section.title}>{renderFooterSection(section, index)}</div>
          ))}
        </motion.div>

        {/* Copyright */}
        {renderCopyright()}
      </div>

      {/* Footer top accent line - removed gradient */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-px bg-brand-600 opacity-0"
        animate={{ opacity: 0.6 }}
        transition={{ delay: 1, duration: 0.8 }}
      />

      {/* Floating Elements */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-brand-400/20 rounded-full"
          style={{
            top: `${10 + (i % 4) * 25}%`,
            left: `${5 + (i % 3) * 30}%`,
          }}
          animate={{
            y: [-10, 10, -10],
            opacity: [0.2, 0.8, 0.2],
          }}
          transition={{
            duration: 4 + i * 0.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.2,
          }}
        />
      ))}
    </motion.footer>
  );
};

export default Footer;
