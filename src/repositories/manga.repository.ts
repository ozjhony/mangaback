import {DefaultCrudRepository, repository, HasManyRepositoryFactory, BelongsToAccessor} from '@loopback/repository';
import {Manga, MangaRelations, Capitulo, Category, Image} from '../models';
import {MongoDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {CapituloRepository} from './capitulo.repository';
import {CategoryRepository} from './category.repository';
import {ImageRepository} from './image.repository';

export class MangaRepository extends DefaultCrudRepository<
  Manga,
  typeof Manga.prototype.id,
  MangaRelations
> {

  public readonly capitulo: HasManyRepositoryFactory<Capitulo, typeof Manga.prototype.id>;

  public readonly category: BelongsToAccessor<Category, typeof Manga.prototype.id>;

  public readonly image: HasManyRepositoryFactory<Image, typeof Manga.prototype.id>;

  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource, @repository.getter('CapituloRepository') protected capituloRepositoryGetter: Getter<CapituloRepository>, @repository.getter('CategoryRepository') protected categoryRepositoryGetter: Getter<CategoryRepository>, @repository.getter('ImageRepository') protected imageRepositoryGetter: Getter<ImageRepository>,
  ) {
    super(Manga, dataSource);
    this.image = this.createHasManyRepositoryFactoryFor('image', imageRepositoryGetter,);
    this.registerInclusionResolver('image', this.image.inclusionResolver);
    this.category = this.createBelongsToAccessorFor('category', categoryRepositoryGetter,);
    this.registerInclusionResolver('category', this.category.inclusionResolver);
    this.capitulo = this.createHasManyRepositoryFactoryFor('capitulo', capituloRepositoryGetter,);
    this.registerInclusionResolver('capitulo', this.capitulo.inclusionResolver);
  }
}
