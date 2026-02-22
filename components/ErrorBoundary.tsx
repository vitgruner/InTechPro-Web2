
import React, { Component, ErrorInfo, ReactNode } from 'react';
import { RefreshCw, ShieldAlert } from 'lucide-react';

interface Props {
    children?: ReactNode;
}

interface State {
    hasError: boolean;
    error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false,
        error: null
    };

    public static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error('ErrorBoundary caught an error:', error, errorInfo);
    }

    private handleReset = () => {
        window.location.reload();
    };

    public render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-[60vh] flex items-center justify-center p-6 text-center">
                    <div className="max-w-md w-full bg-white/90 dark:bg-black/90 backdrop-blur-xl border border-red-500/20 rounded-[2rem] p-10 shadow-2xl">
                        <div className="w-16 h-16 bg-red-500/10 rounded-2xl flex items-center justify-center mx-auto mb-6 text-red-500">
                            <ShieldAlert className="w-8 h-8" />
                        </div>
                        <h2 className="text-xl font-black text-gray-900 dark:text-white mb-2 uppercase tracking-tight">Vyskytla se chyba</h2>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-8 font-medium leading-relaxed">
                            Omlouváme se, ale při načítání této sekce došlo k nečekané chybě. Obvykle pomůže opětovné načtení.
                        </p>
                        <button
                            onClick={this.handleReset}
                            className="w-full bg-[#69C350] hover:bg-[#4BA038] text-white px-8 py-4 rounded-xl font-black uppercase tracking-widest text-xs transition-all shadow-lg shadow-[#7BD462]/20 flex items-center justify-center gap-3"
                        >
                            <RefreshCw className="w-4 h-4" /> Obnovit stránku
                        </button>
                        <p className="mt-6 text-[10px] text-gray-400 font-mono opacity-50 overflow-hidden text-ellipsis whitespace-nowrap">
                            {this.state.error?.message}
                        </p>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
