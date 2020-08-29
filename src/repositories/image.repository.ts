import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {Image, ImageRelations, Manga} from '../models';
import {MongoDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {MangaRepository} from './manga.repository';

export class ImageRepository extends DefaultCrudRepository<
  Image,
  typeof Image.prototype.id,
  ImageRelations
> {

  public readonly manga: BelongsToAccessor<Manga, typeof Image.prototype.id>;

  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource, @repository.getter('MangaRepository') protected mangaRepositoryGetter: Getter<MangaRepository>,
  ) {
    super(Image, dataSource);
    this.manga = this.createBelongsToAccessorFor('manga', mangaRepositoryGetter,);
    this.registerInclusionResolver('manga', this.manga.inclusionResolver);
  }
}
