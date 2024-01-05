import { NextResponse } from 'next/server'

import prisma from '@/app/lib/prisma'
import bcrypt from 'bcryptjs'
 
export async function POST (request: Request) {
  try {
    const { email, password, isAdmin, name, avatar } = await request.json()
    if (!email || !password) throw new Error('не передан email или пароль')

    const hash = await bcrypt.hash(password, 10)

    const result = await prisma.user.create({
      data: { email, password: hash, isAdmin, name, avatar }
    })

    return NextResponse.json({ result }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error?.toString() }, { status: 500 });
  }
}
