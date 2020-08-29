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
  Category,
  Manga,
} from '../models';
import {CategoryRepository} from '../repositories';

export class CategoryMangaController {
  constructor(
    @repository(CategoryRepository) protected categoryRepository: CategoryRepository,
  ) { }

  @get('/categories/{id}/manga', {
    responses: {
      '200': {
        description: 'Array of Category has many Manga',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Manga)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Manga>,
  ): Promise<Manga[]> {
    return this.categoryRepository.manga(id).find(filter);
  }

  @post('/categories/{id}/manga', {
    responses: {
      '200': {
        description: 'Category model instance',
        content: {'application/json': {schema: getModelSchemaRef(Manga)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Category.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Manga, {
            title: 'NewMangaInCategory',
            exclude: ['id'],
            optional: ['categoryId']
          }),
        },
      },
    }) manga: Omit<Manga, 'id'>,
  ): Promise<Manga> {
    return this.categoryRepository.manga(id).create(manga);
  }

  @patch('/categories/{id}/manga', {
    responses: {
      '200': {
        description: 'Category.Manga PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Manga, {partial: true}),
        },
      },
    })
    manga: Partial<Manga>,
    @param.query.object('where', getWhereSchemaFor(Manga)) where?: Where<Manga>,
  ): Promise<Count> {
    return this.categoryRepository.manga(id).patch(manga, where);
  }

  @del('/categories/{id}/manga', {
    responses: {
      '200': {
        description: 'Category.Manga DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Manga)) where?: Where<Manga>,
  ): Promise<Count> {
    return this.categoryRepository.manga(id).delete(where);
  }
}
