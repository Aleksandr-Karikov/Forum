import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from './pipes/validation.pipe';

async function startUp(): Promise<void> {
    const PORT = process.env.PORT || 5000;
    const app = await NestFactory.create(AppModule);

    const config = new DocumentBuilder()
        .setTitle('Forum API')
        .setDescription('Rest API documentation')
        .setVersion('1.0.0')
        .addTag('Forum')
        .addBearerAuth()
        .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('/api/doc', app, document);

    // app.useGlobalPipes(new ValidationPipe());
    app.enableCors();

    await app.listen(PORT, () =>
        console.log(`server was started on port ${PORT}`),
    );
}

startUp().then();
