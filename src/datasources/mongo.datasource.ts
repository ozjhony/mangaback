import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';
/*
const config = {
  name: 'mongo',
  connector: 'mongodb',
  url: 'mongodb+srv://manga_user_db:yz2kUP12ieGReOZy@cluster0.b9mfd.mongodb.net/mangaDB?retryWrites=true&w=majority',
  host: 'cluster0.b9mfd.mongodb.net',
  port: 27017,
  user: 'manga_user_db',
  password: 'yz2kUP12ieGReOZyz2kUP12ieGReOZy',
  database: 'mangaDB',
  useNewUrlParser: true
};*/


const config = {
  name: 'mongodb',
  connector: 'mongodb',
  url: 'mongodb://localhost:27017/mangaDB',
  host: 'localhost',
  port: 27017,
  user: '',
  password: '',
  database: 'mangaDB',
  useNewUrlParser: true
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class MongoDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'mongo';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.mongo', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
