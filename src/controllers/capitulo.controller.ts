import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
} from '@loopback/rest';
import {Capitulo} from '../models';
import {CapituloRepository} from '../repositories';

export class CapituloController {
  constructor(
    @repository(CapituloRepository)
    public capituloRepository : CapituloRepository,
  ) {}

  @post('/capitulo', {
    responses: {
      '200': {
        description: 'Capitulo model instance',
        content: {'application/json': {schema: getModelSchemaRef(Capitulo)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Capitulo, {
            title: 'NewCapitulo',
            exclude: ['id'],
          }),
        },
      },
    })
    capitulo: Omit<Capitulo, 'id'>,
  ): Promise<Capitulo> {
    return this.capituloRepository.create(capitulo);
  }

  @get('/capitulo/count', {
    responses: {
      '200': {
        description: 'Capitulo model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(Capitulo) where?: Where<Capitulo>,
  ): Promise<Count> {
    return this.capituloRepository.count(where);
  }

  @get('/capitulo', {
    responses: {
      '200': {
        description: 'Array of Capitulo model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Capitulo, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Capitulo) filter?: Filter<Capitulo>,
  ): Promise<Capitulo[]> {
    return this.capituloRepository.find(filter);
  }

  @patch('/capitulo', {
    responses: {
      '200': {
        description: 'Capitulo PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Capitulo, {partial: true}),
        },
      },
    })
    capitulo: Capitulo,
    @param.where(Capitulo) where?: Where<Capitulo>,
  ): Promise<Count> {
    return this.capituloRepository.updateAll(capitulo, where);
  }

  @get('/capitulo/{id}', {
    responses: {
      '200': {
        description: 'Capitulo model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Capitulo, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Capitulo, {exclude: 'where'}) filter?: FilterExcludingWhere<Capitulo>
  ): Promise<Capitulo> {
    return this.capituloRepository.findById(id, filter);
  }

  @patch('/capitulo/{id}', {
    responses: {
      '204': {
        description: 'Capitulo PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Capitulo, {partial: true}),
        },
      },
    })
    capitulo: Capitulo,
  ): Promise<void> {
    await this.capituloRepository.updateById(id, capitulo);
  }

  @put('/capitulo/{id}', {
    responses: {
      '204': {
        description: 'Capitulo PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() capitulo: Capitulo,
  ): Promise<void> {
    await this.capituloRepository.replaceById(id, capitulo);
  }

  @del('/capitulo/{id}', {
    responses: {
      '204': {
        description: 'Capitulo DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.capituloRepository.deleteById(id);
  }
}
