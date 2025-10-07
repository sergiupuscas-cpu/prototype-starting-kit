/**
 * Supabase Connection Test Script
 * 
 * This script tests your Supabase connection and verifies:
 * 1. Environment variables are loaded
 * 2. Connection to Supabase is successful
 * 3. Database table exists
 * 4. Can fetch data from the table
 */

require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

// Color codes for terminal output
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

async function testConnection() {
  log('\n🔍 Testing Supabase Connection...\n', 'cyan');

  // Step 1: Check environment variables
  log('Step 1: Checking environment variables...', 'blue');
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl) {
    log('❌ ERROR: NEXT_PUBLIC_SUPABASE_URL is not set in .env file', 'red');
    return false;
  }
  if (!supabaseKey) {
    log('❌ ERROR: NEXT_PUBLIC_SUPABASE_ANON_KEY is not set in .env file', 'red');
    return false;
  }

  log(`✓ NEXT_PUBLIC_SUPABASE_URL: ${supabaseUrl}`, 'green');
  log(`✓ NEXT_PUBLIC_SUPABASE_ANON_KEY: ${supabaseKey.substring(0, 20)}...`, 'green');

  // Step 2: Create Supabase client
  log('\nStep 2: Creating Supabase client...', 'blue');
  let supabase;
  try {
    supabase = createClient(supabaseUrl, supabaseKey);
    log('✓ Supabase client created successfully', 'green');
  } catch (error) {
    log(`❌ ERROR creating Supabase client: ${error.message}`, 'red');
    return false;
  }

  // Step 3: Test connection by checking listings-db-24jul table
  log('\nStep 3: Testing database connection...', 'blue');
  let listingsCount = 0;
  try {
    const { data, error, count } = await supabase
      .from('listings-db-24jul')
      .select('*', { count: 'exact', head: true });

    if (error) {
      log(`❌ Database connection failed: ${error.message}`, 'red');
      if (error.message.includes('relation') || error.message.includes('does not exist')) {
        log('\n💡 Hint: The listings-db-24jul table does not exist.', 'yellow');
        log('   Please check your Supabase table setup.', 'yellow');
      } else if (error.message.includes('JWT') || error.message.includes('API key')) {
        log('\n💡 Hint: Invalid API key. Check your NEXT_PUBLIC_SUPABASE_ANON_KEY.', 'yellow');
      }
      return false;
    }

    listingsCount = count || 0;
    log('✓ Successfully connected to database', 'green');
    log(`✓ Table "listings-db-24jul" exists with ${listingsCount} rows`, 'green');
  } catch (error) {
    log(`❌ Connection test failed: ${error.message}`, 'red');
    return false;
  }

  // Step 4: Test images table
  log('\nStep 4: Testing images table...', 'blue');
  try {
    const { data, error, count } = await supabase
      .from('images')
      .select('*', { count: 'exact', head: true });

    if (error) {
      log(`❌ Images table check failed: ${error.message}`, 'red');
      return false;
    }

    log('✓ Images table exists', 'green');
    log(`✓ Found ${count || 0} images in the database`, 'green');
  } catch (error) {
    log(`❌ Images table test failed: ${error.message}`, 'red');
    return false;
  }

  // Step 5: Try to fetch actual data
  log('\nStep 5: Fetching sample listings...', 'blue');
  try {
    const { data, error } = await supabase
      .from('listings-db-24jul')
      .select('id, make_key, model_key, first_registration_year, price, is_live')
      .limit(5);

    if (error) {
      log(`❌ Failed to fetch data: ${error.message}`, 'red');
      return false;
    }

    if (!data || data.length === 0) {
      log('⚠️  Table exists but contains no data', 'yellow');
      log(`💡 The table reports ${listingsCount} rows but query returned 0 results`, 'yellow');
      log('   This might be due to Row Level Security policies', 'yellow');
      return true;
    }

    log(`✓ Successfully fetched ${data.length} vehicle listings:`, 'green');
    console.log('');
    data.forEach((vehicle, index) => {
      const year = vehicle.first_registration_year || 'N/A';
      const make = vehicle.make_key || 'Unknown';
      const model = vehicle.model_key || 'Unknown';
      const price = vehicle.price || 'N/A';
      const status = vehicle.is_live ? '🟢 Live' : '⚪ Not Live';
      log(`   ${index + 1}. ${year} ${make} ${model} - €${price} ${status}`, 'cyan');
    });
  } catch (error) {
    log(`❌ Failed to fetch data: ${error.message}`, 'red');
    return false;
  }

  // Step 6: Test fetching images for a listing
  log('\nStep 6: Testing image fetching...', 'blue');
  try {
    const { data: listings } = await supabase
      .from('listings-db-24jul')
      .select('id')
      .limit(1);

    if (listings && listings.length > 0) {
      const listingId = listings[0].id;
      const { data: images, error } = await supabase
        .from('images')
        .select('*')
        .eq('listing_id', listingId);

      if (error) {
        log(`⚠️  Image fetch test failed: ${error.message}`, 'yellow');
      } else {
        log(`✓ Successfully fetched ${images?.length || 0} images for listing ${listingId}`, 'green');
      }
    }
  } catch (error) {
    log(`⚠️  Image test inconclusive: ${error.message}`, 'yellow');
  }

  // Success!
  log('\n' + '='.repeat(60), 'green');
  log('🎉 SUCCESS! Supabase connection is working perfectly!', 'green');
  log('='.repeat(60), 'green');
  log('\nYou can now use the VehicleListingsGrid component in your app.', 'cyan');
  log('\nNext steps:', 'cyan');
  log('  1. If you don\'t have data yet, run supabase-setup.sql', 'reset');
  log('  2. Check out examples/basic-usage.tsx for implementation', 'reset');
  log('  3. Run: npm run dev (to start Storybook)', 'reset');
  log('  4. Start building your prototype! 🚀\n', 'reset');

  return true;
}

// Run the test
testConnection()
  .then((success) => {
    process.exit(success ? 0 : 1);
  })
  .catch((error) => {
    log(`\n❌ Unexpected error: ${error.message}`, 'red');
    console.error(error);
    process.exit(1);
  });

