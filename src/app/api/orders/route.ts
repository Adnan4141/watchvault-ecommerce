import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, phone, address, city, items, totalAmount } = body;

    if (!name || !phone || !address || !items || items.length === 0) {
      return NextResponse.json(
        { error: "Missing required order fields" },
        { status: 400 }
      );
    }

    const orderId = `WV-${Date.now().toString().slice(-6)}`;

    const order = {
      orderId,
      customer: { name, phone, address, city },
      items,
      totalAmount,
      status: "Processing",
      createdAt: new Date().toISOString(),
    };

    return NextResponse.json({
      success: true,
      message: "Order placed successfully! Cash on delivery.",
      order,
    });
  } catch {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
