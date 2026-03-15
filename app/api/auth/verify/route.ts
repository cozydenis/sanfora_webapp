import { NextResponse } from 'next/server';
import { verifyAuthFromCookies } from '@/lib/auth';

export async function GET() {
    const isAuthenticated = await verifyAuthFromCookies();
    return NextResponse.json({ authenticated: isAuthenticated });
}
