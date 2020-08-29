import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {Category, CategoryRelations, Manga} from '../models';
import {MongoDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {MangaRepository} from './manga.repository';

export class CategoryRepository extends DefaultCrudRepository<
  Category,
  typeof Category.prototype.id,
  CategoryRelations
> {

  public readonly manga: HasManyRepositoryFactory<Manga, typeof Category.prototype.id>;

  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource, @repository.getter('MangaRepository') protected mangaRepositoryGetter: Getter<MangaRepository>,
  ) {
    super(Category, dataSource);
    this.manga = this.createHasManyRepositoryFactoryFor('manga', mangaRepositoryGetter,);
    this.registerInclusionResolver('manga', this.manga.inclusionResolver);
  }
}
