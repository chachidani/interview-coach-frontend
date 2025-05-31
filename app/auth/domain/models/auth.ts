export interface LoginRequest {
  email: string
  password: string
}

export interface LoginResponse {
  message: string
  token: string
}

export interface OverallFeedback {
  id: string
  user_id: string
  strength: string | null
  improvement: string | null
  top_topic: string
  total_interview: number
  score_percentage: number
  created_at: number
}

export interface User {
  ID: string
  Username: string
  Email: string
  Rooms: any[]
  Password: string
  OverallFeedback: OverallFeedback
}   

export interface RegisterRequest {
  email: string
  password: string
  username: string
}

export interface RegisterResponse {
  error: boolean
  successResponse: boolean
  errorMessage: string
  successMessage: string
}

export interface UserResponse {
  error: boolean
  successResponse: boolean
  errorMessage: string
  successMessage: string
  data: User[]
}



