import React from "react";
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
    return (
      <div>
        <div className="mb-4">
          <Logo showText className="text-white" />
        </div>
        <Typography variant="body" className="text-gray-400 mb-4">
          Your trusted marketplace for quality products from verified sellers
          worldwide.
        </Typography>
        <div className="flex space-x-4">
          {/* Social media placeholders */}
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="w-8 h-8 bg-gray-700 rounded cursor-pointer hover:bg-gray-600 transition-colors"
            ></div>
          ))}
        </div>
      </div>
    );
  };

  const renderFooterSection = (section: (typeof FOOTER_SECTIONS)[0]) => {
    return (
      <div key={section.title}>
        <Typography variant="body" className="text-white font-semibold mb-4">
          {section.title}
        </Typography>
        <ul className="space-y-2">
          {section.links.map((link) => (
            <li key={link.href}>
              <NavigationLink
                href={link.href}
                className="text-gray-400 hover:text-white transition-colors"
              >
                {link.label}
              </NavigationLink>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  const renderCopyright = () => {
    return (
      <div className="border-t border-gray-700 mt-8 pt-8 text-center">
        <Typography variant="caption" className="text-gray-400">
          © 2024 ECommerce Platform. All rights reserved.
        </Typography>
      </div>
    );
  };

  return (
    <footer className={`bg-gray-900 text-white py-12 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          {renderCompanyInfo()}

          {/* Footer Sections */}
          {FOOTER_SECTIONS.map(renderFooterSection)}
        </div>

        {/* Copyright */}
        {renderCopyright()}
      </div>
    </footer>
  );
};

export default Footer;
