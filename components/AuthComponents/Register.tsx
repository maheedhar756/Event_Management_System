"use client";

import React from 'react';
import {Card, CardHeader, CardContent, CardTitle, CardDescription} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { CalendarDays } from 'lucide-react';

const Register = () => {

const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try{
        const formData  = new FormData(e.currentTarget);

        if(!formData.get('username') || !formData.get('email') || !formData.get('password')){
            alert("All fields are required");
            return;
        }

        const res = await fetch('/api/auth/register', {
            method: 'POST',
            body: JSON.stringify({
                username: formData.get('username'),
                email: formData.get('email'),
                password: formData.get('password'),
            })
        })

    const data = await res.json();

    alert(data.message || data.error);

    }
    catch(err){
        console.error("Registration error:", err);
    }
}


return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-xl border-slate-200 bg-white/80 backdrop-blur-sm">
        <CardHeader className="space-y-3 pb-6">
          <div className="flex justify-center mb-2">
            <div className="p-3 bg-linear-to-br from-indigo-500 to-purple-600 rounded-2xl shadow-lg">
              <CalendarDays className="h-8 w-8 text-white" />
            </div>
          </div>
          <CardTitle className="text-3xl font-bold text-center bg-linear-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Create Account
          </CardTitle>
          <CardDescription className="text-center text-slate-600 text-base">
            Sign up to start organizing events
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleRegister} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="username" className="text-slate-700 font-medium">
                Username
              </Label>
              <Input
                id="username"
                name="username"
                type="text"
                placeholder="johndoe"
                required
                className="h-11 border-slate-300 focus:border-indigo-500 focus:ring-indigo-500 transition-colors"
              />
            </div>
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
            <Button 
              type="submit" 
              className="w-full h-11 bg-linear-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold shadow-md hover:shadow-lg transition-all duration-300"
            >
              Sign Up
            </Button>
            <p className="text-center text-sm text-slate-600 pt-2">
              Already have an account?{' '}
              <Link 
                href="/login" 
                className="font-semibold text-indigo-600 hover:text-indigo-700 hover:underline transition-colors"
              >
                Sign in
              </Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default Register