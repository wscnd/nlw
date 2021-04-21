import { EntityRepository, Repository } from 'typeorm'

import { Setting } from './settings.entity'

@EntityRepository(Setting)
class SettingsRepository extends Repository<Setting> {}

export { SettingsRepository }
