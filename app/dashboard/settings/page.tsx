import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { User } from 'lucide-react';

export default async function SettingsPage() {
  const session = await getServerSession(authOptions);

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Settings</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">Manage your account settings</p>
      </div>

      <Card>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4 pb-4 border-b border-gray-200 dark:border-gray-700">
            <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full">
              <User className="text-blue-600 dark:text-blue-400" size={24} />
            </div>
            <div>
              <h2 className="font-bold text-gray-900 dark:text-white">{session?.user?.name}</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">{session?.user?.email}</p>
            </div>
          </div>

          <div className="space-y-4">
            <Input
              label="Name"
              defaultValue={session?.user?.name}
              placeholder="Your name"
            />

            <Input
              label="Email"
              type="email"
              defaultValue={session?.user?.email}
              placeholder="your.email@example.com"
              disabled
            />

            <div className="pt-4">
              <Button>Save Changes</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <h3 className="font-bold text-gray-900 dark:text-white mb-2">Change Password</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            Update your password to keep your account secure
          </p>
          <div className="space-y-4">
            <Input label="Current Password" type="password" />
            <Input label="New Password" type="password" />
            <Input label="Confirm New Password" type="password" />
            <Button>Update Password</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
