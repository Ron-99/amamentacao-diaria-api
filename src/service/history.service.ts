import { PrismaClient } from '@prisma/client'

export type HistoryProps = {
  userId: string
}

export type SaveHistoryProps = {
  userId: string
  babyName: string
  startedAt: Date
  finishedAt?: Date
  breasts: {
    isLeft: boolean
    time: Date
  }[]
}

export type UpdateHistoryProps = {
  userId: string
  finishedAt: Date
}

export type UpdateBreastProps = {
  userId: string
  time: Date
  isLeft: boolean
}

export class HistoryService {
  private readonly prisma
  constructor() {
    this.prisma = new PrismaClient()
  }

  teste() {
    console.log('teste')
  }

  async findLastHistory({ userId }: HistoryProps) {
    const result = await this.prisma.history.findFirst({
      include: {
        breasts: true,
      },
      where: {
        userId,
      },
      orderBy: {
        finishedAt: {
          sort: 'desc',
        },
      },
    })
    return result
  }

  private async getLastNotFinishedHistory(userId: string){
    const lastHistory = await this.prisma.history.findFirst({
      where: {
        userId: userId,
        finishedAt: { equals: null },
      },
    })
    return lastHistory
  }

  async startBreastfeeding(input: SaveHistoryProps) {
    const result = await this.prisma.history.create({
      data: {
        userId: input.userId,
        babyName: input.babyName,
        startedAt: input.startedAt,
        finishedAt: input.finishedAt,
        breasts: {
          createMany: {
            data: input.breasts.map((breast) => ({
              isLeft: breast.isLeft,
              time: breast.time,
            })),
          },
        },
      },
    })
    return result
  }
  
  async finishBreastfeeding(input: UpdateHistoryProps) {
    const lastHistory = await this.getLastNotFinishedHistory(input.userId)
    if(!lastHistory) return undefined
    const result = await this.prisma.history.update({
      where: {
        id: lastHistory.id
      },
      data: {
        finishedAt: input.finishedAt
      }
    })
    return result
  }

  async updateBreast (input: UpdateBreastProps){
    const lastHistory = await this.getLastNotFinishedHistory(input.userId)
    if(!lastHistory) return undefined
    const result = await this.prisma.breastHistory.create({
      data: {
        historyId: lastHistory.id,
        isLeft: input.isLeft,
        time: input.time
      }
    })
    return result
  }
}
