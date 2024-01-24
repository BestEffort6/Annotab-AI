import { type NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';

import { authOptions } from '@/libs/auth';

export async function PATCH(request: NextRequest) {
  const json = await request.json();

  const session = await getServerSession(authOptions);
  const accessToken = session?.user ? session.user.access.token : null;

  try {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/workspace/current`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(json),
    });

    return new NextResponse(
      JSON.stringify({
        status: 200,
        body: {
          success: true,
          message: 'Settings updated',
        },
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    return new NextResponse(
      JSON.stringify({
        status: 500,
        body: {
          success: false,
          message: 'Something went wrong',
        },
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}
