import { loadEnvConfig } from '@next/env';
loadEnvConfig('./');
import mongoose from 'mongoose';

const uri = process.env.MONGODB_URI;
await mongoose.connect(uri, { serverSelectionTimeoutMS: 15000 });
const db = mongoose.connection.db;

const fix1 = await db.collection('blogs').updateMany(
  { category: 'Automation' },
  { $set: { category: 'automation' } }
);
console.log('Automation fix:', fix1.modifiedCount, 'modified,', fix1.matchedCount, 'matched');

const fix2 = await db.collection('blogs').updateMany(
  { category: 'Web' },
  { $set: { category: 'web-development' } }
);
console.log('Web fix:', fix2.modifiedCount, 'modified,', fix2.matchedCount, 'matched');

const cats = await db.collection('categories').find({type:'blog'}).toArray();
const slugs = cats.map(c => c.slug);
const mismatched = await db.collection('blogs').find({ status: 'published', category: { $nin: slugs } }).project({title:1,category:1}).toArray();
if (mismatched.length) {
  console.log('Still mismatched:');
  for (const m of mismatched) console.log(' [' + m.category + ']', m.title?.slice(0,50));
} else {
  console.log('All categories match! ✅');
}

await mongoose.disconnect();
