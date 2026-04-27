import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const productsPath = path.join(__dirname, 'src', 'data', 'products.json');
const productsData = JSON.parse(fs.readFileSync(productsPath, 'utf8'));

async function seedDatabase() {
  console.log('Starting database seed...');
  
  const { data, error } = await supabase
    .from('products')
    .insert(productsData);

  if (error) {
    console.error('Error inserting data:', error);
  } else {
    console.log('Successfully seeded products table!');
  }
}

seedDatabase();
