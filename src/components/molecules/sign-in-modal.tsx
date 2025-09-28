import React, { useState } from "react";
import Modal from "@/components/atoms/modal";
import Button from "@/components/atoms/button";
import Input from "@/components/atoms/input";
import Typography from "@/components/atoms/typography";
import Icon from "@/components/atoms/icon";

interface ISignInModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSignIn?: (email: string, password: string) => void;
  onSwitchToSignUp?: () => void;
  className?: string;
}

const SignInModal = (props: ISignInModalProps) => {
  const { isOpen, onClose, onSignIn, onSwitchToSignUp, className } = props;

  // State management
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {}
  );

  // Helper functions
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = (): boolean => {
    const newErrors: { email?: string; password?: string } = {};

    if (!email) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Event handlers
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      if (onSignIn) {
        await onSignIn(email, password);
      }
      // Reset form on success
      setEmail("");
      setPassword("");
      setErrors({});
      onClose();
    } catch (error) {
      console.error("Sign in error:", error);
      setErrors({ email: "Invalid email or password" });
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setEmail("");
    setPassword("");
    setErrors({});
    onClose();
  };

  const handleSwitchToSignUp = () => {
    handleClose();
    if (onSwitchToSignUp) {
      onSwitchToSignUp();
    }
  };

  // Render methods
  const renderModalHeader = () => (
    <div className="flex items-center justify-between p-6 border-b border-neutral-200">
      <Typography variant="h2" className="text-neutral-900 font-semibold">
        Sign In
      </Typography>
      <button
        onClick={handleClose}
        className="p-2 text-neutral-500 hover:text-neutral-700 hover:bg-neutral-100 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2"
        aria-label="Close modal"
      >
        <Icon name="close" size="md" />
      </button>
    </div>
  );

  const renderSignInForm = () => (
    <form onSubmit={handleSubmit} className="p-6 space-y-4">
      {/* Email Input - UI Accessibility: Clear labels and error states */}
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-neutral-700 mb-2"
        >
          Email Address
        </label>
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className={`w-full ${errors.email ? "border-red-500 focus:ring-red-500" : ""}`}
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? "email-error" : undefined}
        />
        {errors.email && (
          <Typography variant="caption" className="text-red-600 mt-1">
            {errors.email}
          </Typography>
        )}
      </div>

      {/* Password Input - Recognition over Recall: Clear labeling */}
      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-neutral-700 mb-2"
        >
          Password
        </label>
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          className={`w-full ${errors.password ? "border-red-500 focus:ring-red-500" : ""}`}
          aria-invalid={!!errors.password}
          aria-describedby={errors.password ? "password-error" : undefined}
        />
        {errors.password && (
          <Typography variant="caption" className="text-red-600 mt-1">
            {errors.password}
          </Typography>
        )}
      </div>

      {/* Forgot Password Link - UI Hierarchy: Secondary action */}
      <div className="text-right">
        <button
          type="button"
          className="text-sm text-brand-600 hover:text-brand-700 font-medium focus:outline-none focus:underline"
        >
          Forgot your password?
        </button>
      </div>

      {/* Submit Button - Affordance: Clear primary action */}
      <Button
        type="submit"
        variant="primary"
        size="lg"
        fullWidth
        disabled={isLoading}
        className="bg-brand-600 hover:bg-brand-700 text-white font-medium rounded-xl"
      >
        {isLoading ? "Signing In..." : "Sign In"}
      </Button>
    </form>
  );

  const renderModalFooter = () => (
    <div className="px-6 py-4 border-t border-neutral-200 bg-neutral-50">
      <div className="text-center">
        <Typography variant="body" className="text-neutral-600">
          Don't have an account?{" "}
          <button
            onClick={handleSwitchToSignUp}
            className="text-brand-600 hover:text-brand-700 font-medium focus:outline-none focus:underline"
          >
            Sign up here
          </button>
        </Typography>
      </div>
    </div>
  );

  return (
    <Modal isOpen={isOpen} onClose={handleClose} className={className}>
      <div
        className="w-full max-w-md bg-white rounded-xl shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {renderModalHeader()}
        {renderSignInForm()}
        {renderModalFooter()}
      </div>
    </Modal>
  );
};

export default SignInModal;
