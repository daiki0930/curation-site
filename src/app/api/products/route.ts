import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const featured = searchParams.get('featured')
    const category = searchParams.get('category')
    const sortBy = searchParams.get('sortBy')

    const where: { featured?: boolean; category?: string } = {}
    if (featured === 'true') {
      where.featured = true
    }
    if (category && category !== 'all') {
      where.category = category
    }

    let orderBy: { createdAt?: 'asc' | 'desc'; price?: 'asc' | 'desc' } = {
      createdAt: 'desc',
    }
    if (sortBy === 'price_low') {
      orderBy = { price: 'asc' }
    } else if (sortBy === 'price_high') {
      orderBy = { price: 'desc' }
    }

    const products = await prisma.product.findMany({
      where: Object.keys(where).length > 0 ? where : undefined,
      take: featured === 'true' ? 4 : undefined,
      orderBy,
    })

    return NextResponse.json(products)
  } catch (error) {
    console.error('Error fetching products:', error)
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    )
  }
}
