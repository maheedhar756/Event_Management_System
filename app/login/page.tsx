import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { CalendarDays } from 'lucide-react';



const LoginPage = () => {
return (
  <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-xl border-slate-200 bg-white/80 backdrop-blur-sm">
        <CardHeader className="space-y-3 pb-6">
          <div className="flex justify-center mb-2">
            <div className="p-3 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl shadow-lg">
              <CalendarDays className="h-8 w-8 text-white" />
            </div>
          </div>
          <CardTitle className="text-3xl font-bold text-center bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Welcome Back
          </CardTitle>
          <CardDescription className="text-center text-slate-600 text-base">
            Enter your credentials to access your account
          </CardDescription>
        </CardHeader>
        <CardContent>
            {/* onSubmit={handleLogin} */}
          <form  className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-slate-700 font-medium">
                Email
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                required
                className="h-11 border-slate-300 focus:border-indigo-500 focus:ring-indigo-500 transition-colors"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-slate-700 font-medium">
                Password
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
                required
                className="h-11 border-slate-300 focus:border-indigo-500 focus:ring-indigo-500 transition-colors"
              />
            </div>

            {/* Show Error */}
            {/* {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm font-medium text-red-600 text-center">{error}</p>
              </div>
            )} */}

            {/* <LoginButton loading={loading} /> */}
            
            <p className="text-center text-sm text-slate-600 pt-2">
              Don&apos;t have an account?{" "}
              <Link 
                href="/register" 
                className="font-semibold text-indigo-600 hover:text-indigo-700 hover:underline transition-colors"
              >
                Sign up
              </Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
)
}

export default LoginPage