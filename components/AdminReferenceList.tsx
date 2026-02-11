
import React from 'react';
import { Edit2, Trash2, MapPin, Tag, Cpu } from 'lucide-react';
import { Reference } from '../types';

interface AdminReferenceListProps {
    references: Reference[];
    onEdit: (ref: Reference) => void;
    onDelete: (id: string) => void;
}

const AdminReferenceList: React.FC<AdminReferenceListProps> = ({ references, onEdit, onDelete }) => {
    if (references.length === 0) {
        return (
            <div className="text-center py-20 glass-panel rounded-[2rem] border-dashed border-2 border-black/5 dark:border-white/5">
                <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">Zatím nebyly nalezeny žádné projekty v databázi.</p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between px-6 mb-2">
                <h2 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em]">Existující projekty ({references.length})</h2>
            </div>

            <div className="grid gap-4">
                {references.map((ref) => (
                    <div
                        key={ref.id || ref.title}
                        className="glass-panel p-4 sm:p-5 rounded-[2rem] border border-black/5 dark:border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 group hover:border-[#69C350]/30 transition-all duration-500"
                    >
                        <div className="flex items-center gap-4 sm:gap-6">
                            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl overflow-hidden flex-shrink-0 border border-black/5 dark:border-white/10 shadow-inner">
                                <img src={(ref.images && ref.images.length > 0) ? ref.images[0] : ref.image} alt={ref.title} className="w-full h-full object-cover" />
                            </div>

                            <div className="space-y-1 min-w-0">
                                <h3 className="font-black text-gray-900 dark:text-white uppercase tracking-tight truncate pr-4">{ref.title}</h3>
                                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[8px] sm:text-[9px] font-bold text-gray-400 uppercase tracking-widest">
                                    <span className="flex items-center gap-1 whitespace-nowrap"><Tag className="w-3 h-3 text-[#69C350]" /> {ref.category}</span>
                                    <span className="flex items-center gap-1 whitespace-nowrap"><MapPin className="w-3 h-3 text-[#69C350]" /> {ref.location}</span>
                                    <span className="flex items-center gap-1 whitespace-nowrap"><Cpu className="w-3 h-3 text-[#69C350]" /> {ref.tech}</span>
                                    {ref.technologies && ref.technologies.length > 0 && (
                                        <span className="flex items-center gap-1 whitespace-nowrap text-blue-500">
                                            {ref.technologies.length} technologií
                                        </span>
                                    )}
                                    {ref.images && ref.images.length > 1 && (
                                        <span className="flex items-center gap-1 whitespace-nowrap text-purple-500">
                                            {ref.images.length} fotek
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center justify-end gap-2 pt-2 sm:pt-0 border-t sm:border-t-0 border-black/5 dark:border-white/5">
                            <button
                                onClick={() => onEdit(ref)}
                                className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-3 sm:p-3 bg-blue-500/10 text-blue-500 rounded-2xl hover:bg-blue-500 hover:text-white transition-all shadow-sm group/btn"
                                title="Upravit"
                            >
                                <Edit2 className="w-4 h-4" />
                                <span className="sm:hidden text-[9px] font-black uppercase tracking-widest">Upravit</span>
                            </button>
                            <button
                                onClick={() => ref.id && onDelete(ref.id)}
                                className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-3 sm:p-3 bg-red-500/10 text-red-500 rounded-2xl hover:bg-red-500 hover:text-white transition-all shadow-sm"
                                title="Smazat"
                            >
                                <Trash2 className="w-4 h-4" />
                                <span className="sm:hidden text-[9px] font-black uppercase tracking-widest">Smazat</span>
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminReferenceList;
