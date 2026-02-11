-- Function to verify lesson ownership and get module_id
-- Returns module_id if the lesson exists and belongs to the user, otherwise null
CREATE OR REPLACE FUNCTION verify_lesson_ownership(
  lesson_id UUID,
  user_id UUID
)
RETURNS UUID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  target_module_id UUID;
BEGIN
  SELECT l.module_id INTO target_module_id
  FROM lessons l
  JOIN modules m ON l.module_id = m.id
  JOIN learning_paths lp ON m.learning_path_id = lp.id
  WHERE l.id = verify_lesson_ownership.lesson_id
  AND lp.user_id = verify_lesson_ownership.user_id;
  
  RETURN target_module_id;
END;
$$;
