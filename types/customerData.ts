export interface Address {
  address_line_1?: string;
  locality?: string;
  administrative_district_level_1?: string;
  postal_code?: string;
}
export interface CustomerData {
  given_name: string;
  family_name: string;
  email_address: string;
  phone_number: string;
  address: Address;
}

export interface UpdateCustomerRequestBody {
  customer_id: string;
  given_name?: string;
  family_name?: string;
  email_address?: string;
  phone_number?: string;
  address?: Address;
}
