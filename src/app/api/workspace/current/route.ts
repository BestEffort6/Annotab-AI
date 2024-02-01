import { type NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';

import { authOptions } from '@/libs/auth';
import { Env } from '@/libs/Env.mjs';

export async function PATCH(request: NextRequest) {
  const form = await request.formData();

  const session = await getServerSession(authOptions);
  const accessToken = session?.user ? session.user.access.token : null;

  try {
    if (!accessToken) {
      throw new Error('No access token');
    }

    const response = await fetch(
      `${Env.NEXT_PUBLIC_BACKEND_URL}/api/v1/workspace/current`,
      {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: form,
      }
    ).then((res) => res.json());

    if (response.statusCode !== 200) {
      throw new Error(response.message);
    }

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
