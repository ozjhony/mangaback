import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {Capitulo, CapituloRelations, Manga} from '../models';
import {MongoDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {MangaRepository} from './manga.repository';

export class CapituloRepository extends DefaultCrudRepository<
  Capitulo,
  typeof Capitulo.prototype.id,
  CapituloRelations
> {

  public readonly manga: BelongsToAccessor<Manga, typeof Capitulo.prototype.id>;

  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource, @repository.getter('MangaRepository') protected mangaRepositoryGetter: Getter<MangaRepository>,
  ) {
    super(Capitulo, dataSource);
    this.manga = this.createBelongsToAccessorFor('manga', mangaRepositoryGetter,);
    this.registerInclusionResolver('manga', this.manga.inclusionResolver);
  }
}
