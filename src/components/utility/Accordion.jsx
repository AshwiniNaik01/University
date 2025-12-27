import React, { useState } from "react";

/**
 * ✅ Parent Accordion
 * Manages open/close logic, but does NOT enforce design.
 *
 * @param {boolean} allowMultiple - Allow multiple items open at once
 */
const Accordion = ({ children, allowMultiple = false, className = "" }) => {
  const [openIndexes, setOpenIndexes] = useState([]);

  const toggle = (index) => {
    if (allowMultiple) {
      setOpenIndexes((prev) =>
        prev.includes(index)
          ? prev.filter((i) => i !== index)
          : [...prev, index]
      );
    } else {
      setOpenIndexes((prev) => (prev[0] === index ? [] : [index]));
    }
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {React.Children.map(children, (child, index) =>
        React.cloneElement(child, {
          isOpen: openIndexes.includes(index),
          onToggle: () => toggle(index),
        })
      )}
    </div>
  );
};

/**
 * ✅ AccordionItem
 * Now accepts ANYTHING for header & icon (as JSX).
 *
 * @param {JSX.Element|string} header - Custom header component or text
 * @param {JSX.Element} expandIcon - Icon when collapsed
 * @param {JSX.Element} collapseIcon - Icon when open
 */
const AccordionItem = ({
  header,
  expandIcon = null,
  collapseIcon = null,
  isOpen,
  onToggle,
  children,
  className = "",
  contentClass = "",
}) => (
  <div
    className={`rounded-xl shadow-md hover:shadow-lg transition bg-white/70 backdrop-blur-md ${className}`}
  >
    {/* Header */}
    <button
      onClick={onToggle}
      className="w-full flex justify-between items-center px-5 py-4 text-left"
    >
      <div className="w-full flex items-center gap-2">{header}</div>
      <div className="ml-2">
        {isOpen
          ? collapseIcon || <span className="text-xl">-</span>
          : expandIcon || <span className="text-xl">+</span>}
      </div>
    </button>

    {/* Content */}
    <div
      className={`transition-all duration-300 overflow-hidden ${
        isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
      }`}
    >
      <div className={`px-5 pb-4 ${contentClass}`}>{children}</div>
    </div>
  </div>
);

export { Accordion, AccordionItem };
