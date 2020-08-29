import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Manga,
  Capitulo,
} from '../models';
import {MangaRepository} from '../repositories';

export class MangaCapituloController {
  constructor(
    @repository(MangaRepository) protected mangaRepository: MangaRepository,
  ) { }

  @get('/manga/{id}/capitulos', {
    responses: {
      '200': {
        description: 'Array of Manga has many Capitulo',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Capitulo)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Capitulo>,
  ): Promise<Capitulo[]> {
    return this.mangaRepository.capitulo(id).find(filter);
  }

  @post('/manga/{id}/capitulos', {
    responses: {
      '200': {
        description: 'Manga model instance',
        content: {'application/json': {schema: getModelSchemaRef(Capitulo)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Manga.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Capitulo, {
            title: 'NewCapituloInManga',
            exclude: ['id'],
            optional: ['mangaId']
          }),
        },
      },
    }) capitulo: Omit<Capitulo, 'id'>,
  ): Promise<Capitulo> {
    return this.mangaRepository.capitulo(id).create(capitulo);
  }

  @patch('/manga/{id}/capitulos', {
    responses: {
      '200': {
        description: 'Manga.Capitulo PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Capitulo, {partial: true}),
        },
      },
    })
    capitulo: Partial<Capitulo>,
    @param.query.object('where', getWhereSchemaFor(Capitulo)) where?: Where<Capitulo>,
  ): Promise<Count> {
    return this.mangaRepository.capitulo(id).patch(capitulo, where);
  }

  @del('/manga/{id}/capitulos', {
    responses: {
      '200': {
        description: 'Manga.Capitulo DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Capitulo)) where?: Where<Capitulo>,
  ): Promise<Count> {
    return this.mangaRepository.capitulo(id).delete(where);
  }
}
