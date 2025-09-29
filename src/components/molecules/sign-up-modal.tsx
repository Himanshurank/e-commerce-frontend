import React, { useState } from "react";
import Modal from "@/components/atoms/modal";
import Button from "@/components/atoms/button";
import Input from "@/components/atoms/input";
import Typography from "@/components/atoms/typography";
import Icon from "@/components/atoms/icon";
import { authService } from "@/core/shared/services/auth.service";
import {
  SignupRequest,
  SignupResponse,
  SigninRequest,
} from "@/core/shared/interfaces/auth";
import { ApiResponse } from "@/core/shared/interfaces/httpService";

interface ISignUpModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSignUpSuccess?: (user: SignupResponse) => void; // Called when signup is successful
  onSwitchToSignIn?: () => void;
  className?: string;
}

const SignUpModal = (props: ISignUpModalProps) => {
  const { isOpen, onClose, onSignUpSuccess, onSwitchToSignIn, className } =
    props;

  // State management
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const role = "customer"; // Fixed role for customer registration
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<{
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
  }>({});

  // Helper functions
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = (): boolean => {
    const newErrors: {
      firstName?: string;
      lastName?: string;
      email?: string;
      password?: string;
      confirmPassword?: string;
    } = {};

    if (!firstName.trim()) {
      newErrors.firstName = "First name is required";
    }

    if (!lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }

    if (!email) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
      newErrors.password =
        "Password must contain uppercase, lowercase, and number";
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
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
      const signupData: SignupRequest = {
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email,
        password,
        phone: phone.trim() || undefined,
        role: "customer",
      };

      const response: ApiResponse<SignupResponse> =
        await authService.signup(signupData);

      if (response.success) {
        // Automatically sign in the user after successful signup
        try {
          const signinData: SigninRequest = {
            email,
            password,
          };
          const signinResponse = await authService.signin(signinData);

          if (signinResponse.success) {
            // Call success callback with signed-in user data
            if (onSignUpSuccess) {
              onSignUpSuccess(response.data);
            }

            // Reset form on success
            setFirstName("");
            setLastName("");
            setEmail("");
            setPassword("");
            setConfirmPassword("");
            setPhone("");
            setErrors({});
            onClose();

            console.log("Signup and auto-signin successful:", response.message);
          } else {
            // Signup successful but auto-signin failed, still close modal
            if (onSignUpSuccess) {
              onSignUpSuccess(response.data);
            }

            setFirstName("");
            setLastName("");
            setEmail("");
            setPassword("");
            setConfirmPassword("");
            setPhone("");
            setErrors({});
            onClose();

            console.log(
              "Signup successful, but auto-signin failed. Please sign in manually."
            );
          }
        } catch (signinError) {
          // Signup successful but auto-signin failed
          console.warn("Auto-signin failed after signup:", signinError);

          if (onSignUpSuccess) {
            onSignUpSuccess(response.data);
          }

          setFirstName("");
          setLastName("");
          setEmail("");
          setPassword("");
          setConfirmPassword("");
          setPhone("");
          setErrors({});
          onClose();
        }
      }
    } catch (error: any) {
      console.error("Sign up error:", error);

      // Handle specific API errors based on backend structure
      let errorMessage = "Signup failed. Please try again.";

      if (error?.statusCode === 409) {
        errorMessage = "An account with this email already exists.";
        setErrors({ email: errorMessage });
      } else if (error?.statusCode === 400) {
        // Handle validation errors
        if (error.errors && Array.isArray(error.errors)) {
          const newErrors: any = {};
          error.errors.forEach((err: any) => {
            if (err.field) {
              newErrors[err.field] = err.message;
            }
          });
          setErrors(newErrors);
        } else {
          setErrors({ email: error.message || errorMessage });
        }
      } else {
        setErrors({ email: error.message || errorMessage });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setPhone("");
    setErrors({});
    onClose();
  };

  const handleSwitchToSignIn = () => {
    handleClose();
    if (onSwitchToSignIn) {
      onSwitchToSignIn();
    }
  };

  // Render methods
  const renderModalHeader = () => (
    <div className="flex items-center justify-between p-6 border-b border-neutral-200">
      <Typography variant="h2" className="text-neutral-900 font-semibold">
        Create Customer Account
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

  const renderSignUpForm = () => (
    <form onSubmit={handleSubmit} className="p-6 space-y-4">
      {/* Name Fields */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="firstName"
            className="block text-sm font-medium text-neutral-700 mb-2"
          >
            First Name
          </label>
          <Input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="Enter first name"
            className={`w-full ${errors.firstName ? "border-red-500 focus:ring-red-500" : ""}`}
          />
          {errors.firstName && (
            <Typography variant="caption" className="text-red-600 mt-1">
              {errors.firstName}
            </Typography>
          )}
        </div>

        <div>
          <label
            htmlFor="lastName"
            className="block text-sm font-medium text-neutral-700 mb-2"
          >
            Last Name
          </label>
          <Input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Enter last name"
            className={`w-full ${errors.lastName ? "border-red-500 focus:ring-red-500" : ""}`}
          />
          {errors.lastName && (
            <Typography variant="caption" className="text-red-600 mt-1">
              {errors.lastName}
            </Typography>
          )}
        </div>
      </div>

      {/* Email Input */}
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
        />
        {errors.email && (
          <Typography variant="caption" className="text-red-600 mt-1">
            {errors.email}
          </Typography>
        )}
      </div>

      {/* Phone Input */}
      <div>
        <label
          htmlFor="phone"
          className="block text-sm font-medium text-neutral-700 mb-2"
        >
          Phone Number (Optional)
        </label>
        <Input
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="+1234567890"
          className="w-full"
        />
      </div>

      {/* Password Fields */}
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
          placeholder="Create a password"
          className={`w-full ${errors.password ? "border-red-500 focus:ring-red-500" : ""}`}
        />
        {errors.password && (
          <Typography variant="caption" className="text-red-600 mt-1">
            {errors.password}
          </Typography>
        )}
        <Typography variant="caption" className="text-neutral-500 mt-1">
          Must be 8+ characters with uppercase, lowercase, and number
        </Typography>
      </div>

      <div>
        <label
          htmlFor="confirmPassword"
          className="block text-sm font-medium text-neutral-700 mb-2"
        >
          Confirm Password
        </label>
        <Input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm your password"
          className={`w-full ${errors.confirmPassword ? "border-red-500 focus:ring-red-500" : ""}`}
        />
        {errors.confirmPassword && (
          <Typography variant="caption" className="text-red-600 mt-1">
            {errors.confirmPassword}
          </Typography>
        )}
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        variant="primary"
        size="lg"
        fullWidth
        disabled={isLoading}
        className="bg-brand-600 hover:bg-brand-700 text-white font-medium rounded-xl"
      >
        {isLoading ? "Creating Account..." : "Create Customer Account"}
      </Button>
    </form>
  );

  const renderModalFooter = () => (
    <div className="px-6 py-4 border-t border-neutral-200 bg-neutral-50">
      <div className="text-center">
        <Typography variant="body" className="text-neutral-600">
          Already have an account?{" "}
          <button
            onClick={handleSwitchToSignIn}
            className="text-brand-600 hover:text-brand-700 font-medium focus:outline-none focus:underline"
          >
            Sign in here
          </button>
        </Typography>
      </div>
    </div>
  );

  return (
    <Modal isOpen={isOpen} onClose={handleClose} className={className}>
      <div
        className="w-full max-w-lg bg-white rounded-xl shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {renderModalHeader()}
        {renderSignUpForm()}
        {renderModalFooter()}
      </div>
    </Modal>
  );
};

export default SignUpModal;
