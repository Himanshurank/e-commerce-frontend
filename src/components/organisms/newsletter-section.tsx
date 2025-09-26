import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Typography from "@/components/atoms/typography";
import Button from "@/components/atoms/button";
import Input from "@/components/atoms/input";

interface INewsletterSectionProps {
  title?: string;
  subtitle?: string;
  onSubscribe?: (email: string) => void;
  className?: string;
  testId?: string;
}

const NewsletterSection = (props: INewsletterSectionProps) => {
  const {
    title = "Stay Updated with Latest Deals",
    subtitle = "Subscribe to our newsletter and be the first to know about new products, exclusive discounts, and special offers from our sellers.",
    onSubscribe,
    className = "",
    testId,
  } = props;

  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!email.trim()) return;

    setIsLoading(true);

    try {
      if (onSubscribe) {
        await onSubscribe(email);
      } else {
        // Default behavior
        console.log("Newsletter subscription:", email);
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }

      // Reset form on success
      setEmail("");
      setIsSuccess(true);

      // Hide success message after 3 seconds
      setTimeout(() => setIsSuccess(false), 3000);
    } catch (error) {
      console.error("Newsletter subscription failed:", error);
      // You could show an error message here
    } finally {
      setIsLoading(false);
    }
  };

  const sectionVariants = {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0 },
  };

  const contentVariants = {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
  };

  const formVariants = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
  };

  const successVariants = {
    initial: { opacity: 0, scale: 0.8, y: 20 },
    animate: { opacity: 1, scale: 1, y: 0 },
    exit: { opacity: 0, scale: 0.8, y: -20 },
  };

  return (
    <motion.section
      className={`py-20 bg-brand-600 relative overflow-hidden ${className}`}
      data-testid={testId || "newsletter-section"}
      variants={sectionVariants}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8 }}
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-32 h-32 bg-white/5 rounded-full"
            style={{
              top: `${20 + (i % 3) * 30}%`,
              left: `${10 + (i % 2) * 80}%`,
            }}
            animate={{
              y: [-20, 20, -20],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <motion.div
          variants={contentVariants}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <Typography variant="h2" component="h2" className="text-white mb-6">
            {title}
          </Typography>

          <Typography
            variant="body"
            className="text-brand-100 mb-12 max-w-2xl mx-auto text-lg"
          >
            {subtitle}
          </Typography>
        </motion.div>

        <AnimatePresence>
          {isSuccess ? (
            <motion.div
              variants={successVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="max-w-md mx-auto"
            >
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 300 }}
                  className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4"
                >
                  <svg
                    className="w-8 h-8 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </motion.div>
                <Typography variant="h3" className="text-white mb-2">
                  Successfully Subscribed!
                </Typography>
                <Typography variant="body" className="text-brand-100">
                  Thank you for subscribing. You'll receive our latest updates
                  soon.
                </Typography>
              </div>
            </motion.div>
          ) : (
            <motion.form
              onSubmit={handleSubmit}
              className="max-w-lg mx-auto"
              variants={formVariants}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <div className="flex flex-col sm:flex-row gap-4 p-2 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20">
                <div className="flex-1">
                  <Input
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="bg-white border-transparent focus:border-brand-200 h-14"
                    testId="newsletter-email"
                    fullWidth
                  />
                </div>
                <Button
                  type="submit"
                  variant="primary"
                  loading={isLoading}
                  disabled={!email.trim()}
                  className="!bg-white hover:!bg-neutral-100 !text-brand-600 font-bold sm:w-auto h-14 px-8 shadow-lg hover:shadow-xl transition-all duration-300"
                  testId="newsletter-subscribe"
                >
                  Subscribe
                </Button>
              </div>

              <motion.p
                className="text-brand-100 text-sm mt-4 opacity-75"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.75 }}
                transition={{ delay: 0.8, duration: 0.5 }}
              >
                Join 10,000+ subscribers. Unsubscribe at any time.
              </motion.p>
            </motion.form>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom accent line */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/30 to-transparent"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
      />
    </motion.section>
  );
};

export default NewsletterSection;
