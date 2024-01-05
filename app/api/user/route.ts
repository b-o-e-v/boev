import { NextRequest, NextResponse } from 'next/server'

import prisma from '@/app/lib/prisma'
import jwt from 'jsonwebtoken'

export async function GET (request: NextRequest) {
  try {
    const { value = '' } = request.cookies.get('jwt') || {}

    const payload = jwt.verify(
      value,
      `${process.env.NODE_ENV === 'production' ? process.env.JWT_SECRET : 'dev-secret'}`,
    ) || {}

    if (typeof payload === 'object' && 'id' in payload) {
      const result = await prisma.user.findUnique({ where: { id: payload.id } })
      return NextResponse.json({ result }, { status: 200 });
    }
  } catch (error) {
    return NextResponse.json({ error: error?.toString() }, { status: 500 });
  }
}
