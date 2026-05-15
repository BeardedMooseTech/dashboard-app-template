import { NextResponse } from "next/server";

export async function POST() {
  try {
    console.log("Received request for /api/dashboards");
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
              MrpProduction(domain:[
                  ["product_id.default_code", "ilike", "WBF"],
                  ["state", "=", "progress"],
                ]) {
                  name
                  state
                  mo_name
                  scanned_qty
                  qty_producing
                  product_id {
                    name
                    default_code
                  }
                  workorder_ids {
                    name
                    state
                  }
                }
              }`,
            },
          ],
        },
      }),
    });

    const json = await response.json();
    console.log("Raw API Response:", json);

    const { result } = json;

    console.log("API Result:", result);

    return NextResponse.json({
      result,
    });
  } catch (e) {
    console.error(e);
    return Response.json({ error: e }, { status: 500 });
  }
}
