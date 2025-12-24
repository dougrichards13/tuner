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
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-gray-900 text-white flex flex-col">
        {/* Logo/Branding */}
        <div className="p-6 border-b border-gray-700">
          <h1 className="text-2xl font-bold">NeuroLine</h1>
          <p className="text-xs text-gray-400 mt-1">AI Accelerator</p>
          <p className="text-xs text-gray-500">by Smart Factory</p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive(item.path)
                      ? "bg-blue-600 text-white"
                      : "text-gray-300 hover:bg-gray-800 hover:text-white"
                  }`}
                >
                  <span className="text-xl">{item.icon}</span>
                  <span className="font-medium">{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-gray-700 text-xs text-gray-400">
          <p>Contact: Doug Richards</p>
          <p className="mt-1">Smart Factory © 2025</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden">{children}</div>
    </div>
  );
};
