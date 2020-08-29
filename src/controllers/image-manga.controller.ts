import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Image,
  Manga,
} from '../models';
import {ImageRepository} from '../repositories';

export class ImageMangaController {
  constructor(
    @repository(ImageRepository)
    public imageRepository: ImageRepository,
  ) { }

  @get('/images/{id}/manga', {
    responses: {
      '200': {
        description: 'Manga belonging to Image',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Manga)},
          },
        },
      },
    },
  })
  async getManga(
    @param.path.string('id') id: typeof Image.prototype.id,
  ): Promise<Manga> {
    return this.imageRepository.manga(id);
  }
}
