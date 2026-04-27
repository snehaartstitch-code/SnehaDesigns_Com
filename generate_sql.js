import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const productsPath = path.join(__dirname, 'src', 'data', 'products.json');
const products = JSON.parse(fs.readFileSync(productsPath, 'utf8'));

const escapeString = (str) => str ? `'${str.replace(/'/g, "''")}'` : 'NULL';
const escapeArray = (arr) => arr && arr.length ? `ARRAY[${arr.map(escapeString).join(', ')}]` : 'ARRAY[]::text[]';

const sql = `INSERT INTO public.products (id, slug, name, price, category, description, tags, images, highlights, options) VALUES\n` + 
  products.map(p => `(${escapeString(p.id)}, ${escapeString(p.slug)}, ${escapeString(p.name)}, ${p.price}, ${escapeString(p.category)}, ${escapeString(p.description)}, ${escapeArray(p.tags)}, ${escapeArray(p.images)}, ${escapeArray(p.highlights)}, ${escapeArray(p.options)})`).join(',\n') + ';';

console.log(sql);
