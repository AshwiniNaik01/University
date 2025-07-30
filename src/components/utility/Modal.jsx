import React, { createContext, useContext } from 'react'
import { X } from 'lucide-react'

/**
 * Modal context to provide shared state like onClose and scrollableBody.
 * @type {React.Context<{ onClose: () => void, scrollableBody: boolean }>}
 */
const ModalContext = createContext()

// Width classes for modal size variants
const sizeClasses = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-2xl',
  xl: 'max-w-4xl',
  full: 'max-w-7xl',
}

// Vertical position classes
const positionClasses = {
  top: 'items-start mt-12',
  center: 'items-center',
  bottom: 'items-end mb-12',
}

/**
 * Modal component with customizable size, position, backdrop, and scrollable body.
 * Uses compound component structure: Modal.Header, Modal.Body, Modal.Footer
 *
 * @param {Object} props
 * @param {boolean} props.isOpen - Controls modal visibility.
 * @param {() => void} props.onClose - Callback to close the modal.
 * @param {'sm' | 'md' | 'lg' | 'xl' | 'full'} [props.variant='md'] - Modal width size.
 * @param {'top' | 'center' | 'bottom'} [props.position='center'] - Vertical alignment.
 * @param {boolean} [props.backdrop=true] - Close modal on outside click.
 * @param {boolean} [props.scrollableBody=false] - Make only body area scrollable.
 * @param {React.ReactNode} props.children - Modal content (Header, Body, Footer).
 * @returns {JSX.Element|null}
 */
const Modal = ({
  isOpen,
  onClose,
  variant = 'md',
  position = 'center',
  backdrop = true,
  scrollableBody = false,
  children,
}) => {
  if (!isOpen) return null

  const handleOutsideClick = (e) => {
    if (!backdrop) return
    if (e.target.dataset.modalwrapper) onClose()
  }

  return (
    <ModalContext.Provider value={{ onClose, scrollableBody }}>
      <div
        className={`fixed inset-0 z-[1002] flex justify-center bg-black/50 backdrop-blur-sm px-4 ${positionClasses[position]}`}
        data-modalwrapper
        onClick={handleOutsideClick}
      >
        <div
          className={`bg-white w-full rounded-2xl shadow-2xl border border-gray-200 ${sizeClasses[variant]} max-h-[95vh] overflow-hidden transition-all duration-300`}
        >
          {children}
        </div>
      </div>
    </ModalContext.Provider>
  )
}

/**
 * Modal.Header — Displays the title and close button.
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - Modal title or header content.
 * @returns {JSX.Element}
 */
Modal.Header = ({ children }) => {
  const { onClose } = useContext(ModalContext)
  return (
    <div className="flex justify-between items-center p-6 border-b">
      <h3 className="text-xl font-semibold tracking-tight text-gray-800">{children}</h3>
      <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
        <X size={24} />
      </button>
    </div>
  )
}

/**
 * Modal.Body — Main content area inside modal.
 * If `scrollableBody` is enabled in the parent, the body becomes scrollable.
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - Body content.
 * @returns {JSX.Element}
 */
Modal.Body = ({ children }) => {
  const { scrollableBody } = useContext(ModalContext)
  return (
    <div
      className={`text-gray-700 p-6 ${
        scrollableBody ? 'overflow-y-auto max-h-[60vh]' : ''
      }`}
    >
      {children}
    </div>
  )
}

/**
 * Modal.Footer — Footer section for action buttons or additional content.
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - Footer content (usually buttons).
 * @returns {JSX.Element}
 */
Modal.Footer = ({ children }) => {
  return <div className="p-6 border-t bg-gray-50 flex justify-end gap-2 rounded-b-2xl">{children}</div>
}

export { Modal }
