import { nxs, NxsResult } from 'nexus-decorators'
import type { BaseContext } from '../context/BaseContext'
import type { ProjectContract } from '../contracts'
import { Config } from './Config'
import { Project } from './Project'
import { RunGroup } from './run'

@nxs.objectType({
  description: 'A Cypress project is a container',
})
export class DashboardProject extends Project {
  constructor (
    config: ProjectContract,
    private context: BaseContext,
    private authToken: string,
  ) {
    super(new Config(config), context)
  }

  @nxs.field.list.nonNull.type(() => RunGroup)
  async runs (): Promise<NxsResult<'Project', 'run'>> {
    const result = await this.context.actions.getRuns({
      projectId: await this.projectId(),
      authToken: this.authToken,
    })

    return result
  }

  @nxs.field.list.nonNull.string()
  async recordKeys (): Promise<NxsResult<'Project', 'recordKeys'>> {
    const result = await this.context.actions.getRecordKeys({
      projectId: await this.projectId(),
      authToken: this.authToken,
    })

    return result
  }
}