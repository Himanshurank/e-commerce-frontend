import React, { useState } from "react";
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
      // You could show a success message here
    } catch (error) {
      console.error("Newsletter subscription failed:", error);
      // You could show an error message here
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section
      className={`py-12 bg-blue-600 ${className}`}
      data-testid={testId || "newsletter-section"}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <Typography variant="h2" component="h2" className="text-white mb-4">
          {title}
        </Typography>

        <Typography
          variant="body"
          className="text-blue-100 mb-8 max-w-2xl mx-auto"
        >
          {subtitle}
        </Typography>

        <form onSubmit={handleSubmit} className="max-w-md mx-auto">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-white"
                testId="newsletter-email"
                fullWidth
              />
            </div>
            <Button
              type="submit"
              variant="primary"
              loading={isLoading}
              disabled={!email.trim()}
              className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold sm:w-auto"
              testId="newsletter-subscribe"
            >
              Subscribe
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default NewsletterSection;
