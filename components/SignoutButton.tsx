"use client";

import React from 'react'
import { Button } from '@/components/ui/button';
import { signOut } from 'next-auth/react';


const SignoutButton = () => {

    const handleSignOut = async (e: React.MouseEvent) => {
        e.preventDefault();
        try{
            await signOut({ redirect: true, callbackUrl: '/login' });
        }   
        catch(err){
            console.error("Sign out error:", err);
        }
    }

  return (
<>
<Button onClick={handleSignOut}>Sign Out</Button>
</>
  )
}

export default SignoutButton