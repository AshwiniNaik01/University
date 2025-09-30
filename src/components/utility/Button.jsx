import React from "react";
import { Link, NavLink } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import { twMerge } from "tailwind-merge";

/**
 * Reusable Button component with theme-aware variants, sizes, and optional rendering as a button, Link, or NavLink.
 *
 * @param {Object} props - React props object
 * @param {React.ReactNode} props.children - Button content
 * @param {"gradient"|"pink"|"blue"|"indigo"|"outline"|"ghost"} [props.variant="gradient"] - Styling variant
 * @param {"sm"|"md"|"lg"} [props.size="lg"] - Button size
 * @param {string} [props.className] - Additional Tailwind classes
 * @param {function} [props.onClick] - Click handler function
 * @param {string} [props.type="button"] - Button type (button, submit, reset)
 * @param {"button"|"link"|"navlink"|"hashlink"} [props.as="button"] - Render element type
 * @param {string} [props.to] - Route path (used if as is link or navlink)
 * @param {Object} [props.rest] - Any other valid button or link attributes
 *
 * @returns {JSX.Element}
 */
const Button = ({
  children,
  variant = "gradient",
  size = "lg",
  className = "",
  onClick,
  type = "button",
  as = "button",
  to = "#",
  ...rest
}) => {
  const base =
    "inline-flex items-center justify-center font-semibold rounded-full transition-all duration-300 cursor-pointer";

  const sizes = {
    sm: "text-sm px-4 py-2",
    md: "text-base px-5 py-2.5",
    lg: "text-lg px-6 py-3",
  };

  const variants = {
    gradient: "bg-codedrift-gradient text-white shadow-md hover:shadow-lg",
    pink: "bg-codedrift-pink text-white hover:bg-codedrift-indigo-dark",
    blue: "bg-codedrift-blue text-white hover:bg-codedrift-indigo-dark",
    indigo: "bg-codedrift-indigo text-white hover:bg-codedrift-indigo-dark",
    outline:
      "border border-codedrift-indigo text-codedrift-indigo bg-white hover:bg-codedrift-indigo hover:text-white",
    ghost: "text-codedrift-indigo hover:underline",
  };

  const mergedClasses = twMerge(
    base,
    sizes[size],
    variants[variant],
    className
  );

  if (as === "link") {
    return (
      <Link to={to} className={mergedClasses} {...rest}>
        {children}
      </Link>
    );
  }

  if (as === "navlink") {
    return (
      <NavLink to={to} className={mergedClasses} {...rest}>
        {children}
      </NavLink>
    );
  }

  if (as === "hashlink") {
    return (
      <HashLink to={to} className={mergedClasses} {...rest}>
        {children}
      </HashLink>
    );
  }

  return (
    <button type={type} onClick={onClick} className={mergedClasses} {...rest}>
      {children}
    </button>
  );
};

export { Button };
