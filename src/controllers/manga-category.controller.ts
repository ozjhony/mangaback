import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Manga,
  Category,
} from '../models';
import {MangaRepository} from '../repositories';

export class MangaCategoryController {
  constructor(
    @repository(MangaRepository)
    public mangaRepository: MangaRepository,
  ) { }

  @get('/manga/{id}/category', {
    responses: {
      '200': {
        description: 'Category belonging to Manga',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Category)},
          },
        },
      },
    },
  })
  async getCategory(
    @param.path.string('id') id: typeof Manga.prototype.id,
  ): Promise<Category> {
    return this.mangaRepository.category(id);
  }
}
