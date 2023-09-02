import { Router, Request, Response } from 'express'
import {
  HistoryProps,
  HistoryService,
  SaveHistoryProps,
  UpdateBreastProps,
  UpdateHistoryProps,
} from '../service/history.service'

const router = Router()
const historyService = new HistoryService()

router.get('/last/:userId', async (req: Request<HistoryProps>, res: Response) => {
  const { userId } = req.params
  const result = await historyService.findLastHistory({ userId })
  res.status(200).send({
    result,
  })
})
router.post(
  '/start',
  async (req: Request<any, any, SaveHistoryProps>, res: Response) => {
    const result = await historyService.startBreastfeeding(req.body)
    res.status(201).send({
      result,
    })
  },
)
router.put(
  '/finish',
  async (req: Request<any, any, UpdateHistoryProps>, res: Response) => {
    const result = await historyService.finishBreastfeeding(req.body)
    res.status(200).send({
      result,
    })
  },
)
router.put(
  '/update-breast',
  async (req: Request<any, any, UpdateBreastProps>, res: Response) => {
    const result = await historyService.updateBreast(req.body)
    res.status(200).send({
      result,
    })
  },
)

export { router }
