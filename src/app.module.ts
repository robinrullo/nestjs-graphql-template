import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { configuration, validationSchema } from './config/configuration';
import { UserModule } from './user/user.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: 'env.development.local',
      load: [configuration],
      validationSchema,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mongodb',
        url: configService.get('database.url'),
        useNewUrlParser: true,
        useUnifiedTopology: true,
        synchronize: configService.get('environment') === 'DEVELOPMENT',
        logging: configService.get('environment') === 'DEVELOPMENT',
        entities: [],
      }),
      inject: [ConfigService],
    }),
    GraphQLModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        debug: configService.get('environment') === 'DEVELOPMENT', // Enable debug for development
        playground: false,
        autoSchemaFile: true,
        sortSchema: true,
        plugins: [ApolloServerPluginLandingPageLocalDefault()], // Set Apollo Sandbox as default playground
      }),
      inject: [ConfigService],
    }),
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
