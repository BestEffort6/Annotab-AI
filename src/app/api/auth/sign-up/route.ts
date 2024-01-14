import { type NextRequest, NextResponse } from 'next/server';

export interface RegistrationData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  isAcceptedTermsCond: boolean;
  isAcceptedPrivacy: boolean;
  isAcceptedDataProcAdde: boolean;
  isAcceptedOverEighteen: boolean;
}

export async function POST(request: NextRequest) {
  const json: RegistrationData = await request.json();

  try {
    const response = await fetch(
      `${process.env.BACKEND_URL}/api/v1/auth/register`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(json),
      }
    ).then((res) => res.json());

    return new NextResponse(JSON.stringify(response), {
      status: response.statusCode,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new NextResponse(JSON.stringify(error), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
