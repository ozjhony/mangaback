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
  Image,
} from '../models';
import {MangaRepository} from '../repositories';

export class MangaImageController {
  constructor(
    @repository(MangaRepository) protected mangaRepository: MangaRepository,
  ) { }

  @get('/manga/{id}/images', {
    responses: {
      '200': {
        description: 'Array of Manga has many Image',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Image)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Image>,
  ): Promise<Image[]> {
    return this.mangaRepository.image(id).find(filter);
  }

  @post('/manga/{id}/images', {
    responses: {
      '200': {
        description: 'Manga model instance',
        content: {'application/json': {schema: getModelSchemaRef(Image)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Manga.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Image, {
            title: 'NewImageInManga',
            exclude: ['id'],
            optional: ['mangaId']
          }),
        },
      },
    }) image: Omit<Image, 'id'>,
  ): Promise<Image> {
    return this.mangaRepository.image(id).create(image);
  }

  @patch('/manga/{id}/images', {
    responses: {
      '200': {
        description: 'Manga.Image PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Image, {partial: true}),
        },
      },
    })
    image: Partial<Image>,
    @param.query.object('where', getWhereSchemaFor(Image)) where?: Where<Image>,
  ): Promise<Count> {
    return this.mangaRepository.image(id).patch(image, where);
  }

  @del('/manga/{id}/images', {
    responses: {
      '200': {
        description: 'Manga.Image DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Image)) where?: Where<Image>,
  ): Promise<Count> {
    return this.mangaRepository.image(id).delete(where);
  }
}
