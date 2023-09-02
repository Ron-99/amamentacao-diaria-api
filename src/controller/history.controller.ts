import { HistoryProps, HistoryService, SaveHistoryProps, UpdateBreastProps, UpdateHistoryProps } from "../service/history.service";
import { Request, Response, NextFunction } from "express";

export class HistoryController {
  constructor(private readonly historyService: HistoryService) {}

  teste() {
    console.log('teste')
  }
  async getLastHistory(req: Request<HistoryProps>, res: Response, next: NextFunction) {

    const { userId } = req.params
    const result = await this.historyService.findLastHistory({ userId })
    res.status(200).send({
      result
    })
  }

  async startBreastfeeding(req: Request<any, any, SaveHistoryProps>, res: Response, next: NextFunction) {
    const result = await this.historyService.startBreastfeeding(req.body)
    res.status(201).send({
      result
    })
  }

  async finishBreastfeeding(req: Request<any, any, UpdateHistoryProps>, res: Response, next: NextFunction){
    const result = await this.historyService.finishBreastfeeding(req.body)
    res.status(200).send({
      result
    })
  }

  async updateBreast(req: Request<any, any, UpdateBreastProps>, res: Response, next: NextFunction){
    const result = await this.historyService.updateBreast(req.body)
    res.status(200).send({
      result
    })
  }
}