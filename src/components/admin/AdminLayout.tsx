
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Users, 
  FileText, 
  Home, 
  Settings,
  Menu,
  X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '../../contexts/AuthContext';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const location = useLocation();
  const { admin } = useAuth();
  const [open, setOpen] = React.useState(false);

  const navigation = [
    { name: 'Dashboard', href: '/admin', icon: Home },
    { name: 'Attorneys', href: '/admin/attorneys', icon: Users },
    { name: 'Blog', href: '/admin/blog', icon: FileText },
    { name: 'Settings', href: '/admin/settings', icon: Settings },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Mobile sidebar */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="md:hidden fixed top-4 left-4 z-50"
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0 w-60">
          <aside className="h-full bg-white border-r">
            <div className="p-6 border-b">
              <Link to="/admin" className="flex items-center">
                <span className="text-2xl font-playfair font-bold">
                  <span className="text-law-charcoal">Sleek</span>
                  <span className="text-law-gold">Legal</span>
                </span>
              </Link>
            </div>
            <nav className="space-y-1 py-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setOpen(false)}
                  className={`group flex items-center px-6 py-3 font-medium ${
                    location.pathname === item.href
                      ? 'bg-gray-100 text-law-gold'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-law-gold'
                  }`}
                >
                  <item.icon
                    className={`mr-3 h-5 w-5 flex-shrink-0 ${
                      location.pathname === item.href
                        ? 'text-law-gold'
                        : 'text-gray-500 group-hover:text-law-gold'
                    }`}
                    aria-hidden="true"
                  />
                  {item.name}
                </Link>
              ))}
            </nav>
          </aside>
        </SheetContent>
      </Sheet>

      {/* Desktop sidebar */}
      <aside className="hidden md:flex md:w-64 md:flex-col">
        <div className="flex min-h-0 flex-1 flex-col border-r border-gray-200 bg-white">
          <div className="flex flex-1 flex-col overflow-y-auto pt-5 pb-4">
            <div className="flex flex-shrink-0 items-center px-4 mb-6">
              <Link to="/admin" className="flex items-center">
                <span className="text-2xl font-playfair font-bold">
                  <span className="text-law-charcoal">Sleek</span>
                  <span className="text-law-gold">Legal</span>
                </span>
              </Link>
            </div>
            <nav className="mt-5 flex-1 space-y-1 bg-white px-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`group flex items-center rounded-md px-4 py-3 ${
                    location.pathname === item.href
                      ? 'bg-gray-100 text-law-gold'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-law-gold'
                  }`}
                >
                  <item.icon
                    className={`mr-3 h-5 w-5 flex-shrink-0 ${
                      location.pathname === item.href
                        ? 'text-law-gold'
                        : 'text-gray-500 group-hover:text-law-gold'
                    }`}
                    aria-hidden="true"
                  />
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex flex-shrink-0 border-t border-gray-200 p-4">
            <div className="flex items-center">
              <div>
                <div className="text-sm font-medium text-gray-700">
                  {admin?.name || 'Admin User'}
                </div>
                <div className="text-xs font-medium text-gray-500">
                  {admin?.role || 'Administrator'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto p-6">
        <div className="mx-auto max-w-7xl">
          {children}
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
