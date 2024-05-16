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
              query: `
              query {
                StockPicking(domain:[["state", "=", "assigned"], ["picking_type_id.name", "in", ["Pick", "Delivery Orders"]]]) {
                  
                  state
                  display_name
                  picking_type_id {
                    name
                    display_name
                    id
                  }
                  sale_id {
                    id
                    name
                    display_name
                  }
                }
              }`,
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
