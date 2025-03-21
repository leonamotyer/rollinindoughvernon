import { CustomerData } from "@/types/customerData";
import { SquareClient, SquareEnvironment } from "square";
import { NextResponse } from "next/server";

// A helper function that converts BigInt values to strings
function convertBigInts(obj: unknown): unknown {
  if (typeof obj === "bigint") {
    return obj.toString();
  } else if (Array.isArray(obj)) {
    return obj.map(convertBigInts);
  } else if (obj !== null && typeof obj === "object") {
    return Object.fromEntries(
      Object.entries(obj).map(([key, value]) => [key, convertBigInts(value)])
    );
  }
  return obj;
}

function convertAllToStrings(obj: unknown): unknown {
  if (obj === null || typeof obj !== "object") {
    return String(obj);
  }

  if (Array.isArray(obj)) {
    return obj.map(convertAllToStrings);
  }

  const newObj: Record<string, string> = {};
  for (const key in obj as Record<string, unknown>) {
    newObj[key] = String(
      convertAllToStrings((obj as Record<string, unknown>)[key])
    );
  }
  return newObj;
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as CustomerData;
    const { given_name, family_name, email_address, phone_number, address } =
      body;

    const Client = new SquareClient({
      token: process.env.SQUARE_ACCESS_TOKEN,
      environment: SquareEnvironment.Sandbox,
    });

    const squareAddress = {
      addressLine1: address.address_line_1,
      locality: address.locality,
      administrativeDistrictLevel1: address.administrative_district_level_1,
      postalCode: address.postal_code,
    };

    const searchResponse = await Client.customers.search({
      query: {
        filter: {
          emailAddress: {
            exact: email_address,
          },
          // Alternatively, if using external_id:
          // referenceId: { exact: external_id }
        },
      },
    });

    if (searchResponse.customers && searchResponse.customers?.length) {
      const safeCustomer = convertBigInts(searchResponse.customers[0]);
      return NextResponse.json(safeCustomer, { status: 200 });
    }
    const response = await Client.customers.create({
      givenName: given_name,
      familyName: family_name,
      emailAddress: email_address,
      phoneNumber: phone_number,
      address: squareAddress,
    });

    const safeResult = convertAllToStrings(response.customer);
    return NextResponse.json(safeResult, { status: 200 });
  } catch (error: unknown) {
    console.error("Error creating Square customer:", error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    return NextResponse.json(
      { message: "Internal Server Error", error: errorMessage },
      { status: 500 }
    );
  }
}
