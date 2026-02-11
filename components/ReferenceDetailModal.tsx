import React, { useState, useEffect, useRef } from 'react';
import { Reference } from '../types';
import {
    X, ChevronLeft, ChevronRight, MapPin, Zap, Thermometer, Radio, Shield, Sun, Building, Activity,
    Share2, Ruler, Server, Snowflake, Wind, Blinds, DoorOpen, Lightbulb, Camera, Flame, Car, Droplets, Cpu, Factory, Home
} from 'lucide-react';

interface ReferenceDetailModalProps {
    reference: Reference | null;
    isOpen: boolean;
    onClose: () => void;
}

const IconMap: { [key: string]: any } = {
    zap: Lightbulb,
    thermometer: Thermometer,
    radio: Radio,
    shield: Shield,
    sun: Sun,
    building: Building,
    activity: Activity,
    cpu: Cpu,
    factory: Factory,
    home: Home,
    snowflake: Snowflake,
    wind: Wind,
    blinds: Blinds,
    dooropen: DoorOpen,
    lightbulb: Lightbulb,
    camera: Camera,
    flame: Flame,
    car: Car,
    droplets: Droplets,
    server: Server,
};

const ReferenceDetailModal: React.FC<ReferenceDetailModalProps> = ({ reference, isOpen, onClose }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [touchStart, setTouchStart] = useState(0);
    const [touchEnd, setTouchEnd] = useState(0);
    const [imageLoaded, setImageLoaded] = useState(false);
    const closeButtonRef = useRef<HTMLButtonElement>(null);
    const previousFocusRef = useRef<HTMLElement | null>(null);

    // Lock body scroll when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            // Store current focus and focus close button
            previousFocusRef.current = document.activeElement as HTMLElement;
            setTimeout(() => closeButtonRef.current?.focus(), 100);
        } else {
            document.body.style.overflow = '';
            // Return focus to previous element
            previousFocusRef.current?.focus();
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    // Reset image index and loading state when reference changes
    useEffect(() => {
        setCurrentImageIndex(0);
        setImageLoaded(false);
    }, [reference]);

    // Reset loading state when image changes
    useEffect(() => {
        setImageLoaded(false);
    }, [currentImageIndex]);

    // Keyboard navigation handler
    useEffect(() => {
        const handleKeyboard = (e: KeyboardEvent) => {
            if (!isOpen || !reference) return;

            const imageArray = (reference.images && reference.images.length > 0)
                ? reference.images
                : (reference.image ? [reference.image] : []);
            const hasMultiple = imageArray.length > 1;

            if (e.key === 'Escape') {
                onClose();
            } else if (e.key === 'ArrowLeft' && hasMultiple) {
                setCurrentImageIndex((prev) => (prev - 1 + imageArray.length) % imageArray.length);
            } else if (e.key === 'ArrowRight' && hasMultiple) {
                setCurrentImageIndex((prev) => (prev + 1) % imageArray.length);
            }
        };
        window.addEventListener('keydown', handleKeyboard);
        return () => window.removeEventListener('keydown', handleKeyboard);
    }, [isOpen, onClose, reference]);

    if (!isOpen || !reference) return null;

    const imageArray = (reference.images && reference.images.length > 0)
        ? reference.images
        : (reference.image ? [reference.image] : []);

    const displayImage = imageArray[currentImageIndex] || imageArray[0];
    const hasMultipleImages = imageArray.length > 1;

    const displayTechs = reference.technologies && reference.technologies.length > 0
        ? reference.technologies
        : reference.services || [];

    const nextImage = () => {
        setCurrentImageIndex((prev) => (prev + 1) % imageArray.length);
    };

    const prevImage = () => {
        setCurrentImageIndex((prev) => (prev - 1 + imageArray.length) % imageArray.length);
    };

    // Touch handlers for swipe
    const handleTouchStart = (e: React.TouchEvent) => {
        setTouchStart(e.targetTouches[0].clientX);
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        setTouchEnd(e.targetTouches[0].clientX);
    };

    const handleTouchEnd = () => {
        if (!touchStart || !touchEnd) return;

        const distance = touchStart - touchEnd;
        const isLeftSwipe = distance > 50;
        const isRightSwipe = distance < -50;

        if (isLeftSwipe && hasMultipleImages) {
            nextImage();
        }
        if (isRightSwipe && hasMultipleImages) {
            prevImage();
        }

        setTouchStart(0);
        setTouchEnd(0);
    };

    // Handle backdrop click
    const handleBackdropClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-black/70 backdrop-blur-md animate-in fade-in duration-300"
            onClick={handleBackdropClick}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
        >
            <div className="relative w-full max-w-4xl max-h-[90vh] bg-white dark:bg-[#0a0a0a] rounded-t-3xl md:rounded-3xl shadow-2xl overflow-hidden animate-in slide-in-from-bottom md:fade-in duration-300">

                {/* Mobile swipe handle */}
                <div className="md:hidden flex justify-center pt-3 pb-2">
                    <div className="w-12 h-1.5 bg-gray-300 dark:bg-gray-700 rounded-full" />
                </div>

                {/* Close button */}
                <button
                    ref={closeButtonRef}
                    onClick={onClose}
                    className="absolute top-4 right-4 z-10 p-2 bg-black/60 hover:bg-black/80 text-white rounded-full transition-all shadow-lg"
                    aria-label="Close modal"
                >
                    <X className="w-5 h-5" />
                </button>

                {/* Scrollable content */}
                <div className="overflow-y-auto max-h-[90vh] pb-6">

                    {/* Image Gallery */}
                    <div
                        className="relative h-48 md:h-60 bg-gray-100 dark:bg-gray-900"
                        onTouchStart={handleTouchStart}
                        onTouchMove={handleTouchMove}
                        onTouchEnd={handleTouchEnd}
                    >
                        {/* Loading spinner */}
                        {!imageLoaded && (
                            <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-900">
                                <div className="w-10 h-10 border-4 border-[#69C350]/30 border-t-[#69C350] rounded-full animate-spin"></div>
                            </div>
                        )}

                        <img
                            src={displayImage || "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1200"}
                            alt={reference.title}
                            className={`w-full h-full object-cover transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
                            onLoad={() => setImageLoaded(true)}
                            onError={(e) => {
                                setImageLoaded(true);
                                e.currentTarget.src = "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1200";
                            }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                        {/* Image navigation */}
                        {hasMultipleImages && (
                            <>
                                <button
                                    onClick={prevImage}
                                    className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-black/60 hover:bg-black/80 text-white rounded-full transition-all shadow-lg"
                                    aria-label="Previous image"
                                >
                                    <ChevronLeft className="w-5 h-5" />
                                </button>
                                <button
                                    onClick={nextImage}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-black/60 hover:bg-black/80 text-white rounded-full transition-all shadow-lg"
                                    aria-label="Next image"
                                >
                                    <ChevronRight className="w-5 h-5" />
                                </button>

                                {/* Image counter */}
                                <div
                                    className="absolute bottom-4 left-4 bg-black/70 backdrop-blur-sm px-3 py-1.5 rounded-lg"
                                    aria-live="polite"
                                    aria-atomic="true"
                                >
                                    <span className="text-sm font-bold text-white">{currentImageIndex + 1}/{imageArray.length}</span>
                                </div>
                            </>
                        )}

                        {/* Tech badge */}
                        <div className="absolute top-4 left-4 bg-white/90 dark:bg-black/80 backdrop-blur-xl border border-black/10 dark:border-white/20 px-4 py-2 rounded-xl flex items-center gap-2 shadow-xl">
                            <Cpu className="w-4 h-4 text-[#69C350] dark:text-[#95E87D]" aria-hidden="true" />
                            <span className="text-xs font-black text-gray-900 dark:text-white uppercase tracking-wider">{reference.tech}</span>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="p-4 md:p-5 space-y-3">

                        {/* Location & Title */}
                        <div>
                            <div className="flex items-center gap-2 mb-1">
                                <MapPin className="w-3 h-3 text-[#69C350] dark:text-[#7BD462]" />
                                <span className="text-[10px] font-black text-[#69C350] dark:text-[#7BD462] uppercase tracking-wider">{reference.location}</span>
                            </div>
                            <h2 id="modal-title" className="text-2xl md:text-3xl font-black text-gray-900 dark:text-white tracking-tight leading-tight">
                                {reference.title}
                            </h2>
                        </div>

                        {/* Description */}
                        {reference.description && (
                            <div>
                                <h3 className="text-[10px] font-black text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1.5">Popis projektu</h3>
                                <p className="text-sm text-gray-700 dark:text-gray-300 leading-snug">
                                    {reference.description}
                                </p>
                            </div>
                        )}

                        {/* Technologies */}
                        {displayTechs && displayTechs.length > 0 && (
                            <div>
                                <h3 className="text-[10px] font-black text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1.5">Integrované technologie</h3>
                                <div className="flex flex-wrap gap-1.5 items-start">
                                    {displayTechs.map((tech, idx) => {
                                        const tIconKey = (tech.icon as string)?.toLowerCase();
                                        const TechIcon = IconMap[tIconKey] || Zap;
                                        return (
                                            <div key={idx} className="flex items-start gap-1.5 bg-black/5 dark:bg-white/5 px-2.5 py-1.5 rounded-lg border border-black/5 dark:border-white/5">
                                                <TechIcon className="w-3 h-3 text-[#69C350] dark:text-[#95E87D]" aria-hidden="true" />
                                                <span className="text-xs font-bold text-gray-700 dark:text-gray-300">{tech.label}</span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}

                        {/* Topology */}
                        {reference.topology && (
                            <div>
                                <h3 className="text-[9px] font-black text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">Topologie projektu</h3>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-1.5">
                                    {reference.topology.sensors && (
                                        <div className="bg-gradient-to-br from-[#69C350]/10 to-transparent p-1.5 rounded-md border border-[#69C350]/20 flex items-center justify-between">
                                            <div className="flex items-center gap-1">
                                                <Activity className="w-2.5 h-2.5 text-[#69C350]" />
                                                <span className="text-[8px] font-bold text-gray-500 dark:text-gray-400 uppercase">Senzory</span>
                                            </div>
                                            <p className="text-sm font-bold text-gray-900 dark:text-white">{reference.topology.sensors}</p>
                                        </div>
                                    )}
                                    {reference.topology.cablingKm && (
                                        <div className="bg-gradient-to-br from-[#69C350]/10 to-transparent p-1.5 rounded-md border border-[#69C350]/20 flex items-center justify-between">
                                            <div className="flex items-center gap-1">
                                                <Share2 className="w-2.5 h-2.5 text-[#69C350]" />
                                                <span className="text-[8px] font-bold text-gray-500 dark:text-gray-400 uppercase">Kabeláž</span>
                                            </div>
                                            <p className="text-sm font-bold text-gray-900 dark:text-white">{reference.topology.cablingKm} km</p>
                                        </div>
                                    )}
                                    {reference.topology.modules && (
                                        <div className="bg-gradient-to-br from-[#69C350]/10 to-transparent p-1.5 rounded-md border border-[#69C350]/20 flex items-center justify-between">
                                            <div className="flex items-center gap-1">
                                                <Server className="w-2.5 h-2.5 text-[#69C350]" />
                                                <span className="text-[8px] font-bold text-gray-500 dark:text-gray-400 uppercase">Moduly</span>
                                            </div>
                                            <p className="text-sm font-bold text-gray-900 dark:text-white">{reference.topology.modules}</p>
                                        </div>
                                    )}
                                    {reference.topology.racks && (
                                        <div className="bg-gradient-to-br from-[#69C350]/10 to-transparent p-1.5 rounded-md border border-[#69C350]/20 flex items-center justify-between">
                                            <div className="flex items-center gap-1">
                                                <Ruler className="w-2.5 h-2.5 text-[#69C350]" />
                                                <span className="text-[8px] font-bold text-gray-500 dark:text-gray-400 uppercase">Pole</span>
                                            </div>
                                            <p className="text-sm font-bold text-gray-900 dark:text-white">{reference.topology.racks}</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReferenceDetailModal;
