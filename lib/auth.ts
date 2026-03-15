import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';
import crypto from 'crypto';

const SESSION_COOKIE_NAME = 'admin_session';
const SESSION_MAX_AGE = 60 * 60 * 8; // 8 hours

/**
 * Generate a signed session token using HMAC-SHA256.
 * The token contains a timestamp and a signature to prevent forgery.
 */
export function createSessionToken(): string {
    const secret = getSessionSecret();
    const timestamp = Date.now().toString();
    const signature = crypto
        .createHmac('sha256', secret)
        .update(timestamp)
        .digest('hex');
    return `${timestamp}.${signature}`;
}

/**
 * Verify a session token is valid (correctly signed and not expired).
 */
export function verifySessionToken(token: string): boolean {
    try {
        const secret = getSessionSecret();
        const [timestamp, signature] = token.split('.');

        if (!timestamp || !signature) return false;

        // Verify signature
        const expectedSignature = crypto
            .createHmac('sha256', secret)
            .update(timestamp)
            .digest('hex');

        // Use timing-safe comparison to prevent timing attacks
        if (!crypto.timingSafeEqual(Buffer.from(signature, 'hex'), Buffer.from(expectedSignature, 'hex'))) {
            return false;
        }

        // Check expiration
        const tokenAge = (Date.now() - parseInt(timestamp, 10)) / 1000;
        if (tokenAge > SESSION_MAX_AGE) {
            return false;
        }

        return true;
    } catch {
        return false;
    }
}

/**
 * Verify the admin password against the server-side environment variable.
 * Uses timing-safe comparison to prevent timing attacks.
 */
export function verifyPassword(password: string): boolean {
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminPassword) {
        console.error('ADMIN_PASSWORD environment variable is not set!');
        return false;
    }

    // Use timing-safe comparison
    try {
        return crypto.timingSafeEqual(
            Buffer.from(password),
            Buffer.from(adminPassword)
        );
    } catch {
        // Buffers have different lengths, so passwords don't match
        return false;
    }
}

/**
 * Set the session cookie after successful login.
 */
export async function setSessionCookie(): Promise<void> {
    const token = createSessionToken();
    const cookieStore = await cookies();
    cookieStore.set(SESSION_COOKIE_NAME, token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: SESSION_MAX_AGE,
        path: '/',
    });
}

/**
 * Clear the session cookie on logout.
 */
export async function clearSessionCookie(): Promise<void> {
    const cookieStore = await cookies();
    cookieStore.delete(SESSION_COOKIE_NAME);
}

/**
 * Verify the session from a NextRequest (for use in API routes).
 * Reads the cookie directly from the request headers.
 */
export function verifyAuthFromRequest(request: NextRequest): boolean {
    const token = request.cookies.get(SESSION_COOKIE_NAME)?.value;
    if (!token) return false;
    return verifySessionToken(token);
}

/**
 * Verify the session from server-side cookies (for use in Server Components or Route Handlers).
 */
export async function verifyAuthFromCookies(): Promise<boolean> {
    const cookieStore = await cookies();
    const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
    if (!token) return false;
    return verifySessionToken(token);
}

function getSessionSecret(): string {
    const secret = process.env.ADMIN_SESSION_SECRET;
    if (!secret) {
        throw new Error('ADMIN_SESSION_SECRET environment variable is not set!');
    }
    return secret;
}
