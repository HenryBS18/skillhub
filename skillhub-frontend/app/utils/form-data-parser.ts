export const formDataParser = async (request: Request): Promise<Record<string, string | undefined>> => {
  const formData = await request.formData()
  const result: Record<string, string | undefined> = {}

  formData.forEach((value, key) => {
    if (typeof value === "string") {
      result[key] = value.trim().length > 0 ? value : undefined
    } else {
      result[key] = undefined
    }
  })

  return result
}
