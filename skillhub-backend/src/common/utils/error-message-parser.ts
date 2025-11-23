import { Response } from 'express'
import { NotFoundError } from '../errors/not-found-error'

export const errorMessageParser = (res: Response, error: unknown) => {
  if (error instanceof NotFoundError) {
    return res.status(404).json({
      message: error.message
    })
  }

  if (error instanceof Error) {
    return res.status(400).json({
      message: error.message
    })
  }
}