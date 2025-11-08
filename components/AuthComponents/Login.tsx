"use client";

import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { CalendarDays, Loader2 } from 'lucide-react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';


function LoginButton({ loading }: { loading: boolean }) {
  return (
    <Button 
      type="submit" 
      className="w-full cursor-pointer bg-linear-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold shadow-md hover:shadow-lg transition-all duration-300" 
      disabled={loading}
    >
      {loading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Signing In...
        </>
      ) : (
        "Sign In"
      )}
    </Button>
  );
}


const Login = () => {

    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState<string | null>(null);

    const router = useRouter();


    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try{
    const formData  = new FormData(e.currentTarget);

       if(!formData.get('email') || !formData.get('password')){
            alert("All fields are required");
            return;
     }

     setLoading(true);

     const res = await signIn('credentials', {
        redirect: false,
        email: formData.get('email'),
        password: formData.get('password'),
     });

    if(res?.ok){
        alert("Login successful");
        router.push('/');
     }
     else if(res?.error){
        // alert(res?.error);
        setError(res?.error);
     }
        }
        catch(err){
            console.error("Login error:", err);
            setError("An unexpected error occurred. Please try again.");
        }
        finally{
            setLoading(false);
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
            Welcome Back
          </CardTitle>
          <CardDescription className="text-center text-slate-600 text-base">
            Enter your credentials to access your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-5">
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
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm font-medium text-red-600 text-center">{error}</p>
              </div>
            )}

            <LoginButton loading={loading} />
            
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

export default Login