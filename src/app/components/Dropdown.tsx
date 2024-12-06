import React, { useState, useRef, useEffect } from "react";

interface DropdownProps {
  label: string;
  options: { value: string | number; label: string }[];
  getSelectedOption?: (value: string | number) => void;
}

export const Dropdown: React.FC<DropdownProps> = ({
  label,
  options,
  getSelectedOption,
}) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | number>("");
  const modalRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setModalOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleModal = (): void => {
    setModalOpen(!isModalOpen);
  };

  const selectOption = (value: string | number): void => {
    setSelectedOption(value);
    if (typeof getSelectedOption === "function") {
      getSelectedOption(value);
    }
    setModalOpen(false);
  };

  return (
    <div className="flex flex-col relative">
      <div className="relative">
        <button
          ref={buttonRef}
          onClick={toggleModal}
          className="appearance-none w-full border border-gray-300 rounded-lg px-4 h-[47px] text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400 flex items-center justify-between relative"
        >
          <span
            className={`absolute left-4 transition-all ${
              selectedOption || isModalOpen
                ? "top-1 text-xs"
                : "top-1/2 transform -translate-y-1/2"
            } text-gray-500 pointer-events-none`}
          >
            {label}
          </span>
          <span
            className={`flex-grow text-left ${
              selectedOption ? "text-gray-700 mt-3" : "text-transparent"
            }`}
          >
            {selectedOption ? selectedOption : label}
          </span>
          <div className="absolute top-2 bottom-2 right-8 w-px bg-gray-300"></div>
          <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </button>

        {isModalOpen && (
          <div
            ref={modalRef}
            className="absolute mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg z-50"
          >
            <ul className="max-h-48 overflow-y-auto">
              {options.map((option) => (
                <li key={option.value}>
                  <button
                    className="w-full text-left px-4 py-2 text-gray-500 hover:bg-gray-300"
                    onClick={() => selectOption(option.value)}
                  >
                    {option.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};
