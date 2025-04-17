#!/usr/bin/env node

// Script to check if important environment variables are set
const chalk = require('chalk');

// Detect if we're in a CI environment
const isCI = process.env.CI === 'true' || 
             process.env.VERCEL === '1' || 
             process.env.NODE_ENV === 'production';

function checkEnvironment() {
  if (isCI) {
    console.log('Running in CI/CD environment - skipping detailed checks');
    return;
  }
  
  console.log(chalk.blue.bold('\n🔍 Checking environment variables for RFM...\n'));
  
  // Check for OpenAI API Key
  const openaiKey = process.env.OPENAI_API_KEY || process.env.OPENAI_KEY;
  if (!openaiKey) {
    console.log(chalk.red('❌ OpenAI API Key: Not found'));
    console.log(chalk.yellow('   This is required for the RFM to function properly.'));
    console.log(chalk.yellow('   Please set OPENAI_API_KEY in your environment variables.'));
  } else if (!openaiKey.startsWith('sk-')) {
    console.log(chalk.yellow('⚠️ OpenAI API Key: Found but may be invalid (should start with "sk-")'));
  } else {
    console.log(chalk.green('✅ OpenAI API Key: Found and valid'));
  }
  
  // Check for NextAuth Secret
  const nextAuthSecret = process.env.NEXTAUTH_SECRET;
  if (!nextAuthSecret) {
    console.log(chalk.red('❌ NextAuth Secret: Not found'));
    console.log(chalk.yellow('   This is required for authentication to work properly.'));
    console.log(chalk.yellow('   Please set NEXTAUTH_SECRET in your environment variables.'));
  } else {
    console.log(chalk.green('✅ NextAuth Secret: Found'));
  }
  
  // Check for Stripe Keys if monetization is enabled
  const stripeKey = process.env.STRIPE_SECRET_KEY;
  if (!stripeKey) {
    console.log(chalk.yellow('⚠️ Stripe Secret Key: Not found'));
    console.log(chalk.gray('   Required only if you want to enable monetization features.'));
  } else if (!stripeKey.startsWith('sk_')) {
    console.log(chalk.yellow('⚠️ Stripe Secret Key: Found but may be invalid (should start with "sk_")'));
  } else {
    console.log(chalk.green('✅ Stripe Secret Key: Found and valid'));
  }
  
  // Summary
  console.log(chalk.blue.bold('\n📊 Environment Status:'));
  if (!openaiKey || !openaiKey.startsWith('sk-')) {
    console.log(chalk.yellow('⚠️ The RFM will use fallback responses until a valid OpenAI API key is provided.'));
  } else {
    console.log(chalk.green('✅ The RFM is ready to generate AI responses with the OpenAI API.'));
  }
  
  if (!nextAuthSecret) {
    console.log(chalk.yellow('⚠️ Authentication will not work until NEXTAUTH_SECRET is set.'));
  }
  
  if (!stripeKey || !stripeKey.startsWith('sk_')) {
    console.log(chalk.yellow('⚠️ Monetization features will not work until valid Stripe keys are provided.'));
  }
  
  console.log('\n');
}

// Run the environment check
try {
  checkEnvironment();
} catch (error) {
  console.error('Error in environment check:', error);
  // Don't fail the build on environment check errors
}