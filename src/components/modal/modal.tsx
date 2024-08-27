import { Plus, XIcon } from "lucide-react";
import useOpenModal from "@/hooks/useOpenModal";

interface ModalProps {
  children: React.ReactNode;
  title: string;
}

export function Modal({ children, title }: ModalProps) {
  const { open, toggleModal } = useOpenModal();

  return (
    <>
      <div className="flex items-center gap-4 mt-4">
        <button
          onClick={() => toggleModal()}
          className="flex items-center gap-2 bg-zinc-900 text-white px-4 py-2 rounded-md hover:bg-zinc-800"
        >
          <Plus size={24} />
          <span>{title}</span>
        </button>
      </div>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center w-full h-full max-h-full overflow-y-auto bg-black bg-opacity-50"
          onClick={() => toggleModal()}
        >
          <div
            className={`relative w-full max-w-md max-h-full p-4 transform transition-transform duration-300 ease-out scale-95 ${
              open ? "scale-100" : "scale-95"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Content */}
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700 transition-opacity duration-300 ease-out">
              {/* Modal Header */}
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {title}
                </h3>
                <button
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  onClick={() => toggleModal()}
                >
                  <XIcon size={24} />
                </button>
              </div>
              {children}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
