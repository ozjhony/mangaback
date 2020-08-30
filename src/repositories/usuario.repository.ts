import {DefaultCrudRepository, repository, HasOneRepositoryFactory} from '@loopback/repository';
import {Usuario, UsuarioRelations, Userlog} from '../models';
import {MongoDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {UserlogRepository} from './userlog.repository';

export class UsuarioRepository extends DefaultCrudRepository<
  Usuario,
  typeof Usuario.prototype.id,
  UsuarioRelations
> {

  public readonly userlog: HasOneRepositoryFactory<Userlog, typeof Usuario.prototype.id>;

  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource, @repository.getter('UserlogRepository') protected userlogRepositoryGetter: Getter<UserlogRepository>,
  ) {
    super(Usuario, dataSource);
    this.userlog = this.createHasOneRepositoryFactoryFor('userlog', userlogRepositoryGetter);
    this.registerInclusionResolver('userlog', this.userlog.inclusionResolver);
  }
}
