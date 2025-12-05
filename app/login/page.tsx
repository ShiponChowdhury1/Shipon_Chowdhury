'use client';

import { useState } from 'react';
import { useAuthForm } from '@/hooks/use-auth-form';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { FadeIn, ScaleIn } from '@/components/ui/animations';
import { LogIn, Mail, Lock, Eye, EyeOff } from 'lucide-react';

export default function LoginPage() {
  const { register, handleSubmit, errors, isLoading, error, onLogin } = useAuthForm();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4 sm:p-6 lg:p-8">
      <FadeIn>
        <ScaleIn>
          <Card className="w-full max-w-3xl shadow-2xl border-0 overflow-hidden">
            {/* Header with gradient background */}
            <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 px-12 py-10 text-center">
              <div className="flex justify-center mb-4">
                <div className="p-4 bg-white/20 backdrop-blur-sm rounded-2xl">
                  <LogIn className="text-white" size={40} />
                </div>
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">Welcome Back</h1>
              <p className="text-blue-100 text-base sm:text-lg">Sign in to access your dashboard</p>
            </div>

            <CardContent className="px-12 py-10">
              {error && (
                <div className="bg-red-50 dark:bg-red-900/30 border-2 border-red-300 dark:border-red-700 text-red-700 dark:text-red-400 px-5 py-4 rounded-xl mb-6 text-center font-medium">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit(onLogin)} className="space-y-5">
                {/* Email Field */}
                <div>
                  <label className="block text-base font-semibold text-gray-700 dark:text-gray-300 mb-4">
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                      <Mail className="h-7 w-7 text-gray-400" />
                    </div>
                    <input
                      type="email"
                      {...register('email', { required: 'Email is required' })}
                      className="w-full pl-16 pr-6 py-5 text-lg border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 transition-all duration-200"
                      placeholder="Enter your email"
                      autoComplete="email"
                    />
                  </div>
                  {errors.email && (
                    <p className="text-sm text-red-600 dark:text-red-400 mt-3 ml-1">
                      {errors.email.message as string}
                    </p>
                  )}
                </div>

                {/* Password Field */}
                <div>
                  <label className="block text-base font-semibold text-gray-700 dark:text-gray-300 mb-4">
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                      <Lock className="h-7 w-7 text-gray-400" />
                    </div>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      {...register('password', { required: 'Password is required' })}
                      className="w-full pl-16 pr-14 py-5 text-lg border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 transition-all duration-200"
                      placeholder="Enter your password"
                      autoComplete="current-password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-5 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                    >
                      {showPassword ? (
                        <EyeOff className="h-6 w-6" />
                      ) : (
                        <Eye className="h-6 w-6" />
                      )}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-sm text-red-600 dark:text-red-400 mt-3 ml-1">
                      {errors.password.message as string}
                    </p>
                  )}
                </div>

                <Button 
                  type="submit" 
                  disabled={isLoading} 
                  className="w-full py-6 text-xl font-semibold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 mt-2"
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Signing in...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      <LogIn size={20} />
                      Sign In
                    </span>
                  )}
                </Button>
              </form>

              <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                  <span className="block mb-2 font-medium">Demo Credentials:</span>
                  <span className="font-mono text-xs bg-gray-100 dark:bg-gray-800 px-3 py-2 rounded-lg inline-block">
                    oxshipon1@gmail.com / shipon7878@@
                  </span>
                </p>
              </div>
            </CardContent>
          </Card>
        </ScaleIn>
      </FadeIn>
    </div>
  );
}
