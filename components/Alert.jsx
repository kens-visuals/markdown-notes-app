import { Transition } from '@headlessui/react';

export default function Alert({ alertMessage, isSaving }) {
  return (
    <Transition
      show={isSaving}
      enter="transition-opacity duration-150"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity duration-150"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div
        className="absolute bottom-4 left-1/2 z-50 mb-4 flex w-full max-w-xs -translate-x-1/2 items-center rounded-lg bg-primary-800 p-4 text-secondary-300 shadow transition-all duration-300"
        role="alert"
      >
        <div className="inline-flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-orange-primary text-tertiary-200">
          <svg
            aria-hidden="true"
            className="h-5 w-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
          <span className="sr-only">Check icon</span>
        </div>
        <div className="ml-3 text-sm font-normal">{alertMessage}</div>
      </div>
    </Transition>
  );
}
