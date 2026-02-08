# AI Learning Path - Database Setup

## Prerequisites

Before running the application, you need to set up the Supabase database schema.

## Setup Instructions

### 1. Access Supabase SQL Editor

1. Go to your Supabase project dashboard: https://supabase.com/dashboard
2. Navigate to the **SQL Editor** section in the left sidebar
3. Click on **New Query**

### 2. Run the Schema Migration

1. Open the file: `supabase/schema.sql`
2. Copy the entire contents of this file
3. Paste it into the Supabase SQL Editor
4. Click **Run** to execute the migration

This will create:

- **4 tables**: `learning_paths`, `modules`, `lessons`, `quizzes`
- **Row Level Security (RLS)** policies for all tables
- **Indexes** for optimized queries
- **Triggers** for automatic timestamp updates
- **Views** for progress tracking

### 3. Verify the Setup

After running the migration, verify that the tables were created:

1. Go to **Table Editor** in Supabase
2. You should see the following tables:
   - `learning_paths`
   - `modules`
   - `lessons`
   - `quizzes`

### 4. Check RLS Policies

1. Click on any table in the Table Editor
2. Go to the **Policies** tab
3. You should see policies like "Users can view their own learning paths"

## Environment Variables

Make sure your `.env` file has the correct Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY=your_anon_key
```

## Authentication Setup

The system requires Supabase authentication to be enabled:

1. Go to **Authentication** in Supabase dashboard
2. Enable **Email** provider (or any other provider you want)
3. Users will need to sign up before creating learning paths

## Testing the System

### Step 1: Sign Up/Login

1. Navigate to your app's authentication page
2. Create an account or log in

### Step 2: Create a Learning Path

1. Go to `/onboarding`
2. Enter a learning goal (e.g., "I want to become a Full Stack Developer")
3. Click "Generate My Learning Path"
4. Wait for the AI to generate your path (10-30 seconds)

### Step 3: View Your Learning Path

1. You'll be redirected to the generating page
2. After completion, you'll see your complete learning path
3. Browse through modules and lessons

## Troubleshooting

### "Authentication required" error

- Make sure you're logged in
- Check that RLS policies are enabled on all tables
- Verify your Supabase credentials in `.env`

### "Failed to create learning path" error

- Check the browser console for detailed errors
- Verify the database schema was created correctly
- Ensure all tables have the correct RLS policies

### AI generation fails

- Check your Gemini API key in `.env`
- Verify you have API quota remaining
- Check network tab for API errors

## Next Steps

Once the database is set up and you can create learning paths:

1. You can add features like lesson completion tracking
2. Implement quiz functionality
3. Add progress dashboards
4. Create lesson detail pages with full content
