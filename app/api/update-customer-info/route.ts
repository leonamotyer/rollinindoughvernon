// pages/api/update-customer-info.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { UpdateCustomerRequestBody } from "@/types/customerData";
import { SquareClient, SquareEnvironment } from "square";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "PUT") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const {
    customer_id,
    given_name,
    family_name,
    email_address,
    phone_number,
    address,
  } = req.body as UpdateCustomerRequestBody;

  if (!customer_id) {
    return res
      .status(400)
      .json({ message: "Missing required parameter: customer_id" });
  }

  // Build the update payload with mapping from snake_case to camelCase
  interface UpdatePayload {
    givenName?: string;
    familyName?: string;
    emailAddress?: string;
    phoneNumber?: string;
    address?: {
      addressLine1?: string;
      locality?: string;
      administrativeDistrictLevel1?: string;
      postalCode?: string;
    };
  }

  const updatePayload: UpdatePayload = {};
  if (given_name) updatePayload.givenName = given_name;
  if (family_name) updatePayload.familyName = family_name;
  if (email_address) updatePayload.emailAddress = email_address;
  if (phone_number) updatePayload.phoneNumber = phone_number;
  if (address) {
    updatePayload.address = {
      addressLine1: address.address_line_1,
      locality: address.locality,
      administrativeDistrictLevel1: address.administrative_district_level_1,
      postalCode: address.postal_code,
    };
  }

  try {
    // Initialize the Square client
    const Client = new SquareClient({
      token: process.env.SQUARE_ACCESS_TOKEN,
      environment: SquareEnvironment.Sandbox,
    });

    // Call Square's updateCustomer method using the SDK
    const response = await Client.customers.update({
      customerId: customer_id,
      ...updatePayload,
    });

    // Return the updated customer info from Square
    res.status(200).json(response);
  } catch (error: unknown) {
    console.error("Error updating Square customer info:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    res.status(500).json({
      message: "Internal Server Error",
      error: errorMessage,
    });
  }
}
