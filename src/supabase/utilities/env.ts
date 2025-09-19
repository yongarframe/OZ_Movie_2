// supabase 설정 (필수 환경변수 검증)
export const supabaseEnv: { apiKey: string; projectURL: string } = (() => {
  const apiKey = import.meta.env.VITE_SUPABASE_API_KEY as string | undefined
  const projectURL = import.meta.env.VITE_SUPABASE_PROJECT_URL as
    | string
    | undefined

  if (!apiKey || !projectURL) {
    throw new Error(
      'Supabase environment variables are missing. Please set VITE_SUPABASE_API_KEY and VITE_SUPABASE_PROJECT_URL.'
    )
  }

  return { apiKey, projectURL }
})()
