'use client';

import { useSession, signOut } from 'next-auth/react';
import { LogOut } from 'lucide-react';
import { useState } from 'react';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalTitle,
  ModalDescription,
  ModalBody,
  ModalFooter,
} from '@/components/ui/modal';
import { Button } from '@/components/ui/button';

export function DashboardHeader() {
  const { data: session } = useSession();
  const [showMenu, setShowMenu] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogout = () => {
    signOut({ callbackUrl: '/login' });
    setShowLogoutModal(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 lg:left-64 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-4 sm:px-6 lg:px-8 py-3 lg:py-4 z-30">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">Welcome back!</h1>
          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 hidden sm:block">Manage your portfolio</p>
        </div>

        {/* Theme Toggle & Profile Menu */}
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <div className="relative">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
              {session?.user?.name?.charAt(0).toUpperCase()}
            </div>
            <div className="text-left hidden sm:block">
              <p className="text-sm font-medium text-gray-900 dark:text-white">{session?.user?.name}</p>
              <p className="text-xs text-gray-600 dark:text-gray-400">{session?.user?.email}</p>
            </div>
          </button>

          {/* Dropdown Menu */}
          {showMenu && (
            <div className="absolute right-0 top-full mt-2 w-64 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-2 z-50">
              <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                <p className="text-sm font-medium text-gray-900 dark:text-white">{session?.user?.name}</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">{session?.user?.email}</p>
                <p className="text-xs text-blue-600 dark:text-blue-400 mt-1 capitalize">
                  {session?.user?.role || 'Admin'}
                </p>
              </div>
              <div className="p-2">
                <button
                  onClick={() => {
                    setShowLogoutModal(true);
                    setShowMenu(false);
                  }}
                  className="w-full flex items-center gap-3 px-3 py-2 text-left text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                >
                  <LogOut size={18} />
                  <span className="text-sm font-medium">Logout</span>
                </button>
              </div>
            </div>
          )}
          </div>
        </div>
      </div>

      {/* Logout Confirmation Modal */}
      <Modal open={showLogoutModal} onOpenChange={setShowLogoutModal}>
        <ModalContent>
          <ModalHeader>
            <ModalTitle>Confirm Logout</ModalTitle>
            <ModalDescription>Are you sure you want to logout?</ModalDescription>
          </ModalHeader>
          <ModalBody>
            <p className="text-gray-600 dark:text-gray-400">
              You will be redirected to the login page and will need to sign in again to access
              the dashboard.
            </p>
          </ModalBody>
          <ModalFooter>
            <Button variant="outline" onClick={() => setShowLogoutModal(false)}>
              Cancel
            </Button>
            <Button variant="danger" onClick={handleLogout}>
              Yes, Logout
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </header>
  );
}
