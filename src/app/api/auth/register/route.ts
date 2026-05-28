import { NextResponse } from 'next/server'

import { adminSupabase } from '@/lib/supabase/admin'
import { getServerSupabase } from '@/lib/supabase/server'
export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const fullName = formData.get("full_name") as string;
    const mobile = formData.get("mobile") as string;
    const branchId = formData.get("branch_id") as string;
    const image = formData.get("image") as File | null;

    if (
      !email ||
      !password ||
      !fullName ||
      !mobile ||
      !branchId
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "All fields are required",
        },
        { status: 400 }
      );
    }

    const supabase = await getServerSupabase();

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error || !data.user) {
      return NextResponse.json(
        {
          success: false,
          message: error?.message,
        },
        { status: 400 }
      );
    }

    let imageUrl: string | null = null;

    if (image) {
      const fileExt = image.name.split('.').pop() ?? 'jpg'
      const filePath = `${data.user.id}/avatar.${fileExt}`

      const { error: uploadError } = await adminSupabase.storage
        .from('avatars')
        .upload(filePath, image, {
          upsert: true,
          contentType: image.type
        })

      if (uploadError) {
        return NextResponse.json(
          {
            success: false,
            message: uploadError.message
          },
          { status: 400 }
        )
      }

      const { data: publicData } = adminSupabase.storage.from('avatars').getPublicUrl(filePath)

      imageUrl = publicData.publicUrl
    }

    // Service role: works even when email confirmation is on (no session yet)
    const { error: profileError } = await adminSupabase.from('profiles').insert({
      id: data.user.id,
      full_name: fullName,
      mobile,
      branch_id: branchId,
      image_url: imageUrl
    })

    if (profileError) {
      return NextResponse.json(
        {
          success: false,
          message: profileError.message,
        },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      userId: data.user.id,
      // If null, turn off "Confirm email" in Supabase Auth or show "check your email" on FE
      needsEmailConfirmation: !data.session
    })
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Internal Server Error",
      },
      { status: 500 }
    );
  }
}