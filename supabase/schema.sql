-- AI Learning Path Generation System - Database Schema
-- This schema supports personalized learning paths with modules, lessons, and quizzes

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================================
-- LEARNING PATHS TABLE
-- ============================================================================
-- Main table storing user learning paths with metadata
CREATE TABLE learning_paths (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  goal TEXT NOT NULL, -- Original user goal/prompt
  difficulty_level TEXT NOT NULL CHECK (difficulty_level IN ('beginner', 'intermediate', 'advanced')),
  estimated_duration_hours INTEGER NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'generating' CHECK (status IN ('generating', 'active', 'completed', 'failed')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL
);

-- Index for faster user queries
CREATE INDEX idx_learning_paths_user_id ON learning_paths(user_id);
CREATE INDEX idx_learning_paths_status ON learning_paths(status);

-- ============================================================================
-- MODULES TABLE
-- ============================================================================
-- Learning path phases/sections
CREATE TABLE modules (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  learning_path_id UUID NOT NULL REFERENCES learning_paths(id) ON DELETE CASCADE,
  order_index INTEGER NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  estimated_duration_hours INTEGER NOT NULL DEFAULT 0,
  is_completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL,
  
  -- Ensure unique ordering within a learning path
  UNIQUE(learning_path_id, order_index)
);

-- Index for faster queries
CREATE INDEX idx_modules_learning_path_id ON modules(learning_path_id);

-- ============================================================================
-- LESSONS TABLE
-- ============================================================================
-- Individual lessons within modules
CREATE TABLE lessons (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  module_id UUID NOT NULL REFERENCES modules(id) ON DELETE CASCADE,
  order_index INTEGER NOT NULL,
  title TEXT NOT NULL,
  content TEXT NOT NULL, -- Main lesson content/explanation
  learning_objectives TEXT[] NOT NULL DEFAULT '{}', -- Array of learning objectives
  resources JSONB DEFAULT '[]', -- Array of external resources: [{title, url, type}]
  is_completed BOOLEAN DEFAULT FALSE,
  completed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL,
  
  -- Ensure unique ordering within a module
  UNIQUE(module_id, order_index)
);

-- Index for faster queries
CREATE INDEX idx_lessons_module_id ON lessons(module_id);

-- ============================================================================
-- QUIZZES TABLE
-- ============================================================================
-- Quiz assessments for lessons
CREATE TABLE quizzes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  lesson_id UUID NOT NULL REFERENCES lessons(id) ON DELETE CASCADE,
  questions JSONB NOT NULL, -- Array of question objects: [{question, options, correctAnswer, explanation}]
  passing_score INTEGER NOT NULL DEFAULT 70, -- Percentage needed to pass
  user_score INTEGER, -- User's achieved score (percentage)
  completed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL,
  
  -- One quiz per lesson
  UNIQUE(lesson_id)
);

-- Index for faster queries
CREATE INDEX idx_quizzes_lesson_id ON quizzes(lesson_id);

-- ============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================================================

-- Enable RLS on all tables
ALTER TABLE learning_paths ENABLE ROW LEVEL SECURITY;
ALTER TABLE modules ENABLE ROW LEVEL SECURITY;
ALTER TABLE lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE quizzes ENABLE ROW LEVEL SECURITY;

-- LEARNING PATHS POLICIES
-- Users can only see and modify their own learning paths
CREATE POLICY "Users can view their own learning paths"
  ON learning_paths FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own learning paths"
  ON learning_paths FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own learning paths"
  ON learning_paths FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own learning paths"
  ON learning_paths FOR DELETE
  USING (auth.uid() = user_id);

