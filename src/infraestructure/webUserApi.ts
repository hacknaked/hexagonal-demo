import express from 'express'
import { UserApi, UserApiServices } from '../application/ports/userApi'
import { QueryFilter } from '../application/ports/repository'

export class WebUserApi implements UserApi {
  static PORT = 3000
  static FIELD_REGEX =
    /^(?<field>\w+),(?<operator>gt|gte|equals|lt|lte|some),(?<value>\S+)$/

  constructor(private api = express()) {
    api.use(express.json())
    api.listen(WebUserApi.PORT, () => {
      console.log(`Web api listening on port ${WebUserApi.PORT}`)
    })
  }

  public setEndpointsCallbacks(service: UserApiServices, route: string): void {
    this.api.get(route, async (req, res) => {
      try {
        const filter = this.parseFilters(req?.query?.filter || [])
        const records = await service.findMany(filter)
        res.json(records)
      } catch (error) {
        console.error(error)
        return res.status(400).json({ error: 'Bad request' })
      }
    })

    this.api.post(route, async (req, res) => {
      try {
        const record = await service.create(req.body)
        res.json(record)
      } catch (error) {
        return res.status(400).json({ error: error.message })
      }
    })
  }

  private parseFilters(paramFilter, relation = null): QueryFilter[] {
    const filters = []
    paramFilter = Array.isArray(paramFilter) ? paramFilter : [paramFilter]
    for (const f of paramFilter) {
      const match = f.match(WebUserApi.FIELD_REGEX)
      if (match) {
        const { field, operator, value } = match.groups
        if (operator === 'some') {
          const _filters = this.parseFilters(
            [value],
            (relation = { model: field, operator: 'some' })
          )
          filters.push(..._filters)
        } else {
          filters.push({ relation, field, operator, value })
        }
      } else {
        throw new Error('Invalid param')
      }
    }
    return filters
  }
}
