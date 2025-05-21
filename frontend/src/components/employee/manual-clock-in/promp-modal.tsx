import { motion, AnimatePresence } from 'framer-motion';
import { Check } from 'lucide-react';

interface PromptModalProps {
    isOpen: boolean;
    onClose: () => void;
    message: string;
}

export function PromptModal({ isOpen, onClose, message }: PromptModalProps) {
    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/30 z-50"
                        onClick={onClose}
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50"
                    >
                        <div className="bg-white rounded-lg shadow-xl overflow-hidden min-w-[320px]">
                            {/* Success Icon */}
                            <div className="bg-green-50 p-4 flex justify-center">
                                <div className="bg-green-100 rounded-full p-2">
                                    <Check className="w-6 h-6 text-green-600" />
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-6 text-center">
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                    Success!
                                </h3>
                                <p className="text-gray-600">
                                    {message}
                                </p>
                            </div>

                            {/* Action Button */}
                            <div className="border-t px-6 py-4 bg-gray-50">
                                <button
                                    onClick={onClose}
                                    className="w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                                >
                                    OK
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}