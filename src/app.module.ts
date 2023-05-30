import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/entities/user.entity';
import { UserModule } from './user/user.module';

@Module({
  imports: [TypeOrmModule.forRoot({

    type: 'mysql',
    host:'15.206.7.200',
    port: 3310,
    username: 'shivampa',
    password: 'pK593is53CkVsQRLPkRYL1N2',
    database: 'shivampa',
    entities:[User],
    synchronize: true


  }), 

  UserModule
],
  controllers: [],
  providers: [],
})
export class AppModule {

}
