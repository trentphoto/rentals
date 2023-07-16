export type Product = {
    id: number;
    slug: string;
    category: string;
    name: string;
    brand: string;
    description: string;
    price_per_day: number;
    image_url: string;
    start_date?: string; // Assuming a string representation of the date/time
    end_date?: string; // Assuming a string representation of the date/time
    created_at: string; // Assuming a string representation of the date/time
    updated_at: string; // Assuming a string representation of the date/time
  };
  