-- MODULES POLICIES
-- Users can access modules of their own learning paths
CREATE POLICY "Users can view modules of their learning paths"
  ON modules FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM learning_paths
      WHERE learning_paths.id = modules.learning_path_id
      AND learning_paths.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert modules to their learning paths"
  ON modules FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM learning_paths
      WHERE learning_paths.id = modules.learning_path_id
      AND learning_paths.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update modules of their learning paths"
  ON modules FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM learning_paths
      WHERE learning_paths.id = modules.learning_path_id
      AND learning_paths.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can delete modules of their learning paths"
  ON modules FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM learning_paths
      WHERE learning_paths.id = modules.learning_path_id
      AND learning_paths.user_id = auth.uid()
    )
  );

-- LESSONS POLICIES
-- Users can access lessons through their modules
CREATE POLICY "Users can view lessons of their modules"
  ON lessons FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM modules
      JOIN learning_paths ON learning_paths.id = modules.learning_path_id
      WHERE modules.id = lessons.module_id
      AND learning_paths.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert lessons to their modules"
  ON lessons FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM modules
      JOIN learning_paths ON learning_paths.id = modules.learning_path_id
      WHERE modules.id = lessons.module_id
      AND learning_paths.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update lessons of their modules"
  ON lessons FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM modules
      JOIN learning_paths ON learning_paths.id = modules.learning_path_id
      WHERE modules.id = lessons.module_id
      AND learning_paths.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can delete lessons of their modules"
  ON lessons FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM modules
      JOIN learning_paths ON learning_paths.id = modules.learning_path_id
      WHERE modules.id = lessons.module_id
      AND learning_paths.user_id = auth.uid()
    )
  );

-- QUIZZES POLICIES
-- Users can access quizzes through their lessons
CREATE POLICY "Users can view quizzes of their lessons"
  ON quizzes FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM lessons
      JOIN modules ON modules.id = lessons.module_id
      JOIN learning_paths ON learning_paths.id = modules.learning_path_id
      WHERE lessons.id = quizzes.lesson_id
      AND learning_paths.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert quizzes to their lessons"
  ON quizzes FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM lessons
      JOIN modules ON modules.id = lessons.module_id
      JOIN learning_paths ON learning_paths.id = modules.learning_path_id
      WHERE lessons.id = quizzes.lesson_id
      AND learning_paths.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update quizzes of their lessons"
  ON quizzes FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM lessons
      JOIN modules ON modules.id = lessons.module_id
      JOIN learning_paths ON learning_paths.id = modules.learning_path_id
      WHERE lessons.id = quizzes.lesson_id
      AND learning_paths.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can delete quizzes of their lessons"
  ON quizzes FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM lessons
      JOIN modules ON modules.id = lessons.module_id
      JOIN learning_paths ON learning_paths.id = modules.learning_path_id
      WHERE lessons.id = quizzes.lesson_id
      AND learning_paths.user_id = auth.uid()
    )
  );

-- ============================================================================
-- TRIGGERS
-- ============================================================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = TIMEZONE('utc', NOW());
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for learning_paths
CREATE TRIGGER update_learning_paths_updated_at
  BEFORE UPDATE ON learning_paths
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- HELPFUL VIEWS
-- ============================================================================

-- View to get learning path with progress statistics
CREATE OR REPLACE VIEW learning_paths_with_progress AS
SELECT 
  lp.*,
  COUNT(DISTINCT m.id) as total_modules,
  COUNT(DISTINCT CASE WHEN m.is_completed THEN m.id END) as completed_modules,
  COUNT(DISTINCT l.id) as total_lessons,
  COUNT(DISTINCT CASE WHEN l.is_completed THEN l.id END) as completed_lessons,
  ROUND(
    CASE 
      WHEN COUNT(DISTINCT l.id) > 0 
      THEN (COUNT(DISTINCT CASE WHEN l.is_completed THEN l.id END)::DECIMAL / COUNT(DISTINCT l.id)::DECIMAL) * 100
      ELSE 0
    END
  ) as progress_percentage
FROM learning_paths lp
LEFT JOIN modules m ON m.learning_path_id = lp.id
LEFT JOIN lessons l ON l.module_id = m.id
GROUP BY lp.id;
