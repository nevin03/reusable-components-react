import { useState, Fragment, useId, useCallback } from "react";
import { Dialog, DialogTitle, Transition } from "@headlessui/react";
import { X } from "lucide-react";
import PropTypes from "prop-types";

const sizeClasses = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-2xl",
  xl: "max-w-4xl",
};

const colorClasses = {
  white: "bg-white",
  gray: "bg-gray-100",
  red: "bg-red-100",
  blue: "bg-blue-100",
  black: "bg-black text-white",
};

export const useModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const titleId = useId();

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  const ModalUI = ({
    modalTitle,
    children,
    footer,
    size = "md",
    color = "white",
  }) => {
    return (
      <Transition show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-50"
          onClose={close}
          aria-labelledby={modalTitle ? titleId : undefined}
        >
          {/* Backdrop */}
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" />

          {/* Modal Container */}
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <div
              className={`w-full transform rounded-lg shadow-xl transition-all ${colorClasses[color]} ${sizeClasses[size]}`}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b">
                {modalTitle && (
                  <DialogTitle
                    id={titleId}
                    className="text-lg font-semibold text-gray-900"
                  >
                    {modalTitle}
                  </DialogTitle>
                )}
                <button
                  onClick={close}
                  className="text-gray-400 hover:text-gray-600 transition"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Scrollable Body with hidden scrollbar */}
              <div className="p-4 h-full ">{children}</div>

              {/* Footer */}
              {footer && <div className="p-4 border-t">{footer}</div>}
            </div>
          </div>
        </Dialog>
      </Transition>
    );
  };

  ModalUI.propTypes = {
    modalTitle: PropTypes.string,
    children: PropTypes.node.isRequired,
    footer: PropTypes.node,
    size: PropTypes.oneOf(["sm", "md", "lg", "xl"]),
    color: PropTypes.string,
  };

  return { ModalUI, open, close, isOpen };
};
