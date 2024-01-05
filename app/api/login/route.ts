import { NextRequest, NextResponse } from 'next/server'

import prisma from '@/app/lib/prisma'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
 
export async function POST (request: NextRequest) {
  try {
    const { email, password } = await request.json()
    if (!email || !password) throw new Error('не передан email или пароль')

    const user = await prisma.user.findUnique({ where: { email } })

    if (!user) throw new Error('неправильные почта или пароль')

    const passwordMatched = await bcrypt.compare(password, user.password)

    if (!passwordMatched) throw new Error('неправильные почта или пароль')

    const token = jwt.sign(
      { id: user.id },
      process.env.NODE_ENV === 'production' ? process.env.JWT_SECRET || '' : 'dev-secret',
      { expiresIn: '7d' }
    )

    return NextResponse.json({ token, user }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error?.toString() }, { status: 500 });
  }
}
