import { NextResponse } from "next/server";

export async function POST() {
  try {
    const response = await fetch(`${process.env.NEXT_ODOO_URL}/jsonrpc`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        jsonrpc: "2.0",
        method: "call",
        params: {
          service: "object",
          method: "execute",
          args: [
            `${process.env.NEXT_ODOO_DB}`,
            process.env.NEXT_ODOO_USER_ID,
            `${process.env.NEXT_ODOO_API_KEY}`,
            "graphql_rpc.handler",
            "handle_api_call",
            [],
            {
              query:
                'query { StockPicking(order:"sale_id desc") { id name picking_type_id { id name display_name } sale_id { id name partner_id { id name } } }}',
            },
          ],
        },
      }),
    });

    const { result } = await response.json();

    return NextResponse.json({
      result,
    });
  } catch (e) {
    console.error(e);
    return Response.json({ error: e }, { status: 500 });
  }
}
