import {
  isAudio,
  isImage,
  isPDF,
  isPreviewable,
  isTxt,
  isVideo,
} from "@/helpers";
import { Dialog, Transition } from "@headlessui/react";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import { Fragment, useEffect, useMemo, useState } from "react";

export const AttachmentPreviewModal = ({
  attachments,
  index,
  show = false,
  onClose = () => {},
}) => {
  const [currentIndex, setCurrentIndex] = useState(index);

  const previewableAttachments = useMemo(() => {
    return attachments.filter((att) => isPreviewable(att));
  }, [attachments]);

  const attachment = useMemo(() => {
    return previewableAttachments[currentIndex];
  }, [attachments, currentIndex]);

  const close = () => {
    onClose();
  };

  const prev = () => {
    if (currentIndex === 0) return;
    setCurrentIndex(currentIndex - 1);
  };

  const next = () => {
    if (currentIndex === previewableAttachments.length - 1) return;
    setCurrentIndex(currentIndex + 1);
  };

  useEffect(() => {
    setCurrentIndex(index);
  }, [index]);

  return (
    <Transition show={show} as={Fragment} leave="duration-200">
      <Dialog as="div" id="modal" className="relative z-50" onClose={close}>
        <Transition.Child
          as={Fragment}
          enter="duration-300 ease-out"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="duration-200 ease-in"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/25"></div>
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="h-screen w-screen">
            <Transition.Child
              as={Fragment}
              enter="duration-300 ease-out"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="duration-200 ease-in"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="flex flex-col w-full h-full transform overflow-hidden bg-slate-800 text-left align-middle shadow-xl transition-all">
                <button
                  onClick={close}
                  className="absolute right-3 top-3 w-10 h-10 rounded-full hover:bg-black/10 transition flex items-center justify-center text-slate-500 z-40"
                >
                  <XMarkIcon className="w-6 h-6" />
                </button>
                <div className="relative group h-full">
                  {currentIndex > 0 && (
                    <div
                      onClick={prev}
                      className="absolute opacity-100 text-gray-100 cursor-pointer flex items-center justify-center w-16 h-16 left-4 top-1/2 -translate-y-1/2 rounded-full bg-black/50 z-30"
                    >
                      <ChevronLeftIcon className="w-12" />
                    </div>
                  )}
                  {currentIndex < previewableAttachments.length - 1 && (
                    <div
                      onClick={next}
                      className="absolute opacity-100 text-gray-100 cursor-pointer flex items-center justify-center w-16 h-16 right-4 top-1/2 -translate-y-1/2 rounded-full bg-black/50 z-30"
                    >
                      <ChevronRightIcon className="w-12" />
                    </div>
                  )}
                  {attachment && (
                    <div className="flex items-center justify-center w-full h-full p-3">
                      {isImage(attachment) && (
                        <img
                          src={attachment.url}
                          className="max-w-full max-h-full object-contain"
                          alt={attachment.name}
                        />
                      )}
                      {isVideo(attachment) && (
                        <div className="flex items-center">
                          <video src={attachment.url} controls autoPlay></video>
                        </div>
                      )}
                      {isAudio(attachment) && (
                        <div className="relative flex items-center justify-center">
                          <audio src={attachment.url} controls autoPlay></audio>
                        </div>
                      )}
                      {isPDF(attachment) && (
                        <iframe
                          src={attachment.url}
                          className="w-full h-full"
                        ></iframe>
                      )}
                      {isTxt(attachment) && (
                        <iframe
                          src={attachment.url}
                          className="w-full h-full"
                        ></iframe>
                      )}
                      {!isPreviewable(attachment) && (
                        <div className="p-32 flex flex-col justify-center items-center text-gray-100">
                          <PaperClipIcon className="w-10 h-10 mb-3" />

                          <small className="text-center">
                            {attachment.name}
                          </small>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};
