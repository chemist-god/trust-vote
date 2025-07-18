import { NextResponse } from 'next/server';

const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:5000';

export async function GET() {
    try {
        const response = await fetch(`${BACKEND_URL}/api/elections`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            throw new Error('Failed to fetch elections from backend');
        }
        const data = await response.json();
        return NextResponse.json(data);
    } catch (error: any) {
        console.error('Error fetching elections:', error);
        return NextResponse.json(
            { error: 'Failed to fetch elections' },
            { status: 500 }
        );
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        if (!body.name || !body.description || !body.startDate || !body.endDate) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }
        const response = await fetch(`${BACKEND_URL}/api/elections`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to create election');
        }
        const data = await response.json();
        return NextResponse.json(data);
    } catch (error: any) {
        console.error('Error creating election:', error);
        return NextResponse.json(
            { error: error.message || 'Failed to create election' },
            { status: 500 }
        );
    }
}
