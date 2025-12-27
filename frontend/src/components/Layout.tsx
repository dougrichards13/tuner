import { Link, useLocation } from "react-router-dom";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    { path: "/", label: "Chat", icon: "💬" },
    { path: "/projects", label: "Projects", icon: "📁" },
    { path: "/agents", label: "Agents", icon: "🤖" },
  ];

  return (
    <div className="flex h-screen bg-slate-900">
      {/* Sidebar */}
      <div className="w-64 bg-slate-950 border-r border-slate-800/50 flex flex-col">
        {/* Logo/Branding */}
        <div className="p-6 border-b border-slate-800/50">
          <h1 className="text-2xl font-bold text-slate-100 tracking-tight">NeuroLine</h1>
          <p className="text-xs text-blue-400/80 mt-1.5 font-medium">AI Accelerator</p>
          <p className="text-xs text-slate-500 mt-0.5">Smart Factory</p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <ul className="space-y-1">
            {navItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
                    isActive(item.path)
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                      : "text-slate-400 hover:bg-slate-800/50 hover:text-slate-200"
                  }`}
                >
                  <span className="text-lg">{item.icon}</span>
                  <span className="font-medium text-sm">{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800/50">
          <div className="text-xs text-slate-500 space-y-1">
            <p className="font-medium text-slate-400">Doug Richards</p>
            <p>Smart Factory © 2025</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden bg-slate-900">{children}</div>
    </div>
  );
};
