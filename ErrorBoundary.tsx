import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Flame } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('InstaGrow Pro Uncaught Error:', error, errorInfo);
  }

  private handleReload = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#0a0d14] text-slate-100 flex flex-col items-center justify-center p-6 text-center" dir="rtl">
          <div className="max-w-md w-full rounded-3xl border border-white/10 bg-slate-900/90 p-8 shadow-2xl space-y-5 backdrop-blur-xl">
            <div className="flex justify-center">
              <div className="h-16 w-16 rounded-2xl bg-gradient-to-tr from-amber-500 via-rose-500 to-pink-600 flex items-center justify-center shadow-lg shadow-pink-500/30">
                <Flame className="h-8 w-8 text-white" />
              </div>
            </div>

            <div className="space-y-2">
              <h2 className="text-xl font-bold text-white">
                حدث استئناف في الواجهة
              </h2>
              <p className="text-xs text-slate-400 leading-relaxed">
                تم تدارك التحديث في الواجهة لمنع ظهور الشاشة البيضاء. يمكنك إعادة تحميل الصفحة للمتابعة فوراً.
              </p>
            </div>

            {this.state.error && (
              <div className="p-3 rounded-xl bg-black/50 border border-white/5 text-[11px] font-mono text-rose-400 text-start overflow-x-auto max-h-24">
                {this.state.error.message || String(this.state.error)}
              </div>
            )}

            <button
              onClick={this.handleReload}
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-pink-500 via-rose-500 to-amber-500 hover:from-pink-600 hover:to-amber-600 text-white font-bold text-sm shadow-lg shadow-pink-500/20 transition flex items-center justify-center gap-2"
            >
              <RefreshCw className="h-4 w-4" />
              <span>إعادة تحميل التطبيق</span>
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
