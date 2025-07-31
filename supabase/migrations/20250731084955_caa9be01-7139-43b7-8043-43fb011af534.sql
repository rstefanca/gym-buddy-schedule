-- Create admin user directly in the database
-- First create the admin user account
DO $$
DECLARE
    admin_user_id uuid;
BEGIN
    -- Insert into auth.users table
    INSERT INTO auth.users (
        instance_id,
        id,
        aud,
        role,
        email,
        encrypted_password,
        email_confirmed_at,
        created_at,
        updated_at,
        confirmation_token,
        email_change,
        email_change_token_new,
        recovery_token
    ) VALUES (
        '00000000-0000-0000-0000-000000000000',
        gen_random_uuid(),
        'authenticated',
        'authenticated',
        'admin@fitschedule.com',
        crypt('hesslo123', gen_salt('bf')),
        now(),
        now(),
        now(),
        '',
        '',
        '',
        ''
    ) RETURNING id INTO admin_user_id;

    -- Create profile for admin user
    INSERT INTO public.profiles (
        user_id,
        display_name
    ) VALUES (
        admin_user_id,
        'Admin User'
    );

    -- Assign admin role
    INSERT INTO public.user_roles (
        user_id,
        role
    ) VALUES (
        admin_user_id,
        'admin'
    );

END $$;