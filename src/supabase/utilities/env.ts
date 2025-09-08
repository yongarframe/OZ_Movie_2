// supabase 설정
export const supabaseEnv: { apiKey: string; projectURL: string } = {
  apiKey: import.meta.env.VITE_SUPABASE_API_KEY,
  projectURL: import.meta.env.VITE_SUPABASE_PROJECT_URL,
}
