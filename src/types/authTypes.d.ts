type ROLE_TYPES = 'ROLE_ADMIN' | 'ROLE_USER' | 'ROLE_AGENT' | 'ROLE_SUPER_AGENT'

interface IUser {
  id: number
  extId: string
  username: string | null
  email: string | null
  isRegistered: boolean
  isBlocked: boolean
  name: string
  phone: string
  city: string
  address: string
  createdAt: string
  updatedAt: string
  discount: number
  role: ROLE_TYPES
  isAllowOrder: boolean
  isAllowAllClients: boolean
  password?: string
  payCode: string
  payDesc: float
  maxCredit: float
  maxObligo: float
  hp: string
  taxCode: string
  agentId: IUser
  isAgent: boolean
  city: string
  address: string
}

interface IAgentServiceResponse extends IPagination {
  data: IUser[]
}


type LoginResponse = IResponse<IUser>

type ValidationResponse = IResponse<{ exId: string; name: string }>

type RegistrationResponse = IResponse

interface ITokens {
  token: string
  refresh_token: string
}

interface IAuthResponse extends ITokens {
  status: string
  user: IUser
}

interface formNewB2bForm {
  fullName: string
  phone: string
  town: string
  address: string
  email: string
  password: string
  business: string
  confirmPassword: string
}

interface UserDocs {
  EXTFILEDES: string
  CURDATE: string
  EXTFILENAME: string
  SUFFIX: 'pdf' | 'png'
}

interface createUserDoc {
  userExtId: string
  title: string
  base64Pdf: string
}

interface UsersResponse extends IPagination {
  data: IUser[]
}
