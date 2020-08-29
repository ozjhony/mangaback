import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Capitulo,
  Manga,
} from '../models';
import {CapituloRepository} from '../repositories';

export class CapituloMangaController {
  constructor(
    @repository(CapituloRepository)
    public capituloRepository: CapituloRepository,
  ) { }

  @get('/capitulos/{id}/manga', {
    responses: {
      '200': {
        description: 'Manga belonging to Capitulo',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Manga)},
          },
        },
      },
    },
  })
  async getManga(
    @param.path.string('id') id: typeof Capitulo.prototype.id,
  ): Promise<Manga> {
    return this.capituloRepository.manga(id);
  }
}
