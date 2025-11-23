export const checkError = async (res: Response): Promise<void> => {
  if (!res.ok) {
    const data = await res.json()
    throw new Error(data.message)
  }
}