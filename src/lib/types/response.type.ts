export type ResponseType<TData> = {
  success: boolean
  message: string
  data: TData
  error?: any
  status: number
}
