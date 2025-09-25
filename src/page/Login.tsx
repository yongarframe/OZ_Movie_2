import { useNavigate } from 'react-router-dom'
import { useSupabaseAuth } from '@/supabase'
import { delay } from '@/util/delay'
import { useState } from 'react'
import { useIsUserLogin } from '@/store/useIsUserLogin'

export default function Login() {
  const { loginWithKakao, login, loginWithGoogle } = useSupabaseAuth()
  const { setIsLogin } = useIsUserLogin()
  const navigate = useNavigate()

  const handleKakaoLogin = async () => {
    // 카카오 로그인 처리: 리디렉션 흐름에서는 즉시 로그인 상태를 true로 두지 않음
    await loginWithKakao(window.location.origin + '/')
  }

  const handleGoogleLogin = async () => {
    loginWithGoogle()
  }

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleEmailLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const result = await login({
        email: formData.email,
        password: formData.password,
      })

      if (!result) {
        return
      }

      if ('error' in result && result.error) {
        return
      }

      setIsLogin(true)

      await delay(1000)
      navigate('/')
    } catch {
      // noop
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-purple-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-2xl">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            로그인
          </h2>
        </div>

        <form onSubmit={handleEmailLogin} className="mt-8 space-y-6">
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <input
                type="email"
                name="email"
                placeholder="이메일을 입력해주세요"
                value={formData.email}
                onChange={handleChange}
                required
                className="appearance-none rounded-lg relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm"
              />
            </div>
            <div>
              <input
                type="password"
                name="password"
                placeholder="비밀번호를 입력해주세요"
                value={formData.password}
                onChange={handleChange}
                required
                className="appearance-none rounded-lg relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm"
              />
            </div>
          </div>

          <button
            type="submit"
            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 cursor-pointer"
          >
            로그인
          </button>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">소셜 로그인</span>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-3">
            {/* <button
              onClick={handleNaverLogin}
              className="w-full inline-flex justify-center py-3 px-4 rounded-md shadow-sm bg-[#03C75A] text-sm font-medium text-white hover:bg-opacity-90"
            >
              네이버로 로그인
            </button> */}
            <button
              onClick={handleKakaoLogin}
              className="w-full inline-flex justify-center py-3 px-4 rounded-md shadow-sm bg-[#FEE500] text-sm font-medium text-gray-900 hover:bg-opacity-90 cursor-pointer"
            >
              카카오로 로그인
            </button>
            <button
              onClick={handleGoogleLogin}
              className="w-full inline-flex justify-center py-3 px-4 rounded-md shadow-sm bg-white border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50 cursor-pointer"
            >
              구글로 로그인
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
